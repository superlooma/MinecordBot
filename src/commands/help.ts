import { Command } from "../bot/command";
import { CommandContext } from "../bot/command";

class HelpCommand implements Command {
	get_name() {
		return 'help'
	}

	get_description() {
		return 'gets the commands currently loaded in the bot'
	}

	get_usage() {
		return '{{prefix}}help [command name]'
	}

	run(ctx: CommandContext) {
		let commands = Array.from(ctx.bot.get_commands());

		switch(ctx.source) {
			case 'Discord':
				this.format_discord(ctx, commands);
				break;
			case 'Minecraft':
				this.format_minecraft(ctx, commands);
				break;
		}
	}

	private format_discord(ctx: CommandContext, commands: Command[]) {
		let output = '';

		for(let cmd of commands)
			output += `**${cmd.get_name()}**\n\t\`${cmd.get_description()}\``;

		ctx.caller.send_message(output)
	}

	private format_minecraft(ctx: CommandContext, commands: Command[]) {
		let output = '';

		for(let cmd of commands)
			output += `${cmd.get_name}, `;

		output = output.substring(0, output.length-3);

		ctx.caller.send_message(output);
	}
}

export let command = HelpCommand;