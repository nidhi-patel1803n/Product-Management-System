import http from "../http-common";

const getAll = () => {
  return http.get("/products");
};

const get = (id) => {
  return http.get(`/products/${id}`);
};

const create = (data) => {
  return http.post("/products", JSON.stringify(data));
};

const update = (id, data) => {
  return http.put(`/products/${id}`, data);
};

const ProductService = {
  getAll,
  get,
  create,
  update,
};

export default ProductService;
