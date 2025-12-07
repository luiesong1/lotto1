import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Divider, notification, Table } from 'antd';
import { Chart } from 'components/Chart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { rolesState } from 'recoil/atoms/roles';
import {
  dashboardInquiryColumns,
  InquiryType,
  partnerColumns,
  PartnerType,
} from 'utils/columns';
import * as S from './style';

type DashboardStats = {
  [index: string]: any[];
  userCount: { date: string; count: number }[];
  registrationInfoCount: { date: string; count: number }[];
  partnershipInquiryCount: { date: string; count: number }[];
};

export function Dashboard() {
  const [inquiryData, setInquiryData] = useState<InquiryType[]>([]);
  const [partnerData, setPartnerData] = useState<PartnerType[]>([]);

  // ⛔ API 없어도 빈 차트/빈 리스트 표시하도록 더미 데이터 설정 가능
  const [dashboardData, setDashboardData] = useState<DashboardStats>({
    userCount: [],
    registrationInfoCount: [],
    partnershipInquiryCount: [],
  });

  const roles = useRecoilValue(rolesState);
  const navigator = useNavigate();

  // ⛔ 백엔드 호출 비활성화 (skip: true 추가)
  // useLazyQuery(SEE_ALL_INQUIRY_HISTORY_BY_ADMIN, {
  //   skip: true,
  // });

  useLazyQuery(SEE_PARTNERSHIP_INQUIRY_HISTORY, {
    skip: true,
  });

  // ⛔ 대시보드 통계 호출도 비활성화
  useQuery(SEE_DASHBOARD_STATS_BY_ADMIN, {
    skip: true,
  });

  // ⛔ API 없으므로 useEffect에서 실제 호출 제거
  useEffect(() => {
    // seePartner();
    // seeInquiry();
  }, []);

  const chartTitle = [
    { title: '회원수', keyword: 'userCount' },
    { title: '어게인 등록 번호 개수', keyword: 'registrationInfoCount' },
    { title: '제휴 문의수', keyword: 'partnershipInquiryCount' },
  ];

  return (
    <>
      <Divider>대시보드</Divider>

      {/* 차트 섹션 */}
      <S.ChartContainer>
        {chartTitle.map((v, i) => (
          <div key={i}>
            <S.ChartTitle>{v.title}</S.ChartTitle>
            <Chart data={dashboardData[v.keyword] ?? []} />
          </div>
        ))}
      </S.ChartContainer>

      {/* 제휴 문의 */}
      {(roles.includes('MASTER') || roles.includes('READ_PARTNERSHIP_INQUIRY')) && (
        <>
          <S.Head>
            <h3>제휴 문의</h3>
            <Button
              type="link"
              style={{ fontSize: 16 }}
              onClick={() => navigator('/customer/partner')}
            >
              자세히 보기 {'>'}
            </Button>
          </S.Head>

          {/* 빈 데이터라도 표시되도록 */}
          <Table
            pagination={false}
            rowKey={(rec) => rec.id}
            columns={partnerColumns}
            scroll={{ x: 1200 }}
            dataSource={partnerData}
            loading={false}
          />
        </>
      )}

      {/* 1:1 문의 */}
      {(roles.includes('MASTER') || roles.includes('READ_INQUIRY')) && (
        <>
          <S.Head>
            <h3>1:1 문의</h3>
            <Button
              type="link"
              style={{ fontSize: 16 }}
              onClick={() => navigator('/customer/inquiry')}
            >
              자세히 보기 {'>'}
            </Button>
          </S.Head>

          <Table
            pagination={false}
            rowKey={(rec) => rec.id}
            columns={dashboardInquiryColumns}
            scroll={{ x: 800 }}
            dataSource={inquiryData}
            loading={false}
          />
        </>
      )}
    </>
  );
}
