import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'

const Welcome = React.lazy(() => import('WelcomePage/WelcomeLayout'));
const App = () => (
  
  <div className="w-full bg-tertiary-400 max-[1023px]:pb-9">
    <React.Suspense fallback='Loading...'>
      <Welcome />
    </React.Suspense>
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)