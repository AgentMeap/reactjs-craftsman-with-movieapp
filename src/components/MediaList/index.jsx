import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  useEffect(() => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmI1NmJmNWM4NzY3Y2JmYzNkNGJiOGVmZmNhMzhlYyIsIm5iZiI6MTczOTA5NTc3NS45MTIsInN1YiI6IjY3YTg3ZWRmMjI4N2YzYjkxN2M4YmM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f6ZCCxRP74Fm4sFXWuSuGvq6t4S0MzUSvHC3aS0ysVY`,
        },
      }).then(async (res) => {
        const data = await res.json();
        console.log({ data });
        const trendingMediaList = data.results.slice(0, 12);
        setMediaList(trendingMediaList);
      });
    }
  }, [activeTabId, tabs]);
  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${
                activeTabId === tab.id
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;
