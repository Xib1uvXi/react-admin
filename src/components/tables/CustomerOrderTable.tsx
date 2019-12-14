/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Row, Col, Card, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { getCustomerOrders } from '../../axios';
import { isEmpty } from '../../utils/index'
import { string } from 'prop-types';

type QueryParamsProps = {
    query: any;
};

class CustomerOrderTable extends React.Component<QueryParamsProps> {
    state = {
        data: [],
        info: '',
    };

    componentDidMount() {
        this.getCustomerOrdersReq(this.props.query.id);
    }

    getCustomerOrdersReq = async (id: any) => {
        if (isEmpty(id)) {
            // message.error("请在顾客列表跳转过来")
            // this.setState({
            //     data: [],
            // });

            window.location.href = '#/app/table/customerTable'
            return
        }

        const resp = await getCustomerOrders(id)

        if (isEmpty(resp && resp.data && resp.data.orders)) {
            message.error("没有得到数据")
            this.setState({
                data: [],
            });
            return
        }

        resp.data.orders.forEach((order: any) => {
            order.key = order.id
            if (order.term <= 0) {
                order.term = 0
                order.win = 0
            } else {
                order.win = order.term * order.profit
            }
        });

        // console.log(resp.data)

        this.setState({
            data: resp.data.orders,
            info: "客户姓名：" + resp.data.name + "     本金：" + resp.data.principal + "     总盈利：" + resp.data.total_profit
        });
    };

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="客户" second="客户订单" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title={this.state.info} bordered={false}>
                                <Table key='key' columns={columns} dataSource={this.state.data} scroll={{ x: 1300 }} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


const columns: ColumnProps<any>[] = [
    { title: '策略名', width: 100, dataIndex: 'strategy_name', key:'1',fixed: 'left' },
    { title: '期数', width: 100, dataIndex: 'term', key:'2' },
    { title: '利润', dataIndex: 'profit', key:'3' },
    { title: '出票金额', dataIndex: 'place_order_amount', key:'4' },
    { title: '上次累计出票金额', dataIndex: 'last_time_place_order_amount', key:'5'},
    { title: '总累计出票金额', dataIndex: 'total_place_order_amount', fixed: 'right', key:'6'},
    { title: '预计本次中间盈利', dataIndex: 'win', fixed: 'right', key:'7'},
];

export default CustomerOrderTable;