import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then(async (res) => await res.json())
        .then((data) => {
            
          setData(data.photos.photo);
        })
        .catch((e) => {
          console.log("error", e);
        });
    };
    fetchData();
  }, [url]);
  return { data };
};
