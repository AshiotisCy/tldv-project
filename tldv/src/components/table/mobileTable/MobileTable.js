import React, { useContext } from "react";
import { TableContext } from "../../mainComponent/MainComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectVideo } from "../../../redux/reducers/selectedVideoSlice";
import { setVideosList } from "../../../redux/reducers/videoSlice";
import ReactPlayer from "react-player";
import { Popconfirm, Tag } from "antd";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.css";

export function MobileTable(video) {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const dispatch = useDispatch();

  const videoData = useSelector((state) => state.videos.data);

  const { Props } = useContext(TableContext);
  const [
    infoModalVisible,
    setInfoModalVisible,
    editModalVisible,
    setEditModalVisible,
  ] = Props;

  const editVideoFunc = (video) => {
    dispatch(selectVideo(video));
    setEditModalVisible(true);
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`${apiEndpoint}/${id}`, {}).then((response) => {
        const filteredArray = videoData.filter(
          (data) => data?.id !== response.data.data.id
        );
        dispatch(setVideosList(filteredArray));
      });
    } catch (err) {
      console.log("getAPIError", err);
    }
  };

  const deleteSelectedVideoFunc = (id) => {
    deleteVideo(id);
  };

  return (
    <div className={styles.mobileBodyWrapper}>
      <div className={styles.mobileWrapperInformation}>
        <div className={styles.mobileVideoWrapper}>
          {video.attributes.isPublic ? (
            <ReactPlayer
              controls
              url={`${video.attributes.url}`}
              width={"100%"}
            />
          ) : (
            <div className={styles.warningWrapper}>
              <WarningOutlined className={styles.mobileTableWarning} />
              <span className={styles.warningText}>
                You are not allowed to view this video because is not public
              </span>
            </div>
          )}
        </div>
        <div className={styles.title}>{video.attributes.title}</div>
        <div className={styles.slug}>{video.attributes.slug}</div>
      </div>
      <div className={styles.mobileBtnWrapper}>
        <Tag
          className={styles.antButtonTag}
          color={"green"}
          onClick={() => {
            editVideoFunc(video);
          }}
        >
          <EditOutlined style={{ fontSize: "20px", color: "#389e0d" }} />
        </Tag>
        <Popconfirm
          title="Are you sure you want to delete this video?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteSelectedVideoFunc(video?.id)}
        >
          <Tag className={styles.antButtonTag} color={"red"}>
            <DeleteOutlined style={{ fontSize: "20px", color: "#dd5d22" }} />
          </Tag>
        </Popconfirm>
      </div>
    </div>
  );
}
