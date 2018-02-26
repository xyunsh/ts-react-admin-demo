import * as React from 'react';
import { Modal, Button } from 'antd';

const modalSizes = {
    'small' : 520,
    'normal' : 800,
    'large': 1200
}

export default class PopModalButton extends React.Component {
    state = {
        modalVisible : false
    };

    showModal = () => {
        this.setState({modalVisible: true});
    }

    hideModal = () => {
        this.setState({modalVisible: false});
    }

    render() {
        const {
            componentAssigned:ComponentAssigned,
            children,
            type,
            size = 'normal',
            ...props
        } = this.props;

        return (
            <div style={{display: 'inline-block'}}>
                {type ? <Button onClick={this.showModal} type={type} {...props}>{children}</Button> : <a onClick={this.showModal} {...props}>{children}</a>}
                {this.state.modalVisible && 
                <Modal title="设置" onCancel={this.hideModal} visible={this.state.modalVisible} footer={null} width={modalSizes[size]}>
                    <ComponentAssigned hideModal={this.hideModal}/>
                </Modal>
                }
            </div>
        );
    }
}