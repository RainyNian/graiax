---
id: before-start
title: 在开始之前
sidebar-title: 在开始之前
---

| 预备知识： | 掌握python的基本语法， 熟悉电脑的基本操作 |
| -------------- | ----------------------------------------- |
| **学习目标**： | **学习开发`python qq`机器人的预备知识** |

在开始之前， 我会向你介绍关于此项目的一些基本概念。这些概率包括

- `Mirai`框架的基本架构
- ~~`Miria`框架的历史~~
- 介绍` Graia`框架

这些概率对于你理解 `Mirai` 各大项目都是有好处的。

同时， 使用 ` Graia` 框架来开发 `qq` 机器人， 需要使用 `python` 的很多高级语法， 我会在本节的第二部分来具体介绍 。

## 基本概念

### `Mirai` 框架的架构

**`Mirai` 框架有着极其丰富的生态和架构， 本指南只对其进行简单的介绍。 **

`Mirai `是使用 `Kotlin` 编程语言编写的一个 `qq机器人` 框架（ 后文简称： `qq bot` 或 `bot` ）

`Kotlin` 编程语言是Java编程语言的一种方言，你可以理解成 `Mirai` 就是用Java写的

>`Kotlin` 可以编译成 `Java` 字节码，也可以编译成 `JavaScript` ，方便在没有 `JVM` 的设备上运行。除此之外 `Kotlin` 还可以编译成二进制代码直接运行在机器上（例如嵌入式设备或 iOS）。
> `Kotlin` 已正式成为 `Android` 官方支持开发语言。
>
>—— 来自百度百科

所以如果想要运行 `Mirai` 框架， 你必须要配置好 `jvm`（ Java运行时环境）

`Mirai` 为了服务各个社区不同语言的使用者， 于是开发了 `mirai-api-http`（ 简称 `mah` ）

我们的 ` Graia` 也依赖于 `mah`。

**`Mirai` 框架和其各个组件之间的关系如下图所示**

![1.jfif](../../images/guides/before-start/1.jfif)

**如此复杂的关系使得 `Mirai` 各个组件之间的管理十分困难**

于是有志人士（[iTX Technologies](https://github.com/iTXTech)）开发出了 `iTX Technologies Mirai Console Loader`（ 下简称 `MCL` ）

但这样对一些初学者来说门槛还是很高， 他们又开发了 `iTX Technologies Mirai Console Loader Installer` （ 下简称 mcli ）， 支持自动下载`Java` 运行时和 [iTXTech Mirai Console Loader](https://github.com/iTXTech/mirai-console-loader) 。

你可以在这里深入的理解 `Mirai` 的生态： https://github.com/mamoe/mirai/blob/dev/docs/mirai-ecology.md

### 什么是 ` Graia` 框架

` Graia` 框架是基于 `mirai-api-http` 的即时聊天软件 **自动化** 框架。

#### ` Graia` 基于事件系统

` Graia` 对 `mah` 进行了封装， 实现了**事件系统**

接下来我们使用**伪代码**来比较使用两种方式开发bot的不同之处

```python
# 在python内使用原生mah api
# bot接受消息
from time import sleep
while True:
    # 获得一段时间内Mirai接受到的所有消息
    messages = fetchMessage()
    # 遍历这段时间内获得到的所有消息
    for message_chain in messages:
        # 打印每一条的文本信息
        print(str(message_chain))
    sleep(50)  # 防止对mah发送大量请求
```

```python
# 在python内使用 Graia， 以事件系统的思想开发bot

# 实例化一个bot实例
bot = MiraiBot()

# 为该bot注册一个事件， 约定当bot收到 好友消息（ FriendMessage ）的时候调用这个函数
# 这里使用了python装饰器语法糖， 将在后面说明
@bot.receiver("FriendMessage")
async def friend_message_listener(bot, friend):
    # bot对friend（ 该好友 ）发送消息， 发送的文本为 ”Hello, World!“
    await bot.sendFriendMessage(friend, "Hello, World!")

# 让bot开始工作
bot.run()
```

**你可能觉得第一种方法更好理解， 但是第二种方法更加符合正常人的思维逻辑， 同时第二种方法更加高效率， 可以使开发bot模块化**

看不懂没关系， 你会在接下来的学习中逐渐了解这两种设计思想的区别， 到时候你可以再回来看看， 你一定会有新的感悟

#### ` Graia` 对 `mah` 进行了高层封装

你平时使用 `qq` 发送的消息并非纯文本， 你发送的消息包阔了

- 表情
- 图片
- 语言
- 动画表情
- `json` 消息
- `xml` 消息
- ……

不仅如此， 你发送的信息还可能是以上种类的组合体，例如

- 图片加文字
- @加文字

这些消息在 `mirai` 使用 `MessageChain`（ 消息链 ）来表示

因此在 `mah` 中， 你接收到的消息大概长这个样子

```
{
    "type": "GroupMessage",        // 消息类型：GroupMessage或FriendMessage或TempMessage或各类Event
	"messageChain": [              // 消息链，是一个消息对象构成的数组
      {
	    "type": "Source",
	    "id": 123456,
        "time": 123456789
	  },
      {
        "type": "Plain",
        "text": "Miral牛逼"
      }
    ],
    "sender": {                      // 发送者信息
        "id": 123456789,             // 发送者的QQ号码
        "memberName": "化腾",        // 发送者的群名片
        "permission": "MEMBER",      // 发送者的群限权：OWNER、ADMINISTRATOR或MEMBER
        "group": {                   // 消息发送群的信息
            "id": 1234567890,        // 发送群的群号
            "name": "Miral Technology", // 发送群的群名称
            "permission": "MEMBER"      // 发送群中，Bot的群限权
        }
    }
}

```

这在 `python` 中很不好进行处理， ` Graia` 在此基础上封装了一些高级 `api` 用于处理 `MessageChain`， 例如：

- 消息链分片
- 消息链重发
- 消息链组装

### ` Graia` 项目架构

` Graia` 项目分为许多子项目

- `Application` 复杂 `mah` 协议（ 必备 ）
- `Broadcast` 负责高效的事件系统 （ 必备 ）
- `Schedule` 负责定时任务 （ 插件 ）
- `Interrupt` 中断任务 （ 插件 ）

所有 ` Graia` 项目可以在这里找到： https://github.com/GraiaProject

## python高级语法

` Graia` 框架使用了大量的python高级语法开发， 例如： 

1. ` Graia` 使用 `type hint` 来注册事件

2. ` Graia` 使用 `asyncio` 模块来进行事件分发

3. ` Graia` 使用大量的 `async` `await` 关键字来调用协程

4. ` Graia` 使用装饰器来注册事件

> 严格来说 ` Graia` 使用 `aplication` 来进行事件分发， `aplication` 使用 `asyncio`实现
>
> 所以可以说 ` Graia` 使用 `asyncio`来进行事件分发

因此， 掌握一些 `python` 的高级语法对接下来的学习十分有必要

这是你需要提前掌握的高级语法： 

- [`type hint`](https://docs.python.org/zh-cn/3/library/typing.html)
- [协程与 `asyncio`](/docs/appendixs/asyncio-basic)
- [装饰器](https://www.runoob.com/w3cnote/python-func-decorators.html)

如果你还不会， 你真应该赶紧学习他们， 上面给出的网址是一些较好的教程。

如果你完全掌握了以上高级语法， 那么你可以进入下一节， 进行 `Graia` 的开发了。
