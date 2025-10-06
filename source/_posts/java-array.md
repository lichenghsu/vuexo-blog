---
title: Java 陣列
cover: /images/java/Java-Logo.jpg
sticky: false
tags: [Java, Array]
categories: [Java 基本語法]
order: 5
layout: post
published: true
date: 2025-07-22 22:46:53
---

## Array 陣列

陣列是用來儲存固定數量、同一資料型態的變數集合。

你可以把它想像成一排櫃子：每個櫃子對應一個「索引」，可以用來快速存取或修改資料。

### 1. 陣列基礎語法

- 宣告陣列

    ```java
    int[] scores;       // 宣告一個整數陣列
    String[] names;     // 宣告一個字串陣列
    ```

- 建立陣列 (分配記憶體)

    ```java
    scores = new int[5];
    names = new String[3];
    ```

    也可以合併寫法：

    ```java
    int[] scores = new int[5];
    ```

### 2. 陣列初始化與存取

- 直接指定內容

    ```java
    int[] nums = {10, 20, 30, 40, 50};
    ```

- 存取元素（索引從 0 開始）

    ```java
    System.out.println(nums[0]);  // 輸出 10
    nums[2] = 99;                 // 把第3個元素改為 99
    ```

### 3. 陣列與迴圈

```java
for (int i = 0; i < nums.length; i++) {
    System.out.println("第" + i + "個數是 " + nums[i]);
}
```

- for-each 寫法

    ```java
    for (int n : nums) {
        System.out.println(n);
    }
    ```

---

> **陣列常見錯誤**
> | 錯誤類型                             | 說明                      |
> | -------------------------------- | ----------------------- |
> | `ArrayIndexOutOfBoundsException` | 使用了超出範圍的索引（如 `nums[5]`） |
> | `NullPointerException`           | 陣列尚未初始化                 |
