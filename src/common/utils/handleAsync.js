import createError from "./createError.js";

// function long function
const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};
export default handleAsync;
