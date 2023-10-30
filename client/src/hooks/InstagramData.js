import { useEffect, useState } from "react";

export const useInstagramData = () => {
  const [mediaId, setMediaId] = useState({});
  const [posts, setPosts] = useState([]);
  localStorage.removeItem(posts);

  useEffect(() => {
    const fields = ["id", "caption"];
    fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`error with status ${res}`);
        }
      })
      .then((res) => {
        setMediaId(res);
      });
  }, []);

  useEffect(() => {
    const fields = ["id", "media_type", "media_url", "username", "timestamp"];
    const localObject = JSON.parse(sessionStorage.getItem("posts"));
    const now = new Date();

    if (localObject) {
      if (now.getTime() > localObject.expire) {
        sessionStorage.removeItem(posts);
      }
    }

    if (!localObject) {
      if (mediaId.data) {
        const firstNine = mediaId.data.slice(0, 9);

        const fetchPosts = () => {
          const requests = firstNine.map((item) =>
            fetch(
              `https://graph.instagram.com/${item.id}?fields=${fields}&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`
            )
              .then((res) => {
                if (res.ok) {
                  return res.json();
                } else {
                  throw new Error(`error with status ${res.status}`);
                }
              })
              .then((res) => {
                return { post: { caption: item.caption, media: res } };
              })
          );
          return Promise.all(requests);
        };
        fetchPosts().then((result) => {
          let now = new Date();
          let expire = now.setDate(now.getDate() + 2);
          let storage = {
            result: result,
            expire: expire,
          };

          sessionStorage.setItem("posts", JSON.stringify(storage));
          setPosts(result);
        });
      }
    } else {
      setPosts(localObject.result);
    }
    // eslint-disable-next-line
  }, [mediaId]);
  return { mediaId, posts };
};
