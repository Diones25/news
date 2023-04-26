
const showCreate = (req, res) => {
  res.send('Redenriza Admin cadastrar notícia')
}

const create = (req, res) => {
  res.send('Admin cadastrar notícia')
}

const Showapprove = (req, res) => {
  res.send('Redenriza Admin aprovar notícia')
}

const approve = (req, res) => {
  res.send('Admin aprovar notícia')
}

const approveDetails = (req, res) => {
  res.send('Admin aprovar -> Detalhe da notícia')
}

export default {
  showCreate,
  create,
  Showapprove,
  approve,
  approveDetails
}