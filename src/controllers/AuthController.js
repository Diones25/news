
const showcreate = (req, res) => {
  res.send('Redenriza página de cadastro de login')
}

const create = (req, res) => {
  res.send('Página de cadastro de login')
}

const showLogin = (req, res) => {
  res.send('Redenriza a página de login');
}

const login = (req, res) => {
  res.send('Realiza o login');
}

module.exports = {
  showcreate,
  create,
  showLogin,
  login
}