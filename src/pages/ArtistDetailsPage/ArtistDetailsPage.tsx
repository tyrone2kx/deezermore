import React from "react";
import TrackListItem from "./components/TrackListItem";
import AlbumItem from "./components/AlbumItem";
import { useParams } from "react-router-dom";
import useGetArtist from "./hooks/useGetArtist";
import { formatNumber } from "utils/helpers";
import Loader from "components/Loader";
import ErrorScreen from "components/ErrorScreen";

const ArtistDetailsPage = () => {
  const { id } = useParams();
  const {
    artist,
    albums,
    tracks,
    hasMoreAlbums,
    loadMoreAlbums,
    fetching,
    loading,
  } = useGetArtist({ id });
  return (
    <main>
      {loading ? (
        <Loader />
      ) : !artist ? (
        <ErrorScreen />
      ) : (
        <>
          <section className="flex flex-col md:flex-row w-full">
            <div
              style={{
                backgroundImage: `url('${
                  artist?.picture_xl || "https://picsum.photos/1000"
                }')`,
              }}
              className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] min-h-[300px] bg-orange-400 bg-cover"
            >
              <div className="bg-[rgba(0,0,0,0.4)] w-full h-full p-4 py-20 flex items-center justify-center">
                <article className="w-[80%] md:w-[60%] text-white">
                  <h1 className="font-bold text-[30px]">{artist?.name}</h1>
                  <p>
                    <b>{formatNumber(artist?.nb_fan || 0)}</b>{" "}
                    <span className="text-sm">fans</span>
                  </p>
                  <div className="bg-gray-400 h-1 w-[50px] mt-2" />
                  {/* <p className="text-sm mt-6 w-full lg:w-[80%]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
              </p> */}
                </article>
              </div>
            </div>
            <aside className="p-6 w-full md:w-[40%] lg:w-[35%] xl:w-[30%] border-b">
              <h2 className="font-semibold mb-4">Top tracks</h2>

              <div>
                {tracks.map((item, index) => (
                  <TrackListItem key={item.id} sn={index + 1} track={item} />
                ))}
              </div>
            </aside>
          </section>
          <section className="flex w-full justify-center py-10 px-6 md:px-0">
            <div className="w-full md:w-[70%] xl:w-[70%] ">
              <h2 className="font-semibold mb-6">Albums</h2>
              <div className="flex flex-col md:flex-row flex-wrap items-center md:items-start ">
                {albums.map((item, index) => (
                  <AlbumItem key={item.id} album={item} />
                ))}
              </div>

              {hasMoreAlbums && !fetching && (
                <p
                  onClick={loadMoreAlbums}
                  className="underline text-sm cursor-pointer mt-10 text-center"
                >
                  Load more
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default ArtistDetailsPage;
