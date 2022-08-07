describe('call/apply와 데코레이터, 포워딩', () => {
  test('코드 변경 없이 캐싱 기능 추가하기', () => {
    function slow(x) {
      // CPU 집약적인 작업이 여기에 올 수 있음.
      console.log(`slow(${x})을/를 호출함`)
      return x
    }

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

    slow = cachingDecorator(slow)

    console.log( slow(1) )
    console.log( "다시 호출: " + slow(1) )

    console.log( slow(2) )
    console.log( "다시 호출: " + slow(2) )
  })

})