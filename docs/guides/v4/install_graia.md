---
id: install-graia
title: 安装Graia
sidebar_label: 安装Graia
---

## 安装Graia

首先，请确保你的设备已经安装了`Python3.6+`版本的Python(推荐`Python3.8+`)  
至于怎么安装Python。。。Baidu/Google Pls

```sh
#你可以使用pip安装
pip3 install graia-application-mirai
#也可以使用poetry安装(如果你是小白就不要看这个)
poetry add graia-application-mirai
```

:::note 关于graia版本的问题
由于v5(Avilla)的出现，v4(Graia-Application-Mirai)已经停止更新  
而现在最新版的graia-application-mirai处于一种完全不能用的状态  
所以最后一个能够稳定运行的v4框架的版本号如下  

```shell
graia-application-mirai==0.19.2
graia-broadcast==0.8.11
graia-scheduler==0.0.4 #graia的定时任务模块
graia-saya==0.0.9 #graia的模组管理模块
graia-component-selector==0.0.6 #graia简单的消息链元素选择器
graia-template==0.0.4 #graia中MessageChain消息模板
```

我们也推荐各位尽快学习v5以获得稳定的更新
:::

## 历史性的第一次对话

将以下代码保存到一个py文件(e.g: test.py)：

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

运行使用python test.py运行这段代码，将会输出：

```log
[2020-07-25 21:42:11,929][INFO]: launching app...
[2020-07-25 21:42:11,960][INFO]: using websocket to receive event
[2020-07-25 21:42:11,964][INFO]: event reveiver running...
```

然后和机器人账号发起好友对话, 当你的机器人向你发出 `Hello, World!` 时, 你就已经部署好了一个最小的 `Graia Framework` 应用, 在接下来的文档中, 我们将详细解剖该程序
