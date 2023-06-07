const User = require('../models/User.js');
const News = require('../models/News.js');
const chalk = require('chalk');
const moment = require('moment');

//Esse método tem a função de redenrizar a
//tela que faz o cadastro de notícias
const showCreate = async (req, res) => {
  //aqui é feita uma pesquisa pelo usuário com o id da 
  //sessão do usuário logado para ser possóvel
  //fazer as validações na tela do front-end

  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });
  //rendenriza a tela e manda os dados do usuário para o front-end
  res.render("pages/admin/create.ejs", { user }); 
}

//Esse método tem a função de criar uma nova notícia
const create = async (req, res) => {
  /**
   * Os dados que precisa ser pego pelo formulário
    são o título, a descrição e a imagem
   */
  const { titulo, descricao } = req.body;
  const imagem = req.file;

  try {
    //Senha linha até a linha 49 são verificações se os dados estão sendo enviados
    //caso contrário uma mensagem de erro é mostrado na tela
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
      //Passado por todas as validações acima
      //é feita uma consulta pelo id da sessão do usuário logado
      // para enviar no objeto 'data' o nome do author e id da chave estrangeira
      //da tabela 'User'
      const user = await User.findOne({
        where: {
          id: req.session.userid
        }
      })
      //Essa validação verifica o status de acesso do usuário
      //se for um editor mostra uma mensagem de erro com a mensagem de que não pode realizar 
      // a operação e atualiza a tela
      if(user.status == "editor") {
        req.flash("messageError", "Você não tem permissão para realizar essa operação!");
    
        req.session.save(() => {
          res.redirect("/admin/create");
        });
      }
      else {
        //caso seja um status de aceso 'jornalista', ai pode ser feito o cadastro da notícia
        //criando o objeto 'data' com os dados que vai ser cadastrado no banco de dados 
        
        const imagemFile = req.file.filename;
  
        const data = {
          titulo,
          descricao,
          imagem: imagemFile,
          status: "created",
          author: user.name,
          UserId: user.id
        }
        //função assincrona que cadastra o objeto data
        //após o cadastro redireciona para a mesma tela e mostra
        //a mensagem de suceso
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

//Esse método tem a função de redenrizar 
//a tela de edição de notícias
const Showapprove = async (req, res) => {
  //pesquisa do usuário com o id da sessão para pegar os dados dele e enviar para o front-end e 
  //fazer as validações na tela 
  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });

  //Pesquisa a notícia com status de created para fazer a listagem na tela 
  //do editor
  const news = await News.findAll({
    where: {
      status: "created"
    }
  }); 

  //rendenriza a tela de aprovação de notícias com os dados de usuário de da notícia
  res.render("pages/admin/aprove.ejs", { user, news });
}

// Esse método tem a função de aprovar ou reprovar a notícia
const approve = async (req, res) => {
  const { id } = req.body;

  try {

    //Criando o objeto que vai ser enviado para o banco de dados
    const updateStatus = {
      status: "approved"
    }
    
    //Função assincrona que atualiza o status da notícia para aprovado
    //após feita a atualização o sistema redireciona para a tela de aprovação de notícias
    // e mostra a mensagem de sucesso
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

//esse método tem a função de remover a notícia caso ela seja reprovada
const remove = async (req, res) => {
  const { id } = req.body;

  try {

    //função assincrona que remove a notícia
    await News.destroy({
      where: {
        id: id
      }
    });
  //mostra a mensagem na tela
  req.flash('message', 'Notícia reprovada com sucesso!')

  req.session.save(() => {
    res.redirect('/admin/aprove');
  });

  } catch (error) {
    console.log(chalk.bgRedBright.black(`Aconteceu um erro: ${error}`));
  }
}

//Esse método tem a função de mostrar o detalhe da notícia na tela do editor
const approveDetails = async (req, res) => {
  const { id } = req.params 
  //pesquisa o usuário com o id da da sessão
  const user = await User.findOne({
    where: {
      id: req.session.userid
    }
  });
  //consulta a notícia comparando o id do body e o id que está no banco de dados
  const news = await News.findOne({
    where: {
      id: id
    }
  }); 
  //essa linha abaixo até a linha 206 é para configurar a exibição correta da data
  let date = news.updatedAt

  let data = moment(date).format("DD/MM/YYYY");

  //rendenriza a tela de detalhe de notícia e envia os dados de usuário, notícia e a data formatada
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