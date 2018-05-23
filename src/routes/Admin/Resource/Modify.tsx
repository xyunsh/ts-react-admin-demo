import * as React from 'react';
import { Input, Rate } from 'antd';

import { Form } from '@components/Form';
import { ADMIN_RESOURCE } from '@models/admin';

export default class Modify extends React.Component {

  render() {
    return (
      <Form model={ADMIN_RESOURCE} {...this.props}>
        <Input label="名称" name="name" maxLength={6} placeholder="限6个字符" required/>
        <Input label="别名" name="slug" maxLength={20} placeholder="限20个字符" required/>
      </Form>
    );
  }
}