import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createProducts,
  updateProduct,
  retrieveProducts,
} from "../actions/products";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { numberFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import StoreCSVUpload from "./StoreCSVUpload";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const [file, setFile] = useState();
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProducts());
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    array.splice(-1);
    dispatch(createProducts(array));
  };

  const editProduct = (row) => {
    setProduct(row);
    handleShow();
  };

  function editFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <button
        type="button"
        id={rowIndex}
        onClick={() => {
          editProduct(row);
        }}
        className="btn btn-primary"
      >
        <i className="fa fa-edit"></i>
      </button>
    );
  }

  function updateProductRecord(updatedProduct) {
    if (
      updatedProduct &&
      (product.productname !== updatedProduct.productname ||
        product.price !== updatedProduct.price)
    ) {
      const newProduct = {
        ...product,
        ["productname"]: updatedProduct.productname,
        ["price"]: updatedProduct.price,
      };
      setProduct(newProduct);
      dispatch(updateProduct(newProduct.id, newProduct));
      handleClose();
    } else {
      toast("There is no change in record values.", {
        type: "warning",
        theme: "colored",
      });
    }
  }

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "storeId",
      text: "Store ID",
    },
    {
      dataField: "sku",
      text: "SKU",
    },
    {
      dataField: "productname",
      text: "Product Name",
    },
    {
      dataField: "price",
      text: "Price",
      filter: numberFilter({
        style: { marginBottom: "-12px" },
        numberStyle: { width: "100%" },
        numberClassName: "custom-number-class",
      }),
    },
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "edit",
      text: "Edit",
      formatter: editFormatter,
      formatExtraData: { editProduct },
      headerStyle: {
        width: "65px",
      },
      style: {
        width: "70px",
      },
    },
  ];

  const options = {
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: products.length,
      },
    ],
  };

  return (
    <div className="">
      <StoreCSVUpload
        file={file}
        setFile={setFile}
        csvFileToArray={csvFileToArray}
      />
      <EditProduct
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        product={product}
        updateProductRecord={updateProductRecord}
      />
      <BootstrapTable
        bootstrap4
        classes="table-responsive-sm"
        keyField="id"
        data={products ? products : []}
        columns={columns}
        pagination={paginationFactory(options)}
        filter={filterFactory()}
      />
    </div>
  );
};

export default ProductList;
