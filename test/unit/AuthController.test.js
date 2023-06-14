const authController = require('../../src/controllers/AuthController');

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

  describe('signupCreate()', () => {
    let req;
    let res;
    let redirectMock;
  
    beforeEach(() => {
      req = {
        body: {},
        flash: jest.fn(),
        session: {
          save: jest.fn(),
        },
      };
      redirectMock = jest.fn();
      res = {
        redirect: redirectMock,
      };
    });
  
    it('deve redirecionar para a página de cadastro de login com mensagem de erro se o nome não for fornecido', async () => {
      await authController.signupCreate(req, res);
  
      expect(req.flash).toHaveBeenCalledWith('messageError', 'Nome é obrigatório!');
      expect(req.session.save).toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
  
      // Verificar o redirecionamento somente após o session.save()
      req.session.save.mockImplementationOnce(callback => {
        callback();
        expect(redirectMock).toHaveBeenCalledWith('/signup');
      });
    });
  
    it('deve redirecionar para a página de cadastro de login com mensagem de erro se o status de acesso não for fornecido', async () => {
      req.body.name = 'John Doe'; // Nome fornecido
      await authController.signupCreate(req, res);
  
      expect(req.flash).toHaveBeenCalledWith('messageError', 'O nível de acesso é obrigatório!');
      expect(req.session.save).toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
  
      // Verificar o redirecionamento somente após o session.save()
      req.session.save.mockImplementationOnce(callback => {
        callback();
        expect(redirectMock).toHaveBeenCalledWith('/signup');
      });
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
