import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { TableContext } from "../mainComponent/MainComponent";
import { WarningOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import "../../overwriteAntd/OverwriteAntd.css"

export function VideoInformation() {
  const selectedVideo = useSelector((state) => state.selectedVideo);
  const videoURL = selectedVideo?.data?.attributes?.url;
  const videoSlug = selectedVideo?.data?.attributes?.slug;
  const isPublic = selectedVideo.data.attributes.isPublic;

  const { Props } = useContext(TableContext);
  const [
    infoModalVisible,
    setInfoModalVisible,
    editModalVisible,
    setEditModalVisible,
  ] = Props;

  return (
    <div>
      {isPublic ? (
        <ReactPlayer controls url={`${videoURL}`} playing={infoModalVisible} width={"100%"} />
      ) : (
        <div>
          <WarningOutlined/>
          <span className={styles.warningText}>You are not allowed to view this video because is not public</span>
        </div>
      )}
      <div className={styles.videoSlug}>{videoSlug}</div>
    </div>
  );
}
