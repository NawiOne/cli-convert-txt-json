import { Command } from 'commander';
import handler from './lib/handler.mjs';

const program = new Command();

program.command('cvt')
    .usage('convert file to txt | json')
    .argument('<directory>', 'file directory')
    .option('-t, --type <type>', 'new format file', 'text')
    .option('-o, --option <newdirectory>', 'new file directory (optional)')
    .action(handler)


program.parse(process.args);