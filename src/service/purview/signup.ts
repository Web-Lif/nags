import { FastifyInstance } from 'fastify'
import { DiscordSnowflake } from '@sapphire/snowflake'
import sha512 from 'crypto-js/sha512'
import Base64 from 'crypto-js/enc-base64'

import { NAGSUserInfo } from './type'
import NAGSSysUser from '../../models/NAGSSysUser'

interface PurviewSignupParam {
    username: string
    password: string
    email: string
    sex?: number
}

const purviewSignupSchema = {
    schema: {
        description: '用户注册接口, 用来注册用户帐号信息',
        tags: ['purview'],
        summary: '用户注册帐号',
        body: {
            type: 'object',
            required: ['username', 'password', 'email'],
            properties: {
                username: { type: 'string', description: '帐号' },
                password: { type: 'string', description: '密码' },
                email: { type: 'string', description: '用户邮箱' },
                sex: { type: 'number', description: '性别 0 表示女生 1 表示男生' },
            },
            errorMessage: {
                required: {
                    username: '账户名称不能为空',
                    password: '密码不能为空',
                    email: '邮箱地址不能为空'
                }
            }
        },
        response: {
            200: {
                description: '执行成功',
                type: 'object',
                properties: {
                    data: {
                        type: 'string',
                        description: '返回令牌, 直接可使用此令牌进行登录'
                    }
                }
            },
            500: {
                $ref: 'Error#'
            }
        },
    }
}

const initApp = (app: FastifyInstance) => {
    app.post<{
        Body: PurviewSignupParam
    }>('/purview/signup', purviewSignupSchema, async (req, reply) => {
        const param = req.body

        const id = DiscordSnowflake.generate()
        
        const user = NAGSSysUser.build({
            id,
            nickname: param.username,
            username: param.username,
            password: Base64.stringify(sha512(param.password)),
            email: param.email,
            sex: 0
        });

        await user.save()
        const payload: NAGSUserInfo = {
            id: user.id.toString(36),
            nickname: user.nickname,
            username: user.username,
            email: user.email,
            sex: user.sex
        }
        const token = app.jwt.sign({
            payload,
        })
        reply.send({
            data: token
        })
    })
}

export default initApp