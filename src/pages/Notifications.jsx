import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Percent, CalendarCheck, Car, Star } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'

const items = [
  { Icon: Percent, t: 'Weekend deal unlocked', d: 'Save up to 30% on weekend rentals this month.', time: '2m' },
  { Icon: Car, t: 'New arrival: Ferrari F8 Tributo', d: 'Now available at Dufferin Mall.', time: '1h' },
  { Icon: CalendarCheck, t: 'Booking reminder', d: 'Bring your licence and a valid card at pickup.', time: '1d' },
  { Icon: Star, t: 'Rate your last trip', d: 'How was the BMW M4 Competition?', time: '3d' },
]

export default function Notifications() {
  const nav = useNavigate()
  return (
    <Page>
      <header className="topbar">
        <motion.button className="icon-btn" whileTap={{ scale: 0.85 }} onClick={() => nav(-1)} aria-label="Back"><ChevronLeft size={20} /></motion.button>
        <h1>Notifications</h1><span style={{ width: 40 }} />
      </header>
      <motion.div className="pad" variants={stagger} initial="initial" animate="animate">
        {items.map(({ Icon, t, d, time }) => (
          <motion.div key={t} variants={rise} className="notif">
            <span className="li-ic red"><Icon size={17} /></span>
            <div><b>{t}</b><p className="muted">{d}</p></div>
            <small className="muted">{time}</small>
          </motion.div>
        ))}
      </motion.div>
    </Page>
  )
}
