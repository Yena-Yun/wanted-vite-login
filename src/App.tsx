import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginWithMockAPI from './pages/LoginWithMockAPI';
import './App.css';
import { JWTLogin } from 'pages/2-1/JWTLogin';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      // element: <LoginWithMockAPI />,
      element: <JWTLogin />,
    },
  ]);

  return (
    <div className='content'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
