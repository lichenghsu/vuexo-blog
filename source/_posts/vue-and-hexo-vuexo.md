---
title: Vue and Hexo - Vuexo 一款靜態部落格解決方案
cover: /images/cover.png
sticky: true
tags: [Vuexo]
categories: [Vuexo 開發筆記]
layout: post
published: true
date: 2025-03-25 19:30:04
---

最近，我嘗試將 Hexo 結合 Vue，打造出一個風格簡約、功能彈性的技術部落格，我叫它 **Vuexo**。這篇文章會分享我開發這個專案的動機、架構選型，以及整合過程中遇到的挑戰與解法。

## 為什麼用 Vue 接管 Hexo？

Hexo 本身是靜態部落格產生器，用 Markdown 就能寫文章，對我這種常常寫技術筆記的人來說很方便。但它的前端呈現相對固定，要客製化互動式功能（如 TOC、搜尋、留言）會有點卡。

我希望部落格能：

- 像 GitHub 那樣簡約、有一致風格
- 支援 SPA 導覽，點擊分類或文章不用整頁刷新
- 支援主題切換（淺色 / 深色）
- 整合留言系統（Giscus）
- 加入本地全文搜尋（MiniSearch）

於是，我決定讓 Vue 完全接管 Hexo 的輸出內容，前端由 Vue SPA 管理，資料由 Hexo 的 `content.json` 提供。

## 架構簡介

整體架構如下：

```text
Hexo + hexo-generator-json-content
  ↓
public/content.json ← 所有文章資料
```

Vue + Vue Router + Composition API

- 首頁：文章清單（置頂＋最新）
- 文章頁：v-html 渲染 Markdown 內容
- TOC：右側浮動目錄
- Search：MiniSearch + Local Search
- Giscus：留言整合、主題同步

## 技術整合筆記

- 主題切換： 透過 localStorage + prefers-color-scheme，並將選擇同步至 Giscus iframe

- Giscus 載入與切換： 每次 route 切換重新掛載 iframe，並監聽 iframe 是否載入成功

- MiniSearch： 文章由 Hexo 匯出 title、slug、content 欄位，本地建立索引，可模糊搜尋

- 封面圖與圖片路徑： 統一將圖片放在 /source/images 中，Front-matter 中加上 cover 欄位

- Vue Router： /post/:slug, /categories/:name, /tags/:name 全部用前端路由管理

## 學到什麼？

整合 Hexo 和 Vue 是個有趣的過程。你會思考靜態生成與 SPA 的界線，也會設計一個乾淨的 JSON API 給前端使用。

最大的收穫是：不需要放棄 Hexo 的好處（簡單寫作），也能享受 Vue 的靈活互動。
