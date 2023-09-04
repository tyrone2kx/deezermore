import axios from "axios";
import React, { useEffect, useState } from "react";
import useLoading from "utils/useLoading";
import { NotificationManager } from "react-notifications";
import { useDebounce } from "use-debounce";
import { httpClient } from "api";
import { IResult } from "utils/types";
import { handleError } from "utils/handleError";

const useTrackSearch = () => {
  const handle = useLoading();
  const [searchResult, setSearchResult] = useState<IResult[]>([]);
  const [text, setText] = useState<string>("");
  const [debouncedSearchText] = useDebounce(text, 500);

  const startSearch = async (text: string) => {
    handle.startLoading();
    try {
      const { data } = await httpClient.get(
        `searchtracks-dcnmbzyata-uc.a.run.app/?searchString=${text}`
      );
      setSearchResult(data.data);
      if (!data.data.length) {
        NotificationManager.info(
          "No track exists with this title. Please search again."
        );
      }
    } catch (error) {
      handleError(error)
    } 
    finally {
      handle.stopLoading();
    }
  };

  useEffect(() => {
    if (debouncedSearchText) {
      startSearch(debouncedSearchText);
    }
  }, [debouncedSearchText]);

  return {
    loading: handle.loading,
    searchResult,
    text,
    setText,
  };
};

export default useTrackSearch;
