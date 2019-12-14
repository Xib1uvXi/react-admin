/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Row, Col, Card, message } from 'antd';
import { getStrategies } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { TableRowSelection } from 'antd/lib/table';
import StrategyModalForm from '../forms/NewStrategyForm';
import { isEmpty } from '../../utils/index'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        width: 100,
        render: (text: any, record: any) => (
            <a href={record.url} target="_blank" rel="noopener noreferrer">
                {text}
            </a>
        ),
    },
    {
        title: '策略名字',
        dataIndex: 'name',
        width: 80,
    },
];

class AsynStrategyTable extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data: [],
    };
    componentDidMount() {
        this.start();
    }
    start = async () => {
        this.setState({ loading: true });
        const res = await getStrategies()

        if (isEmpty(res && res.data)) {
            message.error("没有得到数据")
            this.setState({
                loading: false,
            });

            return
        }

        res.data.forEach((s: any) => {
            s.key = s.id
        });

        this.setState({
            data: res.data,
        });
    };
    onSelectChange = (selectedRowKeys: string[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="策略列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="当前运行策略" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <div className="gutter-box">
                                        <StrategyModalForm onFlash={this.start} />
                                    </div>
                                    <span style={{ marginLeft: 8 }}>
                                        {hasSelected
                                            ? `Selected ${selectedRowKeys.length} items`
                                            : ''}
                                    </span>
                                </div>
                                <Table
                                    rowSelection={rowSelection as TableRowSelection<any>}
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

export default AsynStrategyTable;
