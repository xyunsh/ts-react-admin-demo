import * as React from 'react';
import { Input, Rate } from 'antd';

import { Form } from '@components/Form';
import { ADMIN_RESOURCE } from '@models/admin';
import CheckGroup from '@components/CheckGroup';

export default class Modify extends React.Component {

  render() {
    return (
      <Form model={ADMIN_RESOURCE} {...this.props}>
        <Input label="名称" name="name" maxLength={6} placeholder="限6个字符" required/>
        <Input label="别名" name="slug" maxLength={20} placeholder="限20个字符" required/>
        <CheckGroup label="绑定权限" name="privileges" dataApi='admin/privilege/list' transformer={({id,name})=>({value:id,label:name})}/>
      </Form>
    );
  }
}