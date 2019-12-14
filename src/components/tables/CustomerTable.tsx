/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card, message, Form, Modal, Cascader } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getCustomers } from '../../axios';
import { isEmpty } from '../../utils/index'
import { Table, Input, Button, Icon } from 'antd';
import NewCustomerForm from '../forms/NewCustomerForm';
import { FormProps } from 'antd/lib/form';
import { getStrategies } from '../../axios';
import { createOrder } from '../../axios';
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
            title="创建订单"
            okText="创建"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form layout="vertical">
                <FormItem label="策略">
                    {getFieldDecorator('strategy', {
                        rules: [{ required: true, message: '选择测策略!' }],
                    })(<Cascader options={strategies} />)}
                </FormItem>
                <FormItem label="收益">
                    {getFieldDecorator('profit', {
                        rules: [{ required: true, message: '请输入收益!' }],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    );
});

class ConstomerTable extends React.Component {
    state = {
        filterDropdownVisible: false,
        data: [],
        searchText: '',
        filtered: false,

        createVisible: false,
        strategies: [],
    };
    record: any;
    createform: any;

    saveCreateFormRef = (form: any) => {
        this.createform = form;
    };

    showCreateModal = (record: any) => async () => {
        // console.log('111111111fdsfdsfds')
        const resp = await getStrategies();
        if (isEmpty(resp && resp.data)) {
            message.error("没有得到数据")
            return [];
        }

        resp.data.forEach((s: any) => {
            s.value = s.id
            s.label = s.name
        });
        this.record = record
        this.setState({ createVisible: true, strategies: resp.data });

        // console.log("111111111111", this.state.strategies)
    };
    handleCreateCancel = () => {
        const form = this.createform
        this.setState({ createVisible: false });
        form.resetFields();
    };
    handleCreate = () => {
        const form = this.createform;
        form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }

            // console.log('Received values of form: ', values);
            // console.log('Received record: ', this.record);

            let s: any

            // console.log('11111', this.state.strategies)

            this.state.strategies.forEach((element: any) => {
                if (element.id == values.strategy[0]) {
                    s = element
                }
            });

            // console.log('22222', s)

            const resp = await createOrder(this.record.id, this.record.name, s.id, s.name, Number(values.profit));

            if (isEmpty(resp && resp.data)) {
                message.error("无法请求接口")
                return
            }

            if (!resp.success) {
                message.error(resp.data);
                return;
            }
            message.info(resp.data)
            form.resetFields();
            this.setState({ createVisible: false, strategies: [] });
            // this.props.onFlash();
        });
    };


    componentDidMount() {
        this.getCustomersReq();
    }

    getCustomersReq = async () => {
        const resp = await getCustomers();
        if (isEmpty(resp && resp.data) || !resp.success) {
            message.error("没有得到数据")
            return
        }

        resp.data.forEach((c: any) => {
            c.key = c.id
        });

        this.setState({
            data: resp.data,
        });
    };

    onSearch = () => {

    };

    onOrdersClick = (record: any) => () => { 
        window.location.href = '#/app/table/customerOrderTable?id=' + record.id
    };

    searchInput: any;
    onInputChange = (e: any) => {
        this.setState({ searchText: e.target.value });
    };
    render() {
        const columns = [
            {
                title: '客户名',
                dataIndex: 'name',
                key: 'name',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => (this.searchInput = ele)}
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            Search
                        </Button>
                    </div>
                ),
                filterIcon: (
                    <Icon
                        type="smile-o"
                        style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }}
                    />
                ),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible: boolean) =>
                    this.setState({ filterDropdownVisible: visible }, () =>
                        this.searchInput.focus()
                    ),
            },
            {
                title: '本金',
                dataIndex: 'principal',
                key: 'principal',
            },
            {
                title: '更多操作',
                key: 'action',
                render: (text: any, record: any) => {

                    // console.log('record: ', record)

                    return (<span>
                        <Button
                            onClick={this.onOrdersClick(record)}
                        >
                            查看他的订单
                        </Button>

                        <span className="ant-divider" />
                        <Button
                            onClick={this.showCreateModal(record)}
                        >
                            创建新订单</Button>

                    </span>);
                },
            },
        ];
        return (
            <div className="gutter-example">
                <CollectionCreateForm
                    ref={this.saveCreateFormRef}
                    visible={this.state.createVisible}
                    onCancel={this.handleCreateCancel}
                    onCreate={this.handleCreate}
                    strategies={this.state.strategies}
                />
                <BreadcrumbCustom first="客户列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="客户列表" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <div className="gutter-box">
                                        <NewCustomerForm onFlash={this.getCustomersReq} />
                                    </div>
                                </div>
                                <div>
                                    <Table key="key" columns={columns} dataSource={this.state.data} />
                                    <style>{`
                                        .custom-filter-dropdown {
                                        padding: 8px;
                                        border-radius: 6px;
                                        background: #fff;
                                        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                                        }
                                        .custom-filter-dropdown input {
                                        width: 130px;
                                        margin-right: 8px;
                                        }
                                        .highlight {
                                        color: #f50;
                                        }
                                    `}</style>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ConstomerTable;

