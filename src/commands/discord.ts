import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class discord implements Command {
    get_name() {
        return 'discord'
    }

    get_description() {
        return 'discord info'
    }

    get_usage() {
        return '{{prefix}}discord'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`Hello, you can join my discord at https://discord.gg/JWV4ftF`)
    }
}



export let command = discord;