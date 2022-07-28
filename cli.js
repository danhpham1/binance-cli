#!/usr/bin/env node
import {Command} from 'commander';
const program = new Command();
import chalk from 'chalk';
import * as binance from './binance.js';
import Table from "cli-table";


program
    .name("Binance CLI")
    .description("CLI for integrate binance")
    .version("0.0.1")


program
    .command("split")
    .description('Split a string into substrings and display as an array')
    .argument('<string>','string to split')
    .option('-s, --separator <char>','separator character', ',')
    .option('--first', 'display just the first substring')
    .action((str, options) => {
        console.log(options.separator)
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator,limit));
    })

program
    .command("price")
    .description("Get price of coin")
    .argument('<string>','coins')
    .option("--full", "Get full price of coin", 'full')
    .option("--symbol <string>", "Get price of coin ENSUSDT", '')
    .option("--symbols <string>", "Get price of coins with sybols exp:ENSUSDT,BTCUSDT", '')
    .action(async (data, options) => {
        if(data !== 'coins'){
            console.log(chalk.red("Error: Argument must be 'coins'"))
            return;
        }
        if(options.symbol){
            const data = await binance.getTickets(options);
            let table = new Table({
                head: [chalk.yellow('Symbol'), chalk.blue('Price')],
                colWidths: [50, 50]
            });
            table.push([`${chalk.yellow(data.symbol)}`,`${chalk.blue(parseFloat(data.price).toFixed(9))}${chalk.red('$')}`]);
            console.log(table.toString());
            return;
        }
        if(options.symbols){
            const data = await binance.getTickets(options);
            let table = new Table({
                head: [chalk.yellow('Symbol'), chalk.blue('Price')],
                colWidths: [50, 50]
            });
            data.map(el => {
                table.push([`${chalk.yellow(el.symbol)}`,`${chalk.blue(parseFloat(el.price).toFixed(9))}${chalk.red('$')}`]);
            });
            console.log(table.toString());
            return;
        }
        if(options.full) {
            const data = await binance.getTickets(options);
            let table = new Table({
                head: [chalk.yellow('Symbol'), chalk.blue('Price')],
                colWidths: [50, 50]
            });
            data.slice(0,30).map(el => {
                table.push([`${chalk.yellow(el.symbol)}`,`${chalk.blue(parseFloat(el.price).toFixed(9))}${chalk.red('$')}`]);
            });
            console.log(table.toString());
            return;
        }
    })

program.parse();