import {User, TextChannel} from 'discord.js';
import {Client as MinecraftClient} from "minecraft-protocol";
import { Bot } from './bot';

export interface Command {
	getName(): string;
	getUsage(): string;
	getDescription(): string;
	run(context: CommandContext): void;
}

export interface CommandContext {
	source: 'Discord' | 'Minecraft',
	caller: CommandCaller,
	arguments: string[],
	bot: Bot
}

export interface CommandCaller {
	sendMessage(message: string): void;
	getName(): string;
}

export class DiscordCommandCaller implements CommandCaller {
	user: User;
	channel: TextChannel;

	constructor(user: User, channel: TextChannel) {
		this.user = user;
		this.channel = channel;
	}

	sendMessage(message: string) {
		this.channel.send(message);
	}

	getName(): string {
		return `${this.user.username}#${this.user.discriminator}`;
	}
}

export class MinecraftCommandCaller implements CommandCaller {
	username: string;
	client: MinecraftClient;

	constructor(username: string, client: MinecraftClient) {
		this.username = username;
		this.client = client;
	}

	sendMessage(message: string) {
		this.client.write('chat', {message: `/w ${this.username} ${message}`});
	}

	getName(): string {
		return this.username;
	}
}