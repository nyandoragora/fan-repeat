// EventFilter.jsx
import React, { useState } from 'react';
import styles from './EventFilter.module.css';

export function EventFilter({ onFilterChange }) {
  // ソート状態
  const [sortKey, setSortKey] = useState('ongoing');

  // 検索条件
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    fee: '',
    organizer: '',
    tags: '',
  });

  // ソート変更
  const handleSortChange = (key) => {
    setSortKey(key);
    onFilterChange({ ...filters, sort: key });
  };

  // 入力変更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange({ ...newFilters, sort: sortKey });
  };

  // 検索条件クリア
  const handleClear = () => {
    const cleared = { date: '', location: '', fee: '', organizer: '', tags: '' };
    setFilters(cleared);
    setSortKey('ongoing');
    onFilterChange({ ...cleared, sort: 'ongoing' });
  };

  return (
    <div className={styles.eventFilter}>
      {/* SortArea */}
      <div className={styles.sortArea}>
        <button
          className={sortKey === 'ongoing' ? styles.active : ''}
          onClick={() => handleSortChange('ongoing')}
        >
          開催中
        </button>
        <button
          className={sortKey === 'date' ? styles.active : ''}
          onClick={() => handleSortChange('date')}
        >
          日付順
        </button>
        <button
          className={sortKey === 'popular' ? styles.active : ''}
          onClick={() => handleSortChange('popular')}
        >
          人気順
        </button>
      </div>

      {/* SearchArea */}
      <div className={styles.searchArea}>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleInputChange}
          placeholder="日付"
        />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleInputChange}
          placeholder="場所"
        />
        <input
          type="number"
          name="fee"
          value={filters.fee}
          onChange={handleInputChange}
          placeholder="参加費"
        />
        <input
          type="text"
          name="organizer"
          value={filters.organizer}
          onChange={handleInputChange}
          placeholder="主催者"
        />
        <input
          type="text"
          name="tags"
          value={filters.tags}
          onChange={handleInputChange}
          placeholder="タグ"
        />
        <button onClick={handleClear}>クリア</button>
      </div>
    </div>
  );
}
