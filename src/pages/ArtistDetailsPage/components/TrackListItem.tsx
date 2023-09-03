import React from "react";
import { secondsToMinutes } from "utils/helpers";
import { IResult } from "utils/types";

const TrackListItem = ({ track, sn }: { track: IResult; sn: number }) => {
  return (
    <div className="flex justify-between py-2 mb-4 border-b w-full text-sm">
      <div className="flex space-x-3">
        <p>{sn}</p>
        <p>{track.title}</p>
      </div>

      <p className="ml-2">{secondsToMinutes(track.duration)}</p>
    </div>
  );
};

export default TrackListItem;
