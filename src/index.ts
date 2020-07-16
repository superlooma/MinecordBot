import {Bot} from './bot/bot';
import {readFileSync, readdirSync} from 'fs';
import { read_file_sync_safe } from './bot/util';
import { Config } from './bot/config';

let config: Config = JSON.parse(read_file_sync_safe('./config.json'));

let bot_instance = new Bot(config);

// Load in all commands
readdirSync(`${__dirname}/commands`).forEach((cmd_file) => {
    let cmd = require(`${__dirname}/commands/${cmd_file}`);
    bot_instance.add_command(new cmd.command());
});