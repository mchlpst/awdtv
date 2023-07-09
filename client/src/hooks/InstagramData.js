import { useEffect, useState } from "react";

export const useInstagramData = () => {
  const [mediaId, setMediaId] = useState({});
  // const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

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

    const localObject = JSON.parse(localStorage.getItem("posts"));
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
          localStorage.setItem("posts", JSON.stringify(result));
          setPosts(result);
        });
      }
    } else {
      setPosts(localObject);
    }
  }, [mediaId]);

  // useEffect(() => {
  //   const fields = ["username"];
  //   fetch(
  //     `https://graph.instagram.com/me?fields=${fields}&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw `error with status ${res.status}`;
  //       }
  //     })
  //     .then((res) => {
  //       setUser(res);
  //     });
  // }, []);

  return { mediaId, posts };
};
