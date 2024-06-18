# 从零开始使用 archlinux — dwm + st 打开 chrome 愉快上网
#### 我的硬件配置
操作系统越来越庞大、复杂，前不久，我买了台二手的 intel nuc8，内存 16G，硬盘 1T，想试验一下能不能完全在 linux 系统下使用电脑。买来后为了检查机器是否有问题，我先装了个 win10，了解到 archlinux 非常简洁，我就选择了它作为我的试验系统。我没有抹除掉 win10，双系统安装 archlinux 我主要参考了[这篇文章](https://blog.qingxu.live/posts/18/)，还有[这个视频](https://www.bilibili.com/video/BV11J411a7Tp/?spm_id_from=333.788.videocard.0)。视频是单系统的，但是讲解得很详细，可以先看一遍视频，再看文章，互相对照。
#### 设置时间
按照上面的文章安装完系统，我发现我的系统时区是对的，但是系统时间是错的，我执行了这个指令来同步网络时间：
```
timedatectl set-ntp true
```
然后再执行这个指令来同步硬件时间：
```
hwclock --systohc 
```
上面文章其实有提到单系统可以这么操作，双系统我不知道直接这么操作有什么影响，所以谨慎模仿。
#### 文本编辑器
我用的是 nano，操作比较简单。没下载的可以下载一下，下面修改文件需要用到文本编辑器。
```
sudo pacman -S nano
```
#### 配置下载源
在安装过程中，已经在 /etc/pacman.d/mirrorlist 这个文件下，把国内的镜像源地址放到最前面。不知道为啥，和网上的教程都不一样，我这个文件一开始是没有将镜像源地址按照国家划分，也没有国内的镜像源地址，国内的镜像源地址我是自己手打上去的。我还改了 /etc/pacman.conf 这个文件，在里面添加 Arch Linux 中文社区仓库的地址，原因和修改内容上面那篇文章有提到。加完后，需要安装密匙
```
sudo pacman -S archlinuxcn-keyring
```
#### wifi 连接
为了连接 wifi ，我先在有线网络下下载了[上面视频教程](https://www.bilibili.com/video/BV11J411a7Tp/?spm_id_from=333.788.videocard.0)用到的 wifi 工具：wpa_supplicant，怎么使用可以去看视频的前几分钟，注意需要 sudo 执行wpa_supplicant 联网命令。
```
sudo pacman -S wpa_supplicant
```
#### 窗口管理器 dwm
看了上面视频的 up 主 TheCW 的几个视频，我打算先装个窗口管理器。关于 dwm 是什么、使用起来怎么样，可以看他的这两个视频 [1](https://www.bilibili.com/video/BV11J411t7RY?t=696)、[2](https://www.bilibili.com/video/BV1dJ411t7Hn)。如何从零开始安装我参考了这两个视频 [1](https://www.bilibili.com/video/BV1zz411z7jn?t=418)、 [2](https://www.bilibili.com/video/BV1aE411g7Fy?t=2505)。

下面列一下我的安装步骤

1. 安装 dwm ，需要下载 dwm 的源代码。我安装了 git 来拉取 dwm 的最新源代码。
   ```
   sudo pacman -S git // 安装git
   git clone https://git.suckless.org/dwm --depth=1 // 下载代码
   ```
2. 下载一些桌面环境相关的组件
   ```
   sudo pacman -S xorg-server
   sudo pacman -S xorg-apps
   sudo pacman -S xorg-xinit
   ```
3. 下载字体，否则启动 dwm 会报错，我一开始没装这个，发现报错才装的。
   ```
   sudo pacman -S noto-fonts-cjk
   ```
4. 进入 dwm 的文件夹，编译并且安装 dwm
   ```
   sudo make clean install
   ```
5. 编辑 ~/.xinitrc 文件，加入这一行
   ```
   exec dwm
   ```
6. 输入下面命令来启动 dwm
   ```
   startx
   ```
7. 现在 dwm 还不能干啥，按 shift + alt + q 退出 dwm。
#### 终端 st
为了能在 dwm 里运行程序，需要先安装一个终端，dwm 的默认终端是 st，关于终端是什么可以看[这个视频](https://www.bilibili.com/video/BV1t4411K74H?t=343)，关于 st 是什么可以看[这个视频](https://www.bilibili.com/video/BV1t4411K74H?t=343)。

下面列一下我的安装步骤
1. 下载 st 源代码
   ```
   git clone https://git.suckless.org/st --depth=1
   ```
2. 根据上面说的 [st 视频](https://www.bilibili.com/video/BV1t4411K74H?t=343)修改 config.mk 文件
  	```
  	#X11INC = /usr/X11R6/include
  	#X11LIB = /usr/X11R6/lib
  	# 以上两行改成下面两行
  	X11INC = /usr/include/X11
  	X11LIB = /usr/include/X11
	```
3. 编译并且安装 st
   ```
   sudo make clean install
   ```
安装完 st，再进入 dwm，然后 alt + shift + enter 打开终端 st。这时候你就可以在 dwm 里面玩耍了。
#### 浏览器 chrome
[网上资料](https://zhuanlan.zhihu.com/p/107166211)说国内的仓库有 chrome，安装之
```
sudo pacman -S google-chrome
```
安装完，终端输入以下命令来启动浏览器
```
google-chrome-stable
```

#### 修改 st 的字体和字体大小
一开始 st 的字体会有点小，在我的电脑上还出现字母之间遮挡的问题，可以通过修改 st 目录下面的 config.h 文件来修改字体。文件打开如下图所示，找到划线的那一行代码
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/434d75a05387478f8be386733cfabeee~tplv-k3u1fbpfcp-watermark.image)
我将上面划线的部分改成了
```
Source Code Pro:pixelsize=24
```
Source Code Pro 是一种字体，pixelsize=24 改变字体的大小。改完这个文件保存退出，重新执行 `sudo make clean install` 编译并且安装 st，然后退出 dwm，重新启动 dwm 就行了。