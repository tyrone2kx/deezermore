import React, { useEffect, useState } from "react";
import useTrackSearch from "./hooks/useTrackSearch";
import SearchItem from "./components/SearchItem";
import useDisclosure from "utils/useDisclosure";

const SearchPage = () => {
  const { text, setText, searchResult, loading } = useTrackSearch();
  const control = useDisclosure();
  const defaultFilters = {
    artist: "",
    album: "",
    label: "",
    track: "",
    dur_min: "",
    dur_max: "",
    bpm_min: "",
    bpm_max: "",
  };
  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = (e, filterType) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const availableFilters = Object.keys(filters).filter((key) => !!filters[key]);

  useEffect(() => {
    const query = availableFilters
      .map((key) => `${key}:"${filters[key]}"`)
      .join(" ");
    setText(query);
  }, [filters]);

  useEffect(() => {
    if (!control.isOpen) {
      setFilters(defaultFilters);
    }
  }, [control.isOpen]);

  return (
    <main>
      <section className="w-full bg-gray-700 p-10">
        <h1 className="text-white text-[30px] font-bold">Deezermore</h1>

        <div className="min-h-[250px] flex items-center justify-center">
          <div className="w-full md:w-[70%] xl:w-[40%]">
            <p
              onClick={() => {
                setText("");
                control.toggle();
              }}
              className="mb-4 cursor-pointer text-white text-xs text-right"
            >
              {control.isOpen ? "Hide" : "Advanced"} filters
            </p>
            {control.isOpen ? (
              <div className="w-full flex flex-wrap justify-center flex-col md:flex-row gap-4">
                <input
                  value={filters.artist}
                  onChange={(e) => handleFilters(e, "artist")}
                  className="p-4 rounded-lg"
                  placeholder="Search by artist name"
                />
                <input
                  value={filters.album}
                  onChange={(e) => handleFilters(e, "album")}
                  className="p-4 rounded-lg"
                  placeholder="Search by album name"
                />
                <input
                  value={filters.track}
                  onChange={(e) => handleFilters(e, "track")}
                  className="p-4 rounded-lg"
                  placeholder="Search by track name"
                />
                <input
                  value={filters.label}
                  onChange={(e) => handleFilters(e, "label")}
                  className="p-4 rounded-lg"
                  placeholder="Search by record label"
                />
                <input
                  value={filters.dur_min}
                  onChange={(e) => handleFilters(e, "dur_min")}
                  className="p-4 rounded-lg"
                  type="number"
                  placeholder="Search by min duration"
                />
                <input
                  value={filters.dur_max}
                  onChange={(e) => handleFilters(e, "dur_max")}
                  className="p-4 rounded-lg"
                  type="number"
                  placeholder="Search by max duration"
                />
                <input
                  value={filters.bpm_min}
                  onChange={(e) => handleFilters(e, "bpm_min")}
                  className="p-4 rounded-lg"
                  type="number"
                  placeholder="Search by min beats per minute"
                />
                <input
                  value={filters.bpm_max}
                  onChange={(e) => handleFilters(e, "bpm_max")}
                  className="p-4 rounded-lg"
                  type="number"
                  placeholder="Search by max beats per minute"
                />
              </div>
            ) : (
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 rounded-lg"
                placeholder="Search for your favorite track"
              />
            )}
          </div>
        </div>
      </section>
      <section>
        <header className="p-4 py-12">
          <h1 className="text-center text-[24px] font-bold text-gray-700">
            Search Results
          </h1>
        </header>
        <div className="flex w-full justify-center">
          <div className="flex flex-col md:flex-row flex-wrap gap-6 p-4 items-center md:items-start justify-center w-full md:w-[80%] xl:w-[70%]">
            {searchResult?.length > 0 ? (
              searchResult.map((track) => (
                <SearchItem track={track} key={track.id} />
              ))
            ) : (
              <div className="w-[200px] p-4">
                <p className="text-lg text-center">
                  {!availableFilters.length && !text
                    ? "Enter a track name above to search for a track"
                    : "No record found!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
