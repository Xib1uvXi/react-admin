/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Cascader } from 'antd';
import { FormProps } from 'antd/lib/form';
import { setStrateConfig } from '../../axios';
import { message } from 'antd';
import { isEmpty } from '../../utils/index'
const FormItem = Form.Item;

type CollectionCreateFormProps = {
    visible: boolean;
    onCancel: () => void;
    onCreate: (record: any) => void;
    ref: any;
    strategies: [];
} & FormProps;

const CollectionCreateForm: any = Form.create()((props: CollectionCreateFormProps) => {
    const { visible, onCancel, onCreate, form, strategies } = props;
    const { getFieldDecorator } = form!;
    return (
        <Modal
            visible={visible}
            title="创建新配置"
            okText="创建"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="策略">
                    {getFieldDecorator('strategy_id', {
                        rules: [{ required: true, message: '选择测策略!' }],
                    })(<Cascader options={strategies} />)}
                </FormItem>
                <FormItem label="期数">
                    {getFieldDecorator('term', {
                        rules: [{ required: true, message: '请输入期数!' }],
                    })(<Input />)}
                </FormItem>
                <FormItem label="赔率">
                    {getFieldDecorator('odds', {
                        rules: [{ required: true, message: '请输入赔率!' }],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    );
});

type FlashProps = {
    data: any;
    onFlash: () => void;
    delStrategy: (id: number) => void;
}

class StrategyConfigModalForm extends Component<FlashProps> {
    state = {
        visible: false,
        config:[],
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

            let cfg = [{
                strategy_id: Number(values.strategy_id),
                term: Number(values.term),
                odds: Number(values.odds),
            }]

            const resp = await setStrateConfig(cfg, true);
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

            this.props.delStrategy(Number(values.strategy_id));
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
                    新建策略配置
                </Button>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    strategies={this.props.data}
                />
            </div>
        );
    }
}

export default StrategyConfigModalForm;
