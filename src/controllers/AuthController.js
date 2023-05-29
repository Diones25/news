const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const signin = (req, res) => {
  res.render("pages/admin/signin.ejs");
}

const signup = (req, res) => {
  res.render("pages/admin/signup.ejs");
}

const signinCreate = (req, res) => {
  res.send('Realiza o login');
}

const signupCreate = async (req, res) => {
  const { name, email, status, password } = req.body;

  if(!name) {
    req.flash('messageError', 'Nome é obrigatório!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  if(!status) {
    req.flash('messageError', 'O nível de acesso é obrigatório!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  if(!email) {
    req.flash('messageError', 'Email é obrigatório!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  if(!password) {
    req.flash('messageError', 'A senha é obrigatória!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

   // const user = await User.findOne({
  //   where: {
  //     email: email
  //   }
  // });


  // if(user.email) {
  //   console.log('O email já existe!')
  //   console.log(user.email)
  // }

  const dataUser = {
    name,
    email, 
    status
  }
}



module.exports = {
  signin,
  signup,
  signinCreate,
  signupCreate
}