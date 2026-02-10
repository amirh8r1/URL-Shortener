module.exports = class HelloWorldController {
  static async sayHello(req, res, next) {
    next({
      status: 200,
      message: "Hello World!"
    })
  }
};
