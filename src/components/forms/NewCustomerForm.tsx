/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component, Props } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { FormProps } from 'antd/lib/form';
import { createCustomer } from '../../axios';
import { message } from 'antd';
import { isEmpty } from '../../utils/index'
const FormItem = Form.Item;

type CollectionCreateFormProps = {
    visible: boolean;
    onCancel: () => void;
    onCreate: () => void;
    ref: any;
} & FormProps;

const CollectionCreateForm: any = Form.create()((props: CollectionCreateFormProps) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form!;
    return (
        <Modal
            visible={visible}
            title="创建新策略"
            okText="创建"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="客户名">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入客户名字!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="本金">
                    {getFieldDecorator('amount', {
                        rules: [{ required: true, message: '请输入本金!' }],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    );
});

type FlashProps = {
    onFlash: () => void;
}

class NewCustomerForm extends Component<FlashProps> {
    state = {
        visible: false,
    };
    form: any;

    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            
            const resp = await createCustomer(values.title, Number(values.amount));

            if (isEmpty(resp && resp.data)) {
                message.error("无法请求接口")
                this.setState({
                    loading: false,
                });

                return
            }

            if (!resp.success) {
                message.error(resp.data);
                return;
            }
            message.info(resp.data)
            form.resetFields();
            this.setState({ visible: false });
            this.props.onFlash();
        });
    };
    saveFormRef = (form: any) => {
        this.form = form;
    };
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    新建客户
                </Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default NewCustomerForm;
