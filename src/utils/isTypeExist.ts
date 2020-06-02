import { exec } from 'child_process';

export const isTypeExist = (pck: string): Promise<boolean> => {
    return new Promise((resolve, _) => {
        exec(`npm view @types/${pck}`, (err) => {
            if(err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
    
};