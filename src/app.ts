import fastify from 'fastify'
import sensible from '@fastify/sensible'
import ajvErrors from 'ajv-errors'

import middlewares from './middleware/index'
import services from './service/index'


const app = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        }
    },
    ajv: {
        customOptions: {
            allErrors: true
        },
        plugins: [ajvErrors]
    }
})

const startApp = async () => {
    try {
        const promises: Promise<void>[] = []
        middlewares.forEach(middleware => {
            promises.push(middleware(app))
        })
        await Promise.all(promises)

        services.forEach(service => {
            service(app)
        })
        app.register(sensible)
        app.setErrorHandler((error, request, reply) => {
            if (error.validation) {
                reply.badRequest(error.validation?.[0].message)
                return
            } 
            reply.status(400).send(error)
          })
        await app.listen({ port: 3000 })

    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

startApp()