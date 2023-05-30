
const showCreate = (req, res) => {
  res.render("pages/admin/create.ejs");
}

const create = (req, res) => {
  res.send('Admin cadastrar notícia')
}

const Showapprove = (req, res) => {
  res.render("pages/admin/aprove.ejs");
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