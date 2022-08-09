/**
객체 프로퍼티는 값(value)과 함께 플래그(flag)라는 세 가지 속성을 갖는다
  - writable – true이면 값을 수정할 수 있습니다. 그렇지 않다면 읽기만 가능합니다.
  - enumerable – true이면 반복문을 사용해 나열할 수 있습니다. 그렇지 않다면 반복문을 사용해 나열할 수 없습니다.
  - configurable – true이면 프로퍼티 삭제나 플래그 수정이 가능합니다. 그렇지 않다면 프로퍼티 삭제와 플래그 수정이 불가능합니다.
 */

describe('프로퍼티 플래그와 설명자', () =>{
  let user = {
    name: "John"
  }

  test('프로퍼티 플래그',() => {
    let descriptor = Object.getOwnPropertyDescriptor(user, 'name')

    console.log(descriptor)
    console.log(JSON.stringify(descriptor, null, 2))


    user = {}
    Object.defineProperty(user, 'name', {
      value: 'John'
    })

    descriptor = Object.getOwnPropertyDescriptor(user, 'name')

    console.log(descriptor)
  })
  test('writable 플래그', () => {
    Object.defineProperty(user, 'name', {
      writable: false
    })

    user.name = 'Pete'
    console.log(user.name)


    user = {}

    Object.defineProperty(user, 'name', {
      value: 'John',
      enumerable: true,
      configurable: true
    })

    console.log(user.name)
    user.name = 'Pete'
    console.log(user.name)
  })
  test('configurable 플래그', ()=> {
    let user = {}

    Object.defineProperty(user, 'name', {
      value: 'John',
      writable: true,
      configurable: false
    })

    user.name = 'Pete'

    console.log(user.name)
    // Object.defineProperty(user, 'name', {writable: true})
  })
  test('Object.getOwnPropertyDescriptors', () => {
    let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user))
    console.log(Object.getOwnPropertyDescriptors(clone))
  })
})