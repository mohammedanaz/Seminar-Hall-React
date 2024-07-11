import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from './App.jsx'
import { store, persistor } from './store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
</Provider>
)
