const util = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSignAsync = util.promisify(jwt.sign);
const jwtVerifyAsync = util.promisify(jwt.verify);

async function routeProtection(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw Error('Token does not exist');

    const decoded = await jwtVerifyAsync(token, 'secret');
    req.user = decoded;

    return next();
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

async function loadToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw Error('Token does not exist.');

    const decoded = await jwtVerifyAsync(token, 'secret');

    const user = await User.findById(decoded.id);
    if (!user) throw Error('User does not exist.');

    res.status(200).send(token);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

async function signup(req, res, next) {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = await jwtSignAsync(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      'secret',
      {expiresIn: '24h'}
    );

    res.status(201).send(token);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw Error('Invalid credentials.');
    }
    const token = await jwtSignAsync(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      'secret',
      {expiresIn: '24h'}
    );

    res.status(200).send(token);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

module.exports = {routeProtection, loadToken, signup, login};
