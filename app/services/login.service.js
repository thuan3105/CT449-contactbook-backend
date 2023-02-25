const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class loginService{
authenticate = async (username, password) => {
    console.log(username);
    console.log(password);
    this.Contact = client.db().collection('user');
    const user = await this.Contact.findOne({ username });
    console.log(user);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
};
}
module.exports = loginService;