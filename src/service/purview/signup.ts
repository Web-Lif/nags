import { FastifyInstance } from 'fastify'
import { NAGSUserInfo } from './type'
import NAGSSysUser from '../../models/NAGSSysUser'

interface PurviewSignupParam {
    username: string
    password: string
}

const initApp = (app: FastifyInstance) => {
    app.post<{
        Body: PurviewSignupParam
    }>('/purview/signup', async (req, reply) => {
        const param = req.body
        if (!param?.username && !param?.password) {
            reply.internalServerError('帐号/密码不能为空.')
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
        reply.send({ token })
    })
}

export default initApp