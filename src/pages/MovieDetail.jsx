import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import Loading from "@components/Loading";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInformation from "@components/MediaDetail/MovieInformation";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isRelatedMovieListLoading, setIsRelatedMovieListLoading] =
  //   useState(false);

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

  useEffect(() => {
    // setIsRelatedMovieListLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmI1NmJmNWM4NzY3Y2JmYzNkNGJiOGVmZmNhMzhlYyIsIm5iZiI6MTczOTA5NTc3NS45MTIsInN1YiI6IjY3YTg3ZWRmMjI4N2YzYjkxN2M4YmM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f6ZCCxRP74Fm4sFXWuSuGvq6t4S0MzUSvHC3aS0ysVY`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        const currentRelatedMovies = (data.results || []).slice(0, 12);
        setRelatedMovies(currentRelatedMovies);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // setIsRelatedMovieListLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  console.log({ movieInfo });
  return (
    <div className="bg-black text-[1.2vw] text-white">
      <div>
        <Banner mediaInfo={movieInfo} />
        <div className="mx-auto flex max-w-screen-md gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            <RelatedMediaList mediaList={relatedMovies} />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
