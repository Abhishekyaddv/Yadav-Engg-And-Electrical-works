import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js'; // Note the .js extension

dotenv.config();

// PASTE YOUR LONG CONNECTION STRING HERE IF .ENV FAILS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const createAdmin = async () => {
  const username = "admin"; 
  const password = "password123"; 

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    role: 'admin'
  });

  await newUser.save();
  console.log('✅ Admin Created Successfully');
  mongoose.connection.close();
};

createAdmin();