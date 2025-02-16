import ImageComponent from '@components/Image';
import { Link } from 'react-router-dom';

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <Link
      to={`/people/${id}`}
      className="rounded border border-slate-300 bg-black shadow-sm"
    >
      <ImageComponent
        className="w-full rounded" // Ensure the image takes the full width of the container
        src={
          profilePath &&
          `https://media.themoviedb.org/t/p/original${profilePath}`
        }
        width={138}
        height={175}
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {episodeCount && (
          <p>
            {episodeCount} {episodeCount > 1 ? 'Episodes' : 'Episode'}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ActorInfo;
