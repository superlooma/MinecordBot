import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class Seen implements Command {
    get_name() {
        return 'Seen'
    }

    get_description() {
        return 'Shows when the player was last seen'
    }

    get_usage() {
        return '{{prefix}}seen'
    }

    run(ctx: CommandContext) {
       get(`https://api.2b2t.dev/seen?username=${ctx.arguments[0]}`).then((response) => {
           let time = new Date(JSON.parse(response)[0].seen);
        ctx.caller.send_message(`${ctx.arguments[0]} was last seen on ${time.toDateString()} at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`) 
       });
    }
}

export let command = Seen;