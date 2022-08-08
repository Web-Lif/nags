import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'


const SwaggerMiddleware = async (app: FastifyInstance) => {
    if (process.env.DEV === 'true') {
        await app.register(swagger, {
            routePrefix: '/docs',
            swagger: {
                info: {
                    title: 'API',
                    description: '接口文档信息',
                    version: '0.0.1'
                },
                securityDefinitions: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'apiKey',
                        in: 'header'
                    }
                },
                host: 'localhost:3000',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json']
            },
            hideUntagged: true,
            exposeRoute: true
        })
        app.addSchema({
            $id: 'Error',
            type: 'object',
            properties: {
                statusCode: {
                    type: 'string',
                    description: '状态码'
                },
                error: {
                    type: 'string',
                    description: '错误信息'
                },
                message: {
                    type: 'string',
                    description: '错误的详细信息'
                }
            }
        })
    }
}

export default SwaggerMiddleware