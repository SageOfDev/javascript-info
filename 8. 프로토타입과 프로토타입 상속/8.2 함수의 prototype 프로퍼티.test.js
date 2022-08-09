/*
Rabbit.prototype = animal은 "new Rabbit을 호출해 만든 새로운 객체의 [[Prototype]]을 animal로 설정하라."는 것을 의미합니다.

 */
describe('함수의 prototype 프로퍼티', () => {
  test('프로토타입과 프로토타입 상속', () => {
    let animal = {
      eats: true
    }

    function Rabbit(name) {
      this.name = name
    }

    Rabbit.prototype = animal

    let rabbit = new Rabbit('흰 토끼')

    console.log(rabbit.eats)
  })
})