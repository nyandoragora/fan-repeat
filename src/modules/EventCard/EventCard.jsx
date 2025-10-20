// EventCard.jsx
import React from 'react';
import styles from './EventCard.module.css';

export function EventCard({ event, onDetailClick, onJoinClick }) {
  // 日付のフォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.card}>
      {/* 左側：画像 */}
      <div className={styles.imageArea}>
        <img src={event.imageUrl} alt={event.title} />
      </div>

      {/* 右側：情報 */}
      <div className={styles.infoArea}>
        <div className={styles.tags}>
          {event.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.organizer}>主催者: {event.organizer}</p>
        <div className={styles.details}>
          <p><strong>日時:</strong> {formatDate(event.date)}</p>
          <p><strong>場所:</strong> {event.location}</p>
          <p><strong>参加費:</strong> {event.fee}</p>
        </div>
        <p className={styles.intro}>{event.introduction}</p>
        <div className={styles.buttonGroup}>
          <button onClick={() => onDetailClick(event.id)}>詳細</button>
          <button onClick={() => onJoinClick(event.id)}>参加</button>
        </div>
      </div>
    </div>
  );
}
