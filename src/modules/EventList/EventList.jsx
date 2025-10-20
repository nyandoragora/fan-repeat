// EventList.jsx
import React from 'react';
import { EventCard } from '.././EventCard/EventCard';
import styles from './EventList.module.css';

// Swiperをインポート
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// SwiperのCSSをインポート
import 'swiper/css';
import 'swiper/css/navigation';

export function EventList({ events, onDetailClick, onJoinClick }) {
  if (!events || events.length === 0) {
    return <p className={styles.empty}>該当するイベントはありません。</p>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className={styles.swiperContainer}
    >
      {events.map(event => (
        <SwiperSlide key={event.id} className={styles.swiperSlide}>
          <EventCard
            event={event}
            onDetailClick={onDetailClick}
            onJoinClick={onJoinClick}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
