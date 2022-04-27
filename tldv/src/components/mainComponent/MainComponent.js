import React, { createContext, useState } from "react";
import { Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updatedVideoList } from "../../redux/reducers/videoSlice";
import { Table } from "../table/Table";
import { VideoInformation } from "../videoInformation/VideoInformation";
import { VideoEdit } from "../videoEdit/VideoEdit";
import axios from "axios";
import "../../overwriteAntd/OverwriteAntd.css";
import { setPayloadSlice } from "../../redux/reducers/payloadSlice";

export const TableContext = createContext();

export function MainComponent() {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const dispatch = useDispatch();

  const selectedVideo = useSelector((state) => state.selectedVideo);
  const payload = useSelector((state) => state.payload);
  const videoData = useSelector((state) => state.videos.data);
  const videoId = selectedVideo?.data?.id;
  const modalTitle = selectedVideo?.data?.attributes?.title;
  const videoAttributes = payload?.data;

  const updateVideo = async () => {
    await axios
      .put(`${apiEndpoint}/${videoId}`, {
        data: {
          slug: videoAttributes.slug,
          title: videoAttributes.title,
          isPublic: videoAttributes.isPublic,
          url: videoAttributes.url,
        },
      })
      .then((response) => {
        const indexOfVideo = videoData.findIndex((item) => item.id === videoId);
        let newVideoList = [...videoData];
        let updateVideoList = {
          ...videoData[indexOfVideo],
          attributes: response?.data?.data.attributes,
        };
        newVideoList[indexOfVideo] = updateVideoList;
        dispatch(updatedVideoList(newVideoList));
        dispatch(setPayloadSlice({}));
      });
  };

  const handleInfoModalOk = () => {
    setInfoModalVisible(false);
    dispatch(setPayloadSlice({}));
  };

  const handleEditModalOk = () => {
    updateVideo();
    setEditModalVisible(false);
  };

  const handleInfoModalCancel = () => {
    setInfoModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  return (
    <TableContext.Provider
      value={{
        Props: [
          infoModalVisible,
          setInfoModalVisible,
          editModalVisible,
          setEditModalVisible,
        ],
      }}
    >
      <>
        <Table />
        <Modal
          title={`${modalTitle}`}
          visible={infoModalVisible}
          onOk={() => handleInfoModalOk()}
          onCancel={() => handleInfoModalCancel()}
          width={700}
          footer={null}
        >
          <VideoInformation />
        </Modal>
        <Modal
          title={`${modalTitle}`}
          visible={editModalVisible}
          onOk={() => handleEditModalOk()}
          onCancel={() => handleEditModalCancel()}
          width={700}
          footer={[
            <Button key="ok" type="primary" onClick={() => handleEditModalOk()}>
              Submit
            </Button>,
          ]}
        >
          <VideoEdit />
        </Modal>
      </>
    </TableContext.Provider>
  );
}
