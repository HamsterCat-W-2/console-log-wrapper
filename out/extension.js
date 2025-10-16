"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    let disposable = vscode.commands.registerCommand("console-log-wrapper.wrap", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection);
            if (selectedText) {
                const fileName = path.basename(document.fileName);
                const lineNumber = selection.start.line + 1;
                const logMessage = `console.log('🚀 ~ ${fileName}, line ${lineNumber}, ${selectedText}', ${selectedText});`;
                const insertPosition = editor.selection.end;
                const endLine = document.lineAt(selection.end.line);
                const insertPos = endLine.range.end;
                editor.edit((editBuilder) => {
                    editBuilder.insert(insertPos, `\n${logMessage}`);
                });
            }
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map