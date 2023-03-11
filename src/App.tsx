import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginWithMockAPI from './pages/1-1/LoginWithMockAPI';
import './App.css';
import { JWTLogin } from 'pages/2-1/JWTLogin';
import { JWTLoginWithLocalStorage } from 'pages/2-2/JWTLoginWithLocalStorage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      // element: <LoginWithMockAPI />,
      // element: <JWTLogin />,
      element: <JWTLoginWithLocalStorage />,
    },
  ]);

  return (
    <div className='content'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
