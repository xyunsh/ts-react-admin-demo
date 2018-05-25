import React from 'react';
import { Checkbox } from 'antd';

import { AsyncLoadWrapper } from '@components/AsyncLoadWrapper';

const CheckboxGroup = Checkbox.Group;

class AsyncCheckGroup extends React.Component {
    render(){
        const { dataApi, params, transformer, ...props } = this.props;

        return (
            <AsyncLoadWrapper dataApi={dataApi} params={params}>
                {(options=[])=>{
                    options = transformer ? options.map(o=>transformer(o)) : options;
                    return <CheckboxGroup options={options} {...props}/>;
                }}
            </AsyncLoadWrapper>
        );
    }
}

export default class CheckGroup extends React.Component {
    render(){
        const { dataApi, ...props } = this.props;
        return dataApi ? <AsyncCheckGroup dataApi={dataApi} {...props}/> : <CheckboxGroup {...props}/>;
    }
} 