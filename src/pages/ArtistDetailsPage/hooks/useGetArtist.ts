import { httpClient } from "api";
import React, { useState, useEffect } from "react";
import { IAlbum, IArtist, IResult } from "utils/types";
import { NotificationManager } from "react-notifications";
import useLoading from "utils/useLoading";

interface Props {
  id?: string;
}

const useGetArtist = ({ id }: Props) => {
  const handle = useLoading();
  const handle2 = useLoading();
  const [artist, setArtist] = useState<IArtist | undefined>(undefined);
  const [tracks, setTracks] = useState<IResult[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [skip,setSkip] = useState(25);

  const hasMoreAlbums =
    albums.length && (artist?.nb_album || 0) > albums.length;

  const fetchArtist = async (id) => {
    handle.startLoading();
    try {
      const { data: res } = await httpClient.get(
        `getartist-dcnmbzyata-uc.a.run.app?id=${id}`
      );
      setArtist(res.data.artist);
      setTracks(res.data.topTracks.data);
      setAlbums(res.data.albums.data);
    } catch (error) {
      console.log({ error });
      NotificationManager.error("An error occurred.");
    } finally {
      handle.stopLoading();
    }
  };

  const loadMoreAlbums = async () => {
    handle2.startLoading()
    try {
      if (hasMoreAlbums && !handle2.loading) {
        const { data: res } = await httpClient.get(
          `loadalbums-dcnmbzyata-uc.a.run.app?id=${id}&skip=${skip}`
        );
        setAlbums((prev) => [...prev, ...res.data.albums.data]);
        setSkip(prev => prev+25)
      }
    } catch (error) {
      NotificationManager.error(
        "An error occurred while fetching more albums."
      );
    }
    finally {
      handle2.stopLoading()
    }
  };

  useEffect(() => {
    if (id) {
      fetchArtist(id);
    }
  }, [id]);

  return {
    loading: handle.loading,
    artist,
    tracks,
    albums,
    hasMoreAlbums,
    loadMoreAlbums,
    fetching: handle2.loading
  };
};

export default useGetArtist;
