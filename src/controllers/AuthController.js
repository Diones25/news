
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
  //const { email, status, password } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const status = req.body.status;
  const password = req.body.password;

  console.log('Nome: ', name + '\n')
  console.log('Email: ', email + '\n')
  console.log('Status: ', status + '\n')
  console.log('Senha: ', password + '\n')
}



module.exports = {
  signin,
  signup,
  signinCreate,
  signupCreate
}