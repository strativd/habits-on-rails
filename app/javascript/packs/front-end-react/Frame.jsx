import React from 'react';
import { Layout, Menu } from 'antd';

import HabitTable from './components/HabitTable';

const { Footer, Sider, Content } = Layout;

const Frame = () => {
  return (
    <Layout>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <HabitTable />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <a href="https://github.com/ztratify/habits" target="_blank">haBits ☑ building habits, bit by bit.</a>
      </Footer>
    </Layout>
  )
}

export default Frame;
