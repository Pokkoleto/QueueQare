import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { Col, Container, Row } from "reactstrap";

const Doctor = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col>
            <Row className="h-3/4 box-container-med">
              <Col className="h-100 d-flex flex-column">
                <Row className="flex text-center">
                  <h2>กำลังตรวจ</h2>
                </Row>
                <Row className="mt-4">
                  <h4>ชื่อ : นส. สมหญิง ยิ่งยง</h4>
                  <h4>หมายเลขคิว : 001</h4>
                  <h4>เบอร์โทรศัพท์ : 0676340628</h4>
                </Row>
                <Row className="h-100">
                  <Col></Col>
                  <Col className="flex justify-end items-end">
                    <Button type="primary" className="h-14">
                      เลือกแผนกส่งต่อ
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="h-1/4">
              <Col
                className="pt-3"
                style={{ paddingLeft: 0, paddingRight: 12 }}
              >
                <Button
                  type="primary"
                  className="h-100 w-100"
                  onClick={() => {}}
                >
                  <h1>เรียกคิวถัดไป</h1>
                </Button>
              </Col>
              <Col
                className="pt-3"
                style={{ paddingLeft: 12, paddingRight: 0 }}
              >
                <Row className="h-50 pb-1">
                  <Button type="primary" danger className="h-100 w-100">
                    <h3>ข้ามคิวนี้</h3>
                  </Button>
                </Row>
                <Row className="h-50 pt-1">
                  <Button type="default" className="h-100 w-100">
                    <h3>เรียกคิวถัดที่ถูกข้าม</h3>
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Doctor;
