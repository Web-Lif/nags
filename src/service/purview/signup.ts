import { FastifyInstance } from 'fastify'
import { NAGSUserInfo } from './type'
import NAGSSysUser from '../../models/NAGSSysUser'

interface PurviewSignupParam {
    username: string
    password: string
}

const purviewSignupSchema = {
    schema: {
        description: '用户登录接口, 通过用户名和密码进行登录',
        tags: ['purview'],
        summary: '用户登录',
        body: {
            type: 'object',
            properties: {
                username: { type: 'string', description: '帐号' },
                password: { type: 'string', description: '密码' }
            }
        },
        response: {
            200: {
                description: '执行成功',
                type: 'object',
                properties: {
                    data: {
                        type: 'string',
                        description: 'JWT 生成的令牌信息'
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
        if (!param?.username && !param?.password) {
            reply.internalServerError('帐号和密码不能为空.')
            return
        }
        const data = await NAGSSysUser.findOne({
            where: {
                username: param.username,
                password: param.password
            }
        })
        if (data === null) {
            reply.internalServerError('帐号或密码不正确, 请重新检查帐号密码大小写.')
            return
        }
        const payload: NAGSUserInfo = {
            id: data.id,
            nickname: data.nickname,
            username: data.username,
            email: data.email,
            sex: data.sex
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