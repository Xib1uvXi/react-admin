/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Row, Col, Card, message } from 'antd';
import { getStrateConfig, getStrategies } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import StrategyConfigModalForm from '../forms/NewStrategyConfigForm';
import WinModalForm from '../forms/WinForm';
import { isEmpty } from '../../utils/index'
import RunningModal from './ModalRunning';

const columns = [
    {
        title: '策略ID',
        dataIndex: 'strategy_id',
    },
    {
        title: '策略名',
        dataIndex: 'sname',
    },
    {
        title: '期数',
        dataIndex: 'term',
    },
    {
        title: '赔率',
        dataIndex: 'odds',
    },
    {
        title: '创建时间',
        dataIndex: 'create_at',
    },
];

class StrategyConfig extends React.Component {
    state = {
        data: [],
        strategies: [],
        tmp: [],
        disabled: true,
    };
    componentDidMount() {
        this.getStrategiesReq()
        this.start();
    };

    delStrategy = (id: number) => {
        // this.setState({strategies: this.state.strategies.filter((item: any) => item.id !== id)});
    };

    getStrategiesReq = async () => {
        const resp = await getStrategies();
        if (isEmpty(resp && resp.data)) {
            message.error("没有得到数据")
            return [];
        }

        resp.data.forEach((s: any) => {
            s.value = s.id
            s.label = s.name
        });

        // console.log('----------------debug 1', resp.data )
        this.setState({ strategies: resp.data});
    };

    getStrategyName = (id: any) => {
        let name = ""

        this.state.strategies.forEach((s: any) => {
            if (s.id === id) {
                name = s.name
            }
        });

        return name
    };

    start = async () => {
        const res = await getStrateConfig()

        if (isEmpty(res && res.data)) {
            this.setState({
                data: []
            });

            return
        }

        if (!res.success) {
            message.error("异常，未取到数据")
            return
        }

        res.data.forEach((s: any) => {
            s.key = s.strategy_id + s.create_at
            s.sname = this.getStrategyName(s.strategy_id)
        });

        this.setState({
            data: res.data,
            disabled: false,
        });
    };
    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="当前已配置策略列表" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <div className="gutter-box hhh">
                                        <StrategyConfigModalForm onFlash={this.start} data={this.state.strategies} delStrategy={this.delStrategy} />
                                    </div>

                                    <div className="gutter-box hhh">
                                        <RunningModal onFlash={this.start} data={this.state.strategies} disabled={this.state.disabled} cfg={this.state.data} />
                                    </div>

                                    <div className="gutter-box">
                                        <WinModalForm onFlash={this.start} data={this.state.strategies} delStrategy={this.delStrategy} disabled={this.state.disabled} />
                                    </div>

                                </div>
                                <Table
                                    columns={columns}
                                    dataSource={this.state.data}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default StrategyConfig;


