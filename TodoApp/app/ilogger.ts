
//https://www.npmjs.com/package/chalk

const chalk = require('chalk');  
 

function _randomValue() { 
    return Math.floor(Math.random() * 255) + 1 
}
 
const messageColor = chalk.rgb(_randomValue(), _randomValue(), _randomValue())
const TagColor = messageColor.bold //.underline
 

export class ILogger {
    
    public static log(tag :String, message :any) { 
        console.log(TagColor(process.title + '.' + tag + " => "), messageColor(message))
    }

    public static error(tag :String, message :any) { 
        console.log(chalk.red.bold(process.title + '.' + tag + " => "), chalk.red(message)) 
    }

} 