module.exports = {
    // Insira aqui seus dados do banco NA NUVEM AZURE
    production: {
        // altere APENAS username, password, database e host.
        username: 'bandtec',
        password: '#Gfgrupo4',
        database: '211-1a-grupo4',
        host: '2111agrupo4.database.windows.net',
        dialect: 'mssql',
        xuse_env_variable: 'DATABASE_URL',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 5000,
            idle: 30000,
            connectTimeout: 5000
        }
    },

    // Insira aqui seus dados do banco LOCAL - MySQL Workbench
    dev: {
        // altere APENAS username, 
        username: 'ferbgam',
        password: 'urubu100',
        database: 'relax',
        host: '127.0.0.1',
        dialect: 'mysql',
        xuse_env_variable: 'DATABASE_URL',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 5000,
            idle: 30000,
            connectTimeout: 5000
        }
    },
};