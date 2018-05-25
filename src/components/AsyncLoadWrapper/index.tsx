import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { keyObject } from 'utils';

@connect((state, { dataApi, params }) => {
    const key = params ? `${dataApi}.${keyObject(params)}` : dataApi;
    return { 
        data: state.async[key],
        loading: state.loading.effects[dataApi] 
    };
})
export class AsyncLoadWrapper extends React.Component {

    componentDidMount(){
        const { dispatch, dataApi, params } = this.props;

        dispatch({ type: `async/load`, payload: { dataApi, params });
    }

    render() {
        const { children, loading, data } = this.props;

        return loading ? <Icon type="loading"/> : children(data);
    }
}