import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {  AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <Router>
 <AuthProvider>
 <App/>
 </AuthProvider>
 </Router>
)
