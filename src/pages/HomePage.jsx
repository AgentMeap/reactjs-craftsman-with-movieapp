import { useEffect } from 'react';
import FeatureMovie from '../components/FeatureMovie/FeatureMovie';
import MediaList from '../components/MediaList';
import { useModalContext } from '@context/ModalProvider';
import { TOP_RATED_TABS, TRENDING_TABS } from '../libs/constants';

function HomePage() {
  const {
    currentTabTrending,
    setCurrentTabTrending,
    currentTabTopRated,
    setCurrentTabTopRated,
  } = useModalContext();

  useEffect(() => {
    const savedTrendingTab = localStorage.getItem('currentTabTrending');
    const savedTopRatedTab = localStorage.getItem('currentTabTopRated');
    if (savedTrendingTab) {
      setCurrentTabTrending(savedTrendingTab);
    }
    if (savedTopRatedTab) {
      setCurrentTabTopRated(savedTopRatedTab);
    }
  }, [setCurrentTabTrending, setCurrentTabTopRated]);

  const handleTrendingTabChange = (tab) => {
    setCurrentTabTrending(tab);
    localStorage.setItem('currentTabTrending', tab);
  };

  const handleTopRatedTabChange = (tab) => {
    setCurrentTabTopRated(tab);
    localStorage.setItem('currentTabTopRated', tab);
  };

  return (
    <div>
      <FeatureMovie />
      <MediaList
        title="Trending"
        tabs={TRENDING_TABS}
        selectedTab={currentTabTrending}
        onTabChange={handleTrendingTabChange}
      />
      <MediaList
        title="Top Rated"
        tabs={TOP_RATED_TABS}
        selectedTab={currentTabTopRated}
        onTabChange={handleTopRatedTabChange}
      />
    </div>
  );
}

export default HomePage;
