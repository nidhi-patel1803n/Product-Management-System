import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditProduct(props) {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (props.show) {
      setInputs((values) => ({
        ...values,
        ["productname"]: props.product && props.product.productname,
      }));
      setInputs((values) => ({
        ...values,
        ["price"]: props.product && props.product.price,
      }));
    }
  }, [props.show]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateProductRecord(inputs);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        closeButton
        style={{
          color: "#fff",
          backgroundColor: "#007bff",
          borderColor: "#007bff",
        }}
      >
        <Modal.Title>
          Edit Product {`[${props.product && props.product.sku}]`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="storeId">
            <Form.Label>Store Id</Form.Label>
            <Form.Control
              type="storeId"
              name="storeId"
              placeholder="Store ID"
              readOnly
              defaultValue={props.product && props.product.storeId}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="sku">
            <Form.Label>Store Id</Form.Label>
            <Form.Control
              name="sku"
              type="sku"
              placeholder="SKU"
              readOnly
              defaultValue={props.product && props.product.sku}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productname">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="productname"
              type="productname"
              onChange={handleChange}
              placeholder="Product Name"
              defaultValue={props.product && props.product.productname}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              defaultValue={props.product && props.product.price}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProduct;
