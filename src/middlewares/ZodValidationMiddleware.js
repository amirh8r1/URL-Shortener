module.exports =
  (schema, property = "body") =>
  async (req, res, next) => {
    try {
      req[property] = await schema.parseAsync(req[property]);
      next();
    } catch (error) {
      next({
        status: 422,
        message: "Validation error",
        errors: error.errors,
      });
    }
  };
