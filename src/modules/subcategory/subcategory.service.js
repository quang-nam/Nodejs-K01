import subcategoryModel from "./subcategory.model.js";

// tach phan findId ra rieng
export const findByIdSubCategory = async (id) => {
  const data = await subcategoryModel.findById(id);
  if (data) return data;
};
export const deleteSubCategoryById = async (id) => {
  await subcategoryModel.deleteOne(id);
};
