const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/twitter';

const connection = mongoose.createConnection(db_url);

const UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

const Users = connection.model('Users',UserSchema);

const createUser = (username, password) => {
    Users.create({
        username,
        password
    })
}
module.exports.Users = Users;
module.exports.createUser = createUser;
module.exports.db_url = db_url;
