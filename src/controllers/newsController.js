
const home = (req, res) => {
  res.render("pages/news/home.ejs");
}

const newsDetail = (req, res) => {
  res.render("pages/news/newsDetail.ejs");
}

const lastedNews = (req, res) => {
  res.render("pages/news/lastedNews.ejs");
}

const about = (req, res) => {
  res.render("pages/news/about.ejs");
}

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