// src/pages/EventPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../.././modules/Header/Header';
import { EventFilter } from '../.././modules/EventFilter/EventFilter';
import { EventList } from '../.././modules/EventList/EventList';
import { AuthContext } from '../.././context/AuthContext';

// ダミー画像をインポート
import event1Image from '../.././modules/EventCard/assets/event1.jpg';
import event2Image from '../.././modules/EventCard/assets/event2.jpg';
import event3Image from '../.././modules/EventCard/assets/event3.jpg';
import event4Image from '../.././modules/EventCard/assets/event4.jpg';

export function EventPage({ fontSize, setFontSize }) {
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
          date: '2025-12-01T18:00:00',
          location: '中央公園 野外ステージ',
          fee: '無料',
          organizer: '自治会A',
          tags: ['音楽', 'ファミリー向け'],
          introduction: '地域で開催される音楽祭です。どなたでもお気軽にお越しください。',
          imageUrl: event1Image,
        },
        {
          id: 2,
          title: '秋の収穫祭',
          date: '2025-11-15T10:00:00',
          location: '駅前広場',
          fee: '500円',
          organizer: '農業組合B',
          tags: ['グルメ', '体験'],
          introduction: '地域の新鮮な農産物を楽しむイベントです。野菜詰め放題も！',
          imageUrl: event2Image,
        },
        {
          id: 3,
          title: 'IT勉強会「Reactの未来」',
          date: '2025-11-20T19:00:00',
          location: '市民会館 第3会議室',
          fee: '1000円',
          organizer: 'TechコミュニティC',
          tags: ['IT', '勉強会'],
          introduction: '最新のReactの動向について語り合います。初心者歓迎！',
          imageUrl: event3Image,
        },
        {
          id: 4,
          title: '親子で楽しむプログラミング教室',
          date: '2025-12-05T13:00:00',
          location: 'こどもセンター',
          fee: '無料',
          organizer: 'NPO法人D',
          tags: ['こども', 'プログラミング', '体験'],
          introduction: '親子で簡単なゲーム作りを体験できます。',
          imageUrl: event4Image,
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
      <Header fontSize={fontSize} setFontSize={setFontSize} />

      {/* メインコンテンツ */}
      <main style={{ padding: '20px' }}>

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
