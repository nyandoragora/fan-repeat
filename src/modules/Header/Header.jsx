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

export function Header({ fontSize, setFontSize }) {
  const { isLoggedIn, isLocalBusiness, hasProfile, logout } = useContext(AuthContext);

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
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <a href="/">CommunityEvents</a>
      </div>

      {/* FontSizeButton */}
      <div className={styles.fontSizeControl}>
        <span>文字サイズ:</span>
        <button onClick={() => setFontSize('small')} className={fontSize === 'small' ? styles.active : ''}>小</button>
        <button onClick={() => setFontSize('medium')} className={fontSize === 'medium' ? styles.active : ''}>中</button>
        <button onClick={() => setFontSize('large')} className={fontSize === 'large' ? styles.active : ''}>大</button>
      </div>

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
