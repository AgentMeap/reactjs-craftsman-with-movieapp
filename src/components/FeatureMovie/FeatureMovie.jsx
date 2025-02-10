import { useEffect, useState } from "react";
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import "./FeatureMovie.css";

const FeatureMovie = () => {
  const [movies, setMovies] = useState([]); //Empty Array
  const [activeMovieId, setActiveMovieId] = useState();
  console.log("Rendering...");
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmI1NmJmNWM4NzY3Y2JmYzNkNGJiOGVmZmNhMzhlYyIsIm5iZiI6MTczOTA5NTc3NS45MTIsInN1YiI6IjY3YTg3ZWRmMjI4N2YzYjkxN2M4YmM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f6ZCCxRP74Fm4sFXWuSuGvq6t4S0MzUSvHC3aS0ysVY`,
      },
    }).then(async (res) => {
      const data = await res.json();
      console.log({ data });
      const popularMovies = data.results.slice(0, 4);
      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    });
  }, []);

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
