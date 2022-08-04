import { Sequelize } from '@sequelize/core'

let sequelize: Sequelize | null = null

export const getSequelize = (): Sequelize => {
    if (sequelize === null) {
        sequelize = new Sequelize({
            host: 'localhost',
            database: 'nags',
            username: 'root',
            password: 'abcd123456789',
            dialect: 'mysql',
            pool: {
                max: 100,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        })
    }
    return sequelize
}