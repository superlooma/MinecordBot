import {Client as MinecraftClient, createClient, states} from 'minecraft-protocol';
import {Client as DiscordClient, Message, TextChannel, Snowflake} from 'discord.js';
import {Config} from './config';
import {Command, CommandContext, MinecraftCommandCaller, CommandCaller, DiscordCommandCaller} from './command';
import { Optional, Some, None, get, read_file_sync_safe } from './util';
import { readFileSync, fstat } from 'fs';

export class Bot {
	minecraft: MinecraftClient;
	discord: DiscordClient;
	private config: Config;
	private commands: Map<string, Command> = new Map();
	private username_cache: Map<string, string> = new Map();
	private minecraft_prefix: string;
	private server_prefixes: Map<string, string> = new Map();
	private default_prefix: string;

	constructor(config: Config) {
		this.config = config;
		this.discord = new DiscordClient({disableMentions: 'all'});
		
		this.default_prefix = config.default_prefix;
		this.load_prefixes();

		// Possibly seperate this from default_prefix
		this.minecraft_prefix = config.default_prefix;

		this.minecraft = createClient({
			username: config.minecraft_info.username,
			password: config.minecraft_info.password,
			host: config.minecraft_info.host,
			port: config.minecraft_info.port || 25565
		});

		this.discord.on('message', this.handle_discord_message);
		this.minecraft.on('chat', (packet: ChatPacket) => {
			let msg: ChatJSON = JSON.parse(packet.message);
			if((msg.translate == 'chat.type.announcement' || msg.translate == 'chat.type.text') && this.minecraft.username != msg.with[0].text) {
				packet.message = msg.with[1].text;
				this.handle_minecraft_message(packet);
			}
		});
	}

	private handle_discord_message(message:Message) {
		if(message.author.bot) return;
		if(!message.content.startsWith(this.server_prefixes.get(<string>message.guild?.id) || this.default_prefix))
			return;
		message.content = message.content.substring(1);


		let args = this.parse_arguments(message.content);
		let cmd_name = args.shift();

		if(!cmd_name)
			return;

		if(!(message.channel instanceof TextChannel))
			return;

		let ctx: CommandContext = {
			source: 'Discord',
			arguments: args,
			caller: new DiscordCommandCaller(message.author, message.channel),
			bot: this
		}

		let command = this.find_command(cmd_name);
		if(command.is_some())
			command.unwrap().run(ctx);
	}

	private async handle_minecraft_message(message: ChatPacket) {
		if(!message.message.startsWith(this.minecraft_prefix))
			return;
		message.message = message.message.substring(1);


		let args = this.parse_arguments(message.message);
		let cmd_name = args.shift();
		
		// TODO: handle empty messages properly
		if(!cmd_name)
			return;

		let sender_name = await this.get_minecraft_username(message.sender);

		let ctx: CommandContext = {
			source: 'Minecraft',
			arguments: args,
			caller: new MinecraftCommandCaller(sender_name, this.minecraft),
			bot: this
		}

		let command = this.find_command(cmd_name);
		if(command.is_some())
			command.unwrap().run(ctx);
	}

	find_command(str: string): Optional<Command> {
		if(this.commands.has(str))
			return Some(<Command>this.commands.get(str));
		else return None();
	}

	parse_arguments(str: string): string[] {
		// TODO: Add quote matching to allow longer string arguments
		// maybe change command stuff to include argument type to mirror brigadier? though that would be a bitch to make
		return str.split(' ');
	}

	// Maybe replace this with caching user names from Player Info packets instead of using the api
	async get_minecraft_username(uuid: string): Promise<string> {
		if(this.username_cache.has(uuid))
		return <string>this.username_cache.get(uuid );
		else return await get(`https://api.mojang.com/user/profiles/${uuid.replace("-", "")}/names`);
	}

	get_commands(): IterableIterator<Command> {
		return this.commands.values();
	}

	// Save this in an actual database instead of a json
	load_prefixes() {
		let data: {[key: string]: string} = JSON.parse(read_file_sync_safe('./server_prefixes.json').toString());
		for(let server in Object.keys(data))
			this.server_prefixes.set(server, data[server]);
	}

	add_command(command: Command) {
		this.commands.set(command.getName(), command);
	}
}

interface ChatPacket {
	message: string,
	position: number,
	sender: string
}

interface ChatJSON {
	translate: string,
	with: {text: string}[]
}