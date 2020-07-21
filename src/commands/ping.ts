import { Command, CommandContext } from "../bot/command";

class PingCommand implements Command {
	get_name() {
		return 'ping'
	}

	get_description() {
		return 'gets the ping of the bot'
	}

	get_usage() {
		return '{{prefix}} ping'
	}

	run(ctx: CommandContext) {
		ctx.caller.send_message(`The current ${ctx.source == 'Discord' ? 'discord' : 'minecraft'} ping is ${ctx.source == 'Discord' ? ctx.bot.discord.ws.ping : ctx.bot.minecraft.latency}`);
	}
}

export let command = PingCommand;