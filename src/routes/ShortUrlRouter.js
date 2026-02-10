const router = require("express").Router();

const ShortUrlController = require("../controllers/ShortUrlController");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const validate = require("../middlewares/ZodValidationMiddleware");

const {
  createShortUrlSchema,
  codeParamSchema,
  paginationQuerySchema,
} = require("../validators/shortUrl.schema");

module.exports = class ShortUrlRouter {
  static get domain() {
    return "/api/v1/urls";
  }

  static setupRouter() {
    router.post(
      "/",
      validate(createShortUrlSchema, "body"),
      ShortUrlController.create,
      ResponseMiddleware.send,
    );

    router.get(
      "/",
      validate(paginationQuerySchema, "query"),
      ShortUrlController.list,
      ResponseMiddleware.send,
    );

    router.get(
      "/:code",
      validate(codeParamSchema, "params"),
      ShortUrlController.redirect,
    );

    return router;
  }
};
