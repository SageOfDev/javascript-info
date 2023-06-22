/**
setTimeout에 메서드를 전달할 때처럼, 객체 메서드를 콜백으로 전달할 때 ’this 정보가 사라지는’ 문제가 생깁니다.
 */

describe('함수 바인딩', () => {
  let user = {
    firstName: 'John',
    sayHi() {
      console.log(`Hello, ${this.firstName}!`)
    }
  }

  /**
  객체 메서드가 객체 내부가 아닌 다른 곳에 전달되어 호출되면 `this` 가 사라집니다.
   */
  test("사라진 'this", () => {
    function callCb(cb) {
      cb()
    }

    callCb(user.sayHi)
  })

  /**
   * 모든 함수는 bind 메서드를 제공합니다.
   * bind 메서드는 함수 안에 this를 bind로 넘겨준 context로 고정시킵니다.
   */
  test("방법 2:bind", () => {
    function callCbWithBind(cb) {
      const boundCb = cb.bind(user)
      boundCb()
    }

    callCbWithBind(user.sayHi)
  })
})