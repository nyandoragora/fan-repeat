// Header.jsx
import React, { useState, useContext } from 'react';
import styles from './Header.module.css';

// モックContext（Auth / User情報）
const AuthContext = React.createContext({
  isLoggedIn: false,
  isLocalBusiness: false,
  hasProfile: false,
  logout: () => {},
});

export function Header() {
  const { isLoggedIn, isLocalBusiness, hasProfile, logout } = useContext(AuthContext);

  // フォントサイズ切替
  const [fontSize, setFontSize] = useState('medium');
  const toggleFontSize = () => {
    setFontSize(prev => (prev === 'medium' ? 'large' : 'medium'));
  };

  // モーダル表示状態
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  // モーダル送信確認（ダミー）
  const handleJobSubmit = () => {
    alert('求人作成依頼を送信しました');
    setShowJobModal(false);
  };
  const handleEventSubmit = () => {
    alert('イベント作成依頼を送信しました');
    setShowEventModal(false);
  };

  // イベント作成依頼クリック時（プロフィール未入力）
  const handleEventClick = () => {
    if (!hasProfile) {
      alert('プロフィールを入力してください');
      return;
    }
    setShowEventModal(true);
  };

  return (
    <header className={`${styles.header} ${styles[fontSize]}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <a href="/">CommunityEvents</a>
      </div>

      {/* FontSizeButton */}
      <button className={styles.fontSizeBtn} onClick={toggleFontSize}>
        {fontSize === 'medium' ? 'A+' : 'A-'}
      </button>

      {/* NavigationGroup */}
      <nav className={styles.navGroup}>
        <a href="/events">イベント一覧</a>
        <a href="/jobs">地元求人</a>
        {isLoggedIn && <a href="/profile">プロフィール</a>}
        {!isLoggedIn && <a href="/login">ログイン</a>}
        {!isLoggedIn && <a href="/register">ユーザー登録</a>}
        {isLoggedIn && <button onClick={logout}>ログアウト</button>}
      </nav>

      {/* LocalBusinessNav（企業専用） */}
      {isLocalBusiness && (
        <div className={styles.localBusinessNav}>
          <button onClick={() => setShowJobModal(true)}>求人広告作成依頼</button>
          <button onClick={handleEventClick}>イベント作成依頼</button>
        </div>
      )}

      {/* 求人作成モーダル */}
      {showJobModal && (
        <div className={styles.modal}>
          <h3>求人作成依頼</h3>
          <form onSubmit={e => { e.preventDefault(); handleJobSubmit(); }}>
            <label>
              求人タイトル：
              <input type="text" required />
            </label>
            <button type="submit">送信</button>
            <button type="button" onClick={() => setShowJobModal(false)}>閉じる</button>
          </form>
        </div>
      )}

      {/* イベント作成モーダル */}
      {showEventModal && (
        <div className={styles.modal}>
          <h3>イベント作成依頼</h3>
          <form onSubmit={e => { e.preventDefault(); handleEventSubmit(); }}>
            <label>
              イベント名：
              <input type="text" required />
            </label>
            <button type="submit">送信</button>
            <button type="button" onClick={() => setShowEventModal(false)}>閉じる</button>
          </form>
        </div>
      )}
    </header>
  );
}
