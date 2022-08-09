
describe('프로토타입 상속', () => {
  let animal = {
    eats: true,
    walk() {
      console.log('동물이 걷습니다.')
    }
  }
  let rabbit = {
    jumps: true,
    __proto__: animal
  }
  test('[[Prototype]]', () => {
    let longEar = {
      earLength: 10,
      __proto__: rabbit
    }

    console.log(rabbit.eats)
    console.log(rabbit.jumps)

    rabbit.walk()

    longEar.walk()
    console.log(longEar.jumps)
  })
  test('프로토타입은 읽기 전용이다', () => {
    rabbit.walk = function() {
      console.log('토끼가 깡충깡충 뜁니다.')
    }

    rabbit.walk()
  })
  }
)