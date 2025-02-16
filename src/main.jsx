import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import TVShowDetail from '@pages/TVShowDetail';
import RootLayout from '@pages/RootLayout';
import HomePage from '@pages/HomePage';
import MovieDetail from '@pages/MovieDetail';
import ModalProvider from '@context/ModalProvider';
import PeoplePage from '@pages/PeoplePage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetail />,
      },
      {
        path: '/tv/:id',
        element: <TVShowDetail />,
      },
      {
        path: '/people/:id',
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
              },
            },
          );
          return response;
        },
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>,
);
