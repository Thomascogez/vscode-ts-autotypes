import { IPackage } from "../types/IPackage";

export const isPackageAlreadyInstall = (packageObject: Object, pck: string): boolean => {

    return packageObject.hasOwnProperty(pck);
};