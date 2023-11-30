import { Button, Col, Row } from "reactstrap";
import "./Navigate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FloatButton } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";

const Navigate = () => {
  const navigator = useNavigate();
  return (
    <div>
      <Col>
        <Row className="text-center pt-2 text-primry-dark font-bold flex justify-center app-bar">
          <div className="flex justify-between">
            <Button
              className="bg-transparent border-0"
              onClick={() => navigator("/")}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" color="#0e4e89" />
            </Button>
            <div className="flex">
              <h1>การนำทาง</h1>
              <FontAwesomeIcon icon={faLocationArrow} color="#0e4e89" />
            </div>
            <FontAwesomeIcon icon={faLocationArrow} size="xl" color="#FFFFFF" />
          </div>
        </Row>
        <FloatButton
          className="float-button"
          icon={<QrcodeOutlined />}
          onClick={() => navigator("/qrscaner")}
        />
      </Col>
    </div>
  );
};

export default Navigate;
