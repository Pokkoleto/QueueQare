import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Table,
  Input,
  Space,
  Modal,
  Form,
  Popconfirm,
  QRCode,
  Select,
} from "antd";
import { useState } from "react";
import { faBuilding, faMap } from "@fortawesome/free-regular-svg-icons";
import HospitalBody1 from "../components/HospitalBody1";
import HospitalBody2 from "../components/HospitalBody2";
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
const data2 = [];

const items = [
  getItem("แผนก", "1", <FontAwesomeIcon icon={faBuilding} />),
  getItem("บุคลากร", "2", <UserOutlined />),
  getItem("การนำทาง", "3", <FontAwesomeIcon icon={faMap} />),
];

export const Body3 = () => {
  const [text, setText] = React.useState("");
  return (
    <div>
      <Space direction="vertical" align="center">
        <QRCode value={text || "-"} />
        <Input
          placeholder="-"
          maxLength={60}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Space>
    </div>
  );
};

const HospitalManagement = () => {
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
            setSelectedKey(item.key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="h-18 items-center flex bg-white shadow-md">
          <h1 className="text-primry-dark">จัดการโรงพยาบาล</h1>
        </Header>
        <Content
          className="px-4 pt-4 pb-4"
          style={{
            margin: "16px",
          }}
        >
          {selectedKey == 1 && <HospitalBody1 />}
          {selectedKey == 2 && <HospitalBody2 />}
          {selectedKey == 3 && <Body3 />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HospitalManagement;
