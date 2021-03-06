import { existsSync } from "fs";

export const fileExist = (path: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            if (existsSync(path)) {
                resolve();
                return;
            }
            reject();
        } catch (err) {
            reject();
        }
    });
};