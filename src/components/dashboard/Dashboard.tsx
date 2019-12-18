/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Icon, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { report } from '../../axios';
import { isEmpty } from '../../utils/index'

class Dashboard extends React.Component {

    state = {
        data: {
            amount: 0,
            ordercount: 0,
            pt: "",
            profit: 0,
        }
    };

    componentDidMount() {
        this.req();
    }

    req = async () => {
        const resp = await report()
        if (isEmpty(resp && resp.data)) {
            message.error("没有得到数据")
            return
        }

        this.setState({
            data: {
                amount: resp.data.today_place_order_amount,
                ordercount: resp.data.today_order_count,
                pt: resp.data.pt,
                profit: resp.data.total_profit,
            },
        });
    };

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">出票金额</div>
                                        <h2>{this.state.data.amount}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">{this.state.data.pt}盈利</div>
                                        <h2>{this.state.data.profit}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">今日订单数</div>
                                        <h2>{this.state.data.ordercount}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        {/* <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">总订单数</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div> */}
                    </Col>
                    {/* <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">中奖订单数</div>
                                        <h2>802</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">客户数</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col> */}
                </Row>
            </div>
        )
    }
}

export default Dashboard;