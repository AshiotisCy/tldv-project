import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPayloadSlice } from "../../redux/reducers/payloadSlice";
import { Input, Select } from "antd";
import styles from "./styles.module.css";

export function VideoEntry() {
  const { Option } = Select;

  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    slug: "",
    title: "",
    isPublic: true,
    url: "",
  });

  useEffect(() => {
    dispatch(setPayloadSlice(payload));
  }, [payload]);


  return (
    <div className={styles.modalWrapper}>
      <Input.Group size="large">
        <div>
          <div className={styles.title}>Title</div>
          <Input
            className={styles.inputWrapper}
            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
          />
        </div>
        <div>
          <div className={styles.slug}>Slug</div>
          <Input
            className={styles.inputWrapper}
            onChange={(e) => setPayload({ ...payload, slug: e.target.value })}
          />
        </div>
        <div>
          <div className={styles.url}>Url</div>
          <Input
            className={styles.inputWrapper}
            onChange={(e) => setPayload({ ...payload, url: e.target.value })}
          />
        </div>
        <div>
          <div className={styles.public}>Public</div>
          <Select
            defaultValue={payload.isPublic}
            onChange={(e) => setPayload({ ...payload, isPublic: e })}
          >
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </div>
      </Input.Group>
    </div>
  );
}
