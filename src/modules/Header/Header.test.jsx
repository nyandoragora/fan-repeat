import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the site title', () => {
    render(<Header />);
    // アプリ名を h1 タグで表示することを期待するテスト
    expect(screen.getByRole('heading', { name: /地域コミュニティイベント/i, level: 1 })).toBeInTheDocument();
  });
});
