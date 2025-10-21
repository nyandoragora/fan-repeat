// Header.jsx
import React, { useState, useContext } from 'react';
import styles from './Header.module.css';
import { AuthContext, USER_ROLES } from '../.././context/AuthContext';
import { EventRequestContext } from '../.././context/EventRequestContext';

export function Header({ fontSize, setFontSize }) {
  const { user, logout } = useContext(AuthContext);
  const { addEventRequest } = useContext(EventRequestContext);

  // モーダル表示状態
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  // ハンバーガーメニューの開閉状態
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // イベント作成依頼フォームのステート
  const [newEventRequest, setNewEventRequest] = useState({
    title: '',
    date: '',
    location: '',
    fee: '',
    tags: '',
    introduction: '',
    imageUrl: '',
  });

  // モーダル送信確認（ダミー）
  const handleJobSubmit = () => {
    alert('求人作成依頼を送信しました');
    setShowJobModal(false);
  };

  // イベント作成依頼の送信
  const handleEventSubmit = (e) => {
    e.preventDefault();
    addEventRequest(newEventRequest);
    alert('イベント作成依頼を送信しました');
    setNewEventRequest({
      title: '',
      date: '',
      location: '',
      fee: '',
      tags: '',
      introduction: '',
      imageUrl: '',
    });
    setShowEventModal(false);
  };

  // イベント作成依頼クリック時（プロフィール未入力）
  const handleEventClick = () => {
    if (!user.hasProfile) {
      alert('プロフィールを入力してください');
      return;
    }
    setShowEventModal(true);
  };

  // イベント作成依頼フォームの入力変更ハンドラ
  const handleNewEventRequestChange = (e) => {
    const { name, value } = e.target;
    setNewEventRequest((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <a href="/">CommunityEvents</a>
      </div>

      {/* ハンバーガーメニューボタン */}
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        <span className={styles.hamburgerIcon}></span>
        <span className={styles.hamburgerIcon}></span>
        <span className={styles.hamburgerIcon}></span>
      </button>

      {/* メニューコンテンツ */}
      <div className={`${styles.menuContent} ${isMenuOpen ? styles.menuOpen : ''}`}>
        {/* FontSizeButton */}
        <div className={styles.fontSizeControl}>
          <span>文字サイズ:</span>
          <button onClick={() => setFontSize('small')} className={fontSize === 'small' ? styles.active : ''}>小</button>
          <button onClick={() => setFontSize('medium')} className={fontSize === 'medium' ? styles.active : ''}>中</button>
          <button onClick={() => setFontSize('large')} className={fontSize === 'large' ? styles.active : ''}>大</button>
        </div>

        {/* NavigationGroup */}
        <nav className={styles.navGroup}>
          <a href="#">地元求人</a>
          {user.isLoggedIn && <a href="#">プロフィール</a>}
          {user.isLoggedIn && user.role === USER_ROLES.ADMIN && <a href="/admin-dashboard">管理者ダッシュボード</a>}
          {!user.isLoggedIn && <a href="/login">ログイン</a>}
          {!user.isLoggedIn && <a href="#">ユーザー登録</a>}
          {user.isLoggedIn && <button onClick={logout}>ログアウト</button>}
        </nav>

        {/* LocalBusinessNav（企業専用） */}
        {user.isCompany && (
          <div className={styles.localBusinessNav}>
            <button onClick={() => setShowJobModal(true)}>求人広告作成依頼</button>
            <button onClick={handleEventClick}>イベント作成依頼</button>
          </div>
        )}
      </div>

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
          <form onSubmit={handleEventSubmit}>
            <label>
              イベント名：
              <input type="text" name="title" value={newEventRequest.title} onChange={handleNewEventRequestChange} required />
            </label>
            <label>
              日時：
              <input type="datetime-local" name="date" value={newEventRequest.date} onChange={handleNewEventRequestChange} required />
            </label>
            <label>
              場所：
              <input type="text" name="location" value={newEventRequest.location} onChange={handleNewEventRequestChange} required />
            </label>
            <label>
              参加費：
              <input type="text" name="fee" value={newEventRequest.fee} onChange={handleNewEventRequestChange} required />
            </label>
            <label>
              タグ (カンマ区切り)：
              <input type="text" name="tags" value={newEventRequest.tags} onChange={handleNewEventRequestChange} />
            </label>
            <label>
              紹介文：
              <textarea name="introduction" value={newEventRequest.introduction} onChange={handleNewEventRequestChange} required></textarea>
            </label>
            <label>
              画像URL：
              <input type="text" name="imageUrl" value={newEventRequest.imageUrl} onChange={handleNewEventRequestChange} />
            </label>
            <button type="submit">送信</button>
            <button type="button" onClick={() => setShowEventModal(false)}>閉じる</button>
          </form>
        </div>
      )}
    </header>
  );
}
