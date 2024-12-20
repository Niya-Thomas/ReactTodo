import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Todoapp from './Todoapp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Todoapp />
  </StrictMode>,
)
