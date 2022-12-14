import Products from "../models/product.model.js";

async function getProducts({ id, purchase }) {
  try {
    if (id) {
      return await Products.findByPk(id);
    } else {
      return await Products.findAll({ where: { purchase: purchase } });
    }
  } catch (err) {
    throw err;
  }
}

async function patchProduct({ productId, quantity }) {
  try {
    return await Products.update(
      { quantity },
      {
        where: {
          productId,
        },
      },
    );
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    return await Products.destroy({
      where: {
        productId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function clearProduct(purchase) {
  try {
    return await Products.destroy({
      where: {
        purchase: purchase,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function createProduct(product) {
  try {
    return await Products.create(product);
  } catch (err) {
    throw err;
  }
}

async function updateProduct(product) {
  try {
    return await Products.update(product, {
      where: {
        productId: product.productId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  getProducts,
  patchProduct,
  deleteProduct,
  clearProduct,
  createProduct,
  updateProduct,
};
