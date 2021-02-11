---
id: installation
title: 安装并配置开发环境
sidebar_label: 安装并配置开发环境
slug: /
---

# 安装

要想使用 Graia, 首先肯定得配置环境. 这里给出三种配置方法

1. [手动配置](#手动配置)
2. [使用 GraiaOK]("#使用 GraiaOK")
3. [使用 Graia CLI]("#使用 Graia CLI")


## 手动配置

### Mirai-Console-loder安装
在这里我们使用iTXTech MCL Installer来一键安装所有所需环境。

打开[Mirai Console Loader](https://github.com/iTXTech/mcl-installer)的Github仓库

下载Releases中的mcl-installer-x.x.x-windows-amd64.exe

将其复制到 到想要安装 `iTXTech MCL` 的目录中执行。

**如果您是新手，且没有特殊需求，一路回车就能进行安装了。**

> ```
> Java version (8-15, default: 11): 选择Java版本安装，默认为Java 11
> JRE or JDK (1: JRE, 2: JDK, default: JRE): 选择JRE还是JDK安装，默认为JRE
> Binary Architecture (default: x64): 选择架构安装，默认x64
> 如果操作系统为Windows并且需要使用 mirai-native，请选择 x32（而不是i386等其他名字）
> 
> The latest stable version of iTXTech MCL is x.x.x 获取最新MCL并询问是否下载
> Would you like to download it? (Y/N, default: Y) Y：下载，N：取消
> ```

执行“.\mcl”启动mcl，使用“?”来查看详细使用，在这里不过多赘述。

### 安装`mirai-api-http`

使用 [Mirai Console Loader](https://github.com/iTXTech/mirai-console-loader) 安装`mirai-api-http`

- `MCL` 支持自动更新插件，支持设置插件更新频道等功能

```
.\mcl --update-package net.mamoe:mirai-api-http --channel stable --type plugin
```
1. 启动 Mirai Console Loader (首次启动会下载核心和插件,并生成配置文件)
2. [编辑`config/net.mamoe.mirai-api-http/setting.yml`配置文件](#编辑mirai配置文件)

### 编辑mirai配置文件

现在我们需要进行mirai-api-http的配置，方便让其与graia进行通信，文件应该在mcl中在config\net.mamoe.mirai-api-http\setting.yml

```
# file: mirai-client/config/MiraiAPIHTTP/net.mamoe.mirai.api.http.config.Setting
authKey: graia-mirai-api-http-authkey # 你可以自己设定, 这里作为示范

# 可选，缓存大小，默认4096.缓存过小会导致引用回复与撤回消息失败
cacheSize: 4096

enableWebsocket: true # 是否启用 websocket 方式, 若使用 websocket 方式交互会得到更好的性能
host: '0.0.0.0' # httpapi 服务监听的地址, 错误的设置会造成 Graia Application 无法与其交互
port: 8080 # httpapi 服务监听的端口, 错误的设置会造成 Graia Application 无法与其交互
```

如果端口被占用请修改port

### 安装graia

```
pip install graia-application-mirai
```

ps：这同时会安装 `graia-application-mirai` 和 `graia-broadcast` 这两个包的最新版本.

:::tip

如果您想更新其中的某一个：

```
# 更新 graia-application-mirai
pip install graia-application-mirai --upgrade
# 更新 graia-broadcast
pip install graia-broadcast --upgrade
```

:::

## 使用 GraiaOK

未完待续 ...

## 使用 Graia CLI

未完待续 ...

# 历史性的第一次对话

将以下代码保存到一个py文件：

```python
from graia.broadcast import Broadcast
from graia.application import GraiaMiraiApplication, Session
from graia.application.message.chain import MessageChain
import asyncio

from graia.application.message.elements.internal import Plain
from graia.application.friend import Friend

loop = asyncio.get_event_loop()

bcc = Broadcast(loop=loop)
app = GraiaMiraiApplication(
    broadcast=bcc,
    connect_info=Session(
        host="http://localhost:8080", # 填入 httpapi 服务运行的地址“8080”为您所写的port
        authKey="graia-mirai-api-http-authkey", # 填入 authKey
        account=5234120587, # 你的机器人的 qq 号
        websocket=True # Graia 已经可以根据所配置的消息接收的方式来保证消息接收部分的正常运作.
    )
)

@bcc.receiver("FriendMessage")
async def friend_message_listener(app: GraiaMiraiApplication, friend: Friend):
    await app.sendFriendMessage(friend, MessageChain.create([
        Plain("Hello, World!")
    ]))

app.launch_blocking()
```

运行使用python 文件名.py运行这段代码，将会输出：

```
[2020-07-25 21:42:11,929][INFO]: launching app...
[2020-07-25 21:42:11,960][INFO]: using websocket to receive event
[2020-07-25 21:42:11,964][INFO]: event reveiver running...
```

然后和机器人账号发起好友对话, 当你的机器人向你发出 `Hello, World!` 时, 你就已经部署好了一个最小的 `Graia Framework` 应用, 在接下来的文档中, 我们将详细解剖该程序
