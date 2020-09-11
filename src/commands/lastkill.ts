import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class lastkill implements Command {
    get_name() {
        return 'lastkill'
    }

    get_description() {
        return 'Shows when a player last got a kill'
    }

    get_usage() {
        return '{{prefix}}lastkill'
    }

    run(ctx: CommandContext) {
       get(`https://api.2b2t.dev/stats?lastkill=${ctx.arguments[0]}`).then((response) => {
        ctx.caller.send_message(`${JSON.parse(response)[1]}`) 
       });
    }
}

export let command = lastkill;