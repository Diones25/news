const dashboardController = require("../../src/controllers/dashboardController");
const { approve } = require("../../src/controllers/dashboardController");
const User = require("../../src/models/User.js");
const News = require("../../src/models/News.js");

describe("Dashboard Controller", () => {
  describe("showCreate()", () => {
    it("deve renderizar a página de criação de notícias", async () => {
      const req = {
        session: {
          userid: 1, // Substitua pelo ID válido do usuário
        },
      };
      const res = {
        render: jest.fn(),
      };

      await expect(
        dashboardController.showCreate(req, res)
      ).resolves.not.toThrow();

      expect(res.render).toHaveBeenCalledWith(
        "pages/admin/create.ejs",
        expect.objectContaining({ user: expect.anything() })
      );
    });
  });

  describe("Showapprove()", () => {
    it("deve renderizar a página de aprovação de notícias", async () => {
      const req = {
        session: {
          userid: 1, // Substitua pelo ID válido do usuário
        },
      };
      const res = {
        render: jest.fn(),
      };

      await expect(
        dashboardController.Showapprove(req, res)
      ).resolves.not.toThrow();

      expect(res.render).toHaveBeenCalledWith(
        "pages/admin/aprove.ejs",
        expect.objectContaining({
          user: expect.anything(),
          news: expect.anything(),
        })
      );
    });
  });

  describe("approve()", () => {
    it("deve aprovar a notícia, atualizar o status e redirecionar para a página de aprovação de notícias", async () => {
      const req = {
        body: {
          id: 1,
        },
        flash: jest.fn(),
        session: {
          save: jest.fn().mockImplementationOnce((callback) => {
            callback();
          }),
        },
      };

      const res = {
        redirect: jest.fn(),
      };

      const mockUpdate = jest.spyOn(News, "update").mockResolvedValue(true);

      await expect(approve(req, res)).resolves.not.toThrow();

      expect(mockUpdate).toHaveBeenCalledWith(
        { status: "approved" },
        {
          where: {
            id: req.body.id,
          },
        }
      );

      expect(req.flash).toHaveBeenCalledWith(
        "message",
        "Notícia aprovada com sucesso!"
      );

      expect(req.session.save).toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 100)); // Aguardar a conclusão da função assíncrona

      expect(res.redirect).toHaveBeenCalledWith("/admin/aprove");
    });
  });

  it("deve remover a notícia e redirecionar para a página de aprovação de notícias", async () => {
    const req = {
      body: {
        id: 1, // Substitua pelo ID válido da notícia
      },
      flash: jest.fn(),
      session: {
        save: jest.fn((callback) => callback()),
      },
    };
    const res = {
      redirect: jest.fn(),
    };

    // Mock da função News.destroy
    const mockDestroy = jest.fn().mockResolvedValue(); // Simulando que a exclusão foi bem-sucedida
    News.destroy = mockDestroy;

    await expect(dashboardController.remove(req, res)).resolves.not.toThrow();

    expect(mockDestroy).toHaveBeenCalledWith({
      where: {
        id: req.body.id,
      },
    });

    expect(req.flash).toHaveBeenCalledWith(
      "message",
      "Notícia reprovada com sucesso!"
    );
    expect(res.redirect).toHaveBeenCalledWith("/admin/aprove");
    expect(req.session.save).toHaveBeenCalled();
  });

  describe("approveDetails()", () => {
    it("deve renderizar a página de detalhes da notícia", async () => {
      const req = {
        session: {
          userid: 1, // Substitua pelo ID válido do usuário
        },
        params: {
          id: 1, // Substitua pelo ID válido da notícia
        },
      };
      const res = {
        render: jest.fn(),
      };

      // Simulando as consultas ao banco de dados
      const user = {
        id: req.session.userid,
      };
      const news = {
        id: req.params.id,
        updatedAt: "2023-06-09T12:34:56.789Z",
      };

      // Definindo o comportamento esperado dos modelos
      User.findOne = jest.fn().mockResolvedValue(user);
      News.findOne = jest.fn().mockResolvedValue(news);

      await expect(
        dashboardController.approveDetails(req, res)
      ).resolves.not.toThrow();

      expect(res.render).toHaveBeenCalledWith(
        "pages/admin/aproveDetails.ejs",
        expect.objectContaining({ user, news, data: "09/06/2023" })
      );
    });
  });
});
