const User = require('../models/User.js');
const News = require('../models/News.js');

const showCreate = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });
  res.render("pages/admin/create.ejs", { user }); 
}

const create = async (req, res) => {
  const { titulo, descricao } = req.body;
  const imagem = req.file;

  if(!titulo) {
    req.flash('messageError', 'O título da notícia é obrigatório!');
    req.session.save(() => {
      res.redirect('/admin/create');
    });
    return;
  }

  if(!descricao) {
    req.flash('messageError', 'A descrição da notícia é obrigatório!');
    req.session.save(() => {
      res.redirect('/admin/create');
    });
    return;
  }

  if(!imagem) {
    req.flash('messageError', 'A imagem da notícia é obrigatório!');
    req.session.save(() => {
      res.redirect('/admin/create');
    });
    return;
  }
  else {

    const user = await User.findOne({
      where: {
        id: req.session.userid
      }
    })
  
    if(user.status == "editor") {
      req.flash("messageError", "Você não tem permissão para realizar essa operação!");
  
      req.session.save(() => {
        res.redirect("/admin/create");
      });
    }
    else {
      
      const imagemFile = req.file.filename;

      const data = {
        titulo,
        descricao,
        imagem: imagemFile,
        status: "created",
        author: user.name,
        UserId: user.id
      }

      await News.create(data);

      req.flash('message', 'Notícia criada com sucesso!')

      req.session.save(() => {
        res.redirect('/admin/create');
      })

    }
  }  
}

const Showapprove = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });
  console.log("ID DO USUÁRIO LOGADO ==> ",user.id)
  console.log("ID DO USUÁRIO LOGADO ==> ",user.name)
  console.log("ID DO USUÁRIO LOGADO ==> ",user.email)
  console.log("ID DO USUÁRIO LOGADO ==> ",user.status)
  res.render("pages/admin/aprove.ejs", { user });
}

const approve = (req, res) => {
  res.send('Admin aprovar notícia')
}

const approveDetails = (req, res) => {
  res.send('Admin aprovar -> Detalhe da notícia')
}

module.exports = {
  showCreate,
  create,
  Showapprove,
  approve,
  approveDetails
}