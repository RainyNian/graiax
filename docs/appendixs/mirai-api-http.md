---
id: mirai-api-http
title: 手动配置mirai-api-http
sidebar-title: 手动配置 mah
---

## 准备工作

首先，我们构建这样一个目录结构：

```bash
mirai-2.0/
├── libs
├── plugins
├── run.sh # 如果是 Linux 则需要有这个
└── run.bat # 如果是 Windows 则需要有这个
```

`run.sh` 的内容( `Windows` 系统忽略)：

```bash
#!/usr/bin/env bash

libs="./libs/*"
class="net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader"

java -cp "${libs}" "${class}"
```

`run.bat` 的内容( `Linux` 系统忽略)：

```bat
@echo off

set "LIBS=./libs/*"
set "CLASS=net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader"

java -cp "%LIBS%" "%CLASS%"
pause
```

其中, `class` 这一变量的值在部分版本的 `mirai` 中会发生变化，具体判断方式看这

## 下载

首先，我们打开 [这个网址](https://dl.bintray.com/him188moe/mirai/net/mamoe/) ([网址来源于此](https://github.com/mamoe/mirai-console/blob/master/docs/Run.md#%E4%BB%8E-jcenter-%E4%B8%8B%E8%BD%BD%E6%A8%A1%E5%9D%97)) 里面有一堆乱七八糟的超链接，而我们只需要以下四个超链接：

- [`mirai-console`](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console/)
- [`mirai-console-terminal`](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console-terminal/)
- [`mirai-core-all`](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-core-all/)
- [`mirai-api-http`](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-api-http/)

每个超链接中都有一个 `maven-metadata.xml` 文件的下载链接，这个文件中保存着最新的 `mirai` 版本号其大概结构是：

```xml
<?xml version="...", encoding="..."?>
<metadata>
    ...
    <versioning>
        <latest>2.2.0</latest> // 这是最新版本的版本号所在位置
        ...
        <versions>
            ...
        </versions>
    </versioning>
</metadata>
```

假如在下载 `mirai-console` 时候得到的版本号为 `2.2.0`

那么, `mirai-console`/`mirai-console-terminal`/`mirai-core-all` 应该是：↓

[https://dl.bintray.com/him188moe/mirai/net/mamoe/**mirai-console**/**2.2.0**/**mirai-console-2.2.0-all.jar**](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console/2.2.0/mirai-console-2.2.0-all.jar)

[https://dl.bintray.com/him188moe/mirai/net/mamoe/**mirai-console-terminal**/**2.2.0**/**mirai-console-terminal-2.2.0-all.jar**](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console-terminal/2.2.0/mirai-console-terminal-2.2.0-all.jar)

[https://dl.bintray.com/him188moe/mirai/net/mamoe/**mirai-core-all**/**2.2.0**/**mirai-core-all-2.2.0-all.jar**](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-core-all/2.2.0/mirai-core-all-2.2.0-all.jar)

`sha1` 校验文件则是：

[https://dl.bintray.com/him188moe/mirai/net/mamoe/**mirai-console**/**2.2.0**/**mirai-console-2.2.0-all.jar.sha1**](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console/2.2.0/mirai-console-2.2.0-all.jar.sha1)

`mirai-http-api` 则应该是：

[https://dl.bintray.com/him188moe/mirai/net/mamoe/**mirai-api-http**/**1.9.7**/**mirai-api-http-1.9.7.mirai**.jar](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-api-http/1.9.7/mirai-api-http-1.9.7.mirai.jar)

`sha1` 校验文件则是：

[https://dl.bintray.com/him188moe/mirai/net/mamoe/**mirai-api-http**/**1.9.7**/**mirai-api-http-1.9.7.mirai.jar.sha1**](https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-api-http/1.9.7/mirai-api-http-1.9.7.mirai.jar.sha1)

依次下载四个文件之后按以下目录结构放置：

```bash
mirai-2.0/
├── libs
│   ├── mirai-console-2.2.2-all.jar # mirai 后端
│   ├── mirai-console-terminal-2.2.2-all.jar # mirai 前端
│   └── mirai-core-all-2.2.2-all.jar # mirai 协议实现
├── plugins
│   ├── mirai-api-http-1.9.7.mirai.jar # mirai-http-api 简称 mah
│   └── # 强制使用滑块验证插件, 非必须
└── run.sh # 启动脚本，如果你是 Windows 则应该是 run.bat
```

接下来先运行 `run` 让它生成一系列文件和目录：

```bash
2021-02-16 10:59:37 I/main: Starting mirai-console...
2021-02-16 10:59:37 I/main: Backend: version 2.4.0, built on 2021-02-14 21:51:02.
2021-02-16 10:59:37 I/main: Frontend Terminal: version 2.4.0, provided by Mamoe Technologies
2021-02-16 10:59:37 I/plugin: Successfully loaded plugin net.mamoe.mirai-api-http
2021-02-16 10:59:37 I/main: Prepared built-in commands: autoLogin, help, login, permission, status, stop
2021-02-16 10:59:37 W/net.mamoe.mirai-api-http: USING INITIAL KEY, please edit the key
2021-02-16 10:59:37 I/net.mamoe.mirai-api-http: Starting Mirai HTTP Server in 0.0.0.0:8080
2021-02-16 10:59:37 I/Mirai HTTP API: Http api server is running with authKey: INITKEYUMaPT7Zs
2021-02-16 10:59:37 I/net.mamoe.mirai-api-http: 心跳模块启用状态: false
2021-02-16 10:59:37 I/net.mamoe.mirai-api-http: 上报模块启用状态: false
2021-02-16 10:59:37 I/main: 1 plugin(s) enabled.
2021-02-16 10:59:37 I/main: mirai-console started successfully.
> stop # 输入 stop 结束 mirai 我们先不急着登录
```

此时，目录的大概结构应该是：

```bash
mirai-2.0/
├── config
│   ├── Console
│   │   ├── AutoLogin.yml # 自动登录配置
│   │   ├── Command.yml # 设置指令前缀
│   │   ├── ExtensionSelector.yml
│   │   ├── Logger.yml # 日志配置
│   │   └── PermissionService.yml
│   └── net.mamoe.mirai-api-http
│       └── setting.yml # mah 的配置
├── data
│   └── net.mamoe.mirai-api-http
│       ├── images
│       └── voices
├── libs
│   ├── mirai-console-2.2.2-all.jar
│   ├── mirai-console-terminal-2.2.2-all.jar
│   └── mirai-core-all-2.2.2-all.jar
├── plugins
│   ├── mirai-api-http-1.9.7.mirai.jar # mirai-http-api 简称 mah
│   └── # 强制使用滑块验证插件, 非必须
└── run.sh # 启动脚本，如果你是 Windows 则应该是 run.bat
```

这里我们只要配置 `mah` 就可以了，把 `mah` 中的 `enableWebsocket: false` 修改成 `true` 即可，如果有需要，也可以适当修改 `cacheSize: 4096` 它决定了缓存大小。最后把 `authKey` 项的值记录下来，在使用 `graia` 时有用。

做完这些之后就可以重新运行 `run` 启动 `mirai` 了。

```bash
2021-02-16 12:12:17 I/main: Starting mirai-console...
2021-02-16 12:12:17 I/main: Backend: version 2.4.0, built on 2021-02-14 21:51:02.
2021-02-16 12:12:17 I/main: Frontend Terminal: version 2.4.0, provided by Mamoe Technologies
2021-02-16 12:12:17 I/plugin: Successfully loaded plugin net.mamoe.mirai-api-http
2021-02-16 12:12:17 I/main: Prepared built-in commands: autoLogin, help, login, permission, status, stop
2021-02-16 12:12:17 W/net.mamoe.mirai-api-http: USING INITIAL KEY, please edit the key
2021-02-16 12:12:17 I/net.mamoe.mirai-api-http: Starting Mirai HTTP Server in 0.0.0.0:8080 # mah 的 端口 与 ip
2021-02-16 12:12:17 I/Mirai HTTP API: Http api server is running with authKey: INITKEYUMaPT7Zs # 这里也有 mah 的 authKey
2021-02-16 12:12:17 I/net.mamoe.mirai-api-http: 心跳模块启用状态: false
2021-02-16 12:12:17 I/net.mamoe.mirai-api-http: 上报模块启用状态: false
2021-02-16 12:12:17 I/main: 1 plugin(s) enabled.
2021-02-16 12:12:17 I/main: mirai-console started successfully.
> ? # 输入英文问号以查看帮助
◆ /autoLogin add <account> <password> [passwordKind]    # 添加自动登录
  /autoLogin clear    # 清除所有配置
  /autoLogin list    # 查看自动登录账号列表
  /autoLogin remove <account>    # 删除一个账号
  /autoLogin removeConfig <account> <configKey>    # 删除一个账号的一个配置项
  /autoLogin setConfig <account> <configKey> <value>    # 设置一个账号的一个配置项
◆ /help     # 查看指令帮助
◆ /login <qq> <password> [protocol]    # 登录一个账号
◆ /permission cancel <被许可人 ID> <权限 ID>    # 撤销一个权限
  /permission deny <被许可人 ID> <权限 ID>    # 撤销一个权限
  /permission remove <被许可人 ID> <权限 ID>    # 撤销一个权限
  /permission cancelAll <被许可人 ID> <权限 ID>    # 撤销一个权限及其所有子权限
  /permission denyAll <被许可人 ID> <权限 ID>    # 撤销一个权限及其所有子权限
  /permission removeAll <被许可人 ID> <权限 ID>    # 撤销一个权限及其所有子权限
  /permission listPermissions    # 查看所有权限列表
  /permission lp    # 查看所有权限列表
  /permission permit <被许可人 ID> <权限 ID>    # 授权一个权限
  /permission grant <被许可人 ID> <权限 ID>    # 授权一个权限
  /permission add <被许可人 ID> <权限 ID>    # 授权一个权限
  /permission permittedPermissions <被许可人 ID> [包括重复]    # 查看被授权权限列表
  /permission pp <被许可人 ID> [包括重复]    # 查看被授权权限列表
  /permission grantedPermissions <被许可人 ID> [包括重复]    # 查看被授权权限列表
  /permission gp <被许可人 ID> [包括重复]    # 查看被授权权限列表
◆ /status     # 获取 Mirai Console 运行状态
◆ /stop     # 关闭 Mirai Console
> login qq账号 qq密码 # 登录 qq
```

## 特别说明

![登录验证](/img/Snipaste_2021-02-16_12-17-40.png) → 需要点击图上的 **设备锁验证** 字样
