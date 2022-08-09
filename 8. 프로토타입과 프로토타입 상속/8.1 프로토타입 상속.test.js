/*
this를 코드 내에 포함하고 있는 프로토타입의 메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 this는 언제나 .앞에 있는 객체이다.
  ex) `admin.fullName=`으로 setter 함수를 호출할 때, this는 admin이다.

for...in은 상속 프로퍼티도 순회대상에 포함시킨다.
*/
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

    admin.fullName = 'Alice Copper'

    console.log(admin.fullName)
    console.log(user.fullName)
  })
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