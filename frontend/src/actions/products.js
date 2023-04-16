import { toast } from "react-toastify";
import { CREATE_PRODUCTS, RETRIEVE_PRODUCTS, UPDATE_PRODUCT } from "./types";

import ProductDataService from "../services/ProductService";

export const createProducts = (data) => async (dispatch) => {
  try {
    const res = await ProductDataService.create({ data });

    dispatch({
      type: CREATE_PRODUCTS,
      payload: res.data,
    });

    dispatch(retrieveProducts());

    toast("Unique records have been imported successfully.", {
      type: "success",
      theme: "colored",
    });
    return Promise.resolve(res.data);
  } catch (err) {
    if (err.response.status == 500) {
      toast(
        "There are few duplicate records in the csv. Duplicate records are excluded.",
        {
          type: "warning",
          theme: "colored",
        }
      );
      dispatch(retrieveProducts());
    }
    return Promise.reject(err);
  }
};

export const retrieveProducts = () => async (dispatch) => {
  try {
    const res = await ProductDataService.getAll();
    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const res = await ProductDataService.update(id, data);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
    toast("Product has been updated successfully.", {
      type: "success",
      theme: "colored",
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
