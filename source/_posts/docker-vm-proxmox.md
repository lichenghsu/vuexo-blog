---
title: 在 Proxmox 上的虛擬機建立 Docker container
cover: /images/proxmox/proxmox_gmk_k8.png
sticky: false
tags: [Proxmox, Docker, Virtual Machine]
categories: [Proxmox 打造個人 HomeLab]
layout: post
published: true
date: 2025-07-20 12:14:16
---
![proxmox_on_gmk_k8](/images/proxmox/proxmox_gmk_k8.png)

## 1.建立 VM

### Proxmox 虛擬機配置（OS、資源）

#### ➤ 安裝 Linux 作業系統

1. 用瀏覽器開啟 Proxmox 主控台
2. 登入後點擊左側 `pve` 的 `local (pve)`
3. 點擊 `CT Templates`
  ![Dashboard](/images/proxmox/ubuntu01.png)
4. 點擊 `Templates` 安裝 ubuntu (這邊以 `ubuntu-24` 為例，用 22 也行)
  ![pve](/images/proxmox/ubuntu02.png)

---

#### ➤ 安裝 container

1. 點擊 `Create CT`
  ![Create CT](/images/proxmox/create_container.png)
2. 輸入 `Hostname` 以及 `Password`
  ![hostname](/images/proxmox/hostname.png)
3. 選擇剛剛安裝的 Ubuntu 作為 Template
  ![hostname](/images/proxmox/docker_template.png)
4. 分配磁碟，這邊給 20GB
  ![disk](/images/proxmox/disk.png)
5. 分配 CPU 核心數，這邊給 2
  ![core](/images/proxmox/core.png)
6. 分配記憶體，這邊給 3024MiB
  ![memery](/images/proxmox/mem.png)
7. 網路這邊勾選兩個 DHCP
  ![Internet](/images/proxmox/network.png)
8. Finish
9. 點擊剛剛新增的 container ，在 `Options` 中找到 `Features`，將 `keyctl` 和 `nesting` 都勾選
  ![config](/images/proxmox/config.png)

---

#### ➤ 安裝 Docker

 ```bash
  # Add Docker's official GPG key:
  sudo apt-get update
  sudo apt-get install ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc

 # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  ```

 取自[官方文件](https://docs.docker.com/engine/install/ubuntu/)

 ---

#### ➤ 測試 container 運行

```bash
docker run hello-world
```

### 用 Portainer 管理容器

```bash
docker run -d -p 8000:8000 -p 9443:9443 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

啟動後可透過虛擬機 IP + :9443 開啟 Portainer Web UI，例如：

```cpp
https://192.168.xx.xx:9443
```

查看 IP：

```bash
ifconfig
```

![portainer_login](/images/proxmox/portainer_login.png)
![portainer_dashboard](/images/proxmox/portainer_dashboard.png)

## 2. 如何使用？

### 在 Docker 中部署 Nginx

```bash
docker run -d -p 8080:80 --name nginx-test nginx
```

可透過 http://<虛擬機IP>:8080 查看 nginx 測試頁。

- 這裡用 8081 port
![nginx](/images/proxmox/nginx.png)

## TODO

- 架設影音服務 - Jellyfin
- 個人 git repository - Gitea
- 遠端存取服務 - Cloudflare Tunnel
- 網站伺服器 （部落格、展示頁、後端 API）
