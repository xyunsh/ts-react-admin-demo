import * as React from 'react';
import { Input, Rate, Switch } from 'antd';

import { Form } from '@components/Form';
import { ADMIN_ROLE } from '@models/admin';

export default class Modify extends React.Component {

  render() {
    return (
      <Form model={ADMIN_ROLE} {...this.props}>
        <Input label="名称" name="name" required/>
        <Switch label="状态" name="status" />
      </Form>
    );
  }
}