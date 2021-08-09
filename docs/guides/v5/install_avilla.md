---
id: install-avilla
title: 安装Avilla
sidebar_label: 安装Avilla
---

## 安装Avilla

首先，请确保你的设备已经安装了`Python3.6+`版本的Python(推荐`Python3.8+`)  
至于怎么安装Python。。。Baidu/Google Pls

```sh
#你可以使用pip安装
pip3 install avilla-core
#也可以使用poetry安装(如果你是小白就不要看这个)
poetry add avilla-core
```

:::note 关于`avilla`依赖的问题
由于`v5(Avilla)`的出现，`v4(Graia-Application-Mirai)`已经停止更新
`v4(Graia-Application-Mirai)`使用的是`mah(mirai-api-http)`
而v5暂时还不支持`mah(mirai-api-http)`，目前仅支持`Onebot`
所以暂时不能通用

经实测，目前`mirai`的`OneBot Kotlin`插件暂时无法正常使用

所以请使用其他的使用`Onebot`协议的框架(例如go-cphttp)
:::

## 历史性的第一次对话

将以下代码保存到一个py文件(e.g: test.py)：

```python
import asyncio
import logging
from aiohttp.client import ClientSession
from graia.broadcast import Broadcast
from yarl import URL
from avilla import Avilla
from avilla.event.message import MessageEvent
from avilla.execution.message import MessageSend
from avilla.message.chain import MessageChain
from avilla.network.clients.aiohttp import AiohttpWebsocketClient
from avilla.onebot.config import OnebotConfig, WebsocketCommunication
from avilla.onebot.protocol import OnebotProtocol
from avilla.relationship import Relationship
from avilla.builtins.elements import PlainText

loop = asyncio.get_event_loop()
broadcast = Broadcast(loop=loop)
session = ClientSession(loop=loop)
avilla = Avilla(
    broadcast,
    OnebotProtocol,
    {"ws": AiohttpWebsocketClient(session)},
    {
        OnebotProtocol:
        OnebotConfig(
            access_token="avilla-test",
            bot_id=208924405,
            communications={
                "ws":
                WebsocketCommunication(api_root=URL("ws://127.0.0.1:6700/"))
            },
        )
    },
)
logging.basicConfig(
    format="[%(asctime)s][%(levelname)s]: %(message)s",
    level=logging.INFO,
)


@broadcast.receiver(MessageEvent)
async def event_receiver(rs: Relationship, message: MessageChain):
    print(message.as_display())
    await rs.exec(MessageSend([PlainText('Hello, World!')]))


loop.run_until_complete(avilla.launch())
loop.run_forever()
```

运行使用python test.py运行这段代码，将会输出类似这样的文本：

```log
test.py:18: DeprecationWarning: The object should be created within an async function   // 一个Warning，提示对象必须在异步函数里创建，
  session = ClientSession(loop=loop)                                                    // 不用理会即可
[2021-08-09 22:23:53,353][INFO]: hello, world!                                          // 这是默认的输出
```

然后和机器人账号发起好友对话, 当你的机器人向你发出 `Hello, World!` 时, 你就已经部署好了一个最小的 `Graia Framework` 应用
