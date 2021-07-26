import React, { useState } from "react";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { Spinner, Button } from "react-bootstrap";

const Form = () => {
  const [file, setfile] = useState("");
  const [img, setImg] = useState("");
  const [uploaderr, setuploadErr] = useState("");
  const [loading, setloading] = useState(false);
  const { handleSubmit } = useForm();

  const handleChangeImage = (e) => {
    setuploadErr("");
    const selected = e.target.files[0];
    if (selected.size > 2000000) {
      setuploadErr("file is too large");
    } else if (selected) {
      setfile(selected);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);
      fileReader.onloadend = () => {
        setImg(fileReader.result);
      };
    } else {
      setuploadErr("No file selected");
    }
  };

  const handleUpload = () => {
    if (file) {
      setloading(true);
      const fileData = new FormData();
      fileData.append("photo", file);
      axios
        .post("/upload", fileData, {})
        .then((res) => {
          console.log(res);
          alert("image successfully uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
      setloading(false);
      setImg("");
    } else {
      setuploadErr("Please select an image");
    }
  };
  return (
    <div className="container">
      <h1>Upload New Photo</h1>
      <form onSubmit={handleSubmit(handleUpload)}>
        <input type="file" name="file" id="file" className="inputfile" onChange={handleChangeImage} accept="image/*" />
        <label className="upload__label" htmlFor="file">
          Choose Image
        </label>

        <div className="img__container text-center">
          {img !== "" && <img className="uploadimg" src={img} alt="upload_image"></img>}
        </div>
        <div>{uploaderr && <div className="text-danger">{uploaderr}</div>}</div>

        <Button className="upload__button btn-info btn" type="submit" disabled={loading}>
          {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
          Upload
        </Button>
      </form>
    </div>
  );
};

export default Form;
