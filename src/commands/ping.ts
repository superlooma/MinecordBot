import { Command, CommandContext } from "../bot/command";

class PingCommand implements Command {
    getName() {
        return 'ping'
    }

    getDescription() {
        return 'gets the ping of the bot'
    }

    getUsage() {
        return '{{prefix}} ping'
    }

    run(ctx: CommandContext) {
        ctx.caller.sendMessage(`The current ${ctx.source == 'Discord' ? 'discord' : 'minecraft'} ping is ${ctx.source == 'Discord' ? ctx.bot.discord.ws.ping : ctx.bot.minecraft.latency}`);
    }
}

export let command = PingCommand;