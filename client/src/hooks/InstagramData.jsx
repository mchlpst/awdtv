import { useEffect, useState } from "react";

export const useInstagramData = () => {
  // const [mediaId, setMediaId] = useState({});
  const [posts, setPosts] = useState([]);
  localStorage.removeItem(posts);

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
      const fetchPosts = () => {
        const requests = fetch("/api/instagram-posts")
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error(`error with status ${res.status}`);
            }
          })
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            console.log(error);
          });
        return requests;
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
    } else {
      setPosts(localObject.result);
    }
    // eslint-disable-next-line
  }, []);
  return { posts };
};
