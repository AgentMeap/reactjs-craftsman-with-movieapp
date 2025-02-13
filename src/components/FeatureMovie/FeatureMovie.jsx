import { useEffect, useState } from 'react';
import Movie from './Movie';
import PaginateIndicator from './PaginateIndicator';
import './FeatureMovie.css';
import useFetch from '@components/hooks/useFetch';

const FeatureMovie = () => {
  const [activeMovieId, setActiveMovieId] = useState();
  console.log('Rendering...');

  const { data: popularMoviesResponse } = useFetch({
    url: '/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true',
  });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: !!activeMovieId },
  );

  const temp = (videoResponse?.results || []).find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  )?.key;

  console.log({ videoResponse, temp });

  const movies = (popularMoviesResponse.results || []).slice(0, 4);

  useEffect(() => {
    setActiveMovieId(movies[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  console.log(movies);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie
            key={movie.id}
            data={movie}
            trailerVideoKey={
              (videoResponse?.results || []).find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube',
              )?.key
            }
          />
        ))}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovie;
