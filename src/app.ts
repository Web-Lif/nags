import fastify from 'fastify'
import sensible from '@fastify/sensible'
import ajvErrors from 'ajv-errors'

import middlewares from './middleware/index'
import services from './service/index'

const isDev = process.env.DEV === 'true'

const app = fastify({
    logger: isDev ? {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        }
    } : true,
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

        
        app.register((prefixApp, _, done) => {
            services.forEach(service => {
                service(prefixApp)
            })
            done()
        }, { prefix: '/api' })

        app.register(sensible)
        app.setErrorHandler((error, request, reply) => {
            if (error.validation) {
                reply.badRequest(error.validation?.[0].message)
                return
            } 
            reply.status(error.statusCode || 400).send(error)
          })
        await app.listen({ port: 3000 })

    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

startApp()