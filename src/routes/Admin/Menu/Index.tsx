import * as React from 'react';
import { connect } from 'dva';

import { Tree, Card, Row, Col, Icon } from 'antd';

import PageHeaderLayout from '@layouts/PageHeaderLayout';
import Modify from './Modify';

import './tree.less';

const { TreeNode } = Tree;

@connect((state) => ({
    data: state['admin/menu']['data']
}))
export default class Menu extends React.Component {

    componentDidMount() {
        this.props.dispatch({ type: 'admin/menu/load' });
    }

    onDrop = (info) => {        
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };

        const data = [...this.props.data];
        let dragObj;
        
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        
        if (info.dropToGap) {
            let ar;
            let i;

            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        } else {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        }

        this.props.dispatch({
            type:'admin/menu/saveLevels',
            payload: { data }
        });
    }

    render() {
        const { data = [] } = this.props;

        const loop = data => data.map(({children, key, title, icon}) => {
            if (children && children.length) {
                return <TreeNode key={key} title={title} icon={icon && <Icon type={icon}/>}>{loop(children)}</TreeNode>;
            }
            return <TreeNode key={key} title={title} icon={icon && <Icon type={icon}/>}/>;
        });

        return (
            <PageHeaderLayout title="菜单">
                <Card bordered={false}>
                    <Row>
                        <Col span={12}>
                            <Tree
                                showIcon
                                className="draggable-tree"
                                draggable
                                onDrop={this.onDrop}
                            >
                                {loop(data)}
                            </Tree>
                        </Col>
                        <Col span={12}>
                            <Modify/>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>
        );
    }
}