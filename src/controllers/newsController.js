const News = require('../models/News.js');
const moment = require('moment');

//Esse método rendenriza a tela inicia do site 
// e é também onde terá a listagem de todas das notícias aprovadas
const home = async (req, res) => {
  const news = await News.findAll({
    where: {
      status: "approved"
    }
  });

  res.render("pages/news/home.ejs", { news });
}

//Esse método redenriza os detalhes da notícia
const newsDetail = async (req, res) => {
  const { id } = req.params

  const news = await News.findOne({
    where: {
      id: id
    }
  });

  let date = news.updatedAt

  let data = moment(date).format("DD/MM/YYYY"); 

  res.render("pages/news/newsDetail.ejs", { news, data }); 
  
}

//Esse método rendenriza uma nova tela com as últimas notícias cadastrada
//da notícia mais atual até a mais antiga
const lastedNews = async (req, res) => {
  const news = await News.findAll({
    where: {
      status: "approved"
    },
    order: [['id', 'DESC']]
  });

  res.render("pages/news/lastedNews.ejs", { news });
}

//Redenriza a tela sobre
const about = (req, res) => {
  res.render("pages/news/about.ejs");
}

//Renderiza a tela de contato
const contact = (req, res) => {
  res.render("pages/news/contact.ejs");
}

module.exports = {
  home,
  newsDetail,
  lastedNews,
  about,
  contact
}