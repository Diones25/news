const newsController = require('../../src/controllers/newsController');

describe('News Controller', () => {
  describe('home()', () => {
    it('deve renderizar a página inicial', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.home(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/news/home.ejs');
    });
  });

  describe('newsDetail()', () => {
    it('deve renderizar a página de detalhes da notícia', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.newsDetail(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/news/newsDetail.ejs');
    });
  });

  describe('lastedNews()', () => {
    it('deve renderizar a página de últimas notícias', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.lastedNews(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/news/lastedNews.ejs');
    });
  });

  describe('about()', () => {
    it('deve renderizar a página "sobre"', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.about(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/news/about.ejs');
    });
  });

  describe('contact()', () => {
    it('deve renderizar a página de contato', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.contact(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/news/contact.ejs');
    });
  });
});
