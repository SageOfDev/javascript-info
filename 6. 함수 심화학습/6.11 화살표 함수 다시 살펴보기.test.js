/*
출처: https://ko.javascript.info/arrow-functions

 */
describe('화살표함수 다시 살펴보기', () => {
  test("화살표 함수에는 'this'가 없습니다", () => {
    let group = {
      title: '1모둠',
      students: ['보라', '호진', '지민'],

      showList() {
        this.students.forEach(
          student => console.log(this.title + ': ' + student)
        )
      },
      showListV2() {
        this.students.forEach(
          function(student) {
            console.log(this.title + ': ' + student)
          }
        )
      }
    }

    group.showList()
    group.showListV2()

  })
  test("화살표 함수에는 'arguments'가 없습니다", () => {
    
  })

})