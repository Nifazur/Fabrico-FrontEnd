import { Outlet } from 'react-router'
import CommonLayout from "./components/Layout/CommonLayout"
import { ScrollToTop } from './components/ScrollToTop'

function App() {


  return (
    <>
    <ScrollToTop />
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    </>
  )
}

export default App
