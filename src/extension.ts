import * as vscode from 'vscode';
import { importTypes } from './commands/importTypes';


export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('ts-autotypes.importTypesNpm',  () => importTypes("npm")));
	context.subscriptions.push(vscode.commands.registerCommand('ts-autotypes.importTypesYarn', () => importTypes("yarn")));
}

export function deactivate() {}
