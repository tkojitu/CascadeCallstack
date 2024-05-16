const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand(
		'cascadecallstack.cascade',
		function () {
			let cascade = function(n) {
				let buf = "";
				for (let i = 0; i < n; ++i) {
					buf += "|- ";
				}
				return buf;
			};
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			const txt = editor.document.getText(editor.selection);
			let lines = txt.split("\n").reverse();
			for (let i = 0; i < lines.length; ++i) {
				lines[i] = lines[i].replace(/\(.*/, "");
			}
			for (let i = 2; i < lines.length; ++i) {
				lines[i] = cascade(i - 1) + lines[i];
			}
			editor.edit(editBuilder => {
				editBuilder.replace(editor.selection, lines.join(""));
			});
		});
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
