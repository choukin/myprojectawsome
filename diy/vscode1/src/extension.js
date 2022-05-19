// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const hello = require('./demo1hello')
const getCommands = require('./demo2getallCommands')
const showtitle = require('./demo3title') 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * 插件激活时触发，插件代码入口
 * @param {vscode.ExtensionContext} context 插件上下文
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('🎉, 你的插件 "vscode1" 已激活!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	hello(context)

	getCommands();
	showtitle(context)
	
	const editorCommand = vscode.commands.registerTextEditorCommand('vscode1.testEditorCommand', (textEditor,edit)=>{
		console.log('您正在执行编辑器命令')
		console.log(textEditor, edit);
	})
	context.subscriptions.push(editorCommand)
}

// 释放插件
function deactivate() {
	console.log('您的插件已被释放');
}

module.exports = {
	activate,
	deactivate
}
