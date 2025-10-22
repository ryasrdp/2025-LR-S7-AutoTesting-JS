Chai — это популярная библиотека утверждений (assertions) для JavaScript, часто используемая вместе с инструментами тестирования, такими как Mocha. Chai предоставляет несколько стилей утверждений для разного подхода к тестированию: `assert`, `expect` и `should`. Она обладает множеством методов и цепочек для выполнения различных проверок.

Вот подробное описание основных возможностей библиотеки Chai:

---

## Основные стили Chai

1. **Assert (Традиционный стиль)**:
   Используется привычный стиль утверждений, который напоминает проверку на истинность.
   ```javascript
   const assert = require('chai').assert;

   assert.equal(4 + 4, 8, '4 + 4 должно быть равно 8');
   assert.isTrue(true, 'Значение должно быть true');
   assert.isNull(null, 'Значение должно быть null');
   assert.deepEqual({ a: 1 }, { a: 1 }, 'Объекты должны быть одинаковыми');
   ```

2. **Expect (Более современный стиль)**:
   Более выразительный стиль, предоставляющий компактные и "читаемые" проверки.
   ```javascript
   const expect = require('chai').expect;

   expect(4 + 4).to.equal(8);
   expect('chai').to.be.a('string');
   expect([1, 2, 3]).to.include(2);
   ```

3. **Should (Читаемый в виде "человеческого" языка)**:
   Абсолютно такая же функциональность, как у `expect`, но требует модификации объекта-прототипа.
   ```javascript
   const should = require('chai').should(); // Активирует стиль should

   (4 + 4).should.equal(8);
   'chai'.should.be.a('string');
   ```

---

## Ключевые методы и проверочные фразы Chai

Общие методы работают во всех стилях (`assert`, `expect`, `should`).

### Проверки типов:
- **to.be.a(type)** и **to.be.an(type)**:
  Проверяет, является ли объект соответствующим типом.
  ```javascript
  expect('string').to.be.a('string');
  expect([]).to.be.an('array');
  ```

- **assert.typeOf(object, type)**:
  ```javascript
  assert.typeOf('chai', 'string', 'Объект должен иметь тип string');
  ```

### Проверка равенства:
- **to.equal(value)** (строгое равенство):
  ```javascript
  expect(4 + 4).to.equal(8);
  ```

- **to.eql(value)** (глубокое равенство):
  ```javascript
  expect({ a: 1 }).to.eql({ a: 1 });
  ```
  Для стиля `assert`:
  ```javascript
  assert.deepEqual({ a: 1 }, { a: 1 });
  ```

### Проверка содержимого:
- **to.include(value)**:
  Проверяет, содержит ли массив или строка указанное значение.
  ```javascript
  expect([1, 2, 3]).to.include(2);
  ```

- **to.have.keys(keys)**:
  Проверяет наличие указанных ключей в объекте.
  ```javascript
  expect({ a: 1, b: 2 }).to.have.keys('a', 'b');
  ```

### Сравнение:
- **to.be.above(value)** / **to.be.greaterThan(value)**:
  Проверяет, что число больше указанного.
  ```javascript
  expect(10).to.be.above(5);
  ```

- **to.be.at.least(value)**:
  Проверяет, что число больше или равно указанному.
  ```javascript
  expect(5).to.be.at.least(5);
  ```

- **to.be.below(value)** / **to.be.lessThan(value)**:
  Проверяет, что число меньше указанного.
  ```javascript
  expect(3).to.be.below(5);
  ```

- **to.be.at.most(value)**:
  Проверяет, что число меньше или равно указанному.
  ```javascript
  expect(5).to.be.at.most(5);
  ```

### Булевы проверки:
- **to.be.true** / **to.be.false**:
  ```javascript
  expect(true).to.be.true;
  expect(false).to.be.false;
  ```

- **to.be.null**:
  Проверяет, что значение — `null`.
  ```javascript
  expect(null).to.be.null;
  ```

- **to.be.undefined**:
  Проверяет, что значение — `undefined`.
  ```javascript
  expect(undefined).to.be.undefined;
  ```

### Проверка длин и размеров:
- **to.have.lengthOf(value)**:
  Проверяет длину строки или массива.
  ```javascript
  expect('chai').to.have.lengthOf(4);
  expect([1, 2, 3]).to.have.lengthOf(3);
  ```

---

## Дополнительные методы

### Цепочки:
Chai предоставляет "гладкий" API благодаря поддержке цепочек: `to`, `be`, `have`, `with`, `that`, `is`, `which`, `and`.
  ```javascript
  expect([1, 2, 3]).to.be.an('array').that.includes(2);
  ```

### Проверка исключений:
Для проверки успешного выбрасывания исключений используется метод `throws`.
  ```javascript
  expect(() => { throw new Error('ошибка'); }).to.throw('ошибка');
  ```

---

## Плагины и кастомизация

Chai поддерживает множество плагинов, например:
- **chai-as-promised** для работы с обещаниями (Promises).
- **chai-spies** для тестирования шпионов (spies) или фальшивых функций.

Пример использования `chai-as-promised`:
```javascript
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const promise = new Promise((resolve, reject) => resolve(42));

expect(promise).to.eventually.equal(42);
```

---
