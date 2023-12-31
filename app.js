const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const env=require('dotenv');
env.config();
const User=require('./models/user')
const errorController = require('./controllers/error');

const mongoConnect =require('./util/database').mongoConnect

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
 User.findById('649124b882f855f7c699a9ca')
 .then(user=>{
  req.user=new User(user.name,user.email,user.cart,user._id);
  next();
 })
 .catch(err=>{
  console.log(err)
 })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(()=>{
  
  app.listen(3000);
});

