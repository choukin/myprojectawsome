const assert = require('assert')
const Todo = require('./todo')

const todo = new Todo();

let testsCompleted = 0

function deletetest(){
    todo.add('Delete me')

    assert.equal(todo.length, 1, '存在一个元素')

    todo.deleteAll()
    assert.equal(todo.length,0, '不存在项目')
    testsCompleted++
}


function addTest(){
    todo.deleteAll()
    todo.add('Added')
    assert.notEqual(todo.length, 0, '有一个项目')
    testsCompleted++
}

function doAsyncTest(cb){
    todo.doAsync(value =>{
        assert.ok(value, 'callback, should be passed true')
        testsCompleted++
        cb()
    })
}

function throwsTest(){
 assert.throws(todo.add, /需要一个/)
 testsCompleted++
}

deletetest()
addTest()
throwsTest()
doAsyncTest(()=>{
    console.log(`完成测试数量${testsCompleted}`)
})