const router = require("express").Router();

const HelloWorldController = require("../controllers/HelloWorldController");

const ResponseMiddleware = require("../middlewares/ResponseMiddleware");

module.exports = class HelloWorldRouter {
  static get domain() {
    return "/api/v1";
  }

  static setupRouter() {
    router.get("/", HelloWorldController.sayHello, ResponseMiddleware.send);

    return router;
  }
};
