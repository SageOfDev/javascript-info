describe('call/apply와 데코레이터, 포워딩', () => {
  function cachingDecorator(func) {
    let cache = new Map()

    return function(x) {
      if (cache.has(x)) {
        return cache.get(x)
      }

      let result = func(x)

      cache.set(x, result)
      return result
    }
  }

  /*
  cachingDecorator같이 인수로 받은 함수의 행동을 변경시켜주는 함수를 데코레이터(decorator) 라고 부릅니다.
   */
  test('코드 변경 없이 캐싱 기능 추가하기', () => {
    function slow(x) {
      // CPU 집약적인 작업이 여기에 올 수 있음.
      console.log(`slow(${x})을/를 호출함`)
      return x
    }

    slow = cachingDecorator(slow)

    console.log( slow(1) )
    console.log( "다시 호출: " + slow(1) )

    console.log( slow(2) )
    console.log( "다시 호출: " + slow(2) )
  })

  /*
  캐싱 데코레이터는 객체 메서드에 사용하기 적합하지 않다.
   */
  test("'func.call'를 사용해 컨텍스트 지정하기", () => {
    let worker = {
      someMethod() {
        return 1
      },

      slow(x) {
        // CPU 집약적인 작업이라 가정
        console.log(`slow(${x})을/를 호출함`)
        return x * this.someMethod();
      }
    }

    // console.log(worker.slow(1))
    // worker.slow = cachingDecorator(worker.slow)
    // // console.log(worker.slow(2)) // this의 컨텍스트 사라져서 에러가 발생함
    //
    //
    // function sayHi() {
    //   console.log(this.name)
    // }
    //
    // let user = { name: 'John' }
    // let admin = { name: 'Admin' }
    //
    // sayHi()
    // sayHi.call(user)
    // sayHi.call(admin)
    //
    //
    // function say(phrase) {
    //   console.log(this.name + ': ' + phrase)
    // }
    //
    // say.call(user, "Hello" )

    function cachingDecoratorWithCall(func) {
      let cache = new Map()
      return (x) => {
        if (cache.has(x)) {
          return cache.get(x)
        }
        let result = func.call(this, x)
        cache.set(x, result)
        return result
      }
    }

    worker.slow = cachingDecoratorWithCall(worker.slow)
    console.log(worker.slow(2))
    console.log(worker.slow(2))
  })
})