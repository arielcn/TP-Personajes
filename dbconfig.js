import 'dotenv/config'

const config = {
    user    : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server  : process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options : {
        trustServerCertificate: true,
        trustedConnection: true,
        encrypt: true,
        useUTC: true,  
    },
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 60000
        }
}

export default config;