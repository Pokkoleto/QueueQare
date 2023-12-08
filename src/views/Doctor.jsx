import React, { useState } from "react";

import {
  Button,
  Descriptions,
  Divider,
  Layout,
  Menu,
  Select,
  Table,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Column from "antd/es/table/Column";
import { Col, Container, Row } from "reactstrap";
import {
  DesktopOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("ตรวจคนไข้", "1", <PieChartOutlined />),
  getItem("บัญชีผู้ใช้", "2", <UserOutlined />),
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `คนไข้ ${i}`,
    no: i,
    phone: "081-234-5678",
  });
}

export const Body1 = () => {
  const [isSelect, setIsSelect] = useState(false);
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
                <h2>กำลังตรวจ</h2>
              </Row>
              <Row className="mt-4">
                <h4>ชื่อ : นส. สมหญิง ยิ่งยง</h4>
                <h4>หมายเลขคิว : 001</h4>
                <h4>เบอร์โทรศัพท์ : 0676340628</h4>
                <div className="flex items-center">
                  <h4>ส่งต่อไปที่ : </h4>
                  <Select
                    className="ml-2"
                    showSearch
                    style={{ width: 200 }}
                    placeholder="เลือกแผนกส่งต่อ"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: "แผนกที่ 1",
                      },
                      {
                        value: "2",
                        label: "แผนกที่ 2",
                      },
                      {
                        value: "3",
                        label: "แผนกที่ 3",
                      },
                      {
                        value: "4",
                        label: "แผนกที่ 4",
                      },
                      {
                        value: "5",
                        label: "แผนกที่ 5",
                      },
                      {
                        value: "6",
                        label: "แผนกที่ 6",
                      },
                    ]}
                    onSelect={(value) => {
                      setIsSelect(true);
                    }}
                  />
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="h-1/4">
            <Col className="pt-3" style={{ paddingLeft: 0, paddingRight: 12 }}>
              <Button
                disabled={!isSelect}
                type="primary"
                className="h-100 w-100"
                onClick={() => {}}
              >
                <h1>ส่งต่อ</h1>
              </Button>
            </Col>
            <Col className="pt-3" style={{ paddingLeft: 12, paddingRight: 0 }}>
              <Row className="h-100 pb-1">
                <Button
                  type="primary"
                  style={{
                    background: "#04AA6D",
                    borderColor: "green",
                  }}
                  className="h-100 w-100"
                >
                  <h1>ส่งไปที่แผนกการเงิน</h1>
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
  const navigator = useNavigate();
  const items = [
    {
      key: "1",
      label: "UserName",
      children: "Kittiya.ji",
    },
    {
      key: "2",
      label: "",
      children: "",
    },
    {
      key: "3",
      label: "ชื่อ - นามสกุล",
      children: "Kittiya Jikuna",
    },
    {
      key: "4",
      label: "แผนก",
      children: "อายุรกรรม",
    },
    {
      key: "5",
      label: "เบอร์โทรศัพท์",
      children: "081-2345678",
    },
    {
      key: "6",
      label: "email",
      children: "Kittiya.ji@gmail.com",
    },
  ];
  return (
    <div>
      <Col className="p-4">
        <Row>
          <Descriptions
            title="ข้อมูลผู้ใช้"
            size="default"
            column={2}
            items={items}
          />
        </Row>
        <Row>
          <a href="">
            เปลียนรหัสผ่าน <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
          </a>
        </Row>
        <Row className="mt-4 justify-center">
          <Button
            style={{ width: 150 }}
            danger
            onClick={() => {
              navigator("/login");
            }}
          >
            Logout
          </Button>
        </Row>
      </Col>
    </div>
  );
};

const Doctor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  return (
    <div>
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
    </div>
  );
};

export default Doctor;
