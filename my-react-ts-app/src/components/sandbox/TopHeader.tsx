import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,

} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, message, Space, theme, type MenuProps } from 'antd';
import useCounterStore from '@/store/useStore';

const { Header } = Layout;

export default function TopHeader() {
const collapsed = useCounterStore(state => state.collapsed);
const toggleCollapsed = useCounterStore(state => state.toggleCollapsed);
const messageApi = useCounterStore(state => state.messageApi);
  const {
    token: { colorBgContainer, },
  } = theme.useToken();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '退出',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Header className='flex flex-row justify-between items-center' style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Button onClick={() => {
        console.log('aaa');
        if (!messageApi) {
          return
        }
        messageApi.open({
          type: 'success',
          content: 'Success from child component via Zustand!',
        });

      }}>Test Message</Button>
      <Dropdown menu={menuProps} >
        <Button>
          <Space>
            Button
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Header>
  )
}
