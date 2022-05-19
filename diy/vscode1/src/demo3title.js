const vscode = require('vscode');

module.exports = function (content){
    const showTitleMenu = vscode.commands.registerCommand('vscode1.showTitleMenu',()=>{
        vscode.window.showInformationMessage('你出发了菜单')
    })
    content.subscriptions.push(showTitleMenu)
}