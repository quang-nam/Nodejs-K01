import categoryModel from "../category/category.model.js";

export const getListProduct = (req, res) => {
  return res.send("Danh sach san pham");
};

export const getDetailProduct = (req, res) => {
  return res.send("Chi tiet san pham");
};
export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const data = await categoryModel.create(req.body);
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Category Created Successfully",
        data,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Create Category failed",
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = (req, res) => {
  return res.send("Cap nhat san pham");
};

export const deleteProduct = (req, res) => {
  return res.send("Xoa san pham");
};
