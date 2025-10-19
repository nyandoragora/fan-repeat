// EventList.jsx
import React from 'react';
import { EventCard } from '.././EventCard/EventCard';
import styles from './EventList.module.css';

export function EventList({ events, onDetailClick, onJoinClick }) {
  if (!events || events.length === 0) {
    return <p className={styles.empty}>該当するイベントはありません。</p>;
  }

  return (
    <div className={styles.list}>
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onDetailClick={onDetailClick}
          onJoinClick={onJoinClick}
        />
      ))}
    </div>
  );
}
