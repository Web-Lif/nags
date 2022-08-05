import { FastifyInstance } from 'fastify'
import fastifyJWT from '@fastify/jwt'


const JWTMiddleware = async (app: FastifyInstance) => {
    app.register(fastifyJWT, {
        secret: 'supersecret',
        sign: {
            expiresIn: '1m'
        }
    })
    
    app.addHook('onRequest', async (request, reply) => {
        if (['/purview/signin', '/purview/signup'].includes(request.routerPath)) {
            return
        }
        if (/^\/docs.*/.test(request.routerPath)) {
            return
        }
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
}

export default JWTMiddleware