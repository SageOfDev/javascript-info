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
  // rabbit.__proto__ = animal 이 코드도 동일함
  /**
   * [[Prototype]]
   * - JS의 모든 객체가 갖는 숨김 프로퍼티
   * - 값은 null이거나 다른 객체에 대한 참조
   * - 다른 객체를 참조하는 경우, 참조 대상을 '프로토타입'이라 부름
   * - 숨김 프로퍼티이나 __proto__ 프로퍼티를 사용하여 값을 설정할 수 있음
   *
   * 프로토타입 상속
   * - 객체에 읽으려는 프로퍼티가 없으면, 프로토타입의 프로퍼티를 찾는 동작 방식
   *
   * 프로토타입 체이닝 제약사항
   * 1. 순환 참조 불가
   * 2. __proto__의 값은 null이나 객체만 가능하며, 다른 자료형은 무시됨
   */
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


    let user = {
      name: 'John',
      surname: 'Smith',

      set fullName(value) {
        [this.name, this.surname] = value.split(' ')
      },

      get fullName() {
        return `${this.name} ${this.surname}`
      }
    }

    let admin = {
      __proto__: user,
      isAdmin: true
    }

    console.log(admin.fullName)

    admin.fullName = 'Alice Copper' // setter 함수가 실행됨

    console.log(admin.fullName)
    console.log(user.fullName)
  })

  /**
   * this는 프로토타입에 영향을 받지 않는다.
   * - 메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 this는 언제나 .앞에 있는 객체이다.
   *   ex) `admin.fullName=`으로 setter 함수를 호출할 때, this는 admin이다.
   */
  test('this가 나타내는 것', () => {
    let animal = {
      walk() {
        if (!this.isSleeping) {
          console.log('동물어 걸어갑니다.')
        }
      },
      sleep() {
        this.isSleeping = true
      }
    }

    let rabbit = {
      name: '하얀 토끼',
      __proto__: animal
    }

    rabbit.sleep()

    console.log(rabbit.isSleeping)
    console.log(animal.isSleeping)

  })

  /**
   * for...in은 상속 프로퍼티도 순회대상에 포함시킨다.
   */
  test('for...in 반복문',() => {
    console.log(Object.keys(rabbit))
    // for (let prop in rabbit) console.log(prop)


    for (let prop in rabbit) {
      let isOwn = rabbit.hasOwnProperty(prop)

      if (isOwn) {
        console.log(`객체 자신의 프로퍼티: ${prop}`)
      } else {
        console.log(`상속 프로퍼티: ${prop}`)
      }
    }
  })
})
