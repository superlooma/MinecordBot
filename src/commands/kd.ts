import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class kd implements Command {
    get_name() {
        return 'kd'
    }

    get_description() {
        return 'Shows the K/D of a player'
    }

    get_usage() {
        return '{{prefix}}kd'
    }

    run(ctx: CommandContext) {
       get(`https://api.2b2t.dev/stats?username=${ctx.arguments[0]}`).then((response) => {
        let user_data: any = JSON.parse(response)[0];
           if(user_data == undefined) {
               ctx.caller.send_message(`Player ${ctx.arguments[0]} could not be found.`);
           }
           else ctx.caller.send_message(`K/D of ${ctx.arguments[0]}:\nkills: ${user_data.kills}\ndeaths: ${user_data.deaths}`);
       });
    }
}

export let command = kd;