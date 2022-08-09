/**
용도: `new` 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있다.

생성자 함수는 일반함수와 기술적인 차이는 없으나, 아래의 두 가지 관례를 따른다.
  - 함수 이름의 첫 글자는 대문자로 시작
  - 반드시 `new` 연산자를 붙여 실행

생성자 함수 알고리즘
  - 빈 객체를 만들어 this에 할당합니다.
  - 함수 본문을 실행합니다. this에 새로운 프로퍼티를 추가해 this를 수정합니다.
  - this를 반환합니다.
 */

describe('new 연산자와 생성자 함수', () => {
  test(' 생성자 함수', () => {
    function User(name) {
      this.name = name
      this.isAdmin = false
    }

    let user = new User('보라')

    console.log(user.name)
    console.log(user.isAdmin)
    console.log(typeof user)
  })
})