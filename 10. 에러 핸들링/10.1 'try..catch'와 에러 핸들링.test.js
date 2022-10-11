/*
try..catch가 동작하지 못하는 경우
  - 실행 가능한 코드 중 발생하는 에러(runtime error or exception)에만 동작
    - 문법적으로 잘못된 경우(parse-time error)에는 동작하지 않음.
  - setTimeout 과 같이 스케줄 된 코드에는 동작 안함
    - try..catch가 동기적으로 동작하기 때문
    - 따라서 이러한 경우엔, setTimeout의 콜백 함수 내부에서 try..catch를 구현할 것.

에러 객체
  - error = {
    name,   // 에러 이름
    message,    // 에러의 상세 내용을 담고 있는 문자 메시지
    stack   // 현재 호출 스택. 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열로 디버깅 목적으로 사용됨. 널리 사용되는 비표준 프로퍼티.
  }

에러 핸들링을 하지 않은 경우 에러가 발생하면면 스크립트가 죽는다.

catch 블록 안에서 다시 던져진 에러는 try..catch 밖으로 던져진다. 밖에 try..catch가 있다면 여기서 에러를 잡는다. 아니면 스크립트가 죽는다.

finally는 try..catch절에 return이 있는 경우에도 반드시 실행된다.
 */
describe("'try..catch'와 에러 핸들링", () => {
  test('`try..catch` 사용하기', () => {
    let json = "{ bad json }"
    try {
      let user = JSON.parse(json)
      console.log(user.name)
    } catch (e) {
      console.log('데이터에 에러가 있어 재요청을 시도합니다.');
      console.log(e.name)
      console.log(e.message)
    }
  })

  test('직접 에러를 만들어서 던지기', () => {
    let json = '{ "age": 30 }'

    try {
      let user = JSON.parse(json)

      if (!user.name) {
        throw new SyntaxError('불완전한 데이터: 이름 없음')
      }

      console.log(user.name)
    } catch(e) {
      console.log('JSON Error: ' + e.message)
    }
  })

  test('다시 던지기', () => {
    function readData() {
      let json = '{ "age": 30 }'

      try {
        let user = JSON.parse(json)

        // if (!user.name) {
        //   throw new SyntaxError('불완전한 데이터: 이름 없음')
        // }

        blabla()

        console.log(user.name)
      } catch(e) {
        if (e instanceof SyntaxError) {
          console.log('JSON Error: ' + e.message)
        } else {
          throw e
        }
      }
    }

    try {
      readData()
    } catch (e) {
      console.log('External catch got: ' + e)
    }
  })
})
