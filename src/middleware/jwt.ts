import { FastifyInstance } from 'fastify'
import fastifyJWT from '@fastify/jwt'


const JWTMiddleware = async (app: FastifyInstance) => {
    app.register(fastifyJWT, {
        secret: 'supersecret',
        sign: {
            expiresIn: '10s'
        }
    })
    
    app.addHook('onRequest', async (request, reply) => {
        if ([
            '/api/purview/signin',
            '/api/purview/signup'
        ].includes(request.routerPath)) {
            return
        }

        if (process.env.DEV === 'true') {
            if (/^\/docs.*/.test(request.routerPath)) {
                return
            }
        }

        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
}

export default JWTMiddleware