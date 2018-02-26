import * as React from 'react';
import { Menu, Card, Badge, Divider, Button, Dropdown, Icon, Input, Row, Col } from 'antd';
import moment from 'moment';

import StandardTable from '../../../components/Table/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import { DatetimeColumn, Column } from '../../../components/Table/Columns';
import PopModalButton from '../../../components/Table/PopModalButton';
import Modify from './Modify';

const { Search } = Input;

export default class List extends React.PureComponent {
  
  render() {

    return (
      <PageHeaderLayout title="门店">
        <Card bordered={false}>
            <StandardTable
              model='biz/store'
              header={({selectedRowKeys, onSearch})=>(
                <Row>
                  <Col span={18}>
                    <PopModalButton icon="plus" type="primary" componentAssigned={Modify}>新建</PopModalButton>
                  </Col>
                  <Col span={6}>
                    <Search onSearch={(val)=>onSearch({query:val})} placeholder="请输入查询关键字"/>
                  </Col>
                </Row>
              )}
            >
              <Column title="编号" dataIndex="cms_code"/>
              <Column title='城市' dataIndex='city_name'/>
              <Column title='品牌名' dataIndex='brand_name'/>
              <Column title='分店' dataIndex='branch'/>
              <DatetimeColumn title="更新时间" dataIndex="create_time"/>
              <Column title="操作" render={(val,{id}) => (
                <div>
                      <PopModalButton componentAssigned={(props) => <Modify id={id} {...props}/>}>编辑</PopModalButton>
                      <Divider type="vertical" />
                      <Dropdown overlay={<Menu>
                        <Menu.Item key="remove">删除</Menu.Item>
                        <Menu.Item key="approval">通过</Menu.Item>
                      </Menu>}>
                        <a>
                          更多<Icon type="down" />
                        </a>
                      </Dropdown>
                </div>
              )}/>
            </StandardTable>
        </Card>
      </PageHeaderLayout>
    );
  }
}
