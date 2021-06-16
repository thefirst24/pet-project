const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/twitter';

const connection = mongoose.createConnection(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}); 

const UserSchema = new mongoose.Schema({
    username:String,
    hash:String,
    salt:String 
});

const User = connection.model('Users',UserSchema);

module.exports.User = User;
module.exports.db_url = db_url;
module.exports.connection = connection;
