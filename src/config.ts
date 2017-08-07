// import 'process';

// [
//     'NODE_ENV',
//     'PORT',
// ].forEach((name) => {
//     if (!process.env[name]) {
//         throw new Error(`Environment variable ${name} is missing`);
//     } else {
//         console.log(`${name} = ${process.env[name]}`);
//     }
// });

// export const config = {
//     env: process.env.NODE_ENV,
//     logger: {
//         level: process.env.LOG_LEVEL || 'info',
//         enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false,
//     },
//     server: {
//         port: Number(process.env.PORT),
//     },
// }

import * as environment from '../.config/environment.json';

[
    'NODE_ENV',
    'PORT',
].forEach((name) => {
    if (!environment[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    } else {
        // console.log(`${name} = ${environment[name]}`);
    }
});

export const config = {
    env: environment['NODE_ENV'],
    logger: {
        level: environment['LOG_LEVEL'] || 'info',
        enabled: environment['BOOLEAN'] ? environment['BOOLEAN'].toLowerCase() === 'true' : false,
    },
    server: {
        port: environment['PORT'] ? Number(environment['PORT']) : 3000,
    },
    secret: environment['SECRET'] ? environment['SECRET'] : 'test',
}


