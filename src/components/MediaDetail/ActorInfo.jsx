import ImageComponent from '@components/Image';

const ActorInfo = ({ name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded border border-slate-300 bg-black shadow-sm">
      <ImageComponent
        className="rounded"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w138_and_h175_face${profilePath}`
            : '/ActorNoImage.svg'
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
    </div>
  );
};
export default ActorInfo;
