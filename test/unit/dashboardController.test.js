const dashboardController = require('../../src/controllers/dashboardController');

describe('Dashboard Controller', () => {
  describe('Showapprove()', () => {
    it('deve renderizar a página de aprovação de notícias', async () => {
      const req = {
        session: {
          userid: 1, // Substitua pelo ID válido do usuário
        },
      };
      const res = {
        render: jest.fn(),
      };

      await expect(dashboardController.Showapprove(req, res)).resolves.not.toThrow();

      expect(res.render).toHaveBeenCalledWith(
        'pages/admin/aprove.ejs',
        expect.objectContaining({ user: expect.anything(), news: expect.anything() })
      );
    });
  });

  describe('showCreate()', () => {
    it('deve renderizar a página de criação de notícias', async () => {
      const req = {
        session: {
          userid: 1, // Substitua pelo ID válido do usuário
        },
      };
      const res = {
        render: jest.fn(),
      };

      await expect(dashboardController.showCreate(req, res)).resolves.not.toThrow();

      expect(res.render).toHaveBeenCalledWith(
        'pages/admin/create.ejs',
        expect.objectContaining({ user: expect.anything() })
      );
    });
  });
});
