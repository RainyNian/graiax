---
id: install mirai
title: 配置Mirai环境
sidebar_label: 配置Mirai环境
---

## 配置Mirai环境
通过“在开始之前”这一篇章，我们知道了Graia是需要Mirai的SDK，没有Mirai就无法运行Graia。本章节就会教大家如何搭建Mirai环境

1. [纯手动配置](###纯手动配置)(不推荐)
2. [使用Mirai Console Loader(mcl)](###使用mcl)
3. [使用Mcl Installer](###使用mcl_installer)
4. [使用GraiaOK](###使用GraiaOK)

:::warn 注：配置难度从上到下依次减小，这篇配置环境安装已经尽量小白了，如果有任何你不会的问题，请自行解决 :::

![1.jpg](../../../images/guides/installation/1.jpg)

### 纯手动配置
#### 1.安装Java
```bash
#对于Debian系
apt install openjdk-11-jre
#对于CentOS
yum install java-11-openjdk
#对于电脑安装了winget的Windows用户
winget install BellSoft.LibericaJDK11Full
```
注：每个操作系统对于java的叫法可能不同，这个时候建议你百度一下  
如果你的Windows系统没有winget，请下载Java在Windows的安装包 [64位](https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.10%2B9/OpenJDK11U-jre_x64_windows_hotspot_11.0.10_9.msi)
[32位](https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.10%2B9/OpenJDK11U-jre_x86-32_windows_hotspot_11.0.10_9.msi)

#### 2.下载所需要的Mirai组件
1. 到 https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-core-all/ 下载mirai-core-all-x.x.x.jar  
到 https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console/ 下载mirai-console-x.x.x.jar  
到 https://dl.bintray.com/him188moe/mirai/net/mamoe/mirai-console-terminal/ 下载 mirai-console-terminal-x.x.x.jar  
注: x.x.x需要一致，建议不要下载带dev的版本
塞到libs文件夹中

2. 创建一个新的文件, 名为 `start-mirai-console.bat `/`start-mirai-console.ps1`/`start-mirai-console.sh`
Windows CMD:
```
@echo off
title Mirai Console
java -cp "./libs/*" net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader %*
pause
```
Windows PowerShell:
```
$Host.UI.RawUI.WindowTitle = "Mirai Console"
java -cp "./libs/*" net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader $args
pause
```
Linux:
```
#!/usr/bin/env bash
echo -e '\033]2;Mirai Console\007'
java -cp "./libs/*" net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader $*
```
双击，如果出现了一行行绿色的文字，那就说明你成功启动了Mirai

#### 3.安装Mirai api http(mah)
在你安装好了Mirai后，文件夹应该会变成下面这个模样
```
├─config
│  └─Console
├─data
├─libs
├─logs
└─plugins
```
1. 到 https://github.com/project-mirai/mirai-api-http/releases 下载最新版本的mah(命名一般为mirai-api-http-vx.x.x.mirai.jar)
2. 将下载好的jar放入plugins文件夹中
3. 启动Mirai后关闭Mirai
4. [配置mah](##Mah的配置问题)

### 使用mcl
#### 1.安装Java
```bash
#对于Debian系
apt install openjdk-11-jre
#对于CentOS
yum install java-11-openjdk
#对于电脑安装了winget的Windows用户
winget install BellSoft.LibericaJDK11Full
```
注：每个操作系统对于java的叫法可能不同，这个时候建议你百度一下  
如果你的Windows系统没有winget，请下载Java在Windows的安装包 [64位](https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.10%2B9/OpenJDK11U-jre_x64_windows_hotspot_11.0.10_9.msi)
[32位](https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.10%2B9/OpenJDK11U-jre_x86-32_windows_hotspot_11.0.10_9.msi)

#### 2.下载Mirai Console Loader(mcl)
1. 到 https://github.com/iTXTech/mirai-console-loader/releases 下载最新版本的mcl(一般命名为`mcl-x.x.x.zip`)并解压
2. 打开命令行/终端，并输入`.\mcl --update-package net.mamoe:mirai-api-http --channel stable --type plugin`(Windows cmd可能需要把`.\`去掉)
3. 启动mcl后关闭
4. [配置mah](##Mah的配置问题)
   
### 使用mcl_installer
1. 到 https://github.com/iTXTech/mcl-installer/releases 下载最新版本mcl_installer
2. 启动mcl_installer,并无脑回车
3. 进入mcl文件夹，打开命令行/终端，并输入`.\mcl --update-package net.mamoe:mirai-api-http --channel stable --type plugin`(Windows cmd可能需要把`.\`去掉)
4. 启动mcl后关闭
5. [配置mah](##Mah的配置问题)

### 使用GraiaOK

未完待续 ...

## Mah的配置问题
当你做了以上任何一个方式配置好Mirai后
你的文件夹应该是这样的
```
├─config
│  ├─Console
│  └─net.mamoe.mirai-api-http
├─data
│  └─net.mamoe.mirai-api-http
│      ├─images
│      └─voices
├─libs
├─logs
└─plugins
```
此时请进入`config/net.mamoe.mirai-api-http/setting.yml`进行设置
```yaml
#以下是setting.yml截取，剩下的保持默认就好了
authKey: graia-mirai-api-http-authkey # 你可以自己设定, 这里作为示范
cacheSize: 4096 # 可选，缓存大小，默认4096.缓存过小会导致引用回复与撤回消息失败
enableWebsocket: true # 是否启用 websocket 方式, 若使用 websocket 方式交互会得到更好的性能
host: '0.0.0.0' # httpapi 服务监听的地址, 错误的设置会造成 Graia Application 无法与其交互
port: 8080 # httpapi 服务监听的端口, 错误的设置会造成 Graia Application 无法与其交互
```