import { exec } from 'child_process';
import { workspace } from 'vscode';
export const installDependencies = (dependencies: Array<string>, command: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        exec(`${command} ${dependencies.join(" ")}`, {cwd: workspace.rootPath},(err) => {
            if(err) {reject();}
            resolve();
        });
    });
};