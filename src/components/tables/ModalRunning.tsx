/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import { running } from '../../axios';
import { isEmpty } from '../../utils';


type FlashProps = {
    data: any;
    onFlash: () => void;
}

class RunningModal extends Component<FlashProps> {
    state = {
        loading3: false,
        visible3: false,
    };

    showModal3 = () => {
        this.setState({
            visible3: true,
        });
    };
    handleOk3 = async () => {
        this.setState({ loading3: true });
        
        const resp = await running()

        if (isEmpty(resp && resp.data)) {
            message.error("未获取到数据")
            this.setState({ loading3: false, visible3: false })
            return
        }

        if (!resp.success) {
            message.error(resp.data)
            this.setState({ loading3: false, visible3: false })
            return
        }
        
        this.setState({ loading3: false, visible3: false });
        message.info(resp.data)
    };
    handleCancel3 = () => {
        this.setState({ visible3: false });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal3}>
                    Running
                </Button>
                <Modal
                    visible={this.state.visible3}
                    title="Running"
                    onOk={this.handleOk3}
                    onCancel={this.handleCancel3}
                    footer={[
                        <Button
                            key="back"
                            size="large"
                            onClick={this.handleCancel3}
                        >
                            Return
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            size="large"
                            loading={this.state.loading3}
                            onClick={this.handleOk3}
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        );
    }
}

export default RunningModal;
