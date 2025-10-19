// src/pages/EventPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../.././modules/Header/Header';
import { EventFilter } from '../.././modules/EventFilter/EventFilter';
import { EventList } from '../.././modules/EventList/EventList';
import { AuthContext } from '../.././context/AuthContext';

export function EventPage() {
  const { user } = useContext(AuthContext); // ログイン状態や企業フラグ
  const [filterParams, setFilterParams] = useState({
    date: '',
    location: '',
    fee: '',
    organizer: '',
    tags: '',
    sort: 'ongoing',
  });
  const [events, setEvents] = useState([]);

  // EventFilter からの変更を受け取る
  const handleFilterChange = (newFilters) => {
    setFilterParams(newFilters);
  };

  // filterParams 変更時にイベントデータを取得
  useEffect(() => {
    async function fetchEvents() {
      // 仮 API 呼び出し
      // 実際は fetch('/api/events', {...}) などで取得
      const mockData = [
        {
          id: 1,
          title: '地域音楽祭',
          organizer: '自治会A',
          introduction: '地域で開催される音楽祭です。',
          imageUrl: 'https://via.placeholder.com/200x150',
        },
        {
          id: 2,
          title: '秋の収穫祭',
          organizer: '農業組合B',
          introduction: '地域の農産物を楽しむイベントです。',
          imageUrl: 'https://via.placeholder.com/200x150',
        },
      ];

      // フィルタ条件を簡易適用（デモ用）
      const filtered = mockData.filter((e) => {
        return (
          (!filterParams.location || e.organizer.includes(filterParams.location)) &&
          (!filterParams.tags || e.title.includes(filterParams.tags))
        );
      });

      setEvents(filtered);
    }

    fetchEvents();
  }, [filterParams]);

  // 詳細・参加ボタンクリック処理
  const handleDetailClick = (eventId) => {
    alert(`詳細表示: イベントID ${eventId}`);
  };

  const handleJoinClick = (eventId) => {
    alert(`参加登録: イベントID ${eventId}`);
  };

  return (
    <div>
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <main style={{ padding: '20px' }}>
        <h2>イベント発見</h2>

        {/* フィルタ */}
        <EventFilter onFilterChange={handleFilterChange} />

        {/* イベント一覧 */}
        <EventList
          events={events}
          onDetailClick={handleDetailClick}
          onJoinClick={handleJoinClick}
        />
      </main>
    </div>
  );
}
