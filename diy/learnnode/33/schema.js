const { buildSchema } = require('graphql');
const mockDatabase = {
    1:{
        id: 1,
        avatar: "https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg",
        name: "僵尸浩",
        isTop: true,
        content: "哈哈哈哈",
        publishDate: "今天",
        commentNum: 10,
        praiseNum: 5
    },
    2:{
        id: 2,
        avatar: "https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg",
        name: "僵尸粉",
        isTop: true,
        content: "哈哈哈哈",
        publishDate: "昨天",
        commentNum: 10,
        praiseNum: 5
    },
    3:{
        id: 3,
        avatar: "https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg",
        name: "浩",
        isTop: true,
        content: "哈哈哈哈",
        publishDate: "一年前",
        commentNum: 10,
        praiseNum: 5
    }
}

const schema = buildSchema(`
    type Comment{
        id:Int,
        avatar: String,
        name: String,
        isTop: Boolean,
        content:String,
        publishDate: String,
        commentNum:Int,
        praiseNum:Int,
    },
    type Query{
        comment:[Comment]
    }
    type Mutation{
    praise(id:Int):Int
    }
`)
schema.getQueryType().getFields().comment.resolve=()=>{
return Object.keys(mockDatabase).map(key=>{
    return mockDatabase[key]
})
}

schema.getMutationType().getFields().praise.resolve=(argr0,{id})=>{
    console.log(arguments);
  mockDatabase[id].praiseNum++;
  return mockDatabase[id].praiseNum
}

module.exports = schema