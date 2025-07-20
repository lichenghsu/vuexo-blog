---
title: TypeScript 入門筆記：型別
cover: /images/typescript/typescript-logo.png
sticky: false
tags: [TypeScript]
categories: [TypeScript 入門筆記]
layout: post
published: true
date: 2025-07-18 13:00:44
---
TypeScript 是一種建立在 JavaScript 之上的「強型別」程式語言，提供靜態型別檢查與更完善的開發工具支援。它是 JavaScript 的超集合，除了完全相容原有語法之外，還新增了類別、介面、泛型等語言特性，有助於撰寫更可靠、可維護性更高的大型應用程式。

> 值得注意的是，TypeScript 最終仍會被編譯為標準的 JavaScript，因此可以在任何支援 JavaScript 的執行環境中運行（如瀏覽器或 Node.js）。

---

## 1. TypeScript 的優點

- 靜態型別檢查：開發階段即可發現類型錯誤，減少 runtime bug

- 更好的編輯器支援：自動補全、即時錯誤提示與 refactor 功能

- 可讀性與可維護性提升：對大型專案特別有幫助

- 逐步採用彈性高：可只針對部分檔案或模組使用 TypeScript

> TypeScript 以 Go 重寫，性能大幅提升

- 微軟宣布將在 TypeScript 7 中，將目前由 JavaScript/TypeScript 自身實現的編譯器完全**轉移到 Go"**，這項計畫代號為 "Corsa" 。

    | 專案名稱    | JS 編譯時間 | Go 編譯時間 | 加速比 |
    | ---------- | ------- | ------- | ----- |
    | VS Code    | 77.8 s  | 7.5 s   | 10.4× |
    | Playwright | 11.1 s  | 1.1 s   | 10.1× |
    | TypeORM    | 17.5 s  | 1.3 s   | 13.5× |
    | date‑fns   | 6.5 s   | 0.7 s   | 9.5×  |
    | rxjs       | 1.1 s   | 0.1 s   | 11.0× |

> 此次重寫目的是 提升性能：微軟表示相比傳統的 JS 編譯器，Go 原生版本在多個大型專案中可提升約 10 倍 的效能，有些案例甚至達到 15 倍速度 。

影片連結:

[WHY NOT RUST? TypeScript is rewritten in Go...](https://youtu.be/tRiIcCOhN6A)

---

## 2. TypeScript 與 JavaScript 的關係

TypeScript 是 JavaScript 的超集，它的編譯器（tsserver）能夠解析 JS 檔

### 1. 型別註解（Type Inference）

TypeScript 基本繼承了 JavaScript，甚至能夠依據創建變數時分配的值來賦予該值型別，即使你寫的是純 JS，TS 也能根據變數初始化、函式返回值等推論出型別。

```ts
let helloWorld = "Hello World";
    // let helloWorld: string
```

> VSCode 底層的 JavaScript auto compliete 使用 TypeScript 和lib.d.ts 標準庫聲明來實現簡化。

### 2. 型別斷言 (Type Assertion)

雖然 TS 會自動推論，但還是明確加上型別更好（尤其像是比較動態的物件設計）。TypeScript 提供了 interface 和 type 這兩種語法來描述資料結構。

```ts
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Miles",
  id: 0,
};
```

假如把 key 寫成 `username`，TS 就會直接報錯：

```ts
const user: User = {
  username: "Miles", // ✗ 型別不符合
  id: 0,
};
```

## 3. TypeScript 的物件導向

TypeScript 也支援物件導向，可以讓一個類別實作某個 interface：

```ts
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

interface 可以用來定義函式的參數或回傳值：

```ts
function deleteUser(user: User) {
  // ...
}

function getAdminUser(): User {
  return { name: "Admin", id: 999 };
}
```

## 4. TypeScript 的進階型別

除了 JavaScript 原生的 string, number, boolean, null, undefined 之外，TS 還提供以下進階型別：

- `any`: 什麼都能放，不會檢查類，似在 JavaScript 使用 var 宣告變數

- `unknown`: 需要你先明確斷言型別才能用

- `never`: 永遠不會發生的型別（例如 throw error）

    ```ts
    let neverEnd = function forever() {
        while(true) {    // 無窮迴圈
            // CODE
        }
    }
    ```

- `void`: 沒有回傳值的函式

    ```ts
    function alertName(): void {
       alert('My name is Miles!');
    }

    // 若宣告一個 void 型別的變數，只能賦值為 null 或 undefined
    let unusable: void = undefined;
    ```

## 5. 組合型別（Union / Generic）

### 1. 聯集型別 (Union)

```ts
type LockState = "locked" | "unlocked";
```

```ts
function getLength(input: string | string[]) {
  return input.length;
}
```

可以搭配 typeof 做型別判斷：

```ts
function wrapInArray(input: string | string[]) {
  if (typeof input === "string") {
    return [input];
  }
  return input;
}
```

### 2. 泛型（Generic）

泛型就是型別的變數，讓你可以寫出更通用的程式碼。

```ts
interface Backpack<T> {
  add: (item: T) => void;
  get: () => T;
}

declare const backpack: Backpack<string>;
const item = backpack.get();
backpack.add("筆記本");
backpack.add(123); // ✗ 錯誤，不能加 number
```

## 6. 結構型別系統（Structural Typing）

TS 的型別系統是以「資料的結構」為主，也就是只要資料的欄位與型別符合，就算符合這個型別。

這叫做**鴨子型別（duck typing）**：

```ts
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const p1 = { x: 10, y: 20 };
logPoint(p1); // ✓ 通過

const p2 = { x: 5, y: 7, z: 100 };
logPoint(p2); // ✓ 也通過，只要有 x 跟 y 就行

const p3 = { hex: "#fff" };
logPoint(p3); // ✗ 缺少 x 與 y
```

---

本篇筆記快速瀏覽了 TypeScript 常見的語法與概念，像是：

- 型別推論

- interface 和 type 的差異

- 聯集型別與泛型

- 結構型別系統

---

### 參考資料

- [Typescriptlang.org/docs](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#static-type-checking)

- [TypeScript 中文文档](https://ts.nodejs.cn/docs/handbook/typescript-in-5-minutes.html)
