
const home = (req, res) => {
  res.render("home.ejs");
}

const newsDetail = (req, res) => {
  res.render("newsDetail.ejs");
}

const lastedNews = (req, res) => {
  res.render("lastedNews.ejs");
}

const about = (req, res) => {
  res.render("about.ejs");
}

const contact = (req, res) => {
  res.render("contact.ejs");
}

export default {
  home,
  newsDetail,
  lastedNews,
  about,
  contact
}