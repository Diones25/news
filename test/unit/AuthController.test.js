const authController = require('../../src/controllers/AuthController');
const User = require('../../src/models/User.js');

jest.mock('../../src/models/User.js', () => ({
  findOne: jest.fn(),
}));

describe('Controlador de Autenticação', () => {
  describe('signin()', () => {
    it('deve renderizar a página de login', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      authController.signin(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/admin/signin.ejs');
    });
  });

  describe('signup()', () => {
    it('deve renderizar a página de cadastro de login', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      authController.signup(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/admin/signup.ejs');
    });
  });

  describe('logout()', () => {
    it('deve destruir a sessão e redirecionar para a página de login', () => {
      const req = {
        session: {
          destroy: jest.fn(),
        },
      };
      const res = {
        redirect: jest.fn(),
      };

      authController.logout(req, res);

      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/signin');
    });
  });
});

  
