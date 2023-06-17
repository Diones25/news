const newsController = require("../../src/controllers/newsController");
const News = require("../../src/models/News.js");

describe("News Controller", () => {
  describe("home()", () => {
    it("deve renderizar a página inicial", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      await newsController.home(req, res);

      expect(res.render).toHaveBeenCalledWith("pages/news/home.ejs", {
        news: expect.anything(),
      });
    });
  });

  describe("newsDetail()", () => {
    it("deve renderizar a página de detalhes da notícia", async () => {
      const req = {
        params: {
          id: 1, // Substitua pelo ID válido da notícia
        },
      };
      const res = {
        render: jest.fn(),
      };

      // Mock da função News.findOne
      const mockFindOne = jest.fn().mockResolvedValue({
        updatedAt: "2022-12-31", // Substitua pela data atualizada da notícia
      });
      News.findOne = mockFindOne;

      await expect(newsController.newsDetail(req, res)).resolves.not.toThrow();

      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          id: req.params.id,
        },
      });

      expect(res.render).toHaveBeenCalledWith("pages/news/newsDetail.ejs", {
        news: expect.objectContaining({
          updatedAt: expect.anything(),
        }),
        data: expect.any(String),
      });
    });
  });

  describe("lastedNews()", () => {
    it("deve renderizar a página de últimas notícias", async () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      await newsController.lastedNews(req, res);

      expect(res.render).toHaveBeenCalledWith("pages/news/lastedNews.ejs", {
        news: expect.anything(),
      });
    });
  });

  describe("about()", () => {
    it('deve renderizar a página "sobre"', () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.about(req, res);

      expect(res.render).toHaveBeenCalledWith("pages/news/about.ejs");
    });
  });

  describe("contact()", () => {
    it("deve renderizar a página de contato", () => {
      const req = {};
      const res = {
        render: jest.fn(),
      };

      newsController.contact(req, res);

      expect(res.render).toHaveBeenCalledWith("pages/news/contact.ejs");
    });
  });
});
