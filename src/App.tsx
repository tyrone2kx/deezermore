import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";
import Loader from "components/Loader";

const SearchPage = lazy(() => import("pages/SearchPage/SearchPage"));
const ArtistDetailsPage = lazy(
  () => import("pages/ArtistDetailsPage/ArtistDetailsPage")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route
            path="/artist/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ArtistDetailsPage />
              </Suspense>
            }
          />
        </Routes>
        <NotificationContainer />
      </BrowserRouter>
    </>
  );
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
