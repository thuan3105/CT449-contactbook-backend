// const { compare } = require('bcrypt');

class LoginService {
  constructor(client) {
    this.User = client.db().collection('user');
  }
  async login(username, password) {
    const user = await this.User.findOne({ username });
    if (!user) {
      throw new Error('Sai username');
    }
    // const isMatch = await compare(password, user.password);
    var checkPass = false;
    if(password == user.password){
      checkPass = true;
    }
    if (!checkPass) {
      throw new Error('Sai password');
    }
    console.log('Login Success');
    return { user };
  }
}

module.exports = LoginService;
