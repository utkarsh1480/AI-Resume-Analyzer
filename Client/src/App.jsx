
import './App.css'
import AppRoutes from './app.routes'
import { AuthProvider } from './feature/auth/auth.context'
import { Toaster } from "sonner";
import { InterviewProvider } from './feature/Interview/Interview.context';

function App() {
  return (
   <>
    <Toaster  position="top-right" />
    <AuthProvider>
      <InterviewProvider>
      <AppRoutes />
      </InterviewProvider>
    </AuthProvider>
   </>
  )
}

export default App
