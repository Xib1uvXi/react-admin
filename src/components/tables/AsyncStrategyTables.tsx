/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getStrategies } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { TableRowSelection } from 'antd/lib/table';
import { async } from 'q';

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
        loading: false,
        data: [],
    };
    componentDidMount() {
        this.start();
    }
    start = async() => {
        this.setState({ loading: true });
        const res = await getStrategies()

        console.log('11111111',res)
        // getStrategies().then((articles) => {
        //     console.log("111111111111",articles)
        //     this.setState({
        //         data: articles,
        //         loading: false,
        //     });
        // });
    };
    onSelectChange = (selectedRowKeys: string[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        console.log('xxx')
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="策略" second="策略表格" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="当前运行策略" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                    <Button
                                        type="primary"
                                        onClick={this.start}
                                        disabled={loading}
                                        loading={loading}
                                    >
                                        Reload
                                    </Button>
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
