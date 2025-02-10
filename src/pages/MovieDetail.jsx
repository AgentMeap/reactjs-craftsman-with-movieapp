import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../components/CircularProgressBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmI1NmJmNWM4NzY3Y2JmYzNkNGJiOGVmZmNhMzhlYyIsIm5iZiI6MTczOTA5NTc3NS45MTIsInN1YiI6IjY3YTg3ZWRmMjI4N2YzYjkxN2M4YmM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f6ZCCxRP74Fm4sFXWuSuGvq6t4S0MzUSvHC3aS0ysVY`,
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        console.log({ data });
        setMovieInfo(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const certification = (
    (movieInfo?.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (movieInfo?.credits?.crew || [])
    .filter((crew) => ["Director", "Writer", "Screenplay"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  console.log(crews);
  const groupedCrews = groupBy(crews, "job");
  console.log(groupedCrews);

  const voteAverage = movieInfo.vote_average
    ? Math.round(movieInfo.vote_average * 10)
    : 0;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative overflow-hidden text-white">
      <img
        src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
        className="absolute inset-0 brightness-[.2]"
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-8 lg:gap-8">
        <div className="flex-1">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieInfo.poster_path}`}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{movieInfo.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{movieInfo.release_date}</p>
            <p>
              {(movieInfo.genres || []).map((genre) => genre.name).join(", ")}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={voteAverage}
                strokeColor={
                  movieInfo.vote_average >= 7
                    ? "green"
                    : movieInfo.vote_average >= 5
                      ? "orange"
                      : "red"
                }
              />
              {""}
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{movieInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(groupedCrews).map(([job, crews]) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{crews.map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
