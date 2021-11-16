class User {
    constructor() {

    }
    get username() {
        return this.username
    }

    set username(username) {
        this.username = username
    }

    get password() {
        return this.password
    }

    set password(password) {
        this.password = password
    }
}

// module.exports = sequelize.define(
//     'user',
//     {
//         username: Sequelize.STRING,
//         password: Sequelize.STRING

//     }
// )

module.exports = Mongoose.model('user', {
    username: String,
    password: String
})