import NavBar from './pages/components/NavBar'
import BlogPage from './pages/components/BlogPage'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className='bg-white dark:bg-gray-900 min-h-screen'>
    <Toaster richColors />
    <NavBar />
    <BlogPage />
    </div>
  )
}

export default App
