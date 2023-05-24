import './App.css'
import { Login } from './pages/PublicPages/Login'
import { Admin } from './pages/PrivatePages/Admin'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { RoutesWithNotFound } from './utilities'
import { PrivateRoutes, PublicRoutes } from './models'
import { Private } from './pages/PrivatePages'
import { Provider } from 'react-redux'
import { AuthGuard } from './guards'
import store from './redux/store'
import Navbar from './Components/Navbar'
import { Home } from './pages/PublicPages/Home'
import HotelList from './pages/PublicPages/HotelList/HotelList'
import HotelReview from './pages/PublicPages/HotelReview/HotelReview'


function App() {

  return (
    <>
      {/* Cuando tarda en cargar un componente aqui se mete el spiner */}
      <Suspense fallback={<div>Cargando</div>}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound >
              <Route path='/' element={<Navigate to={PublicRoutes.HOME} />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.HOME} element={<Home />} />
              <Route path={PublicRoutes.HOTELS} element={<HotelList />} />
              <Route path={`${PublicRoutes.HOTELS}/:id`} element={<HotelReview />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </>
  )
}

export default App
