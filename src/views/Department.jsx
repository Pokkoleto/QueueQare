import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Popconfirm, Table } from "antd";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
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
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `คนไข้ ${i}`,
    no: i,
    phone: "081-234-5678",
  });
}

const items = [
  getItem("เรียกคิว", "1", <PieChartOutlined />),
  getItem("จัดการคิวทั้งหมด", "2", <DesktopOutlined />),
];

const Body1 = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Table
            className="shadow-md"
            dataSource={data}
            pagination={{
              defaultPageSize: 13,
              showSizeChanger: false,
            }}
          >
            <Column title="ชื่อ - นามสกุล" dataIndex="name" key="name" />
            <Column title="หมายเลขคิว" dataIndex="no" key="no" />
            <Column title="เบอร์โทรศัพท์" dataIndex="phone" key="phone" />
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
                  ว่าง : 10 ห้อง
                </h4>
                <h4 className="text-red-500 mr-3">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-red-500 mr-3"
                  />
                  มีคนตรวจอยู่ : 3 ห้อง
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
              <Button type="primary" className="h-100 w-100" onClick={() => {}}>
                <h1>เรียกคิวถัดไป</h1>
              </Button>
            </Col>
            <Col className="pt-3" style={{ paddingLeft: 12, paddingRight: 0 }}>
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
  );
};

export const Body2 = () => {
  const [dataSource, setDataSource] = useState(false);
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "หมายเลขคิว",
      dataIndex: "no",
      key: "age",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phone",
      key: "address",
    },
    {
      title: "การจัดการ",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="แน่ใจที่จะลบหรือไม่"
          onConfirm={() => handleDelete(record.key)}
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
        dataSource={data}
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
            console.log(item.key);
            setSelectedKey(item.key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="h-18 items-center flex bg-white shadow-md">
          <h1 className="text-primry-dark">แผนก อายุรกรรม</h1>
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
