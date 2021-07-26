import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Modal } from "react-bootstrap";

const Photos = () => {
  const [photos, setphotos] = useState([]);
  const [selectedImg, setselectedImg] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setselectedImg({});
  };
  const handleShow = (img) => {
    setShow(true);
    setselectedImg(img);
  };

  useEffect(() => {
    axios
      .get("/photos")
      .then((res) => {
        console.log(res);
        setphotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkImageSize = (selectedImg) => {
    if (selectedImg.size < 1000) {
      return `${selectedImg.size} Bytes`;
    } else if (selectedImg.size > 1000 && selectedImg.size < 1000000) {
      return `${Math.round(selectedImg.size / 1000)} Kilabytes`;
    } else {
      return `${Math.round(selectedImg.size / 1000000)} Megabytes`;
    }
  };

  return (
    <div className="container">
      <h1> Photo gallery </h1>
      <div className="row">
        {photos.length > 0 ? (
          <>
            {photos &&
              photos.map((photo) => {
                return (
                  <div key={photo.src} className=" col-xs-12 col-sm-6 col-md-3">
                    <img
                      className="photo"
                      onClick={() => handleShow(photo)}
                      src={`http://localhost:5000/${photo.src}`}
                      alt={photo.src}
                    />
                  </div>
                );
              })}
          </>
        ) : (
          <div>No photos yet</div>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="text-info"> File Size: </span>
            {checkImageSize(selectedImg)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`http://localhost:5000/${selectedImg.src}`} alt={selectedImg.src} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Photos;
