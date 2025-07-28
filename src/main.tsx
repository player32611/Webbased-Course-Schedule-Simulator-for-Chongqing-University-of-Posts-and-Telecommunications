import ReactDOM from 'react-dom/client';
import router from "./router/router"
import { RouterProvider } from 'react-router';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router} />);
