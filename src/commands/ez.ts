import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class ez implements Command {
    get_name() {
        return 'ez'
    }

    get_description() {
        return 'sends an ez message to a directed player'
    }

    get_usage() {
        return '{{prefix}}ez'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`EEZZZ ${ctx.arguments.join(' ')}`)
    }
}



export let command = ez;