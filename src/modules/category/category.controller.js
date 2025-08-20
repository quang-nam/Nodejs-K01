import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/createError.js";
import createResponse from "../../common/utils/createResponse.js";
import handleAsync from "../../common/utils/handleAsync.js";
import categoryModel from "./category.model.js";
import categorySchema from "./category.schema.js";
import { findByIdCategory } from "./category.service.js";

// logic that cua controller, logic khac chi la lap lai
export const createCategory = handleAsync(async (req, res, next) => {
  // validate data
  const validation = categorySchema.parse(req.body);
  if (!validation) {
    return next(createError(400, MESSAGES.CATEGORY.CREATE_FAILED));
  }
  //console.log(validation);
  const existing = await categoryModel.findOne({ title: req.body.title });
  if (existing) next(createError(400, MESSAGES.CATEGORY.EXISTS));
  const data = await categoryModel.create(req.body);
  if (data) {
    return res.json(
      createResponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data)
    );
  }
  next(createError(400, MESSAGES.CATEGORY.CREATE_FAILED));
});

export const getListCategory = handleAsync(async (req, res, next) => {
  const data = await categoryModel.find();
  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS, data)
  );
});
export const getDetailCategory = handleAsync(async (req, res, next) => {
  // lay ra id truoc de toi uu cau lenh
  const data = await findByIdCategory(req.params.id);
  if (!data) next(createError(404, MESSAGES.CATEGORY.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS, data)
  );
});

export const updateCategory = handleAsync(async (req, res, next) => {
  // const { id } = req.params;
  // if (id) {
  //   const data = await categoryModel.findByIdAndUpdate(id, req.body);

  const data = await findByIdCategory(req.params.id);
  if (!data) return createError(404, MESSAGES.CATEGORY.NOT_FOUND);
  await categoryModel.updateOne({ _id: data.id }, req.body);
  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data)
  );
});

export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await categoryModel.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.DELETE_SUCCESS)
    );
  }
  // thong thuong chi tra ve 404 vi da xoa
  next(createError(404, MESSAGES.CATEGORY.DELETE_FAILED));
});
export const softDeleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await categoryModel.findOneAndUpdate(
      { id, deletedAt: null }, // loai tru nhung danh muc deletedAt khac null
      {
        deletedAt: new Date(Date.now() + 7 * 60 * 60 * 1000),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(404, MESSAGES.CATEGORY.DELETE_FAILED));
});

export const restoreCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await categoryModel.findOneAndUpdate(
      { id, deletedAt: new Date(Date.now() + 7 * 60 * 60 * 1000) },
      {
        deletedAt: null,
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS)
    );
  }
  next(createError(true, "Restore category failed"));
});
