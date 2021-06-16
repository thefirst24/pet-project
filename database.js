const mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/twitter';

const connection = mongoose.createConnection(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}); 

const UserSchema = new mongoose.Schema({
    username:String,
    hash:String,
    salt:String,
    admin:Boolean
});

const PostSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now }
})

const User = connection.model('User',UserSchema);
const Post = connection.model('Post',PostSchema);

module.exports.Post = Post;
module.exports.User = User;
module.exports.db_url = db_url;
module.exports.connection = connection;
