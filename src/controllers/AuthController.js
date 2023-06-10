const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

//Rendenriza a tela de login
const signin = (req, res) => {
  res.render("pages/admin/signin.ejs");
}

//Rendenriza a tela de cadastro de login
const signup = (req, res) => {
  res.render("pages/admin/signup.ejs");
}

//Faz o login no sistema
const signinCreate = async (req, res) => {
  const { email, password } = req.body;

  //Se não for enviado o email pelo formulário, mostra uma mensagem de erro
  if(!email) {
    req.flash('messageError', 'Email é obrigatório!');
    req.session.save(() => {
      res.redirect('/signin');
    });
    return;
  }

  //Se não for enviado a senha pelo formulário, mostra uma mensagem de erro
  if(!password) {
    req.flash('messageError', 'A senha é obrigatória!');
    req.session.save(() => {
      res.redirect('/signin');
    });
    return;
  }

  //Faz uma busca de um usuário pelo email do usuário que está fazendo o login
  const user = await User.findOne({
    where: {
      email: email
    }
  })

  //Se o usuário não existir no banco de dados, será mostrado uma mensagem de erro
  if(!user) {
    req.flash('messageError', 'Usuário não encontrado!')

    req.session.save(() => {
      res.redirect('/signin');
    })
    return;
  }

  //Essa variável recebe o resultado da comparação entre a senha
  //que está sendo enviada pelo formulário 'password', 
  //e a senha que está no banco de dados 'user.password'.
  const passwordMatch = bcrypt.compareSync(password, user.password);

  //Se as duas senhas não corresponderem, será mostrado uma mensagem de erro
  if(!passwordMatch) {
    req.flash('messageError', 'Email ou Senha incorreta!')

    req.session.save(() => {
      res.redirect('/signin');
    })
    return;
  }

  //Depois de passar por todas as validações acima, uma sessão será criada
  //com o ID do usuário conectado

  req.session.userid = user.id;

  //Essa busca é necessária para buscar o status de acesso
  //do usuário que está se conectando ao sistema
  const userStatus = await User.findOne({
    where: {
      id: req.session.userid
    }
  })

  //Se o status de acesso for 'jornalista', então vai direto para a tela de cadastro de notícias
  if(userStatus.status == "jornalista") {
    req.flash("message", "Login realizado com sucesso!");

    req.session.save(() => {
      res.redirect("/admin/create");
    });
  }
  //Se o status de acesso for 'editor', então vai direto para a tela de aprovação/reprovação de notícias
  else {
    req.flash("message", "Login realizado com sucesso!");

    req.session.save(() => {
      res.redirect("/admin/aprove");
    });
  }
}

//Este método tem a função de criar um novo usuário 
const signupCreate = async (req, res) => {
  const { name, email, status, password } = req.body;

  //Verifica se o nome do novo usuário foi inserido, caso contrário mostra a mensagem de erro
  if(!name) {
    req.flash('messageError', 'Nome é obrigatório!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }
  
  //Verifica se o tipo de acesso foi inserido, caso contrário mostra a mensagem de erro
  if(!status) {
    req.flash('messageError', 'O nível de acesso é obrigatório!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  //Verifica se o email do novo usuário foi inserido, caso contrário mostra a mensagem de erro
  if(!email) {
    req.flash('messageError', 'Email é obrigatório!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  //Verifica se a senha do novo usuário foi inserida, caso contrário mostra a mensagem de erro
  if(!password) {
    req.flash('messageError', 'A senha é obrigatória!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  //Verifica se o tamanho mínimo da senha é maior que 7, ou seja, deve ter no mínimo 8 caracteres,
  //caso contrário mostra a mensagem de erro
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

  //Se o usuário que está sendo criado já existe no banco de dados, então será mostrado uma mensagem de erro
  if(user) {
    req.flash('messageError', 'O usuário já existe!');
    req.session.save(() => {
      res.redirect('/signup');
    });
    return;
  }

  //Após passar por todas as validações, a senha que foi enviada pelo formulário será
  //criptografada (hashPassword)
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  //Objeto com os dados do usuário que será cadastrado no banco de dados
  const dataUser = {
    name,
    email, 
    status,
    password: hashPassword
  }    
  
  //A função assíncrona abaixo cadastra um novo usuário; mostra uma
  //mensagem de feedback; redireciona para a mesma página de cadastro
  //de usuário e mostra uma mensagem de sucesso.
  await User.create(dataUser);

  req.flash('message', 'Usuário adicionado com sucesso!')

  req.session.save(() => {
    res.redirect('/signup');
  })
}

//A função abaixo pega a sessão da requisição e a fecha 
//fazendo o logout no sistema
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/signin'); 
}

module.exports = {
  signin,
  signup,
  signinCreate,
  signupCreate,
  logout
}