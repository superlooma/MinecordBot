import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class sumu implements Command {
    get_name() {
        return 'sumu'
    }

    get_description() {
        return 'sumu'
    }

    get_usage() {
        return '{{prefix}}sumu'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`fuck you ${ctx.arguments.join(' ')}`)
    }
}



export let command = sumu;