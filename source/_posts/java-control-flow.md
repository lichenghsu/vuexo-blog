---
title: Java 流程控制
cover: /images/java/Java-Logo.jpg
sticky: false
tags: [Java]
categories: [Java 基本語法]
order: 3
layout: post
published: true
date: 2025-07-22 00:43:35
---
在 Java 中，JVM 預設會依序執行每一行以分號結尾的語句。但在實務開發中，程式常需要根據條件做出選擇或重複執行某些區塊，這時就必須使用各種流程控制語句（如：判斷式、迴圈等）來控制程式的執行順序。

## 1. 輸入與輸出

常見的輸出就是 `System.out.println()` 來輸出內容

### 輸出

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("A,");
        System.out.print("B,");
        System.out.print("C.");
        System.out.println();
        System.out.println("END");
    }
}

// A,B,C.
// END
```

### 格式化輸出

Java 也提供了格式化輸出的功能，為了方便閱讀

```java
public class Main {
    public static void main(String[] args) {
        double d = 12900000;
        System.out.println(d); // 1.29E7
    }
}
```

當我們想要精準控制輸出格式（例如：小數位數、對齊、補 0）時，使用 `System.out.printf()` 比 `print()`、`println()` 更靈活。

```java
System.out.printf("格式化字串", 變數1, 變數2, ...);
```

- 使用 % 作為占位符
- 多個變數要一一對應 `%?`

---

➤ 常見的佔位符

| 占位符  | 說明          | 範例                                     |
| ---- | ----------- | -------------------------------------- |
| `%d` | 整數（Decimal） | `System.out.printf("%d", 10);`  → `10` |
| `%x` | 十六進位（Hex）   | `System.out.printf("%x", 255);` → `ff` |
| `%f` | 浮點數（小數）     | `%.2f` 顯示兩位小數                          |
| `%e` | 科學記號        | `3.14e+00` 形式                          |
| `%s` | 字串（String）  | `System.out.printf("%s", "Hi");`       |

---

➤ 特殊寫法：`%%`

- 輸出 `%` 本身

```java
System.out.printf("成功率為：100%%"); // 顯示 → 成功率為：100%
```

### 輸入

Java 的輸入不像輸出那麼直接，為了從鍵盤讀入資料（例如字串、整數），我們通常使用：

```java
import java.util.Scanner;
```

#### 基本使用流程

```java
Scanner scanner = new Scanner(System.in);
```

- `Syetem.in`: 標準輸入 (鍵盤)
- `Scanner`: 幫助讀取使用者輸入

➤ 常見方法

| 方法              | 資料型別 | 說明                  |
| --------------- | ---- | ------------------- |
| `nextLine()`    | 字串   | 讀取一整行（包含空白）         |
| `next()`        | 字串   | 讀取一個單字（遇到空白就停）      |
| `nextInt()`     | 整數   | 讀取一個 `int`          |
| `nextDouble()`  | 小數   | 讀取一個 `double`       |
| `nextBoolean()` | 布林   | 讀取 `true` 或 `false` |

---

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Input your name: ");
        String name = scanner.nextLine(); // 讀入字串

        System.out.print("Input your age: ");
        int age = scanner.nextInt(); // 讀入整數

        System.out.printf("Hi, %s, you are %d\n", name, age);
    }
}
// Output:
// $ javac Main.java
// $ java Main
// Input your name: Bob
// Input your age: 12
// Hi, Bob, you are 12
```

## 2. if 條件判斷

```java
if (條件) {
    // 條件為 true 時執行
}
```

- 條件必須是布林值（`true` or `false`）
- 花括號 `{}` 可省略（不建議）

### 多種 if 寫法

1. 單一條件：超過 30 度就建議穿短袖

    ```java
    int temperature = 32;

    if (temperature > 30) {
        System.out.println("建議穿短袖");
    }
    ```

2. if-else（雙向選擇）：是否需要外套

    ```java
    int temperature = 18;

    if (temperature < 20) {
        System.out.println("建議穿外套");
    } else {
        System.out.println("今天不用外套");
    }
    ```

3. if - else if - else（多重選擇）：根據溫度給穿衣建議

    ```java
    int temperature = 25;

    if (temperature >= 30) {
        System.out.println("穿短袖+短褲");
    } else if (temperature >= 20) {
        System.out.println("穿長袖+牛仔褲");
    } else if (temperature >= 10) {
        System.out.println("加件外套比較保險");
    } else {
        System.out.println("建議穿大衣或羽絨衣");
    }
    ```

➤ 常見錯誤與陷阱

- 錯誤縮排誤導

    ```java
    if (n >= 60)
    System.out.println("及格了");
    System.out.println("恭喜你"); // 實際不屬於 if 區塊
    ```

    建議永遠使用 {} 包起來，避免誤會。

- 邊界條件要精準

    ```java
    int n = 90;
    if (n > 90) {        // 錯誤：90 不會進來
    System.out.println("優秀");
    }
    ```

    建議：確認好 > 與 >= 差異。

- 比較浮點數

    ```java
    double x = 1 - 0.9;
    if (Math.abs(x - 0.1) < 0.00001) {
        System.out.println("x 是 0.1");
    }
    ```

    千萬不要用 == 判斷浮點數是否相等。

- 比較字串內容

    > `==` 比較的是記憶體位置，不是內容

    ```java
    String s1 = "hello";
    String s2 = "HELLO".toLowerCase();

    if (s1 == s2) {
        System.out.println("錯誤：s1 == s2"); //  錯誤結果
    }
    ```

