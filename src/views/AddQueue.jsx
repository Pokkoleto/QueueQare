import { Button, Modal, QRCode } from "antd";
import { Row } from "reactstrap";
import { addQueue } from "../services/queue.service";

const url = "http://127.0.0.1:5173/";

const info = (res) => {
  Modal.info({
    title: "สแกน QR Code เพื่อเข้าใช้งาน",
    content: (
      <div>
        <h5>{`หมายเลขคิว   :   ${res.queueNumber}`}</h5>
        <QRCode value={url + res.token || "-"} />
      </div>
    ),
    onOk() {},
  });
};

const AddQueue = () => {
  const handdleAdd = () => {
    addQueue().then((res) => {
      console.log(res);
      info(res);
    });
  };
  return (
    <Row className="flex h-screen  justify-center items-center px-96">
      <Button className="h-24" type="primary" onClick={handdleAdd}>
        <h1>Add Queue</h1>
      </Button>
    </Row>
  );
};

export default AddQueue;
