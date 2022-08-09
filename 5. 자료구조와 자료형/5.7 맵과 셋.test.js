/**

- 객체: 키(문자열, 심볼형)가 있는 컬렉션을 저장함
- 배열: 순서가 있는 컬렉션을 저장함

맵(Map)은 객체와 비슷하나 키에 자료형 제약이 없다는 차이가 존재

맵의 메서드와 프로퍼티
  - new Map(entries) – 맵을 만듭니다.
  - map.set(key, value) – key를 이용해 value를 저장합니다.
  - map.get(key) – key에 해당하는 값을 반환합니다. key가 존재하지 않으면 undefined를 반환합니다.
  - map.has(key) – key가 존재하면 true, 존재하지 않으면 false를 반환합니다.
  - map.delete(key) – key에 해당하는 값을 삭제합니다.
  - map.clear() – 맵 안의 모든 요소를 제거합니다.
  - map.size – 요소의 개수를 반환합니다.

맵의 메서드와 프로퍼티 - 반복 작업
  - map.keys() – 각 요소의 키를 모은 반복 가능한(iterable, 이터러블) 객체를 반환합니다.
  - map.values() – 각 요소의 값을 모은 이터러블 객체를 반환합니다.
  - map.entries() – 요소의 [키, 값]을 한 쌍으로 하는 이터러블 객체를 반환합니다. 이 이터러블 객체는 for..of반복문의 기초로 쓰입니다.


셋(Set)은 중복을 허용하지 않는 값을 모아놓은 특별한 컬렉션
  - 셋은 값의 유일무이함을 확인하는데 최적화

셋의 메서드 및 프로퍼티
  - new Set(iterable) – 셋을 만듭니다. 이터러블 객체를 전달받으면(대개 배열을 전달받음) 그 안의 값을 복사해 셋에 넣어줍니다.
  - set.add(value) – 값을 추가하고 셋 자신을 반환합니다.
  - set.delete(value) – 값을 제거합니다. 호출 시점에 셋 내에 값이 있어서 제거에 성공하면 true, 아니면 false를 반환합니다.
  - set.has(value) – 셋 내에 값이 존재하면 true, 아니면 false를 반환합니다.
  - set.clear() – 셋을 비웁니다.
  - set.size – 셋에 몇 개의 값이 있는지 세줍니다.

셋의 메서드 및 프로퍼티 - 반복 작업
  - set.keys() – 셋 내의 모든 값을 포함하는 이터러블 객체를 반환합니다.
  - set.values() – set.keys와 동일한 작업을 합니다. 맵과의 호환성을 위해 만들어진 메서드입니다.
  - set.entries() – 셋 내의 각 값을 이용해 만든 [value, value] 배열을 포함하는 이터러블 객체를 반환합니다. 맵과의 호환성을 위해 만들어졌습니다.
 */

describe('맵과 셋', () => {
  test('맵', () => {
    let map = new Map()

    map.set('1', 'str1')
      .set(1, 'num1')
      .set(true, 'boo1')

    console.log(map.get(1))
    console.log(map.get('1'))
    console.log(map.size)


    let john = { name: 'John' }
    let visitsCountMap = new Map()

    visitsCountMap.set(john, 123)

    console.log(visitsCountMap.get(john))
  })
  test('맵의 요소에 반복 작업하기', () => {
    let recipeMap = new Map([
      ['cucumber', 500],
      ['tomatoes', 350],
      ['onion', 50]
    ])

    for (let vegetable of recipeMap.keys()) {
      console.log(vegetable)
    }

    for (let amount of recipeMap.values()) {
      console.log(amount)
    }

    for (let entry of recipeMap) {
      console.log(entry)
    }

    recipeMap.forEach( (value, key, map) => {
      console.log(`${key}: ${value}`)
    })
  })
  test('Object.entries: 객체를 맵으로 바꾸기', () => {
    let map = new Map([
      ['1', 'str1'],
      [1, 'num1'],
      [true, 'bool1']
    ])

    console.log( map.get('1') )


    let obj = {
      name: 'John',
      age: 30
    }

    map = new Map(Object.entries(obj))

    console.log(map.get('name'))
  })
  test('Object.fromEntries: 맵을 객체로 바꾸기', () => {
    let prices = Object.fromEntries([
      ['banana', 1],
      ['orange', 2],
      ['meat', 4]
    ])

    console.log(prices)


    let map = new Map()
    map.set('banana', 1)
      .set('orange', 2)
      .set('meat', 4)

    let obj = Object.fromEntries( map.entries() )
    // let obj = Object.fromEntries( map ) // iterable 객체를 인수로 받으며, map의 디폴트 iterable은 map.entries()

    console.log(obj)
  })

  test('셋', () => {
    let set = new Set();

    let john = { name: 'John' }
    let pete = { name: 'Pete' }
    let mary = { name: 'Mary' }

    set.add(john)
      .add(pete)
      .add(mary)
      .add(john)
      .add(mary)

    console.log( set.size )

    for (let user of set) {
      console.log(user.name)
    }
  })
  test('셋의 값에 반복 작업하기', () => {
    let set = new Set(['oranges', 'apples', 'bananas'])

    for (let value of set) console.log(value)

    set.forEach((value, valueAgain, set) => {
      console.log(value)
    })
  })
});