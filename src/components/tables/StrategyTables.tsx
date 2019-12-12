import React from 'react';
import { Row, Col, Card } from 'antd';
import FixedTable from './FixedTable';
import ExpandedTable from './ExpandedTable';
import EditableTable from './EditableTable';
import BreadcrumbCustom from '../BreadcrumbCustom';

class StrategyTables extends React.Component {
    render() {
        return(
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="高级表格" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="可编辑" bordered={false}>
                                <EditableTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default StrategyTables;