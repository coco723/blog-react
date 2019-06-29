import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'dva';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { getCurrentDate } from '@/utils/utils';
import { ChartCard, Field } from '@/components/Charts';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Yuan from '@/utils/Yuan';
import Trend from '@/components/Trend';
import { 
  Row,
  Col, 
  Card,
  DatePicker,
  Select,
  Tooltip,
  Icon,
} from 'antd';
import styles from './Analysis.less';

const ClusteredStack = lazy(() => import('./ClueteredStack'));
const Column = lazy(() => import('../Profile/Column'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.models.chart,
}))
class Analysis extends Component {
  state = {
    currentGroup: '全员',
    datePickerValue: getCurrentDate(),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchUpdate',
    });
    dispatch({
      type: 'chart/fetchGroup',
    });
    dispatch({
      type: 'chart/fetchBase'
    })
  }

  handleGroupChange = currentGroup => {
    const { datePickerValue } = this.state;
    const { dispatch } = this.props;
    this.setState({
      currentGroup,
    });
    dispatch({
      type: "chart/fetchUpdate",
      payload: { 
        group: currentGroup,
        // datePickerValue: datePickerValue,
      },
    })
  }

  handlleDatePickerChange = datePickerValue => {
    const { currentGroup } = this.state;
    const { dispatch } = this.props;
    this.setState({
      datePickerValue,
    });

    dispatch({
      type: 'chart/fetchUpdate',
      payload: {
        group: currentGroup,
        // datePickerValue: datePickerValue,
      }
    });
  };

  render() {
    const { datePickerValue, currentGroup } = this.state;
    const { chart, loading } = this.props;
    const { indicatorNames, indicatorData, yesterdayRank, groupList, baseInfo } = chart;

    const compare = (current, last, id, defaultMessage) => {
      const dayThan = ((Math.abs((current - last)) / current) * 100).toFixed(2); 
      if (current - last < 0) {
        return (
          <Trend flag="down" style={{ textAlign: "right" }}>
            <FormattedMessage id={id} defaultMessage="Day Changes" />
            <span className={styles.trendText}>{`${dayThan}%`}</span>
          </Trend>
        ) 
      }
      return (
        <Trend flag="up" style={{ textAlign: "right" }}>
          <FormattedMessage id="app.analysis.yesterday" defaultMessage={defaultMessage} />
          <span className={styles.trendText}>{`${dayThan}%`}</span>
        </Trend>
      )
    }
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <Row style={{ marginBottom: 24 }}>
            <ChartCard
              bordered={false}
              contentHeight={10}
            >
              <DatePicker
                defaultValue={datePickerValue}
                format="YYYY-MM-DD"
                style={{ width: 256 }}
                onChange={this.handlleDatePickerChange}
              />
              <Select 
                style={{ float: 'right', width: 196 }}
                defaultValue={currentGroup}
                onChange={this.handleGroupChange}
              >
                {
                  groupList.map(item => (
                    <Option key={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </ChartCard>
          </Row>
          <Row gutter={24}>
            <Col xl={6} lg={6} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <ChartCard
                bordered={false}
                title={<FormattedMessage id="app.analysis.daySales" defaultMessage="Day Sales" />}
                loading={loading}
                action={
                  <Tooltip
                    title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
                  >
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Yuan>{baseInfo.dayTotal}</Yuan>}
                contentHeight={46}
              >
                {
                  compare(
                    baseInfo.dayTotal,
                    baseInfo.yesTotal,
                    "app.analysis.yesterday",
                    "Day Changes",
                  )
                }
              </ChartCard>
              <ChartCard
                bordered={false}
                title={<FormattedMessage id="app.analysis.monthSales" defaultMessage="Month Sales" />}
                loading={loading}
                total={() => <Yuan>{baseInfo.month}</Yuan>}
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend style={{ marginRight: 16 }}>
                      {<FormattedMessage id="app.analysis.remainRate" defaultMessage="Remain Rate" />}
                      <span className={styles.trendText}>{`${baseInfo.remainRate}%`}</span>
                    </Trend>
                    <Trend>
                      {<FormattedMessage id="app.analysis.repeatRate" defaultMessage="Repeat Rate" />}
                      <span className={styles.trendText}>{`${baseInfo.repeatRate}%`}</span>
                    </Trend>
    
                  </div>
                }
                contentHeight={46}
              >
                {
                  compare(
                    baseInfo.month,
                    baseInfo.lastMonth,
                    "app.analysis.monthSales",
                    "Month Change"
                  )
                }
              </ChartCard>
            </Col>
            <Col xl={18} lg={18} md={24} sm={24} xs={24}>
              <Column
                data={yesterdayRank}
                loading={loading}
                title="昨日业绩排名"
                titleId="app.analysis.yesTodayRank"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col>
              <ClusteredStack
                data={indicatorData}
                loading={loading}
                title="今日个人各项指标统计"
                titleId="app.analysis.todayRank"
                indicatorNames={indicatorNames}
              />
            </Col>
          </Row> 
        </Suspense>
      </GridContent>
    );
  }
}

export default Analysis;
