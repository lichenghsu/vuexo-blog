---
title: Cloudflare Tunnel + VNC 實作遠端連線
cover: /images/cover.png
tags: [遠端桌面, VNC, Cloudflare, 自架工具]
sticky: true
categories: [技術筆記, DNS]
layout: post
published: true
date: 2025-03-26 18:54:28
---

在本篇文章中，我將分享如何利用 **Cloudflare Tunnel** 搭配 **VNC** 打造一個安全又簡潔的遠端桌面環境。這個方案可以讓你在家中電腦上部署 VNC server，並透過 Cloudflare 的免費服務暴露到外部世界，無需開放防火牆或設定固定 IP，非常適合個人開發者或學生使用。

## 工具準備

- 一台主機（例如 Windows 或 Linux）
- VNC server（如 TightVNC / TigerVNC）
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- Cloudflare 帳號 + 已綁定網域

## 實作步驟

### 1. 安裝 VNC Server

以 Windows 為例，可使用 TightVNC：

```bash
choco install tightvnc
```

設定好密碼與啟動服務。

### 2. 安裝 Cloudflare Tunnel（cloudflared）

```bash
# 下載 cloudflared
https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install/
```

```bash
# 登入帳號並綁定網域

cloudflared login
```

### 3. 建立 Tunnel

```bash
cloudflared tunnel create vnc-remote
cloudflared tunnel route dns vnc-remote vnc.example.com
```

### 4. 編輯配置檔

~/.cloudflared/config.yml 範例如下：

```yaml
tunnel: vnc-remote
credentials-file: /root/.cloudflared/vnc-remote.json

ingress:
  - hostname: vnc.example.com
    service: tcp://localhost:5900
  - service: http_status:404
```

### 5. 啟動 Tunnel

```bash
cloudflared tunnel run vnc-remote
```

## 安全性建議

- 建議搭配 VNC 密碼、改 Port

- 或透過 Cloudflare Access 再加一層保護

- 可考慮使用 ssh/vnc combo 提升安全性

## 小結

- 透過 Cloudflare Tunnel + VNC，你可以用一種非常簡單、安全、不需設定路由器的方式來遠端操作你的主機。非常適合工作、玩 bot、建置內部服務測試用！

- 你也可以改成 RDP + Cloudflare、或其他自架工具結合，打造自己的輕量 DevOps 環境。
