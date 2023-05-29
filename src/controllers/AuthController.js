
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
  const { name, email, status, password } = req.body;

  const user = {
    name,
    email, 
    status
  }
}



module.exports = {
  signin,
  signup,
  signinCreate,
  signupCreate
}