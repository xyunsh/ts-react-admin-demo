import * as React from 'react';
import { Input, Rate } from 'antd';

import { Form } from '@components/Form/Form';

export default class Modify extends React.Component {

  render() {
    return (
      <Form model='biz/store' {...this.props}>
        <Input label='简称' name='short_name' maxLength={6} placeholder="限6个字符" required/>
        <Input label='显示名称' name='name' maxLength={20} placeholder="限20个字符" required/>
        <Input label='全称' name='full_name'/>
        <Input label='英文简称' name='en_name'/>
        <Rate label="品牌档次" allowHalf name='level_type' half/>
      </Form>
    );
  }
}