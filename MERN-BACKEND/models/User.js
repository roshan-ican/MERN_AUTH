const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
    maxlength: 50,
    match: /^[A-Za-z ]+$/,
  },
  emailAddress: {
    type: String,
    required: false,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
    match: /^\d{10}$/,
  },
  address: {
    type: String,
    required: false,
    maxlength: 100,
  },
  city: {
    type: String,
    required: false,
    maxlength: 50,
    match: /^[A-Za-z ]+$/,
  },
  state: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  securityQuestion: {
    type: String,
    required: false,
  },
  securityAnswer: {
    type: String,
    required: false,
    maxlength: 100,
  },
});
module.exports = mongoose.model('User', userSchema)
