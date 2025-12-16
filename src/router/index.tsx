import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';

import { Dashboard } from 'pages/Dashboard';
import { Admin } from 'pages/Admin';
import { Users } from 'pages/Users';
import { PushNotification } from 'pages/PushNotification';
import {
  Live,
  PartnershipList,
  Prize,
  RoundHistory,
  Youtube,
} from 'pages/Operation';
import { Ad, VideoAd } from 'pages/Ad';
import { ResultInput, Shipping, WinningHistory } from 'pages/Again';
import { Inquiry, Faq, Notice, Partner } from 'pages/Customer';
import { Policy } from 'pages/Policy';
import { WinningDetail } from 'pages/Again/WinningDetail';

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="admin" element={<Admin />} />
          <Route path="users" element={<Users />} />
          <Route path="push-notification" element={<PushNotification />} />

          <Route path="operation">
            <Route path="prize" element={<Prize />} />
            <Route path="live" element={<Live />} />
            <Route path="history" element={<RoundHistory />} />
            <Route path="youtube" element={<Youtube />} />
            <Route path="partner" element={<PartnershipList />} />
          </Route>

          <Route path="advertisement">
            <Route path="image" element={<Ad />} />
            <Route path="video" element={<VideoAd />} />
          </Route>

          <Route path="again">
            <Route path="input" element={<ResultInput />} />
            <Route path="history" element={<WinningHistory />} />
            <Route path="detail" element={<WinningDetail />} />
            <Route path="shipping" element={<Shipping />} />
          </Route>

          <Route path="customer">
            <Route path="inquiry" element={<Inquiry />} />
            <Route path="faq" element={<Faq />} />
            <Route path="notice" element={<Notice />} />
            <Route path="partner" element={<Partner />} />
          </Route>

          <Route path="policy" element={<Policy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
