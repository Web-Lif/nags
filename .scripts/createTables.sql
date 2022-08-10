create table if not exists `nags_sys_user` (
    id bigint primary key,
    nickname varchar(20) comment '昵称',
    username varchar(20) comment '用户名称',
    sex tinyint comment '性别',
    password varchar(512) comment '密码',
    email varchar(100) comment '邮箱',
    created_at datetime comment '创建时间',
    updated_at datetime comment '更新时间'
) comment = "人员信息表" default charset=utf8;

create table if not exists `nags_sys_role` (
    id bigint primary key,
    name varchar(20) comment '角色名称',
    created_at datetime comment '创建时间',
    updated_at datetime comment '更新时间'
) comment = "角色信息表" default charset=utf8;

create table if not exists `nags_link_user_role` {
    id bigint primary key,
    u_id bigint comment '用户',
    r_id bigint comment '角色',
    created_at datetime comment '创建时间',
    updated_at datetime comment '更新时间'
} comment = "人员与角色关联表" default charset=utf8;

create table if not exists 'nags_sys_menu' (
    id bigint primary key,
    name varchar(20) comment '菜单名称',
    path varchar(100) comment '菜单路径',
    icon varchar(100) comment '菜单图标',
    parent bigint comment '父节点',
    created_at datetime comment '创建时间',
    updated_at datetime comment '更新时间'
) comment = "系统菜单表" default charset=utf8;

create table if not exists `nags_link_role_menu` {
    id bigint primary key,
    r_id bigint comment '用户',
    m_id bigint comment '角色',
    created_at datetime comment '创建时间',
    updated_at datetime comment '更新时间'
} comment = "角色与菜单关联表" default charset=utf8;