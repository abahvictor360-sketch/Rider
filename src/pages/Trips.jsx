import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import { getCar } from '../data/cars.js'
import { useStore, fmtDate, money } from '../store.jsx'

const SAMPLE = [
  { id: 'RD482913', carId: 'bmw-m4', from: '2026-08-14T10:00:00Z', to: '2026-08-17T10:00:00Z', location: 'Union Station, Toronto', total: 1197, status: 'Completed' },
  { id: 'RD207734', carId: 'land-cruiser', from: '2026-06-02T09:00:00Z', to: '2026-06-06T09:00:00Z', location: 'Pearson Airport (YYZ)', total: 1137, status: 'Completed' },
]

export default function Trips() {
  const { bookings, cancelBooking } = useStore()
  const [tab, setTab] = useState('up')
  const nav = useNavigate()
  const upcoming = bookings.filter((b) => b.status === 'Confirmed')
  const past = [...bookings.filter((b) => b.status !== 'Confirmed'), ...SAMPLE]
  const list = tab === 'up' ? upcoming : past

  return (
    <Page className="trips has-nav">
      <motion.div className="pad" variants={stagger} initial="initial" animate="animate">
        <motion.p variants={rise} className="muted">Your bookings</motion.p>
        <motion.h1 variants={rise} className="title">My trips</motion.h1>
        <motion.div variants={rise} className="seg light">
          {[['up', `Upcoming (${upcoming.length})`], ['past', 'History']].map(([k, l]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
              {tab === k && <motion.span layoutId="tripseg" className="seg-pill" />}<span>{l}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {list.length === 0 ? (
            <motion.div key="empty" className="empty-state" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <motion.img src="/cars/cutout/evoque-blue.webp" alt="" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
              <h3>No upcoming trips</h3>
              <p className="muted">Your next adventure is one tap away.</p>
              <button className="btn-primary" onClick={() => nav('/explore')}>Find a car <ArrowRight size={18} /></button>
            </motion.div>
          ) : list.map((b, i) => {
            const car = getCar(b.carId)
            return (
              <motion.div key={b.id + tab} className="trip" layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ delay: i * 0.06 }}>
                <div className="trip-top" style={{ '--tint': car.tint }} onClick={() => nav(`/car/${car.id}`)}>
                  <div><small>#{b.id}</small><b>{car.brand} {car.model}</b>
                    <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></div>
                  <img src={car.cutout} alt="" />
                </div>
                <div className="trip-info">
                  <p><CalendarDays size={15} /> {fmtDate(b.from)} → {fmtDate(b.to)}</p>
                  <p><MapPin size={15} /> {b.location}</p>
                  <div className="row between">
                    <b>{money(b.total)}</b>
                    {b.status === 'Confirmed'
                      ? <button className="link danger" onClick={() => cancelBooking(b.id)}>Cancel booking</button>
                      : <button className="link" onClick={() => nav(`/book/${car.id}`)}>Book again</button>}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Page>
  )
}
