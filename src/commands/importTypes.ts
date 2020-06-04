import { join } from 'path';
import { window, workspace } from 'vscode';
import { packageFileToJson } from '../helpers/packageFileToJson';
import { IPackage } from '../types/IPackage';
import { fileExist } from '../utils/fileExist';
import { isPackageAlreadyInstall } from '../utils/isPackageAlreadyInstall';
import { isTypeExist } from '../utils/isTypeExist';

import { installDependencies } from './../helpers/installDependencies';

type provider = | "yarn" | "npm";

export const importTypes = async (provider: provider) => {

    const ROOT_PATH = workspace.rootPath;

    if (!ROOT_PATH) {
        window.showWarningMessage("Please open a project before using this command");
        return;
    }

    const PACKAGE_PATH = join(ROOT_PATH, "package.json");

    await fileExist(PACKAGE_PATH).catch(() => {
        window.showWarningMessage("No package.json file was found at the root of your project directory");
        return;
    });

    const PACKAGE: IPackage | void = await packageFileToJson(PACKAGE_PATH).catch(() => {
        window.showWarningMessage("Error when reading the package.json file");
        return;
    });

    // not sure is needed but typescript is complaining :(
    if (!PACKAGE) {
        window.showWarningMessage("Error when reading the package.json file");
        return;
    }

    if (PACKAGE.dependencies) {
        let allTypes: Array<string> = new Array();

        window.showInformationMessage("Looking for types to install in your package.json");

        let ALL_DEPENDENCIES = PACKAGE.devDependencies ? { ...PACKAGE.dependencies, ...PACKAGE.devDependencies } : PACKAGE.dependencies;

        for (let k in ALL_DEPENDENCIES) {
            const TYPE = `@types/${k}`;
            if (!isPackageAlreadyInstall(ALL_DEPENDENCIES, TYPE)) {
                if (await isTypeExist(k)) {
                    allTypes = [...allTypes, TYPE];
                }
            }
        }

        window.showInformationMessage(`Start installing dependencies with ${provider}`);
        try {
            provider === "npm" ?
                await installDependencies(allTypes, "npm -D install") :
                await installDependencies(allTypes, "yarn -D add");

        } catch (error) {
            window.showWarningMessage("Error when installing package");

        }
        window.showInformationMessage(`All types dependencies has been install`);

    }


};