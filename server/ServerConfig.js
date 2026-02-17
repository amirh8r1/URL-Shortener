module.exports = function () {
  process.env.CONNECTION_PROTOCOL = "http";

  process.env.PORT = process.env.HTTP_DEVELOPMENT_PORT;

  process.env.URL =
    process.env.CONNECTION_PROTOCOL +
    "://" +
    process.env.DOMAIN +
    (process.env.NODE_ENV === "development" ? ":" + process.env.PORT : "");
};
