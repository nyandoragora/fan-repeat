
// src/context/EventRequestContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const EventRequestContext = createContext();

export function EventRequestProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [eventRequests, setEventRequests] = useState([]);

  // ダミーのイベント依頼データ
  // 実際はバックエンドから取得
  useState(() => {
    setEventRequests([
      {
        id: 1,
        event: {
          id: 101,
          title: '地域清掃ボランティア',
          date: '2025-12-10T09:00:00',
          location: '河川敷',
          fee: '無料',
          organizer: 'ボランティア団体X',
          tags: ['ボランティア', '環境'],
          introduction: 'みんなで地域の河川敷をきれいにしましょう！',
          imageUrl: 'https://via.placeholder.com/150/82b74b/ffffff?text=CleanUp',
        },
        requestorEmail: 'company_a@example.com',
        status: 'pending',
        requestedAt: '2025-10-20T10:00:00',
      },
      {
        id: 2,
        event: {
          id: 102,
          title: '冬のイルミネーション準備',
          date: '2025-11-25T14:00:00',
          location: '駅前広場',
          fee: '無料',
          organizer: '商店街振興組合Y',
          tags: ['イベント', '地域'],
          introduction: '今年も冬のイルミネーションを飾り付けます。お手伝い募集！',
          imageUrl: 'https://via.placeholder.com/150/87ceeb/ffffff?text=Illumination',
        },
        requestorEmail: 'company_b@example.com',
        status: 'pending',
        requestedAt: '2025-10-19T15:30:00',
      },
    ]);
  }, []);

  // イベント依頼を追加
  const addEventRequest = (newEventData) => {
    const newRequest = {
      id: eventRequests.length > 0 ? Math.max(...eventRequests.map(req => req.id)) + 1 : 1,
      event: {
        ...newEventData,
        id: eventRequests.length > 0 ? Math.max(...eventRequests.map(req => req.event.id)) + 1 : 1000, // 仮のイベントID
        organizer: user.name, // ログインユーザーの名前を主催者とする
      },
      requestorEmail: user.email, // ログインユーザーのメールアドレス
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };
    setEventRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  // イベント依頼のステータスを更新
  const updateEventRequestStatus = (requestId, newStatus) => {
    setEventRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  // 承認されたイベント依頼を既存のイベントリストに追加するロジック（ダミー）
  const approveEventRequest = (requestId) => {
    updateEventRequestStatus(requestId, 'approved');
    // 実際はここでEventPageのイベントリストに承認されたイベントを追加するAPIを呼び出す
    console.log(`イベント依頼 ${requestId} が承認されました。`);
  };

  // 拒否されたイベント依頼の処理（ダミー）
  const rejectEventRequest = (requestId) => {
    updateEventRequestStatus(requestId, 'rejected');
    console.log(`イベント依頼 ${requestId} が拒否されました。`);
  };

  return (
    <EventRequestContext.Provider
      value={{
        eventRequests,
        addEventRequest,
        approveEventRequest,
        rejectEventRequest,
      }}
    >
      {children}
    </EventRequestContext.Provider>
  );
}
