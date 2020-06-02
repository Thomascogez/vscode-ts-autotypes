import { readFileSync } from 'fs';
import { IPackage } from '../types/IPackage';

export const packageFileToJson = (path: string): Promise<IPackage> => {
    return new Promise((resolve, reject) => {
        const FILE = readFileSync(path);
        try {
            const OBJECT = JSON.parse(FILE.toString());
            resolve(OBJECT);
        } catch (error) {
            reject();
        }
    });
    
}; 