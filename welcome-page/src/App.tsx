import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import WelcomeLayout from './pages/Layout/WelcomeLayout'

const App = () => (
  <div className="w-full bg-tertiary-400 max-[1023px]:pb-9">
    <WelcomeLayout />
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)