import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const ImageGallery = () => {
  const [tag, setTag] = useState("mountain");
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");

  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=%22${searchInput===""?tag:searchInput}%22&per_page=20&format=json&nojsoncallback=1`;
  const { data } = useFetch(url);

  const changeTag = (e) => {

    setSearchInput("")
    setTag(e);
  };

  const changeName = () => {
    if(searchInput === ""){
        return
    }else{
        setName(searchInput);
    }
  }

  return (
    <>
      <div className="p-2 mt-3">
        <h1 className="font-sans text-4xl font-bold text-[#3eabab] italic">
          Image Gallery
        </h1>
      </div>
      <div className="p-2">
        <input
          className="w-[60%] border h-[30px] text-base  mt-5 mb-2.5 mx-0 px-[7px] py-0.5 rounded-lg border-solid border-[#3eabab]  outline-none"
          type="search"
          name="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          placeholder="Search"
          onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'Search'"
          onBlur={() => changeName()}
        />
      </div>
      <div className="p-2">
        <button
          className="w-max m-2 p-1 text-white bg-[#3eabab]"
          onClick={() => changeTag("mountain")}
        >
          Mountains
        </button>
        <button
          className="w-max m-2 p-1 text-white bg-[#3eabab]"
          onClick={() => changeTag("beaches")}
        >
          Beaches
        </button>
        <button
          className="w-max m-2 p-1 text-white bg-[#3eabab]"
          onClick={() => changeTag("birds")}
        >
          Birds
        </button>
        <button
          className="w-max m-2 p-1 text-white bg-[#3eabab]"
          onClick={() => changeTag("food")}
        >
          Food
        </button>
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold text-[#3eabab] italic capitalize">
          {searchInput === "" ? tag : name} Pictures
        </h1>
      </div>
      <div className="flex flex-wrap w-screen  p-[5px] ">
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div
                key={item.id}
                className="p-1 m-2 w-max relative img-container"
              >
                <img
                  className="w-[280px] h-[280px] img-card"
                  src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                  alt=""
                />
                <div className="w-[100%] absolute opacity-0 mx-auto  bottom-[40%] p-2  text-center  title">
                  <h1 className="text-xl font-bold text-black">{item.title}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mx-auto mt-4">
            <h1 className=" text-2xl font-bold text-[red] italic capitalize">
              No Results found...
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
