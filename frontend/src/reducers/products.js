import {
  CREATE_PRODUCTS,
  RETRIEVE_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/types";

const initialState = [];

const productReducer = (products = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRODUCTS:
      return [...products, payload];

    case RETRIEVE_PRODUCTS:
      return payload;

    case UPDATE_PRODUCT:
      return products.map((product) => {
        if (product.id === payload.id) {
          return {
            ...product,
            ...payload,
          };
        } else {
          return product;
        }
      });

    default:
      return products;
  }
};

export default productReducer;
