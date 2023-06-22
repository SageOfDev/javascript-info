/**
커스텀에러 클래스는 Error를 상속받는 것이 낫다.
  - throw의 인수엔 아무런 제약이 없기 때문에 커스텀 에러 클래스는 반드시 Error를 상속할 필요가 없다.
  - 하지만, 상속한다면 obj instanceof Error를 사용해서 에러 객체를 식별할 수 있다는 장점.
 */
describe('커스텀 에러와 에러 확장', () => {
  test('에러 확장하기', () => {
    class ValidationError extends Error {
      constructor(message) {
        super(message)
        this.name = "validationError"
      }
    }
    function readUser(json) {
      let user = JSON.parse(json)

      if (!user.age) {
        throw new ValidationError('No field: age')
      }
      if (!user.name) {
        throw new ValidationError('No field: name')
      }

      return user
    }

    try {
        let user = readUser('{ "age": 25 }')
      } catch(e) {
        if (e instanceof ValidationError) {
          console.log('Invalid data: ' + e.message)
        } else if (err instanceof SyntaxError) {
          console.log('JSON Syntax Error: ' + e.message)
        } else {
          throw e
        }
      }
  })

  class MyError extends Error {
    constructor(message) {
      super(message)
      this.name = this.constructor.name
    }
  }

  class ValidationError extends MyError { }

  class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super('No property: ' + property)
      this.property = property
    }
  }
  test('더 깊게 상속하기', () => {
    function readUser(json) {
      let user = JSON.parse(json)

      if (!user.age) {
        throw new PropertyRequiredError('age')
      }
      if (!user.name) {
        throw new PropertyRequiredError('name')
      }

      return user
    }

    try {
      let user = readUser('{ "age": 25 }')
    } catch(e) {
      if (e instanceof ValidationError) {
        console.log('Invalid data: ' + e.message)
        console.log(e.name)
        console.log(e.property)
      } else if (e instanceof SyntaxError) {
        console.log('JSON Syntax Error: ' + e.message)
      } else {
        throw e
      }
    }
  })

  /**
   위 함수 readUser 다음 문제를 가지고 있다.
   - 앞으로 readUser가 커지면서 새로운 커스텀 에러 클래스가 생성된다면, 호출 부분이 모두 수정되어야 한다.(호출하는 곳이 1억개라고 생각해보아라...)

   예외 감싸기(wrapping exception): 예외를 감싸는 포괄적인 에러 클래스를 만들고 호출 부분에선 해당 클래스만 처리하면 된다.
   1. '데이터 읽기'와 같은 포괄적인 에러를 대변하는 새로운 에러 클래스(ReadError)를 만듬
   2. 함수 readUser에서 발생하는 ValidationError, SyntaxError 등의 에러는 readUser 내부에서 잡고 이때 ReadError를 생성
    3. ReadError 객체의 cause 프로퍼티엔 실제 에러에 대한 참조가 저장
   */
  test('예외 감싸기', () => {
    class ReadError extends Error {
      constructor(message, cause) {
        super(message)
        this.cause = cause
        this.name = 'ReadError'
      }
    }

    function validateUser(user) {
      if (!user.age) {
        throw new PropertyRequiredError('age')
      }
      if (!user.name) {
        throw new PropertyRequiredError('name')
      }
    }

    function readUser(json) {
      let user

      try {
        user = JSON.parse(json)
      } catch (e) {
        if (e instanceof SyntaxError) {
          throw new ReadError('Syntax Error', e)
        } else {
          throw e
        }
      }

      try {
        validateUser(user)
      } catch (e) {
        if (e instanceof ValidationError) {
          throw new ReadError('Validation Error', e)
        } else {
          throw e
        }
      }
    }

    try {
      readUser('{잘못된 형식의 json}')
    } catch (e) {
      if (e instanceof ReadError) {
        console.log(e)
        console.log('Original error: ', e.cause)
      } else {
        throw e
      }
    }
  })
})
