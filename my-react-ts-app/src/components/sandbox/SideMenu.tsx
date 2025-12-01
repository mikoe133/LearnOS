import {
  BarsOutlined,
  FileOutlined,
  HomeOutlined,
  PlusOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { Button, Menu, theme, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import useCounterStore from '@/store/useStore';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Title } = Typography;

export default function SideMenu() {
  const { collapsed } = useCounterStore();
  const { token } = theme.useToken(); // 获取当前主题 token
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState<any>([]);

  const handlemenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key);
  }


  const iconList: any = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/user-manage/list': <TeamOutlined />,
    '/right-manage': <TeamOutlined />,
    '/right-manage/right/list': <MailOutlined />,
    '/right-manage/role/list': <AppstoreOutlined />,
    '/news-manage': <UploadOutlined />,
    '/news-manage/add': <PlusOutlined />,
    '/news-manage/draft': <FileOutlined />,
    '/news-manage/category': <BarsOutlined />,
    '/news-category': <AppstoreOutlined />,

    '/audit-manage': <SettingOutlined />,
    '/audit-manage/audit': <SettingOutlined />,
    '/audit-manage/list': <SettingOutlined />,
    '/publish-manage': <SettingOutlined />,


    '/publish-manage/unpublished': <SettingOutlined />,
    '/publish-manage/published': <SettingOutlined />,
    '/publish-manage/sunset': <SettingOutlined />,
  };

  // 递归过滤菜单项：只保留有 pagePermission 的项
  const filterMenuByPermission = (menuItems: any[]): any[] => {
    return menuItems
      .map(item => {
        // 递归过滤子菜单
        let filteredChildren: any[] = [];
        if (item.children && Array.isArray(item.children)) {
          filteredChildren = filterMenuByPermission(item.children);
        }

        const hasSelfPermission = Object.hasOwn(item, 'pagepermisson');
        const ifpermission = item.pagepermisson === 1;
        if(!ifpermission){
          return null; // 没有权限，移除
        }
        // ✅ 关键：只要自己有权限，或者有合法子项，就保留
        if (!hasSelfPermission && filteredChildren.length === 0) {
          return null; // 自己没权限 + 没有有效子项 → 移除
        }

        const newItem = {
          icon: iconList[item.key],
          ...item,
        };

        // 只有存在有效子项时才保留 children 字段
        if (filteredChildren.length > 0) {
          newItem.children = filteredChildren;
        } else {
          delete newItem.children; // 或者不设置 children
        }

        return newItem;
      })
      .filter(item => item !== null);
  };
  useEffect(() => {
    try {
      axios({
        url: 'http://localhost:3000/rights?_embed=children',
        method: 'get'
      }).then(res => {
        if (res.data.length > 0) {
          const filteredData = filterMenuByPermission(res.data);
          console.log('权限查询结果', filteredData);
          setSidebardata(filteredData);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }, [])
  const location = useLocation();
  let aaa ='/'+location.pathname.split('/')[1];
  console.log('当前路径', aaa); // 当前路径，如 "/news-manage/add"

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light" // 确保和 Menu 一致
      className='h-full'
    >
      <div className='flex h-full flex-col'>
        {/* 使用 Typography.Title + 动态颜色 */}
        <div
          className={`h-8 m-4 flex items-center font-bold
             text-base ${collapsed ? 'justify-center' : 'justify-start'
            }`}
          style={{
            color: token.colorText, // 自动适配 light/dark 主题的文字颜色
            transition: 'color 0.2s'
          }}
        >
          <Title
            level={5}
            style={{
              margin: 0,
              color: token.colorText,
            }}
            className='bg-gray-200 '
          >
            {!collapsed ? '全球新闻发布管理系统' : 'M'}
          </Title>
        </div>

        <div className='flex-1 overflow-auto '>
          <Menu
            theme="light"
            mode="inline"
            selectable
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={['/'+location.pathname.split('/')[1]]}
            items={sidebardata}
            onClick={handlemenu}
          />
        </div>

      </div>

    </Sider>
  );
}