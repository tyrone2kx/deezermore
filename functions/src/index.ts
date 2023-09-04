/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import axios from "axios";
export const searchTracks = onRequest(async (req, res) => {
  const { searchString } = req.query;
  try {
    if (searchString) {
      const { data } = await axios.get(
        `https://api.deezer.com/search?q=${searchString}`
      );
      res.status(200).send({
        status: "success",
        data: data.data || [],
      });
    } else {
      res.status(400).send({
        status: "failed",
        data: [],
        error: "Please enter a valid text to search for.",
      });
    }
  } catch (error) {
    console.log({error})
    res.status(500).send({
      status: "failed",
      data: [],
      error: "An error occurred. Please try again.",
    });
  }
});

export const getArtist = onRequest(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).send({
      status: "failed",
      data: null,
      error: "Invalid ID",
    });
  }
  try {
    const { data: artist } = await axios.get(
      `https://api.deezer.com/artist/${id}`
    );
    if (!artist) {
      res.status(404).send({
        status: "failed",
        data: null,
        error: "Artist not found",
      });
    }

    const [topTracksRes, albumsRes] = await Promise.all([
      axios.get(`https://api.deezer.com/artist/${id}/top`),
      axios.get(`https://api.deezer.com/artist/${id}/albums`),
    ]);
    res.status(200).send({
      status: "success",
      data: {
        artist,
        topTracks: topTracksRes.data,
        albums: albumsRes.data,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      data: null,
      error: "An error occurred. Please try again.",
    });
  }
});



export const loadAlbums = onRequest(async (req, res) => {
  const { id, skip } = req.query;
  if (!id) {
    res.status(400).send({
      status: "failed",
      data: null,
      error: "Invalid artist ID",
    });
  }
  try {
    const {data: albums} = await axios.get(`https://api.deezer.com/artist/${id}/albums?index=${skip}`)

    res.status(200).send({
      status: "success",
      data: {
        albums,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      data: null,
      error: "An error occurred. Please try again.",
    });
  }
});