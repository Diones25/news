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

  if(password.length < 7) {
    req.flash('messageError', 'A senha é deve ter 8 ou mais caracteres!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  const user = await User.findOne({
    where: {
      email: email
    }
  });


  if(user) {
    req.flash('messageError', 'O usuário já existe!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const dataUser = {
    name,
    email, 
    status,
    password: hashPassword
  }    
  
  await User.create(dataUser);

  req.flash('message', 'Usuário adicionado com sucesso!')

  req.session.save(() => {
    res.redirect('/signup');
  })
}



module.exports = {
  signin,
  signup,
  signinCreate,
  signupCreate
}