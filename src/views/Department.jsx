import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  InputNumber,
  Layout,
  Menu,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  call,
  callSkip,
  delQueue,
  getQueueByDepartmentId,
  skip,
} from "../services/queue.service";
import {
  getActiveDoctor,
  getDepartmentById,
  getReadyDoctor,
} from "../services/department.service";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const { Column } = Table;
let data = [];

const items = [
  getItem("เรียกคิว", "1", <PieChartOutlined />),
  getItem("จัดการคิวทั้งหมด", "2", <DesktopOutlined />),
];

const Body1 = () => {
  const [showdata, setShowdata] = useState([]);
  const [ready, setReady] = useState(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [update, setUpdate] = useState(0);
  const [user, setUser] = useState();
  const error = (title, msg) => {
    Modal.error({
      title: title,
      content: msg,
      centered: true,
    });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    getQueueByDepartmentId(user.departmentId).then((res) => {
      data = [];
      res.map((item) => {
        data.push({
          no: item.queueNumber,
          tel: item.tel,
        });
      });
      setShowdata(data);
    });
    getReadyDoctor(user.departmentId).then((res) => {
      setReady(res.count);
    });
    getActiveDoctor(user.departmentId).then((res) => {
      setActive(res.count);
    });
    const interval = setInterval(() => {
      setUpdate(update + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [update]);
  const handdleCallSkip = (e) => {
    setTimeout(() => {
      e.departmentId = user.departmentId;

      callSkip(e).then(() => {
        setUpdate(update + 1);
      });
      setOpen(false);
      setUpdate(update + 1);
    }, 1000);
  };

  return (
    <Container fluid>
      <Modal
        title="ใส่หมายเลขคิวที่ต้องการเรียก"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[]}
        width={1000}
        forceRender
      >
        <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: "110px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 800,
          }}
          onFinish={(e) => {
            handdleCallSkip(e);
          }}
        >
          <Form.Item
            label="หมายเลขคิว"
            name="queueNumber"
            rules={[
              {
                required: true,
                type: "number",
                message: "กรุณากรอกหมายเลขคิว",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Row>
        <Col>
          <Table
            className="shadow-md"
            dataSource={showdata}
            pagination={{
              defaultPageSize: 13,
              showSizeChanger: false,
            }}
          >
            <Column title="หมายเลขคิว" dataIndex="no" key="no" />
            <Column title="เบอร์โทรศัพท์" dataIndex="tel" key="tel" />
          </Table>
        </Col>
        <Col>
          <Row className="h-3/4 box-container-med">
            <Col className="h-100 d-flex flex-column">
              <Row className="flex text-center">
                <h2>ห้องตรวจ</h2>
              </Row>
              <Row className="mt-4">
                <h4 className="text-green-500">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-green-500 mr-3"
                  />
                  {`ว่าง : ${ready} ห้อง`}
                </h4>
                <h4 className="text-red-500 mr-3">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-red-500 mr-3"
                  />
                  {`มีคนตรวจอยู่ : ${active - ready} ห้อง`}
                </h4>
              </Row>
              <Row className="h-100">
                <Col></Col>
                <Col className="flex justify-end items-end">
                  {/* <Button type="primary" className="h-14">
                    เลือกแผนกส่งต่อ
                  </Button> */}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="h-1/4">
            <Col className="pt-3" style={{ paddingLeft: 0, paddingRight: 12 }}>
              <Button
                type="primary"
                className="h-100 w-100"
                onClick={() => {
                  call(user.departmentId).then((res) => {
                    console.log(res);
                    if (res.message === "no doctor") {
                      error(
                        "ไม่มีหมอที่ว่างอยู่",
                        "ยังไม่มีหมอที่ว่างอยู้ในขณะนี้กรุณารอสักครู่"
                      );
                    } else if (res.message === "no queue") {
                      error(
                        "ไม่มีคิวที่รอ",
                        "ยังไม่มีคิวที่รอในขณะนี้กรุณารอสักครู่"
                      );
                    } else {
                      setUpdate(update + 1);
                    }
                  });
                }}
              >
                <h1>เรียกคิวถัดไป</h1>
              </Button>
            </Col>
            <Col className="pt-3" style={{ paddingLeft: 12, paddingRight: 0 }}>
              <Row className="h-50 pb-1">
                <Button
                  type="primary"
                  danger
                  className="h-100 w-100"
                  onClick={() => {
                    skip(user.departmentId).then(() => {
                      setUpdate(update + 1);
                    });
                  }}
                >
                  <h3>ข้ามคิวนี้</h3>
                </Button>
              </Row>
              <Row className="h-50 pt-1">
                <Button
                  type="default"
                  className="h-100 w-100"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <h3>เรียกคิวถัดที่ถูกข้าม</h3>
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export const Body2 = () => {
  const [user, setUser] = useState();
  const [dataSource, setDataSource] = useState(false);
  const handleDelete = (key) => {
    delQueue(key).then((res) => {
      setUpdate(update + 1);
    });
  };
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    getQueueByDepartmentId(user.departmentId).then((res) => {
      data = [];
      res.map((item) => {
        data.push({
          no: item.queueNumber,
          tel: item.tel,
        });
      });
      setDataSource(data);
    });
  }, [update]);
  const columns = [
    {
      title: "หมายเลขคิว",
      dataIndex: "no",
      key: "age",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "การจัดการ",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="แน่ใจที่จะลบหรือไม่"
          onConfirm={() => handleDelete(record.no)}
        >
          <a className="color-blue">ลบออกจากคิว</a>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <Table
        className="shadow-md"
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 13,
          showSizeChanger: false,
        }}
        columns={columns}
      ></Table>
    </div>
  );
};

const Department = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [user, setUser] = useState();
  const [departmentName, setDepartmentName] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    getDepartmentById(user.departmentId).then((res) => {
      setDepartmentName(res.departmentName);
    });
  }, []);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="bg-white"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={(item) => {
            setSelectedKey(item.key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="h-18 items-center flex bg-white shadow-md">
          <h1 className="text-primry-dark">{`แผนก ${departmentName}`}</h1>
        </Header>
        <Content
          style={{
            margin: "16px",
          }}
        >
          {selectedKey == 1 && <Body1 />}
          {selectedKey == 2 && <Body2 />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Department;
