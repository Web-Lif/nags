import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core"
import { getSequelize } from '../utils/sequelize'

class NAGSSysUser extends Model<InferAttributes<NAGSSysUser>, InferCreationAttributes<NAGSSysUser>> {
    declare id: number
    declare nickname: string
    declare username: string
    declare sex: number
    declare password: string
    declare email: string
}

const sequelize = getSequelize()

NAGSSysUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: DataTypes.STRING,
    username: DataTypes.STRING,
    sex: DataTypes.INTEGER,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'nags_sys_user',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

  export default NAGSSysUser
