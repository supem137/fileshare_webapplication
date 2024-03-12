import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PasswordBox from './pages/PasswordBox';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/download/password/:id',
      element: <PasswordBox />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
