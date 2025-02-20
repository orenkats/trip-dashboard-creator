import React from 'react';
import { Globe } from 'lucide-react';
import styles from './styles/dashboard.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Globe className="w-8 h-8 mx-auto text-[#fd1d1d]" />
      <h1 className={styles.title}>New Travel Post</h1>
      <p className={styles.subtitle}>Share your favorite spots with your followers</p>
    </div>
  );
};

export default Header;