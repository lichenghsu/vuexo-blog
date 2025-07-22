---
title: Java 環境簡介 (Environment)
cover: /images/java/Java-Logo.jpg
sticky: flase
tags: [Java]
categories: [Java 基本語法]
order: 1
layout: post
published: true
date: 2025-07-21 17:29:49
---
## 1. java 檔和 class 檔

### java 檔

1. 儲存 Source code
2. 內容為文字

### class 檔

1. 藉由 Java Compiler 編譯後儲存為的檔案格式
2. 儲存位元碼 (Java byte code)
3. 不因作業系統有所差別 (會在對應的 jvm 中直譯並運行)

### Java 執行環境 Java Runtime Environment (JRE)

- 要執行 Java 程式，需要：
  - Java 虛擬機（JVM）來執行程式
  - 標準的 Java 類別庫（Java class libraries）

- JVM 加上類別庫的組合就稱為：
  - Java 執行環境（Java Runtime Environment，JRE)

### Java 開發環境 Java Development Kit (JDK)

- JDK 包含 Java 開發所需的編譯、除錯功能;其中還包含 JRE

### JDK 中的開發相關工具 (%JAVA_HOME%\bin)

- javac
- java
- jar
- javaodoc
- javap
- jdb

## 2. Hello World

```java
public class HelloWorld {
    public static void main(String[] arg) {
        System.out.println("Hello World!");
    }
}
```

- Java 檔名必須以 class 來命名，所以檔名必須為 HelloWorld.java

```java
<modifier>* class <class name> {
    <attribute_declaration>*     // 欄位（成員變數）
    <constructor_declaration>*   // 建構子
    <method_declaration>*        // 方法
}
```

- modifier：可選的修飾詞（如 public, private, abstract 等）
- class name：類別名稱（通常首字母大寫）
- attribute_declaration：定義類別的屬性（也叫成員變數）
- constructor_declaration：建構子，用來建立物件時初始化
- method_declaration：類別的方法（功能、行為）

---

➤ 這邊再回到 Hello world:

| 結構                                       | 解釋                            |
| ---------------------------------------- | ----------------------------- |
| `public`                                 | 修飾詞：表示這個類別或方法是「公開的」，任何地方都可以使用 |
| `class HelloWorld`                       | 定義一個類別，名叫 `HelloWorld`        |
| `{ ... }`                                | 花括號包住的是類別的「內部內容」              |
| `public static void main(String[] args)` | 主方法，是 Java 程式執行的起點            |
| `String[] args`                          | 接收執行程式時輸入的參數（可以是空的）           |
| `System.out.println("Hello World!");`    | 在控制台輸出文字 `"Hello World!"`     |

> main 方法是 Java 程式的進入點，語法結構固定：
    ```java
    public static void main(String[] args)
    ```
    **各部分含義如下：**
    `public`：公開的，讓 JVM 可以呼叫它
    `static`：靜態的，不需建立物件就能執行
    `void`：無回傳值
    `main`：方法名稱，不能改
    `String[] args`：接受命令列傳入的字串參數（可以有 0 個或多個）
