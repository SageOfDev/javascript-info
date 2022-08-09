/*
객체 프로퍼티의 두 종류
  - 1) 데이터 프로퍼티(data property)
  지금까지 사용한 모든 프로퍼티는 데이터 프로퍼티
  - 2) 접근자 프로퍼티(accessor property)
  접근자 프로퍼티의 본질은 함수인데, 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당합니다. 그런데 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보입니다.

접근자 프로퍼티는 함수이나, 프로퍼티처럼 접근할 수 있다.

접근자 프로퍼티의 설명자는 다음과 같다.
  - get – 인수가 없는 함수로, 프로퍼티를 읽을 때 동작함
  - set – 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출됨
  - enumerable – 데이터 프로퍼티와 동일함
  - configurable – 데이터 프로퍼티와 동일함
 */
describe('프로퍼티와 getter와 setter', () => {
  test('getter와 setter', () => {
    let user = {
      name: 'John',
      surname: 'Smith',

      get fullName() {
        return `${this.name} ${this.surname}`
      },

      set fullName(value) {
        [this.name, this.surname] = value.split(" ")
      }

    }

    console.log(user.fullName)

    user.fullName = 'Alice Cooper'

    console.log(user.fullName)
  })
  test('접근자 프로퍼티 설명자', () => {
    let user = {
      name: 'John',
      surname: 'Smith'
    }

    Object.defineProperty(user, 'fullName', {
      get() {
        return `${this.name} ${this.surname}`
      },

      set(value) {
        [this.name, this.surname] = value.split(' ')
      },
      enumerable: true
    })

    console.log(user.fullName)
    for (let key in user) console.log(key)

/*
    Object.defineProperty({}, 'prop',{
      get() {
        return 1
      },

       value: 2
    })
    */
  })
  test('getter와 setter 똑똑하게 활용하기', () => {
    let user = {
      get name() {
        return this._name
      },

      set name(value) {
        if (value.length < 4) {
          console.log('입력하신 값이 너무 짧습니다.')
          return
        }
        this._name = value
      }
    }

    user.name = 'Pete'
    console.log(user.name)

    user.name = ""
  })
  test('호환성을 위해 사용하기', () => {
    function User(name, age) {
      this.name = name
      this.age = age
    }

    let john = new User('John', 25)

    console.log( john.age )
  })
})