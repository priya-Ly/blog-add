import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/style.scss'
import * as bootstrap from 'bootstrap' 
import EditorContextProvider from './components/EditorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditorContextProvider>
    <App />

    </EditorContextProvider>
  </React.StrictMode>,
)
