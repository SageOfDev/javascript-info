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

  test('함수의 디폴트 프로퍼티 prototype과 constructor 프로퍼티', () => {
    function Rabbit() {}

    console.log(Rabbit.prototype.constructor === Rabbit )


    let rabbit = new Rabbit()

    console.log(rabbit.constructor === Rabbit)


    function Rabbit(name) {
      this.name = name
      console.log(name)
    }

    rabbit = new Rabbit('흰 토끼')

    let rabbit2 = new rabbit.constructor('검정 토끼')


    Rabbit.prototype.jumps = true
  })
  test('함수의 디폴트 프로퍼티 prototype과 constructor 프로퍼티', () => {
    function Rabbit() {}

    console.log(Rabbit.prototype.constructor === Rabbit )


    let rabbit = new Rabbit()

    console.log(rabbit.constructor === Rabbit)


    function Rabbit(name) {
      this.name = name
      console.log(name)
    }

  })
})