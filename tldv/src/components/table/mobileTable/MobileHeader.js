import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

const MobileHeader = (videoAttributes) => {
  const isPublic = `${videoAttributes.isPublic}`;
  return (
    <div className={styles.collapseHeaderWrapper}>
      <div className={styles.title}>{videoAttributes.title}</div>
      {!videoAttributes.isPublic ? <WarningOutlined className={styles.warning} /> : null}
      <div className={styles.isPublic}>{isPublic.toUpperCase()}</div>
    </div>
  );
};

export default MobileHeader;
