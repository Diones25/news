
const signin = (req, res) => {
  res.render("pages/admin/signin.ejs");
}

const signup = (req, res) => {
  res.render("pages/admin/signup.ejs");
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