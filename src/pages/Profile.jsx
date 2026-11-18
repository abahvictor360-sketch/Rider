import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Bell, CreditCard, ShieldCheck, HelpCircle, LogOut, ChevronRight, Award, IdCard } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import { useStore } from '../store.jsx'

export default function Profile() {
  const { user, logout, favs, bookings, notify } = useStore()
  const nav = useNavigate()
  const initials = (user?.name || 'R').split(' ').map((s) => s[0]).join('').slice(0, 2)
  const rows = [
    { Icon: Heart, label: 'Favourite cars', meta: favs.length, go: () => nav('/favorites') },
    { Icon: Bell, label: 'Notifications', go: () => nav('/notifications') },
    { Icon: IdCard, label: "Driver's licence", meta: 'Verified', go: () => notify('Licence verified ✓') },
    { Icon: CreditCard, label: 'Payment methods', meta: 'Visa 4242', go: () => notify('Payment methods coming soon') },
    { Icon: ShieldCheck, label: 'Privacy & security', go: () => notify('Your data is encrypted') },
    { Icon: HelpCircle, label: 'Help & support', go: () => notify('Support: help@rider.app') },
  ]
  return (
    <Page className="profile has-nav">
      <motion.div className="pad" variants={stagger} initial="initial" animate="animate">
        <motion.div variants={rise} className="profile-card">
          <motion.div className="avatar lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }}>{initials}</motion.div>
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <span className="tier"><Award size={13} /> Gold member</span>
          </div>
        </motion.div>
        <motion.div variants={rise} className="stats">
          <div><b>{bookings.length + 2}</b><small>Trips</small></div>
          <div><b>{favs.length}</b><small>Saved</small></div>
          <div><b>4.9</b><small>Rating</small></div>
        </motion.div>
        <motion.div variants={rise} className="card list">
          {rows.map(({ Icon, label, meta, go }) => (
            <motion.button key={label} className="li" onClick={go} whileTap={{ scale: 0.98 }}>
              <span className="li-ic"><Icon size={17} /></span><div><b>{label}</b></div>
              {meta !== undefined && <span className="muted small">{meta}</span>}
              <ChevronRight size={16} className="muted" />
            </motion.button>
          ))}
        </motion.div>
        <motion.button variants={rise} className="logout" whileTap={{ scale: 0.97 }} onClick={() => { logout(); nav('/login', { replace: true }) }}>
          <LogOut size={18} /> Log out
        </motion.button>
        <motion.p variants={rise} className="muted center small">Rider v1.0 · Made with ♥</motion.p>
      </motion.div>
    </Page>
  )
}
