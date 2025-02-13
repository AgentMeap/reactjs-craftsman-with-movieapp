import ImageComponent from '@components/Image';
import { useModalContext } from '@context/ModalProvider';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Movie = (props) => {
  const {
    data: { id, backdrop_path, title, release_date, overview },
    trailerVideoKey,
  } = props;
  const { openPopup } = useModalContext();

  console.log({ props });

  return (
    <div>
      <ImageComponent
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        className="aspect-video w-full brightness-50"
        width={1000}
        height={560}
      />
      <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
        <p className="mb-2 font-bold sm:text-[2vw]">{title}</p>
        <div>
          <p className="text-[1.2vw]">{release_date}</p>
        </div>
        <div>
          <div className="mt-4 hidden text-[1.2vw] sm:block">
            <p className="mb-2 font-bold">Overview</p>
            <p className="">{overview}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              openPopup(
                <iframe
                  src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                  title="Trailer"
                  className="aspect-video w-[50vw]"
                />,
              );
            }}
            className="rounded-md bg-white px-4 py-2 text-10 text-black lg:text-lg"
          >
            <FontAwesomeIcon icon={faPlay} /> Trailer
          </button>
          <Link to={`/movie/${id}`}>
            <button className="rounded-md bg-slate-300/35 px-4 py-2 text-10 lg:text-lg">
              View Detail
            </button>
          </Link>
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
  trailerVideoKey: PropTypes.string,
};

Movie.defaultProps = {
  data: null,
  trailerVideoKey: '',
};

export default Movie;
