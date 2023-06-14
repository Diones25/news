const News = require('../models/News.js');

//Esse método rendenriza a tela inicia do site 
// e é também onde terá a listagem de todas das notícias aprovadas
const home = (req, res) => {
  res.render("pages/news/home.ejs");
}

//Esse método redenriza os detalhes da notícia
const newsDetail = (req, res) => {
  res.render("pages/news/newsDetail.ejs");
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