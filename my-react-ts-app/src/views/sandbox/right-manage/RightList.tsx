import { DeleteColumnOutlined, DeleteFilled, DeleteOutlined, EditFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Table, Tag, message, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState, } from "react";
import type { PopconfirmProps } from 'antd';
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  const [messageApi, holder] = message.useMessage();
  const confirm = (id: number) => {
    console.log(id);
   
    deleteMethod(id);
  };
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    messageApi.error('delete canceled');
  };
  const deleteMethod = (id: number) => {
    setDataSource(dataSource.filter((item) => item.id !== id));
    try {
      axios.delete(`http://localhost:3000/rights/1`);
      messageApi.success('delete success');
    } catch (error) {
       messageApi.error('delete failed');
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',

    },
    {
      title: '权限名称',
      dataIndex: 'label',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (item: any) => {
        return <Tag color="blue">
          {item}
        </Tag>
      }
    },
    {
      title: '操作',
      render: (item: any, record: any) => {
        return <div className="flex gap-1 ">
          <Button shape="circle" onClick={() => {

          }} icon={<EditFilled />}></Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle"  icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>

        </div>
      }
    }
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/rights?_embed=children");
        const list = res.data.map((item: any) => {
          if (!item.children || item.children.length === 0) {
            item.children = null; // 设置为 null 而不是空数组
          }
          return item;
        });
        setDataSource(list);
      } catch (error) {
        console.error("Failed to fetch rights:", error);
      }
    };
    fetchData();
  }, [])
  return (
    <div>
      {holder}
      <Table
        dataSource={dataSource} columns={columns}
        pagination={{ pageSize: 5 }}
      // pagination={false}
      />
    </div>
  )
}
