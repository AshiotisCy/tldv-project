import { createContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVideosList, updatedVideoList } from "./redux/reducers/videoSlice";
import axios from "axios";
import { Modal, Button } from "antd";
import styles from "./styles.module.css";
import { VideoEntry } from "./components/videoEntry/VideoEntry";
import { MainComponent } from "./components/mainComponent/MainComponent";
import { setPayloadSlice } from "./redux/reducers/payloadSlice";

const VideoContext = createContext();

function App() {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const dispatch = useDispatch();

  const videoData = useSelector((state) => state.videos.data);
  const payloadData = useSelector((state) => state.payload);

  const [createEntryModalVisible, setCreateEntryModalVisible] = useState(false);

  const getVideos = async () => {
    try {
      await axios.get(`${apiEndpoint}`).then((response) => {
        dispatch(setVideosList(response.data.data));
      });
    } catch (err) {
      console.log("getAPIError", err);
    }
  };

  const createVideo = async () => {
    const payload = payloadData.data;
    await axios
      .post(`${apiEndpoint}`, {
        data: {
          slug: payload.slug,
          title: payload.title,
          isPublic: payload.isPublic,
          url: payload.url,
        },
      })
      .then((response) => {
        dispatch(setVideosList([...videoData, response.data.data]));
        dispatch(setPayloadSlice({}));
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    dispatch(updatedVideoList([...videoData]));
  }, [payloadData]);

  const createVideoBtnFunc = () => {
    setCreateEntryModalVisible(true);
  };

  const handleEntryModalOk = () => {
    createVideo();
    setCreateEntryModalVisible(false);
  };

  const handleEntryModalCancel = () => {
    setCreateEntryModalVisible(false);
  };

  return (
    <VideoContext.Provider value={videoData}>
      <div className={styles.app}>
        <button
          className={styles.createVideoBtn}
          onClick={() => createVideoBtnFunc()}
        >
          Video Entry
        </button>
        <MainComponent />
        <Modal
          title="Video Entry"
          visible={createEntryModalVisible}
          onOk={handleEntryModalOk}
          onCancel={handleEntryModalCancel}
          width={700}
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={() => handleEntryModalOk()}
            >
              Submit
            </Button>,
          ]}
        >
          <VideoEntry />
        </Modal>
      </div>
    </VideoContext.Provider>
  );
}

export default App;
