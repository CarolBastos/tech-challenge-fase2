import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'

const Welcome = React.lazy(() => import('WelcomePage/WelcomeLayout'));
const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <React.Suspense fallback='Loading...'>
      <Welcome />
    </React.Suspense>
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)