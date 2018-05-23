import * as React from 'react';
import { Table, Alert } from 'antd';
import { connect } from 'dva';
import { isArray } from 'lodash';

import styles from './index.less';

@connect((state, { model }) => ({ ...state[model], loading: state.loading.effects[`${model}/queryPages`] }))
export default class StandardTable extends React.PureComponent {
    state = {
        selectedRowKeys: [],
    };

    componentDidMount() {
        const { dispatch, model, pagination, sorter, filters } = this.props;

        dispatch({ type: `${model}/queryPages`, payload: { pagination, sorter, filters });
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.onSelectRow) {
            this.props.onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { dispatch, model, filters: queryFilters } = this.props;

        dispatch({
            type: `${model}/queryPages`, payload: {
                pagination,
                filters: {
                    ...queryFilters,
                    ...filters
                },
                sorter
            }
        });
    }

    handleSearch = (queryParams) => {
        const { dispatch, model, pagination, filters, sorter } = this.props;
        dispatch({
            type: `${model}/queryPages`, payload: {
                pagination: { ...pagination, current: 1 },
                filters: { ...filters, ...queryParams },
                sorter
            }
        });
    }

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    }

    render() {
        const { selectedRowKeys = [] } = this.state;
        const { allIds = [], byId = {}, pagination, loading, rowKey = "id", children, header: HeaderComponent, ...restProps } = this.props;

        const list = allIds.map(id => byId[id]);

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };

        if (children && !isArray(children)) {
            children = [children];
        }

        // console.log('children', children);

        const columns = children && children.map((child) => {
            let { render, ...restProps } = child.props;

            if (!render) {
                render = (val, record) => React.cloneElement(child, { val, record });
            }

            return {
                ...restProps,
                render
            };
        });

        // console.log('columns=>', columns);

        return (
            <div className={styles.tableList}>
                {HeaderComponent && <div className={styles.tableListOperator}><HeaderComponent {...rowSelection} onSearch={this.handleSearch} /></div>}
                <div style={{ marginBottom: 16 }}>
                    <Alert
                        message={(
                            <div>
                                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
                            </div>
                        )}
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    loading={loading}
                    rowKey={rowKey}
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={list}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    {...restProps}
                />
            </div>
        );
    }
}