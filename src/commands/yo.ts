import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class yo implements Command {
    get_name() {
        return 'yo'
    }

    get_description() {
        return 'yo'
    }

    get_usage() {
        return '{{prefix}}yo'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`yo yo yo wyd sup ${ctx.arguments.join(' ')}`)
    }
}



export let command = yo;