import * as React from 'react';
import { Input, Rate } from 'antd';

import { Form } from '@components/Form';
import { ADMIN_MENU } from '@models/admin';

export default class Modify extends React.Component {

  render() {
    return (
      <Form model={ADMIN_MENU} {...this.props}>
        <Input label="名称" name="title" required/>
        <Input label="路径" name="path"/>
        <Input label="排序" name="rank"/>
      </Form>
    );
  }
}