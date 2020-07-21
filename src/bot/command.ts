import {User, TextChannel} from 'discord.js';
import {Client as MinecraftClient} from "minecraft-protocol";
import { Bot } from './bot';

export interface Command {
	get_name(): string;
	get_usage(): string;
	get_description(): string;
	run(context: CommandContext): void;
}

export interface CommandContext {
	source: 'Discord' | 'Minecraft',
	caller: CommandCaller,
	arguments: string[],
	bot: Bot
}

export interface CommandCaller {
	send_message(message: string): void;
	get_name(): string;
}

export class DiscordCommandCaller implements CommandCaller {
	user: User;
	channel: TextChannel;

	constructor(user: User, channel: TextChannel) {
		this.user = user;
		this.channel = channel;
	}

	send_message(message: string) {
		this.channel.send(message);
	}

	get_name(): string {
		return this.user.username;
	}

	get_discriminator(): string {
		return this.user.discriminator;
	}
}

export class MinecraftCommandCaller implements CommandCaller {
	username: string;
	client: MinecraftClient;

	constructor(username: string, client: MinecraftClient) {
		this.username = username;
		this.client = client;
	}

	send_message(message: string) {
		this.client.write('chat', {message: `${message}`});
		this.client.write('chat', {message: `/w ${this.username} ${message}`});
	}

	get_name(): string {
		return this.username;
	}
}