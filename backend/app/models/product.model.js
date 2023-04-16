module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      storeId: Number,
      sku: String,
      productname: String,
      price: Number,
      date: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Products = mongoose.model("products", schema);
  return Products;
};
