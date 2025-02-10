import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Movie = (props) => {
  console.log({ props });
  const { data } = props;

  if (!data) {
    return <div>No movie data available</div>;
  }

  const { backdrop_path, title, release_date, overview } = data;

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        className="aspect-video w-full brightness-50"
      />
      <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw]">{title}</p>
        <div>
          {/* <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">
            PG13
          </p> */}
          <p className="text-[1.2vw]">{release_date}</p>
        </div>
        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p className="">{overview}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-white px-4 py-2 text-10 text-black lg:text-lg">
            <FontAwesomeIcon icon={faPlay} /> Trailer
          </button>
          <button className="rounded-md bg-slate-300/35 px-4 py-2 text-10 lg:text-lg">
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

Movie.propTypes = {
  data: PropTypes.shape({
    backdrop_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
  }),
};

Movie.defaultProps = {
  data: null,
};

export default Movie;
