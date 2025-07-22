---
title: Java 物件導向設計 Object Oriented Design (OOD) 
cover: /images/java/Java-Logo.jpg
date: 2025-07-13 21:44:12
sticky: false
tags: [Java, 物件導向設計]
categories: [Java 基本語法]
order: 1
layout: post
published: true
---

何謂「物件導向設計」？物件導向是一種思維，把程式的資料與與操作資料的函數包裝成「物件」，並透過類別(class) 來定義。

Java是一種純物件導向語言，幾乎由物件組成(除了原始型別如:int、 boolean 等)。

## 一、物件導向簡介

- **目的**：建構可重用、可維護的軟體結構
- **核心價值**：
  - 降低耦合（低依賴）
  - 提高內聚（專注單一職責）
  - 提高重用性與可維護性
- **核心原則**：抽象、封裝、繼承、多型

---

## 二、類別與物件

| 概念       | 定義 | 說明                                     |
| ---------- | ---- | ---------------------------------------- |
| `Class`    | 類別 | 抽象的定義，如模版、藍圖                 |
| `Object`   | 物件 | 類別實例化後的實體，有**狀態**與**行為** |
| `Instance` | 實例 | 某個類別所生成的物件（幾乎等同 Object）  |

### Java 範例

```java
class Person {
    String name;
    void greet() { System.out.println("Hello!"); }
}

Person p = new Person(); // p 為 Person 類別的實例
```

---

## 三、四大特性（Abstraction, Encapsulation, Inheritance, Polymorphism）

### 封裝（Encapsulation）

- 隱藏實作細節，只暴露介面
- 使用 `private` 成員 + `getter/setter` 方法

```java
class BankAccount {
    private int balance;
    public int getBalance() { return balance; }
    public void deposit(int amount) { if (amount > 0) balance += amount; }
}
```

---

### 繼承（Inheritance）

- 子類別可繼承父類別屬性與方法

```java
class Animal {
    void move() { System.out.println("Moving"); }
}
class Dog extends Animal {
    void bark() { System.out.println("Woof"); }
}
```

---

### 多型（Polymorphism）

- 相同方法，不同行為（依物件型別而異）
- 分為：
  - **靜態多型**（Overloading）
  - **動態多型**（Overriding）

```java
// Overloading
void print(int a) {}
void print(String b) {}

// Overriding
class Animal { void sound() { System.out.println("Animal sound"); } }
class Cat extends Animal {
    @Override
    void sound() { System.out.println("Meow"); }
}
```

---

### 抽象（Abstraction）

- 使用 `abstract class` 或 `interface`
- 只定義行為規格，不寫具體內容

```java
abstract class Shape {
    abstract double area();
}

interface Drawable {
    void draw();
}
```

---

## 四、關係關聯（UML 中的重要觀念）

| 關係型態 | 英文           | 說明                          |
| -------- | -------------- | ----------------------------- |
| 依賴     | Dependency     | 暫時使用，不需持有物件參考    |
| 關聯     | Association    | 長期關係，需持有參考（has-a） |
| 聚合     | Aggregation    | 組成關係，但子物件可獨立存在  |
| 合成     | Composition    | 強組成，生命周期一致          |
| 泛化     | Generalization | 繼承（is-a）                  |

---

## 五、static / final 補充

| 修飾詞   | 用途                         |
| -------- | ---------------------------- |
| `static` | 屬於類別本身，不需實例化     |
| `final`  | 常數或不可被覆寫的方法或類別 |

---

## 六、設計流程：從需求轉為設計

1. **分析需求敘述中的名詞** → 類別、屬性候選
2. **分析動詞** → 方法候選
3. **繪製類別圖**
4. **重新驗證需求是否被完整轉換**
