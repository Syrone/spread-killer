import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './redux/store'
import { Provider } from 'react-redux'

import { YMInitializer } from 'react-yandex-metrika'

import App from './App'
import RouteListener from './RouteListener'

import './styles/global.scss'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <YMInitializer
      accounts={[101573961]}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: false
      }}
      version="2"
    />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RouteListener />
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
