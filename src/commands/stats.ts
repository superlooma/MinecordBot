import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class Stats implements Command {
    get_name() {
        return 'stats'
    }

    get_description() {
        return 'Shows the stats of a player'
    }

    get_usage() {
        return '{{prefix}}stats'
    }

    run(ctx: CommandContext) {
       get(`https://api.2b2t.dev/stats?username=${ctx.arguments[0]}`).then((response) => {
        //    console.log(response);
           let user_data: any = JSON.parse(response)[0];
           if(user_data == undefined) {
               ctx.caller.send_message(`Player ${ctx.arguments[0]} could not be found.`);
           }
           else ctx.caller.send_message(`Stats for ${ctx.arguments[0]}:\nkills: ${user_data.kills}\ndeaths: ${user_data.deaths}\njoins: ${user_data.joins}\nleaves: ${user_data.leaves}`);
       });
    }
}

export let command = Stats;