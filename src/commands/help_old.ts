import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class help implements Command {
    get_name() {
        return 'help'
    }

    get_description() {
        return 'shows the help menu'
    }

    get_usage() {
        return '{{prefix}}help'
    }

    run(ctx: CommandContext) {
        ctx.caller.send_message(`+discord\n +ez\n +help\n +invite\n +kd\n +lastdeath\n +lastkill\n +ping\n +prio\n +seen\n +stats`)
    }
}



export let command = help;