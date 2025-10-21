// src/pages/EventPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../.././modules/Header/Header';
import { EventFilter } from '../.././modules/EventFilter/EventFilter';
import { EventList } from '../.././modules/EventList/EventList';
import { AuthContext } from '../.././context/AuthContext';
import { Modal } from '../.././modules/Modal/Modal'; // Modalコンポーネントをインポート

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

  // モーダルの表示状態と選択されたイベントを管理
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

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

      let filteredEvents = mockData.filter((event) => {
        const eventDate = new Date(event.date);
        const filterDate = filterParams.date;
        const filterFee = parseFloat(filterParams.fee);

        // 「開催中」ソートが選択されている場合、当日開催中のイベントのみをフィルタリング
        if (filterParams.sort === 'ongoing') {
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const eventStart = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

          // イベントが今日の日付であり、かつまだ終了していない（開始時刻を過ぎていない）
          // ここでは簡易的に日付のみで判定し、時刻は考慮しない
          return eventStart.getTime() === today.getTime() && eventDate > now;
        }

        return (
          (!filterDate || eventDate.toISOString().split('T')[0] === filterDate) &&
          (!filterParams.location || event.location.includes(filterParams.location)) &&
          (isNaN(filterFee) || event.fee === '無料' || parseFloat(event.fee) <= filterFee) &&
          (!filterParams.organizer || event.organizer.includes(filterParams.organizer)) &&
          (!filterParams.tags || event.tags.some(tag => tag.includes(filterParams.tags)))
        );
      });

      // ソートロジック
      filteredEvents.sort((a, b) => {
        if (filterParams.sort === 'date') {
          return new Date(a.date) - new Date(b.date);
        } else if (filterParams.sort === 'popular') {
          // 仮の人気順ソート (IDの逆順)
          return b.id - a.id;
        } else if (filterParams.sort === 'ongoing') {
          // 「開催中」ソートの場合はフィルタリング段階で処理済みのため、ここでは日付順にソート
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });

      setEvents(filteredEvents);
    }

    fetchEvents();
  }, [filterParams]);

  // 詳細・参加ボタンクリック処理
  const handleDetailClick = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setShowDetailModal(true);
  };

  const handleJoinClick = (eventId) => {
    const event = events.find(e => e.id === eventId); // 参加モーダルでもイベント情報が必要な場合
    setSelectedEvent(event); // 参加モーダルでもイベント情報が必要な場合
    setShowJoinModal(true);
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
          onDetailClick={handleDetailClick} // 詳細ボタンクリック時のハンドラ
          onJoinClick={handleJoinClick}     // 参加ボタンクリック時のハンドラ
        />
      </main>

      {/* 詳細モーダル */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="イベント詳細">
        {selectedEvent && (
          <div>
            <h3>{selectedEvent.title}</h3>
            <p><strong>日時:</strong> {new Date(selectedEvent.date).toLocaleString('ja-JP')}</p>
            <p><strong>場所:</strong> {selectedEvent.location}</p>
            <p><strong>参加費:</strong> {selectedEvent.fee}</p>
            <p><strong>主催者:</strong> {selectedEvent.organizer}</p>
            <p><strong>タグ:</strong> {selectedEvent.tags.join(', ')}</p>
            <p>{selectedEvent.introduction}</p>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </Modal>

      {/* 参加モーダル */}
      <Modal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} title="イベント参加">
        {selectedEvent && (
          <div>
            <h3>{selectedEvent.title}</h3>
            <p>このイベントに参加しますか？</p>
            <button onClick={() => { alert(`イベントID ${selectedEvent.id} に参加登録しました！`); setShowJoinModal(false); }}>参加する</button>
            <button onClick={() => setShowJoinModal(false)}>キャンセル</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
