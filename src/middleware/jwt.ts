import { FastifyInstance } from 'fastify'
import fastifyJWT from '@fastify/jwt'


const JWTMiddleware = (app: FastifyInstance) => {
    app.register(fastifyJWT, {
        secret: 'supersecret',
        sign: {
            expiresIn: '1m'
        }
    })
    
    app.addHook('onRequest', async (request, reply) => {
        if (['/purview/signup'].includes(request.routerPath)) {
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