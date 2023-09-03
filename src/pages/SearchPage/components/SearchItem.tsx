import React from "react";
import { useNavigate } from "react-router-dom";
import { secondsToMinutes } from "utils/helpers";
import { IResult } from "utils/types";

interface Props {
  track: IResult;
}

const SearchItem = ({ track }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-[75%] md:w-[200px]">
      <div className="w-full h-[200px] bg-orange-400 mb-4">
        <img
          src={track.album?.cover_medium || ""}
          // @ts-ignore
          onError={(e) => (e.target.src = "https://picsum.photos/200")}
          className="h-full w-full"
          alt="track cover"
        />
      </div>
      <p className="text-gray-500 text-xs">
        {secondsToMinutes(track.duration)}
      </p>
      <p className="font-semibold ">{track.title}</p>
      <p className="hidden lg:block">[ {track.album?.title} ]</p>
      <p
        className="text-gray-500 text-sm cursor-pointer"
        onClick={() => navigate(`/artist/${track.artist?.id}`)}
      >
        By {track.artist.name}
      </p>
    </div>
  );
};

export default SearchItem;
