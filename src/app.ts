import fastify from 'fastify'
import sensible from '@fastify/sensible'
import middlewares from './middleware/index'
import services from './service/index'

const app = fastify({
    logger: false
})

const startApp = async () => {
    try {
        middlewares.forEach(middleware => {
            middleware(app)
        })
        services.forEach(service => {
            service(app)
        })
        app.register(sensible)

        await app.listen({ port: 3000 })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

startApp()