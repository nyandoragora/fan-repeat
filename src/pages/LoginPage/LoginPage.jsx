// src/pages/LoginPage/LoginPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../.././context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // スタイルシートをインポート

export function LoginPage() {
  const { loginAsAdmin, loginAsCompany, loginAsGeneral } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (loginFunction) => {
    loginFunction();
    navigate('/'); // ログイン後にトップページ（イベント一覧）にリダイレクト
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>ログイン</h2>
        <div className={styles.buttonGroup}>
          <button onClick={() => handleLogin(loginAsAdmin)} className={styles.button}>
            管理者としてログイン
          </button>
          <button onClick={() => handleLogin(loginAsCompany)} className={styles.button}>
            企業としてログイン
          </button>
          <button onClick={() => handleLogin(loginAsGeneral)} className={styles.button}>
            一般ユーザーとしてログイン
          </button>
        </div>
      </div>
    </div>
  );
}
