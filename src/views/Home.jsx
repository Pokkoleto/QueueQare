import { Button, Col, Row } from "reactstrap";
import "./Home.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQueueByToken } from "../services/queue.service";
import { getDepartmentById } from "../services/department.service";

const Home = () => {
  const { token } = useParams();
  const [queue, setQueue] = useState({});
  const [info, setInfo] = useState({});
  useEffect(() => {
    localStorage.setItem("token", token);
    const tt = localStorage.getItem("token");
    getQueueByToken(tt).then((res) => {
      setQueue(res);
      getDepartmentById(res.departmentId).then((res) => {
        setInfo(res);
      });
    });
    let interval = setInterval(
      () =>
        getQueueByToken(tt).then((res) => {
          setQueue(res);
          getDepartmentById(res.departmentId).then((res) => {
            setInfo(res);
          });
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <Col>
        <Row className="text-center py-4 text-50 text-primry-dark">
          <p>QueueQare</p>
        </Row>
        <Row className="flex justify-center pt-4">
          <div className="queue flex">
            <Col>
              <Row className="text-center">
                <h3 className="text-primry-dark font-bold">หมายเลขคิว</h3>
              </Row>
              <Row className="text-center text-q">
                <p className="text-primry-dark">{queue.queueNumber}</p>
              </Row>
            </Col>
          </div>
        </Row>
        <Row>
          <p className="text-primry-dark text-2xl text-center pt-8 font-bold">
            เวลาโดยประมาน
          </p>
        </Row>
        <Row>
          <div className="d-flex justify-center">
            <FontAwesomeIcon icon={faClock} size="2x" color="#0e4e89" />
            <p className="text-primry-dark text-2xl text-center ml-4 font-bold">
              {queue.queueBefore * 4} นาที
            </p>
          </div>
        </Row>
        <Row className="h-36">
          <Col className="box-container ml-6 mr-3 flex justify-center">
            <div className="">
              <p className="text-primry-dark text-center font-bold">
                {queue.queueBefore == 0 ? "สถานะ" : "คิวก่อนหน้า"}
              </p>
              <p className="text-primry-dark text-center text-4xl font-bold">
                {queue.queueBefore == 0
                  ? queue.status == "waiting"
                    ? "คิวต่อไป"
                    : "กำลังตรวจ"
                  : queue.queueBefore}
              </p>
            </div>
          </Col>
          <Col className="box-container ml-3 mr-6 flex justify-center">
            <div className="">
              <p className="text-primry-dark text-center font-bold">
                แผนกปัจจุบัน
              </p>
              <p className="text-primry-dark text-center text-xl font-bold">
                {info.departmentName}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="py-8 px-6 ">
          <Button
            color="primary"
            size="lg"
            onClick={() => window.open("https://queueqare-map.vercel.app/")}
          >
            การนำทาง
            <FontAwesomeIcon
              className="ml-1"
              icon={faLocationArrow}
              color="white"
            />
          </Button>
        </Row>
      </Col>
    </div>
  );
};

export default Home;
