import { Command, CommandContext, DiscordCommandCaller } from "../bot/command";
import { fstat, readdirSync } from "fs";

class ReloadCommand implements Command {
	get_name() {
		return 'reload'
	}

	get_description() {
		return 'null'
	}
	
	get_usage() {
		return '{{prefix}}reload'
	}

	run(ctx: CommandContext) {
		if(ctx.caller.get_name() == ctx.bot.get_config().owner_name) {
			if(ctx.source == 'Discord' && (<DiscordCommandCaller>ctx.caller).get_discriminator() != ctx.bot.get_config().owner_discriminator)
				return;
			
			let cmds = new Map<string, Command>()
			readdirSync(`${__dirname}`).forEach((cmd_file) => {
				delete require.cache[require.resolve(`${__dirname}/${cmd_file}`)];

				let command_module = require(`${__dirname}/${cmd_file}`);
				let command:Command = new command_module.command();
				cmds.set(command.get_name(), command);
			});

			ctx.bot.set_commands(cmds);
		}
	}
}

export let command = ReloadCommand;