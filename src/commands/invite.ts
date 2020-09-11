import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class invite implements Command {
    get_name() {
        return 'invite'
    }

    get_description() {
        return 'invite bot to your server!'
    }

    get_usage() {
        return '{{prefix}}invite'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`Add my bot to your server! https://discordapp.com/oauth2/authorize?client_id=733211192964808755&scope=bot&permissions=19456`)
    }
}



export let command = invite;