import categoryModel from "./category.model.js";

// tach phan findId ra rieng
export const findByIdCategory = async (id) => {
  const data = await categoryModel.findById(id);
  if (data) return data;
};
export const deleteCategoryById = async (id) => {
  await categoryModel.deleteOne(id);
};
