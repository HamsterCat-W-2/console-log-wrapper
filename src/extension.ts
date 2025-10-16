import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "console-log-wrapper.wrap",
    () => {
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
            editBuilder.insert(insertPos, 
              `\n${logMessage}`
            );
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
