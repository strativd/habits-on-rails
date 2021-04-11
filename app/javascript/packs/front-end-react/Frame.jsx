import React from 'react';
import { Layout, Menu } from 'antd';

import HabitTable from './components/HabitTable';
import LOGO_SMALL from 'images/habits_small.png';

const { Footer, Header, Content } = Layout;

const Frame = () => {
  return (
    <Layout>
      <Header>
        <div className="logo">
          <img className="logo__image" title="haBits logo" alt="haBits logo" src={LOGO_SMALL} />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">HABITS</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <HabitTable />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <a href="https://github.com/ztratify/habits" target="_blank" rel="noreferrer">haBits ✅ building habits, bit by bit.</a>
      </Footer>
    </Layout>
  )
}

export default Frame;
