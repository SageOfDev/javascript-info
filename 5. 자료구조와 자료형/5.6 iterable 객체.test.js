/**
iterable 객체
  - for..of를 사용 가능한 객체
 - 배열을 일반화한 객체
 - Symbol.iterator(특수 내장 심볼) 메서드를 가지고 있는 객체

 Symbol.iterator
 - iterator(이터레이터)라는 객체를 반환하는 메서드

 iterator
 - 메서드 next가 있는 객체

 next
 - { done: Boolean, value: any } 객체를 반환하는 iterator의 메서드
 - `done = true` 는 반환이 종료되었음을 의미
 - `done = false` 는 value에 다음 값이 저장

 for..of
 - Symbol.iterator를 호출
 - 반환된 iterator만을 대상으로 동작

 array-like 유사배열
 - length 프로퍼티가 있는 객체

 `Array.from(obj[, mapFn, thisArg])`
 - iterable 객체나 array-like 객체로 배열을 만드는 메서드
 */

describe('iterable 객체', () => {
  let range = {
    from: 1,
    to: 5
  }

  range[Symbol.iterator] = function() {
    const iterator = {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ }
        } else {
          return {done: true }
        }
      }
    }
    return iterator
  }

  test('iterable 객체', () => {
    for (let num of range) {
      console.log(num)
    }
  })
  test('이터레이터를 명시적으로 호출하기', () => {
    let str = 'Hello'

    let iterator = str[Symbol.iterator]()

    while (true) {
      let result = iterator.next()
      if (result.done) break;
      console.log(result.value)
    }

  })
  test('Array.from', () => {
    let arrayLike = {
      0: 'Hello',
      1: "World",
      length: 2
    }

    let arr = Array.from(arrayLike)
    console.log(arr.pop())

    arr = Array.from(range)
    console.log(arr)

    arr = Array.from(range, num => num * num)
    console.log(arr)
  })
})

