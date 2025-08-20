import createError from "../utils/createError.js";

const validBodyRequest = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    req.data = data;
    next();
  } catch (error) {
    console.log(error);
    // next(createError(400, "Invalid Data Required"));
    return res
      .status(400)
      .json({ "Invalid Data Request": JSON.stringify(error) });
  }
};
export default validBodyRequest;
