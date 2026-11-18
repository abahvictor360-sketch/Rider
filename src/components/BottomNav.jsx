import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, CalendarDays, User } from 'lucide-react'

const items = [
  { to: '/home', label: 'Home', Icon: Home },
  { to: '/explore', label: 'Search', Icon: Search },
  { to: '/trips', label: 'Trips', Icon: CalendarDays },
  { to: '/profile', label: 'Profile', Icon: User },
]

export default function BottomNav() {
  return (
    <motion.nav
      className="bottomnav"
      initial={{ y: 120, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      exit={{ y: 120, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      {items.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label={label}>
          {({ isActive }) => (
            <>
              {isActive && <motion.span layoutId="navpill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <Icon size={20} strokeWidth={2.2} />
              {isActive && <motion.span className="nav-label" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}>{label}</motion.span>}
            </>
          )}
        </NavLink>
      ))}
    </motion.nav>
  )
}
