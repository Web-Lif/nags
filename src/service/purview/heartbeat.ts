import { FastifyInstance } from "fastify";

const purviewHeartbeatSchema = {
    schema: {
        description: 'jwt 的心跳信息, 可以用来保持令牌的更新',
        tags: ['purview'],
        summary: '心跳',
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
    app.get('/purview/heartbeat', purviewHeartbeatSchema, async (req, reply) => {
        const jwt: any = await req.jwtVerify()
        const token = app.jwt.sign({
            payload: jwt.payload
        })
        reply.send({
            data: token
        })
    })
}

export default initApp