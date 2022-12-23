describe('함수의 prototype 프로퍼티', () => {
  /**
   * Rabbit.prototype = animal은 "new Rabbit을 호출해 만든 새로운 객체의 [[Prototype]]을 animal로 설정하라."는 것을 의미합니다.
   *
   * F.prototype은 F에 정의된 '일반' 프로퍼티다.
   */
  test('프로토타입과 프로토타입 상속', () => {
    let animal = {
      eats: true
    }

    function Rabbit(name) {
      this.name = name
    }

    let rabbit = new Rabbit('흰 토끼')

    console.log(rabbit.eats)
  })

  /**
   * 함수는 디폴트로 prototype 프로퍼티를 갖는다.
   * - 디폴트 prototype 프로퍼티는 constructor 프로퍼티를 갖고 있는 객체를 가리킨다.
   * - constructor 프로퍼티는 함수 자신을 가리킨다.
   *
   * 함수의 prototype 프로퍼티를 조작하지 않고 함수로 객체를 생성하는 경우, 해당 객체는 위의 constructor 프로퍼티를 갖는 객체를 프로토타입으로 한다.
   * - 따라서 생성된 객체의 constructor 는 생성한 함수를 가리킨다.
   */
  test('함수의 디폴트 프로퍼티 prototype과 constructor 프로퍼티', () => {
    function Rabbit() {}
    console.log(Rabbit.prototype.constructor === Rabbit )
    let rabbit = new Rabbit()
    console.log(rabbit.constructor === Rabbit)


    function Rabbit2(name) {
      this.name = name
      console.log(name)
    }
    rabbit = new Rabbit2('흰 토끼')
    let rabbit2 = new rabbit.constructor('검정 토끼')
  })

  test('도중에 F.prototype을 조작하는 경우 constructor 프로퍼티가 보장되지 않는다.', () => {
    function Rabbit() {}

    Rabbit.prototype = {
      jumps: true
    }
    let rabbit = new Rabbit()
    console.log(rabbit.constructor === Rabbit)

    // 이 경우 prototype 전체를 덮어쓰지 말고 프로퍼티를 추가 및 제거 하라.
    function Rabbit2() {}
    Rabbit2.prototype.jumps = true
    let rabbit2 = new Rabbit2()
    console.log(rabbit2.constructor === Rabbit2)

    // 아니면 다시 constructor을 만들어주면 된다.
    Rabbit.prototype.constructor = Rabbit
    console.log(rabbit.constructor === Rabbit)
  })
})
