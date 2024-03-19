import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QrReader from "modern-react-qr-reader";

const QrScaner = () => {
  const navigator = useNavigate();
  const [qrscan, setQrscan] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Col>
        <Row className="text-center pt-2 text-primry-dark font-bold flex justify-center app-bar">
          <div className="flex justify-between">
            <Button
              className="bg-transparent border-0"
              onClick={() => navigator("/navigate")}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" color="#0e4e89" />
            </Button>
            <div className="flex">
              <h1>แสกน QR บอกตำแหน่ง</h1>
            </div>
            <FontAwesomeIcon icon={faLocationArrow} size="xl" color="#FFFFFF" />
          </div>
        </Row>
        <Row className="flex justify-center h-screen items-center">
          <QrReader
            delay={300}
            constraints={{ facingMode: "environment" }}
            onError={handleError}
            onScan={handleScan}
          />
        </Row>
        <Row>
          <div>
            <h1>text is : {qrscan}</h1>
          </div>
        </Row>
      </Col>
    </div>
  );
};

export default QrScaner;
