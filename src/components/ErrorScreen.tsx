import React from "react";

const ErrorScreen = () => {
  return (
    <section
      style={{
        backgroundImage: `url("https://picsum.photos/1000")`,
      }}
      className="h-screen w-full bg-cover"
    >
      <div className="h-full w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)] text-white">
        <h1 className="font-bold text-[30px] text-center">
          An error occurred while fetching the artist. <br />Please refresh this page.
        </h1>
        <button
          className="mt-6 rounded bg-blue-500 p-2 px-8"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
      </div>
    </section>
  );
};

export default ErrorScreen;
