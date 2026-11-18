import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './store.jsx'
import Splash from './pages/Splash.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import CarDetail from './pages/CarDetail.jsx'
import Booking from './pages/Booking.jsx'
import Trips from './pages/Trips.jsx'
import Profile from './pages/Profile.jsx'
import Favorites from './pages/Favorites.jsx'
import Notifications from './pages/Notifications.jsx'
import BottomNav from './components/BottomNav.jsx'
import StatusBar from './components/StatusBar.jsx'

const TABS = ['/home', '/explore', '/trips', '/profile']

function Protected({ children }) {
  const { user } = useStore()
  const loc = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />
  return children
}

export default function App() {
  const location = useLocation()
  const { user, toast } = useStore()
  const [splash, setSplash] = useState(true)
  const showNav = !splash && user && TABS.includes(location.pathname)
  const dark = location.pathname === '/login'

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="stage">
      <aside className="pitch">
        <div className="pitch-logo"><span>R</span>Rider</div>
        <h1>Find your next drive.</h1>
        <p>A premium car rental experience — live map pickup, curated supercars & SUVs, full specs and one-tap booking.</p>
        <ul>
          <li>Interactive React prototype</li>
          <li>Motion-driven UI with Framer Motion</li>
          <li>Open on your phone for the full-screen app</li>
        </ul>
      </aside>

      <div className="device">
        <StatusBar light={dark || splash} />
        <div className="screen">
          <AnimatePresence mode="popLayout" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to={user ? '/home' : '/login'} replace />} />
              <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
              <Route path="/home" element={<Protected><Home /></Protected>} />
              <Route path="/explore" element={<Protected><Explore /></Protected>} />
              <Route path="/car/:id" element={<Protected><CarDetail /></Protected>} />
              <Route path="/book/:id" element={<Protected><Booking /></Protected>} />
              <Route path="/trips" element={<Protected><Trips /></Protected>} />
              <Route path="/profile" element={<Protected><Profile /></Protected>} />
              <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
              <Route path="/notifications" element={<Protected><Notifications /></Protected>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <AnimatePresence>{showNav && <BottomNav key="nav" />}</AnimatePresence>

          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast.id}
                className="toast"
                initial={{ y: -30, opacity: 0, x: '-50%' }}
                animate={{ y: 0, opacity: 1, x: '-50%' }}
                exit={{ y: -30, opacity: 0, x: '-50%' }}
              >
                {toast.msg}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>{splash && <Splash key="splash" />}</AnimatePresence>
        </div>
        <div className="home-indicator" />
      </div>
    </div>
  )
}
