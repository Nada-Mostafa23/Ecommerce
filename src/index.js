

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'fontawesome-free/css/all.min.css';
import 'fontawesome-free/js/all.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome.min.js';
import UserContextProvider from './Component/Context/Usercontext.js';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(document.getElementById('root'));
export let queryClient = new QueryClient();
root.render(
                   <UserContextProvider>
                           <QueryClientProvider client={queryClient}>
                              <App />
                           </QueryClientProvider>
                   </UserContextProvider>
);


