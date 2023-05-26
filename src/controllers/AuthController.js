
const signin = (req, res) => {
  res.send('Redenriza a página de login');
}

const signup = (req, res) => {
  res.send('Redenriza página de cadastro de login')
}

const signinCreate = (req, res) => {
  res.send('Realiza o login');
}

const signupCreate = (req, res) => {
  res.send('Página de cadastro de login')
}



module.exports = {
  signin,
  signup,
  signinCreate,
  signupCreate
}