import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../Pages/Signin'
import SignUp from '../Pages/Signup'
import PrivateOutlet from './PrivateOutlet'
import WhatchLogin from './WhatchLogin'

const Dashboard = React.lazy(() => import('../Pages/Dashboard'))
const Profile = React.lazy(() => import('../Pages/Profiles'))
const Customers = React.lazy(() => import('../Pages/Customers'))

const Rotas = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateOutlet />}>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
      </Route>

      <Route path="/" element={<WhatchLogin />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      <Route path="/" element={<WhatchLogin />}>
        <Route path="/register" element={<SignUp />} />
      </Route>

      <Route path="/profile" element={<PrivateOutlet />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        />
      </Route>
      <Route path="/customers" element={<PrivateOutlet />}>
        <Route
          path="/customers"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Customers />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default Rotas
