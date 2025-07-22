---
title: Java 流程控制 (Control Flow)
cover: /images/java/Java-Logo.jpg
sticky: false
tags: [Java]
categories: [Java 基本語法]
order: 2
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

- `System.in`: 標準輸入 (鍵盤)
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

## 2. 條件判斷

### if 條件判斷

```java
if (條件) {
    // 條件為 true 時執行
}
```

- 條件必須是布林值（`true` or `false`）
- 花括號 `{}` 可省略（不建議）

#### 多種 if 寫法

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

    > `==` 比較的是**記憶體位置**，不是內容

    ```java
    String s1 = "hello";
    String s2 = "HELLO".toLowerCase();

    if (s1 == s2) {
        System.out.println("錯誤：s1 == s2"); //  錯誤結果
    }
    ```

    > 用 `.equals()` 比較字串內容

    ```java
    if (s1.equals(s2)) {
    System.out.println("正確：s1 equals s2");
    }
    ```

- 避免 NullPointerException

    ```java
    String s1 = null;

    if (s1 != null && s1.equals("hello")) {
        System.out.println("安全使用 equals");
    }
    ```

    or

    ```java
    if ("hello".equals(s1)) {
        System.out.println("更安全");
    }
    ```

### switch ... case

列舉單選，表示只會擇一執行一段程式

- 錯誤寫法，沒有 `break`

    ```java
    int status = 2;
    switch (status) {
        case 1:
            System.out.println("Pending");
        case 2:
            System.out.println("Approved");
        case 3:
            System.out.println("Rejected");
    }
    ```

- 正確寫法:

    ```java
    switch (status) {
    case 1:
        System.out.println("Pending");
        break;
    case 2:
        System.out.println("Approved");
        break;
    case 3:
        System.out.println("Rejected");
        break;
    }
    ```

    或者使用 Java 12+ 新式寫法：

    ```java
    switch (status) {
    case 1 -> System.out.println("Pending");
    case 2 -> System.out.println("Approved");
    case 3 -> System.out.println("Rejected");
    }
    ```

## 3. 迴圈

| 語法           | 適合情境                  | 最少執行次數  |
| ------------ | --------------------- | ------- |
| `for`        | 已知次數（如跑 1\~100）       | 0 次     |
| `while`      | 不確定次數，但可能為 0（如等使用者輸入） | 0 次     |
| `do...while` | 至少要跑一次再判斷（如顯示提示再輸入）   | **1 次** |

### while 迴圈

```java
while (條件判斷) {
    敘述
}
```

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int n = 0;
        while (n <= 100) {
            n++;
            sum = sum + n;
        }
        System.out.println(sum); // 5050
    }
}
```

而當循環條件永遠滿足，將會形成死循環，占用 CPU

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int n = 1;

        // while n 為正，持續累加直到溢位（超過 Integer.MAX_VALUE）
        while (n > 0) {
            sum += n;
            n++;
        }

        // 輸出溢位發生後的 n 與累加結果
        System.out.println("Overflowed n = " + n); // 將顯示負數
        System.out.println("Sum before overflow = " + sum);
    }
}
```

### do...while

`do while` 循環會先執行循環才會進行條件判斷，所以至少一定會循環一次

```java
do {
    敘述
} while (條件判斷);
```

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int n = 1;
        do {
            sum = sum + n;
            n ++;
        } while (n <= 100)
        System.out.println(sum);
    }
}
```

### for 迴圈

`for` 迴圈算是最常用到的迴圈了，使用計數器就能實現循環

```java
for (初始值設定; 條件判斷; 循環後更新計數器) {
    敘述
}
```

```java
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i=1; i<=100; i++) {
            sum = sum + i;
        }
        System.out.println(sum);
    }
}
```

常用到的場景就是對整個數組所有元素求和:

```java
public class Main {
    public static main(String[] args) {
        int[] numbers = {1, 4, 9, 16, 25};
        int sum = 0
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("i = " + i + ", number[i] = " + ns[i]);
            sum = sum + numbers[i];
        } 
        System.out.println("sum = " + sum);
    }
}
```

- `for` 迴圈甚至可以缺少初值設定、條件判斷、計次 (但我沒用過)

    ```java
    for (int i=0; ; i++) {
        ...
    }
    ```

    ```java
    for (int i=0; ;) {
        ...
    }
    ```

    ```java
    for (;;) {
        ...
    }
    ```

### for each

實際在寫程式的時候，`for` 常常會拿來遍瀝數組，通過計數器可以根據 idex 個別依序取出每個元素：

```java
int[] ns = { 1, 4, 9, 16, 25 };
for (int i=0; i<ns.length; i++) {
    System.out.println(ns[i]);
}
```

而 `for each` 迴圈能夠簡單的達到一樣的效果：

```java
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) {
            System.out.println(n);
        }
    }
}
```

| 比較項目        | `for`（傳統寫法）                            | `for-each`（增強型 for）               |
| ----------- | -------------------------------------- | --------------------------------- |
|  語法結構     | `for (int i = 0; i < arr.length; i++)` | `for (int n : arr)`               |
|  可取得索引    |  可取得 `i` 索引值                          |  無法取得索引                          |
|  可控制範圍與步長 |  可自訂起點、終點、步長（例如 `i+=1`）               |  固定從頭到尾，每次一個元素                   |
|  可修改原陣列內容 |  可直接修改 `arr[i]`                       |  修改 `n` 不會影響原陣列                  |
|  資料結構支援   | 支援所有可用 `i` 訪問的結構，如陣列                   | 支援所有 **Iterable**（陣列、List、Set...） |
|  使用時機     | 當你需要**控制流程或操作索引**                      | 當你只需要**讀取每個元素**（更簡潔）              |

```java
int[] arr = {1, 2, 3};
for (int i = 0; i < arr.length; i++) {
    arr[i] *= 2; // 可以修改原陣列
    System.out.println("Index " + i + ": " + arr[i]);
}
```

```java
int[] arr = {1, 2, 3};
for (int n : arr) {
    n *= 2; // 不會影響 arr 陣列
    System.out.println("Value: " + n);
}
```
---

### Java 8 的 Lambda

> Java 8 引入了 lambda 表達式 和 Streams API，它們主要是為了讓集合操作更簡潔、更函數式（functional）。

- 傳統 for：

```java
for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
}
```

- 增強 for-each：

```java
for (String s : list) {
    System.out.println(s);
}
```

- lambda 表達式：

```java
list.forEach(s -> System.out.println(s));
```

## 4. break and continue

### `break` 與 `continue` 的差異（Java）

| 語句         | 功能                 | 用法時機          |
| ---------- | ------------------ | ------------- |
| `break`    | **跳出整個目前所在的迴圈**    | 條件達成後不再繼續執行循環 |
| `continue` | **跳過本次循環，直接進入下一輪** | 某些條件下「略過」本輪邏輯 |

- `break`：找到第一個能被7整除的數

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 7 == 0) {
                System.out.println("First divisible by 7: " + i);
                break;
            }
        }
    }
}
```

- `continue`：只印出奇數

```java
public class Main {
    publvic static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // 偶數跳過
            }
            System.out.println("Odd: " + i);
        }
    }
}
```

> 注意
> - break 和 continue 只能用在迴圈內部（for / while / do while）。
> - break 只會跳出一層迴圈，若有巢狀結構，只跳離當前層。
> - 避免過度使用，否則會使邏輯變得難以閱讀。
