import React from "react";
import { toast } from "react-toastify";
function StoreCSVUpload(props) {
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    props.setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    var fileInput = document.getElementById("csvFileInput");
    var filePath = fileInput.value;
    const allowedExtensions = /(\.csv)$/i;
    if (!allowedExtensions.exec(filePath)) {
      toast("Only CSV files are allowed.", {
        type: "warning",
        theme: "colored",
      });
      fileInput.value = "";
      return false;
    } else {
      if (props.file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          props.csvFileToArray(text);
        };

        fileReader.readAsText(props.file);
      }
    }
  };

  return (
    <div className="mb-3 text-right">
      <form>
        <input
          className="btn btn-outline-primary btn-sm"
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          className="btn btn-primary ml-1"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Upload Products
        </button>
      </form>
    </div>
  );
}

export default StoreCSVUpload;
