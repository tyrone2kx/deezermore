import React from "react";
import { IAlbum } from "utils/types";

const AlbumItem = ({ album }: {album: IAlbum}) => {
  return (
    <div className="w-[75%] md:w-[25%] xl:w-[20%] mb-4">
      <div className="w-full h-[200px] bg-gray-600 mb-4">
        <img
          src={album.cover_medium}
          // @ts-ignore
          onError={(e) => (e.target.src = "https://picsum.photos/200")}
          className="h-full w-full"
          alt="track cover"
        />
      </div>
      <div className="pr-2">
        <p className="font-semibold ">{album.title}</p>
        <p className="text-gray-500 text-sm">{new Date(album.release_date).getFullYear()}</p>
      </div>
    </div>
  );
};

export default AlbumItem;
