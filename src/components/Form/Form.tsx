import * as React from 'react';
import { isArray } from 'lodash';

import { connect } from 'dva';
import {
    Form as AntForm, Switch, Checkbox, Button
} from 'antd';

const FormItem = AntForm.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};

const submitFormLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};

@connect((state, { model, id }) => ({ values: state[model].byId[id], submitting: state[model].submitting }))
@AntForm.create()
export default class Form extends React.PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch, values, keyProp = 'id', model, hideModal } = this.props;

        this.props.form.validateFieldsAndScroll((err, newValues) => {
            if (!err) {
                dispatch({
                    type: `${model}/submit`, payload: {
                        values: {
                            ...newValues,
                            [keyProp]: values[keyProp]
                        },
                        callback: hideModal
                    }
                });
            }
        });
    }

    renderItem = ({ child }) => {
        let { label, name, options, onChange, required, rules = [] } = child.props;
        const { values, form: { getFieldDecorator } } = this.props;

        if (required) {
            rules = [{ required: true, message: `${label}是必填项` }, ...rules];
        }

        options = {
            rules,
            onChange,
            ...options
        };

        if(values){
            options.initialValue = values[name];
        }

        if (child) {
            if (child.type === Switch) {
                options.valuePropName = 'checked';
            } else if (child.type === Checkbox) {
                options.valuePropName = 'checked';
            }

            return (
                <FormItem {...formItemLayout} label={label} key={name}>
                    {getFieldDecorator(name, options)(child)}
                </FormItem>
            );
        }

        return null;
    }

    renderChildren = () => {
        let { children } = this.props;

        if (!isArray(children)) {
            children = [children];
        }

        const items = children.map((child) => {
            return this.renderItem({ child });
        });

        return items;
    }

    render() {
        const { submitting } = this.props;

        return (
            <AntForm onSubmit={this.handleSubmit} hideRequiredMark={true}>
                {this.renderChildren()}
                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                        提交
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.props.hideModal}>取消</Button>
                </FormItem>
            </AntForm>
        );
    }
}