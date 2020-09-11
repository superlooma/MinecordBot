import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class hehe implements Command {
    get_name() {
        return 'hehe'
    }

    get_description() {
        return 'hehe'
    }

    get_usage() {
        return '{{prefix}}hehe'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`hehe hehe hehe hehe hehe hehe hehe hehe ${ctx.arguments.join(' ')}`)
    }
}



export let command = hehe;