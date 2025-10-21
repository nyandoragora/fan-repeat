// src/pages/AdminDashboardPage/AdminDashboardPage.jsx
import React, { useContext, useEffect } from 'react';
import { EventRequestContext } from '../.././context/EventRequestContext';
import { AuthContext, USER_ROLES } from '../.././context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '../.././modules/Header/Header';
import styles from './AdminDashboardPage.module.css';

export function AdminDashboardPage() {
  const { eventRequests, approveEventRequest, rejectEventRequest } = useContext(EventRequestContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 管理者以外はリダイレクト
  useEffect(() => {
    if (!user.isLoggedIn || user.role !== USER_ROLES.ADMIN) {
      navigate('/'); // ホームページにリダイレクト
    }
  }, [user, navigate]);

  if (!user.isLoggedIn || user.role !== USER_ROLES.ADMIN) {
    return null; // リダイレクト中に何も表示しない
  }

  return (
    <div>
      <Header />
      <main className={styles.adminDashboard}>
        <h2 className={styles.title}>管理者ダッシュボード</h2>
        <div className={styles.requestList}>
          {eventRequests.length === 0 ? (
            <p>現在、イベント作成依頼はありません。</p>
          ) : (
            eventRequests.map((request) => (
              <div key={request.id} className={styles.requestCard}>
                <h3>{request.event.title}</h3>
                <p><strong>依頼者メール:</strong> {request.requestorEmail}</p>
                <p><strong>ステータス:</strong> {request.status}</p>
                <p><strong>依頼日時:</strong> {new Date(request.requestedAt).toLocaleString('ja-JP')}</p>
                <h4>イベント詳細:</h4>
                <ul>
                  <li><strong>日時:</strong> {new Date(request.event.date).toLocaleString('ja-JP')}</li>
                  <li><strong>場所:</strong> {request.event.location}</li>
                  <li><strong>参加費:</strong> {request.event.fee}</li>
                  <li><strong>主催者:</strong> {request.event.organizer}</li>
                  <li><strong>タグ:</strong> {request.event.tags.join(', ')}</li>
                  <li><strong>紹介文:</strong> {request.event.introduction}</li>
                </ul>
                {request.status === 'pending' && (
                  <div className={styles.buttonGroup}>
                    <button onClick={() => approveEventRequest(request.id)} className={styles.approveButton}>
                      承認
                    </button>
                    <button onClick={() => rejectEventRequest(request.id)} className={styles.rejectButton}>
                      拒否
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
