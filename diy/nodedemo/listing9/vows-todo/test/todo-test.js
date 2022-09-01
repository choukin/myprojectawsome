const vows = require('vows')
const assert = require('node:assert')

const Todo = require('../../todo')

vows.describe('Todo').addBatch({ // 批次
    '添加一个元素':{ // 情景
        topic:()=>{ //  主题
            const todo = new Todo();
            todo.add('Feed my cat')
            return todo
        },
        '在列表中存在':(er, todo)=>{ // 誓约
            assert.equal(todo.length, 1)
        }
    }
}).export(module)