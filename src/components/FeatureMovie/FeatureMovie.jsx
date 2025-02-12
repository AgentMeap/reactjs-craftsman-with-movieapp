import { useEffect, useState } from 'react';
import Movie from './Movie';
import PaginateIndicator from './PaginateIndicator';
import './FeatureMovie.css';
import useFetch from '@components/hooks/useFetch';

const FeatureMovie = () => {
  // const [movies, setMovies] = useState([]); //Empty Array
  const [activeMovieId, setActiveMovieId] = useState();
  console.log('Rendering...');

  const { data: popularMoviesResponse } = useFetch({
    url: '/movie/popular',
  });

  const movies = (popularMoviesResponse.results || []).slice(0, 4);

  useEffect(() => {
    setActiveMovieId(movies[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  console.log(movies);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveMovieId((prevId) => {
  //       const currentIndex = movies.findIndex((movie) => movie.id === prevId);
  //       return movies[(currentIndex + 1) % movies.length].id;
  //     });
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [movies]);

  // const handleNext = () => {
  //   setActiveMovieId((prevId) => {
  //     const currentIndex = movies.findIndex((movie) => movie.id === prevId);
  //     return movies[(currentIndex + 1) % movies.length].id;
  //   });
  // };

  // const handlePrev = () => {
  //   setActiveMovieId((prevId) => {
  //     const currentIndex = movies.findIndex((movie) => movie.id === prevId);
  //     return movies[(currentIndex - 1 + movies.length) % movies.length].id;
  //   });
  // };

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
//   return (
//     <div className="relative text-white">
//       {movies.length > 0 && (
//         <div>
//           <button onClick={handlePrev}>Prev</button>
//           {movies
//             .filter((movie) => movie.id === activeMovieId)
//             .map((movie) => (
//               <Movie key={movie.id} data={movie} />
//             ))}
//           <button onClick={handleNext}>Next</button>
//         </div>
//       )}
//       <PaginateIndicator
//         movies={movies}
//         activeMovieId={activeMovieId}
//         setActiveMovieId={setActiveMovieId}
//       />
//     </div>
//   );
// };
//   return (
//     <div className="relative text-white">
//       {movies.length > 0 && (
//         <div className="slider">
//           <button onClick={handlePrev} className="slider-button left">
//             Prev
//           </button>
//           <div className="slider-content">
//             {movies
//               .filter((movie) => movie.id === activeMovieId)
//               .map((movie) => (
//                 <Movie key={movie.id} data={movie} />
//               ))}
//           </div>
//           <button onClick={handleNext} className="slider-button right">
//             Next
//           </button>
//         </div>
//       )}
//       <PaginateIndicator
//         movies={movies}
//         activeMovieId={activeMovieId}
//         setActiveMovieId={setActiveMovieId}
//       />
//     </div>
//   );
// };
export default FeatureMovie;
