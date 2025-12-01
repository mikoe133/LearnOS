import SideMenu from '@/components/sandbox/SideMenu';
import TopHeader from '@/components/sandbox/TopHeader';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function NewsSandbox() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // 👇 关键：设置 width: 100vw 和 minHeight: 100vh
    <Layout
      className='h-dvh w-dvw'
    >
      <SideMenu />
      <Layout>
        <TopHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            // 如果希望内容区也撑满剩余空间（可选）
            minHeight: 0, // 覆盖你原来的 280，除非你确实需要最小高度
            height: 'calc(100vh - 64px - 24px - 24px)', // 64px=Header高度, 24*2=上下margin
            overflow: 'auto', // 内容超出时内部滚动
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}