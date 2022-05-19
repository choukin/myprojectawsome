const vscode = require('vscode');
module.exports =  function hello(context){
    	// 定义命令
	let disposable = vscode.commands.registerCommand('vscode1.helloWorld', function () {
		// 展示消息框
		vscode.window.showInformationMessage(`你好我的插件 from vscode1!`);
	});

	//注册命令 
	context.subscriptions.push(disposable);

	let cureentFilePath = vscode.commands.registerCommand('vscode1.getCurrentFilePath', function (uri){
		// 可选参数uri 编辑器右键菜单执行 就是当前打开的文件夹路径， command + shift + p 执行 为空
		console.log(uri);
		vscode.window.showInformationMessage(`你好我的插件 from vscode1!当前路径是： ${uri?uri.path:'空'}`);
	})
	context.subscriptions.push(cureentFilePath)
}