const vscode = require('vscode')
module.exports = function getCommands(){
    vscode.commands.getCommands().then(allCommands=>{
        console.log('所有命令', allCommands);
    })
}