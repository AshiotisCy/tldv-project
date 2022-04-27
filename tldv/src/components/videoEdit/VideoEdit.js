import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select } from "antd";
import { setPayloadSlice } from "../../redux/reducers/payloadSlice";
import styles from "./styles.module.css";
import "../../overwriteAntd/OverwriteAntd.css";

export function VideoEdit() {
  const selectedVideo = useSelector((state) => state.selectedVideo);
  const attributes = selectedVideo?.data?.attributes;
  const title = attributes.title;
  const slug = attributes.slug;
  const isPublic = attributes.isPublic;
  const url = attributes.url;

  const dispatch = useDispatch();

  const { Option } = Select;

  const [payload, setPayload] = useState({
    slug: slug,
    title: title,
    isPublic: isPublic,
    url: url,
  });

  useEffect(() => {
    setPayload({
      slug: slug,
      title: title,
      isPublic: isPublic,
      url: url,
    });
  }, [selectedVideo]);

  useEffect(() => {
    dispatch(setPayloadSlice(payload));
  }, [payload]);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.title}>Title</div>
        <Input
          id="title"
          placeholder={title}
          onChange={(e) => setPayload({ ...payload, title: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.slug}>Slug</div>
        <Input
          id="slug"
          placeholder={slug}
          onChange={(e) => setPayload({ ...payload, slug: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.url}>Url</div>
        <Input
          id="url"
          placeholder={url}
          onChange={(e) => setPayload({ ...payload, url: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.public}>Public</div>
        <Select
          id="isPublic"
          defaultValue={isPublic}
          onChange={(e) => setPayload({ ...payload, isPublic: e })}
        >
          <Option value={true}>True</Option>
          <Option value={false}>False</Option>
        </Select>
      </div>
    </div>
  );
}
