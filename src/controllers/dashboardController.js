const User = require('../models/User.js');
const News = require('../models/News.js');
const chalk = require('chalk');
const moment = require('moment');

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

  try {
    
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

  } catch (error) {
    console.log(chalk.bgRedBright.black(`Aconteceu um erro: ${error}`));
  }  
}

const Showapprove = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });

  const news = await News.findAll({
    where: {
      status: "created"
    }
  }); 

  res.render("pages/admin/aprove.ejs", { user, news });
}

const approve = async (req, res) => {
  const { id } = req.body;

  try {

    const updateStatus = {
      status: "approved"
    }
  
    await News.update(updateStatus, {
      where: {
        id: id
      }
    });
  
    req.flash('message', 'Notícia aprovada com sucesso!')
  
    req.session.save(() => {
      res.redirect('/admin/aprove');
    });

  } catch (error) {
    console.log(chalk.bgRedBright.black(`Aconteceu um erro: ${error}`));
  }
}

const remove = async (req, res) => {
  const { id } = req.body;

  try {

    await News.destroy({
      where: {
        id: id
      }
    });

  req.flash('message', 'Notícia reprovada com sucesso!')

  req.session.save(() => {
    res.redirect('/admin/aprove');
  });

  } catch (error) {
    console.log(chalk.bgRedBright.black(`Aconteceu um erro: ${error}`));
  }
}

const approveDetails = async (req, res) => {
  const { id } = req.params 

  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });

  const news = await News.findOne({
    where: {
      id: id
    }
  }); 

  let date = news.updatedAt

  let data = moment(date).format("DD/MM/YYYY");

  res.render("pages/admin/aproveDetails.ejs", { user, news, data });
}

module.exports = {
  showCreate,
  create,
  Showapprove,
  approve,
  approveDetails,
  remove
}