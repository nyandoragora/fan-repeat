// EventCard.jsx
import React from 'react';
import styles from './EventCard.module.css';

export function EventCard({ event, onDetailClick, onJoinClick }) {
  return (
    <div className={styles.card}>
      {/* 左側：画像 */}
      <div className={styles.imageArea}>
        <img src={event.imageUrl} alt={event.title} />
      </div>

      {/* 右側：情報 */}
      <div className={styles.infoArea}>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.organizer}>主催者: {event.organizer}</p>
        <p className={styles.intro}>{event.introduction}</p>
        <div className={styles.buttonGroup}>
          <button onClick={() => onDetailClick(event.id)}>詳細</button>
          <button onClick={() => onJoinClick(event.id)}>参加</button>
        </div>
      </div>
    </div>
  );
}
