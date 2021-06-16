const crypto = require('crypto');

const genPassword = (password) => {
    let salt = crypto.randomBytes(32).toString("hex");
    let genHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');

    return {
        salt,
        hash: genHash
    }
}

const validPassword = (password,hash,salt) => {
    let hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');

    return hashVerify == hash;
} 

module.exports.genPassword = genPassword;
module.exports.validPassword = validPassword;