import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableHeaders } from "./TableHeaders";
import { Popconfirm, Spin, Collapse } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { selectVideo } from "../../redux/reducers/selectedVideoSlice";
import { TableContext } from "../mainComponent/MainComponent";
import { setVideosList } from "../../redux/reducers/videoSlice";
import ReactPlayer from "react-player";
import { useResponsiveBreakPoints } from "../../hooks/ResponsiveHook";
import { MobileTable } from "./mobileTable/MobileTable";
import axios from "axios";
import styles from "./styles.module.css";
import MobileHeader from "./mobileTable/MobileHeader";

export function Table() {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const videoData = useSelector((state) => state.videos.data);

  const dispatch = useDispatch();

  const { Panel } = Collapse;

  const { Props } = useContext(TableContext);
  const [
    infoModalVisible,
    setInfoModalVisible,
    editModalVisible,
    setEditModalVisible,
  ] = Props;

  const { isExtraExtraSmall, isExtraSmall, isSmall, isMedium } =
    useResponsiveBreakPoints();
  const isMobile = isExtraExtraSmall || isExtraSmall || isSmall || isMedium;

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

  const editVideoFunc = (video) => {
    dispatch(selectVideo(video));
    setEditModalVisible(true);
  };

  const deleteSelectedVideoFunc = (id) => {
    deleteVideo(id);
  };

  const infoVideoFunc = (video) => {
    dispatch(selectVideo(video));
    setInfoModalVisible(true);
  };

  return (
    <>
      {!isMobile ? (
        <div className={styles.tableHead}>
          {TableHeaders.map((tableHeader) => (
            <div className={styles.tableCell} key={tableHeader.id}>
              <div className={styles.tableHeader}>{tableHeader.name}</div>
            </div>
          ))}
        </div>
      ) : null}
      {videoData.length > 0 ? (
        <>
          {videoData.map((video) => {
            const videoAttributes = video?.attributes;

            return (
              <>
                {!isMobile ? (
                  <div className={styles.tableRow} key={video?.id}>
                    <div
                      className={styles.tableCell}
                      onClick={() => infoVideoFunc(video)}
                    >
                      {videoAttributes?.title}
                    </div>
                    <div className={styles.tableCell}>
                      {videoAttributes?.url === null ||
                      videoAttributes === "" ? (
                        <Spin size="large" />
                      ) : videoAttributes.isPublic ? (
                        <ReactPlayer
                          controls
                          url={`${videoAttributes.url}`}
                          width={"100%"}
                        />
                      ) : (
                        <div>
                          <WarningOutlined />
                          <span className={styles.warningText}>
                            "You are not allowed to view this video because is
                            not public"
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.isPublicCellWrapper}>
                        <EditOutlined
                          className={styles.editIcon}
                          onClick={() => editVideoFunc(video)}
                        />
                        {`${videoAttributes.isPublic}`}
                        <Popconfirm
                          title="Are you sure you want to delete this video entry?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => deleteSelectedVideoFunc(video?.id)}
                        >
                          <div>
                            <DeleteOutlined className={styles.deleteBtn} />
                          </div>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.collapseWrapper}>
                    <Collapse>
                      <Panel
                        header={<MobileHeader {...videoAttributes} />}
                        key={video.id}
                      >
                        <MobileTable {...video} />
                      </Panel>
                    </Collapse>
                  </div>
                )}
              </>
            );
          })}
        </>
      ) : (
        <Spin size="large" />
      )}
    </>
  );
}
