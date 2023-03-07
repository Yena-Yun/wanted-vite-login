import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginWithMockAPI from './pages/LoginWithMockAPI';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginWithMockAPI />,
    },
  ]);

  return (
    <div className='content'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
