declare module "mongoose" {
    import Bluebird = require("bluebird");
    type Promise<T> = Bluebird<T>;
}

declare module '*.json' {
    const value: any;
    export default value;
}