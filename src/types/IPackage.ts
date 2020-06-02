interface IDependencies {
    [key: string]: any;
} 

export interface IPackage {
    dependencies: IDependencies
    devDependencies: IDependencies
}