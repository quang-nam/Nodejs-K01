import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/createError.js";
import createResponse from "../../common/utils/createResponse.js";
import handleAsync from "../../common/utils/handleAsync.js";
import subCategorySchema from "./subcategory.model.js";
import { findByIdSubCategory } from "./subcategory.service.js";

// logic that cua controller, logic khac chi la lap lai
export const createSubCategory = handleAsync(async (req, res, next) => {
  //console.log(validation);
  const existing = await subCategorySchema.findOne({ title: req.body.title });
  if (existing) next(createError(400, MESSAGES.SUB_CATEGORY.CREATE_FAILED));
  const { categoryId } = req.body;
  if (!categoryId)
    return next(createError(400, MESSAGES.SUB_CATEGORY.CREATE_PARENT_ID_ERROR));
  const data = await subCategorySchema.create(req.body);
  if (data) {
    return res.json(
      createResponse(true, 201, MESSAGES.SUB_CATEGORY.CREATE_SUCCESS, data)
    );
  }
  next(createError(400, MESSAGES.SUB_CATEGORY.CREATE_FAILED));
});

export const getListSubCategory = handleAsync(async (req, res, next) => {
  const data = await subCategorySchema.findOne({
    categoryId: req.params.categoryId,
  });
  if (!data) {
    return next(createError(404, MESSAGES.SUB_CATEGORY.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.SUB_CATEGORY.GET_SUCCESS, data)
  );
});
export const getDetailSubCategory = handleAsync(async (req, res, next) => {
  // lay ra id truoc de toi uu cau lenh
  const data = await findByIdSubCategory(req.params.id);
  if (!data) next(createError(404, MESSAGES.SUB_CATEGORY.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.SUB_CATEGORY.GET_SUCCESS, data)
  );
});

export const updateSubCategory = handleAsync(async (req, res, next) => {
  // const { id } = req.params;
  // if (id) {
  //   const data = await subCategorySchema.findByIdAndUpdate(id, req.body);

  const data = await findByIdSubCategory(req.params.id);
  if (!data) return createError(404, MESSAGES.SUB_CATEGORY.NOT_FOUND);
  await subCategorySchema.updateOne({ _id: data.id }, req.body);
  return res.json(
    createResponse(true, 200, MESSAGES.SUB_CATEGORY.UPDATE_SUCCESS, data)
  );
});

export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await subCategorySchema.findByIdAndDelete(id);
    return res.json(
      createResponse(true, 200, MESSAGES.SUB_CATEGORY.DELETE_SUCCESS)
    );
  }
  // thong thuong chi tra ve 404 vi da xoa
  next(createError(404, MESSAGES.SUB_CATEGORY.DELETE_FAILED));
});
export const softDeleteSubCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await subCategorySchema.findOneAndUpdate(
      { _id: id, deletedAt: null }, // loai tru nhung danh muc deletedAt khac null
      {
        deletedAt: new Date(Date.now() + 7 * 60 * 60 * 1000),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.SUB_CATEGORY.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(404, MESSAGES.SUB_CATEGORY.DELETE_FAILED));
});

export const restoreSubCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await subCategorySchema.findOneAndUpdate(
      { _id: id, deletedAt: new Date(Date.now() + 7 * 60 * 60 * 1000) },
      {
        deletedAt: null,
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.SUB_CATEGORY.RESTORE_SUCCESS)
    );
  }
  next(createError(true, MESSAGES.SUB_CATEGORY.RESTORE_FAILED));
});
