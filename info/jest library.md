Jest — это мощный фреймворк для тестирования JavaScript, который предоставляет встроенные функции для написания тестов и проверки утверждений (assertions). Jest имеет собственный DSL (Domain Specific Language), используя его, можно писать тесты значительно проще и удобнее, чем используя только стандартные методы. Jest поддерживает проверку значений, объектов, исключений, типов данных, асинхронных операций, моков и многое другое.

Вот детальное руководство по проверкам в Jest:

---

## Основные функции тестирования в Jest

Jest предоставляет глобальные функции, такие как `test` или `it` для описания теста, и `expect` для выполнения проверок.

- **`test` и `it`**: Используются для записи тестов. `test` и `it` — это взаимозаменяемые функции.
  ```javascript
  test('добавление числа', () => {
    expect(1 + 2).toBe(3);
  });

  it('вычитание числа', () => {
    expect(3 - 2).toBe(1);
  });
  ```

- **`expect`**: Основной метод для проверки значений и выполнения обоснованных утверждений.

---

## Проверки (Matchers) в Jest

Jest предоставляет несколько категорий матчеров:

### 1. **Простые проверки значений**
- **`toBe(expected)`**:
  Проверяет точное (===) соответствие значений.
  ```javascript
  expect(4 + 4).toBe(8);
  expect('Hello').toBe('Hello');
  ```

- **`toEqual(expected)`**:
  Проверяет глубокое (рекурсивное) равенство значений (для объектов и массивов).
  ```javascript
  expect({ a: 1 }).toEqual({ a: 1 });
  expect([1, 2, 3]).toEqual([1, 2, 3]);
  ```

- **`not`**:
  Инвертирует утверждение.
  ```javascript
  expect(5).not.toBe(10);
  expect({ a: 1 }).not.toEqual({ b: 1 });
  ```

---

### 2. **Проверки булевых значений**
- **`toBeTruthy()` / `toBeFalsy()`**:
  Проверяет, соответствует ли значение булевому значению `true` или `false`.
  ```javascript
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
  ```

- **`toBeNull()`**:
  Проверяет, является ли значение `null`.
  ```javascript
  expect(null).toBeNull();
  ```

- **`toBeUndefined()`**:
  Проверяет, является ли значение `undefined`.
  ```javascript
  expect(undefined).toBeUndefined();
  ```

- **`toBeDefined()`**:
  Проверяет, что значение определено.
  ```javascript
  expect(42).toBeDefined();
  ```

---

### 3. **Проверки чисел**
- **`toBeGreaterThan(number)`**:
  Проверяет, что значение больше указанного.
  ```javascript
  expect(10).toBeGreaterThan(5);
  ```

- **`toBeGreaterThanOrEqual(number)`**:
  Указывает, что значение больше или равно указанному.
  ```javascript
  expect(10).toBeGreaterThanOrEqual(10);
  ```

- **`toBeLessThan(number)`**:
  Проверяет, что значение меньше указанного.
  ```javascript
  expect(5).toBeLessThan(10);
  ```

- **`toBeLessThanOrEqual(number)`**:
  Проверяет, что значение меньше или равно указанному.
  ```javascript
  expect(5).toBeLessThanOrEqual(5);
  ```

- **`toBeCloseTo(number, digits)`**:
  Проверяет числа с плавающей запятой с учетом округления.
  ```javascript
  expect(0.1 + 0.2).toBeCloseTo(0.3, 5); // точность до 5 знаков
  ```

---

### 4. **Проверки на строки**
- **`toMatch(regex | string)`**:
  Проверяет, соответствует ли строка регулярному выражению или включает ли другую строку.
  ```javascript
  expect('jest is great').toMatch(/jest/);
  expect('jest is cool').toMatch('cool');
  ```

---

### 5. **Проверки массивов и объектов**
- **`toContain(value)`**:
  Проверяет, содержит ли массив или строка значение.
  ```javascript
  expect(['apple', 'banana']).toContain('banana');
  ```

- **`toHaveProperty(key, value)`**:
  Проверяет, имеет ли объект указанный ключ (и опционально значение).
  ```javascript
  expect({ a: 1, b: 2 }).toHaveProperty('a');
  expect({ a: 1, b: 2 }).toHaveProperty('b', 2);
  ```

---

### 6. **Проверки исключений**
- **`toThrow()`**:
  Проверяет, выбрасывает ли функция исключение.
  ```javascript
  expect(() => { throw new Error('Ошибка'); }).toThrow('Ошибка');
  ```

---

### 7. **Проверки асинхронности**
Jest поддерживает тестирование асинхронных кодов через `async/await` или возвращение Promise.

#### Примеры с `async` и `await`:
```javascript
test('Обещание возвращает ожидаемое значение', async () => {
  const asyncValue = async () => 'Hello Jest';
  await expect(asyncValue()).resolves.toBe('Hello Jest');
});
```

#### Пример с `toReject`:
```javascript
test('Обещание отклоняется', async () => {
  const asyncValue = async () => {
    throw new Error('Ошибка');
  };
  await expect(asyncValue()).rejects.toThrow('Ошибка');
});
```

---

## Дополнительные возможности Jest

### 1. Моки и шпионы
Jest имеет встроенные функции мока (mocking) и шпионов для создания поддельных функций.

#### Пример: Использование моков:
```javascript
const mockFunc = jest.fn();

mockFunc(10);
expect(mockFunc).toHaveBeenCalled();
expect(mockFunc).toHaveBeenCalledWith(10);
```

---

### 2. Снэпшоты
Jest позволяет создавать снэпшоты (snapshots) для проверки сложных объектов, компонентов или UI.

```javascript
test('проверка объекта на совпадение со снэпшотом', () => {
  const user = { name: 'John', age: 30 };
  expect(user).toMatchSnapshot();
});
```

---

Jest — это мощный инструмент для тестирования, который сочетает в себе простоту и функциональность. Он включен "из коробки" и располагает множеством утилит для проверки поведения кода.