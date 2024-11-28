// src/components/Header.jsx
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles['header-container']}>
      <div className={styles['top-border']}></div> {/* 페이지 위에서 간격을 둔 상단 선 */}
      <header className={styles.header}>
        <h1 className={styles.logo}>Newsy</h1>
        <nav className={styles.nav}>
          <Link to="/" className={styles['nav-link']}>Home</Link>
          <Link to="/articles" className={styles['nav-link']}>Articles</Link>
          <Link to="/scrap" className={styles['nav-link']}>Scrap</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className={styles['search-input']}
          />
          <div className={styles['profile-icon']}></div>
        </div>
      </header>
    </div>
  );
}
