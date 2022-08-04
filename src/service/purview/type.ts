/** 用户信息 */
export interface NAGSUserInfo {
    /** 唯一用户ID */
    id: number
    /** 昵称 */
    nickname: string
    /** 用户名 */
    username: string
    /** 用户邮箱信息 */
    email: string
    /** 性别 0 表示女生, 1 表示男生 */
    sex?: number
}