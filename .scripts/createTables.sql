create table if not exists `nags_sys_user` (
    id bigint primary key,
    nickname varchar(20) comment '昵称',
    username varchar(20) comment '用户名称',
    sex int comment '性别',
    password varchar(512) comment '密码',
    email varchar(50) comment '邮箱',
    created_at datetime comment '创建时间',
    updated_at datetime comment '更新时间'
) comment = "人员信息表" default charset=utf8;
