import { useParams } from 'react-router-dom';
import Banner from '@components/MediaDetail/Banner';
import ActorList from '@components/MediaDetail/ActorList';
import Loading from '@components/Loading';
import RelatedMediaList from '@components/MediaDetail/RelatedMediaList';
import useFetch from '@components/hooks/useFetch';
import TVShowInformation from '@components/MediaDetail/TVShowInformation';
import SeasonList from '@components/MediaDetail/SeasonList';

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
  });

  const { data: recommendationsResponse, isLoading: isRecommendationLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
    });

  const relatedTVShow = recommendationsResponse.results || [];

  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === 'US',
  )?.rating;

  const crews = (tvInfo?.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ['Director', 'Writer'].some((job) => jobs.find((j) => j === job));
    })
    .splice(0, 5)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  if (isLoading) {
    return <Loading />;
  }
  console.log(tvInfo);

  return (
    <div className="bg-black text-[1.2vw] text-white">
      <div>
        <Banner
          title={tvInfo.name}
          backdropPath={tvInfo.backdrop_path}
          posterPath={tvInfo.poster_path}
          releaseDate={tvInfo.first_air_date}
          genres={tvInfo.genres}
          point={tvInfo.vote_average}
          overview={tvInfo.overview}
          certification={certification}
          crews={crews}
          trailerVideoKey={
            (tvInfo.videos?.results || []).find(
              (video) => video.type === 'Trailer',
            )?.key
          }
        />
        <div className="container">
          <div className="flex-[2]">
            <ActorList
              actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                ...cast,
                character: cast.roles[0]?.character,
                episodeCount: cast.roles[0]?.episode_count,
              }))}
            />
            <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
            <RelatedMediaList
              mediaList={relatedTVShow}
              isLoading={isRecommendationLoading}
              title={'More like this'}
            />
          </div>
          <div className="flex-1">
            <TVShowInformation tvInfo={tvInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
