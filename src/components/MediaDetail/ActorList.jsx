import { useState } from 'react';
import ActorInfo from './ActorInfo';

const ActorList = ({ actors = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const currentActors = isShowMore ? actors : actors.slice(0, 4);
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actor</p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {currentActors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
            episodeCount={actor.episodeCount}
          />
        ))}
      </div>
      <p
        className="mt-1 cursor-pointer"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? 'Show Less' : 'Show More'}
      </p>
    </div>
  );
};
export default ActorList;
