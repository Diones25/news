//Esse método rendenriza a tela inicial do site
// e é também onde terá a listagem de todas das notícias aprovadas
const home = (req, res) => {
  res.render("pages/news/home.ejs");
};

//Esse método redenriza os detalhes da notícia
const newsDetail = (req, res) => {
  res.render("pages/news/newsDetail.ejs");
};

//Esse método rendenriza uma nova tela com as últimas notícias cadastradas.
//As notícias são listadas da mais atual para a mais antiga
const lastedNews = (req, res) => {
  res.render("pages/news/lastedNews.ejs");
};

//Redenriza a tela 'sobre'
const about = (req, res) => {
  res.render("pages/news/about.ejs");
};

//Renderiza a tela de 'contato'
const contact = (req, res) => {
  res.render("pages/news/contact.ejs");
};

module.exports = {
  home,
  newsDetail,
  lastedNews,
  about,
  contact,
};
