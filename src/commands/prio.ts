import { Command, CommandContext } from "../bot/command";
import { get } from "../bot/util";

class PriorityQueue implements Command {
    get_name() {
        return 'prio'
    }

    get_description() {
        return 'Shows how many players are in Priority Queue'
    }

    get_usage() {
        return '{{prefix}}prio'
    }

    run(ctx: CommandContext) {
       get('https://api.2b2t.dev/prioq').then((response) => {
        ctx.caller.send_message(`People in Priority Queue: ${JSON.parse(response)[1]}`) 
       });
    }
}

export let command = PriorityQueue;