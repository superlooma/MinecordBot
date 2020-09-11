import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class LastDeath implements Command {
    get_name() {
        return 'lastdeath'
    }

    get_description() {
        return 'Shows when a player last died'
    }

    get_usage() {
        return '{{prefix}}lastdeath'
    }

    run(ctx: CommandContext) {
       get(`https://api.2b2t.dev/stats?lastdeath=${ctx.arguments[0]}`).then((response) => {
        ctx.caller.send_message(`${JSON.parse(response)[0]}`) 
       });
    }
}

export let command = LastDeath;