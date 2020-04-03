import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  // create Hashpassword

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  // Compare Password
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  // isValidEmail Helper Method
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  // Generate Token
  generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET, {
      expiresIn: '7d'
    });
    return token;
  }
};

export default Helper;
