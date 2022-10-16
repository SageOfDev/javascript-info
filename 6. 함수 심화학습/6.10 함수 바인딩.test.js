/**
setTimeout에 메서드를 전달할 때처럼, 객체 메서드를 콜백으로 전달할 때 ’this 정보가 사라지는’ 문제가 생깁니다.
 */

describe('함수 바인딩', () => {
  /**
  객체 메서드가 객체 내부가 아닌 다른 곳에 전달되어 호출되면 `this` 가 사라집니다.
   */
  test("사라진 'this", async () => {
    let user = {
      firstName: 'John',
      sayHi() {
        console.log(`Hello, ${this.firstName}!`)
      }
    }

    await new Promise(resolve => {
      setTimeout(user.sayHi, 1000) // undefined
      resolve()
    })
  })
})