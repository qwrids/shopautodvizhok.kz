import styles from './modal.module.scss';

export const ModalLeft = ({ children, isShow }) => {
  return (
    <div className={isShow ? styles.root + ' ' + styles.root_active : styles.root}>
      <div className={isShow ? styles.content + ' ' + styles.active : styles.content}>
        {children}
      </div>
    </div>
  );
};
