import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import PageHeaderLayout from '@layouts/PageHeaderLayout';
import { getRoutes } from '@utils/utils';

@connect()
export default class Settings extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'roles':
        dispatch(routerRedux.push(`${match.url}/roles`));
        break;
      case 'resources':
        dispatch(routerRedux.push(`${match.url}/resouces`));
        break;
      case 'privileges':
        dispatch(routerRedux.push(`${match.url}/privileges`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
        { key: 'roles', tab: '角色', },
        { key: 'resources', tab: '资源' },
        { key: 'privileges', tab: '权限', },
    ];

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        title="系统设置"
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
