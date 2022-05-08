const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

function passwordConfirmValidator(val) {
  return val === this.password;
}

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 60,
      // select: false
    },
    passwordConfirm: {
      type: String,
      require: true,
      required: true,
      minLength: 8,
      maxLength: 60,
      validate: [passwordConfirmValidator, 'Passwords do not match.'],
    },
    // passwordReset: String,
    // passwordResetExpiresIn: Date,
    // passwordChangedAt: Date,
    photo: {
      type: String,
      default: 'userImageDefault.jpg',
    },
    role: {
      type: String,
      default: 'user',
    },
  }
  // {
  //   toJSON: {virtuals: true, transform: removeFields},
  //   toObject: {virtuals: true, transform: removeFields},
  // }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
