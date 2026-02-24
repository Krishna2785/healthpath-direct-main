import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from '../models/User.js';

function buildTokenPayload(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
}

function signToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(buildTokenPayload(user), process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

export async function signup(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        },
      });
    }

    const { name, email, password } = req.body;

    console.log('Signup request received:', {
      name,
      email,
    });

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        error: {
          message: 'User with this email already exists',
        },
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: 'USER',
    });

    console.log('User being saved:', {
      name: user.name,
      email: user.email,
    });

    const savedUser = await user.save();

    console.log('User saved successfully:', {
      id: savedUser._id,
      email: savedUser.email,
    });

    const token = signToken(savedUser);

    return res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        },
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: {
          message: 'Invalid email or password',
        },
      });
    }

    const token = signToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
}

