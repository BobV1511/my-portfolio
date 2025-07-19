// server/models/user.model.js
import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  hashed_password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  salt: {
    type: String,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true  
});

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;

    if (password && password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.');
    }
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hashed_password = crypto
      .createHmac('sha256', this.salt)
      .update(password)
      .digest('hex');
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods.authenticate = function(plainText) {
  const hash = crypto
    .createHmac('sha256', this.salt)
    .update(plainText)
    .digest('hex');
  return hash === this.hashed_password;
};
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.hashed_password;
  delete obj.salt;
  return obj;
};

export default mongoose.model('User', UserSchema);
