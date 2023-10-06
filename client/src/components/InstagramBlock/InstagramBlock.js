import React, { useState, useRef } from "react";
import { useInstagramData } from "../../hooks/InstagramData";

import { ReactComponent as Play } from "../../assets/svg/Play.svg";
import { ReactComponent as Pause } from "../../assets/svg/Pause.svg";

import "./InstagramBlock.scss";
import Button from "../Button/Button";

const InstagramBlock = (props) => {
  let layout = props.data ? props.data.layout : true;
  const { posts } = useInstagramData();
  console.log(posts);
  return (
    <section className="instagram-block">
      <div className="instagram-block__account-container">
        <div>
          <a
            className="instagram-block__account"
            href="https://www.instagram.com/awdtv_korfbal/">
            @awdtv_korfbal
          </a>
        </div>
        <div className="instagram-block__account">
          <Button
            href="https://www.instagram.com/awdtv_korfbal/"
            type="solid"
            text="Volg ons"
          />
        </div>
      </div>
      {posts && (
        <div
          className={[
            "instagram-block__wrapper",
            layout
              ? " instagram-block__wrapper--table"
              : " instagram-block__wrapper--slider",
          ]}>
          {posts.map((item) => (
            <Post item={item} key={item.post.media.id} />
          ))}
        </div>
      )}
      <div className="instagram-block__button-container">
        <Button
          href="https://www.instagram.com/awdtv_korfbal/"
          type="solid"
          text="Laad meer berichten"
        />
      </div>
    </section>
  );
};

const Post = (props) => {
  const item = props.item;

  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playVideo = () => {
    const videoNode = video.current;

    if (videoNode) {
      if (playing) {
        videoNode.pause();
        setPlaying(false);
      } else {
        videoNode.play();
        setPlaying(true);
      }
    }
  };

  return (
    <article className="instagram-block__post" key={item.post.media.id}>
      {item.post.media.media_type === "VIDEO" ? (
        <>
          <video
            className="instagram-block__media"
            src={item.post.media.media_url}
            ref={video}
          />
          <div className="instagram-block__icon-container">
            {playing ? (
              <Pause className="instagram-block__icon" />
            ) : (
              <Play className="instagram-block__icon" />
            )}
          </div>
        </>
      ) : (
        <img
          className="instagram-block__media"
          src={item.post.media.media_url}
          alt="instagram post"
        />
      )}
      {item.post.caption && (
        <div
          className={
            "instagram-block__caption-container" +
            (item.post.media.media_type === "IMAGE" ? " image" : "")
          }
          onClick={() => playVideo()}>
          <div className="instagram-block__caption">{item.post.caption}</div>
        </div>
      )}
    </article>
  );
};

export default InstagramBlock;
