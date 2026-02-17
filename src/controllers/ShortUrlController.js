const ShortUrlService = require("../services/ShortUrlService");

module.exports = class ShortUrlController {
  static async create(req, res, next) {
    const { url, ttlMinutes } = req.body;

    const result = await ShortUrlService.create({
      originalUrl: url,
      ttlMinutes,
    });

    next({
      status: 201,
      data: result,
    });
  }

  static async redirect(req, res, next) {
    const { code } = req.params;

    const url = await ShortUrlService.resolve(code);

    if (!url) {
      return next({
        status: 404,
        message: "Short url not found or expired",
      });
    }

    res.redirect(url);
  }

  static async list(req, res, next) {
    const { page, limit } = req.query;

    const result = await ShortUrlService.list({ page, limit });

    next({
      status: 200,
      data: result,
    });
  }
};
