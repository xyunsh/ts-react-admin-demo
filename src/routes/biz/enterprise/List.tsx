import React, { PureComponent } from 'react';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider } from 'antd';
import moment from 'moment';

import StandardTable from '../../../components/Table/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

export default class List extends PureComponent {
  
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const status = ['关闭', '运行中', '已上线', '异常'];
    const statusMap = ['default', 'processing', 'success', 'error'];
    
    const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '服务调用次数',
        dataIndex: 'callNo',
        sorter: true,
        render: val => (
        <div style={{ textAlign: 'center' }}>
            {val} 万
        </div>
        ),
    },
    {
        title: '状态',
        dataIndex: 'status',
        filters: [
        {
            text: status[0],
            value: 0,
        },
        {
            text: status[1],
            value: 1,
        },
        {
            text: status[2],
            value: 2,
        },
        {
            text: status[3],
            value: 3,
        },
        ],
        render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
        },
    },
    {
        title: '更新时间',
        dataIndex: 'create_time',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
        title: '操作',
        render: () => (
        <div>
            <a href="">配置</a>
            <Divider type="vertical" />
            <a href="">订阅警报</a>
        </div>
        ),
    },
    ];

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
            <StandardTable
                columns={columns}
                model="biz/enterprise"
            />
        </Card>
      </PageHeaderLayout>
    );
  }
}
