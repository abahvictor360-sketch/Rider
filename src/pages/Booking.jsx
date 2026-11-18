import { useMemo, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, MapPin, CalendarDays, CalendarCheck, CreditCard, Wallet, Check, Loader2, ShieldPlus, Baby, UserPlus, Truck } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import { getCar } from '../data/cars.js'
import { useStore, money, fmtDate } from '../store.jsx'
import { toLocal } from './Home.jsx'
import Portal from '../components/Portal.jsx'

const EXTRAS = [
  { id: 'ins', Icon: ShieldPlus, label: 'Premium protection', note: 'Zero excess cover', price: 25, per: 'day' },
  { id: 'driver', Icon: UserPlus, label: 'Additional driver', note: 'Share the wheel', price: 15, per: 'day' },
  { id: 'seat', Icon: Baby, label: 'Child seat', note: 'ISOFIX, all ages', price: 10, per: 'day' },
  { id: 'deliver', Icon: Truck, label: 'Doorstep delivery', note: 'We bring it to you', price: 40, per: 'trip' },
]
const PAY = [
  { id: 'card', label: 'Visa •••• 4242', Icon: CreditCard },
  { id: 'apple', label: 'Apple Pay', Icon: Wallet },
  { id: 'paypal', label: 'PayPal', Icon: Wallet },
]

export default function Booking() {
  const { id } = useParams()
  const car = getCar(id)
  const nav = useNavigate()
  const { pickup, setPickup, addBooking } = useStore()
  const [ret, setRet] = useState(() => { const d = new Date(pickup.date); d.setDate(d.getDate() + 3); return d.toISOString() })
  const [extras, setExtras] = useState(['ins'])
  const [pay, setPay] = useState('card')
  const [state, setState] = useState('idle')

  const days = Math.max(1, Math.ceil((new Date(ret) - new Date(pickup.date)) / 86400000))
  const totals = useMemo(() => {
    if (!car) return {}
    const base = car.price * days
    const ex = EXTRAS.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price * (e.per === 'day' ? days : 1), 0)
    const discount = days >= 3 ? Math.round(base * 0.1) : 0
    const fees = 29
    return { base, ex, discount, fees, total: base + ex + fees - discount }
  }, [car, days, extras])

  if (!car) return <Navigate to="/home" replace />

  const confirm = () => {
    setState('loading')
    setTimeout(() => {
      addBooking({ id: 'RD' + Math.floor(100000 + Math.random() * 900000), carId: car.id, from: pickup.date, to: ret, location: pickup.location, total: totals.total, status: 'Confirmed', created: Date.now() })
      setState('done')
    }, 1500)
  }

  return (
    <Page className="booking">
      <header className="topbar">
        <motion.button className="icon-btn" whileTap={{ scale: 0.85 }} onClick={() => nav(-1)} aria-label="Back"><ChevronLeft size={20} /></motion.button>
        <h1>Confirm booking</h1>
        <span style={{ width: 40 }} />
      </header>

      <motion.div className="pad" variants={stagger} initial="initial" animate="animate">
        <motion.div variants={rise} className="book-car" style={{ '--tint': car.tint }}>
          <img src={car.cutout} alt="" />
          <div>
            <small>{car.brand}</small>
            <b>{car.model}</b>
            <span>{car.specs.seats} · {car.specs.gearbox} · {car.specs.fuel}</span>
          </div>
        </motion.div>

        <motion.h2 variants={rise} className="h2">Trip details</motion.h2>
        <motion.div variants={rise} className="card list">
          <div className="li"><MapPin size={18} /><div><small>Pickup & return</small><b>{pickup.location}</b></div></div>
          <label className="li"><CalendarDays size={18} /><div><small>Pickup</small><b>{fmtDate(pickup.date)}</b></div>
            <input type="datetime-local" className="ghost-input" value={toLocal(pickup.date)} onChange={(e) => e.target.value && setPickup({ ...pickup, date: new Date(e.target.value).toISOString() })} /></label>
          <label className="li"><CalendarCheck size={18} /><div><small>Return</small><b>{fmtDate(ret)}</b></div>
            <input type="datetime-local" className="ghost-input" value={toLocal(ret)} onChange={(e) => e.target.value && setRet(new Date(e.target.value).toISOString())} /></label>
        </motion.div>

        <motion.h2 variants={rise} className="h2">Extras</motion.h2>
        <motion.div variants={rise} className="extras">
          {EXTRAS.map(({ id: eid, Icon, label, note, price, per }) => {
            const on = extras.includes(eid)
            return (
              <motion.button key={eid} className={`extra ${on ? 'on' : ''}`} whileTap={{ scale: 0.96 }} onClick={() => setExtras(on ? extras.filter((x) => x !== eid) : [...extras, eid])}>
                <Icon size={18} />
                <b>{label}</b>
                <small>{note}</small>
                <span>{money(price)}/{per}</span>
                <i className="tick">{on && <Check size={12} />}</i>
              </motion.button>
            )
          })}
        </motion.div>

        <motion.h2 variants={rise} className="h2">Payment</motion.h2>
        <motion.div variants={rise} className="card list">
          {PAY.map(({ id: pid, label, Icon }) => (
            <button key={pid} className="li radio" onClick={() => setPay(pid)}>
              <Icon size={18} /><div><b>{label}</b></div>
              <span className={`radio-dot ${pay === pid ? 'on' : ''}`} />
            </button>
          ))}
        </motion.div>

        <motion.div variants={rise} className="card summary">
          <Row k={`${money(car.price)} × ${days} day${days > 1 ? 's' : ''}`} v={money(totals.base)} />
          {totals.ex > 0 && <Row k="Extras" v={money(totals.ex)} />}
          <Row k="Service fee" v={money(totals.fees)} />
          {totals.discount > 0 && <Row k="3+ day discount (10%)" v={'−' + money(totals.discount)} accent />}
          <div className="sum-total"><span>Total</span><motion.b key={totals.total} initial={{ scale: 1.2, color: '#F2383D' }} animate={{ scale: 1, color: '#111' }}>{money(totals.total)}</motion.b></div>
        </motion.div>
      </motion.div>

      <div className="book-bar">
        <div><small>Total · {days} day{days > 1 ? 's' : ''}</small><b>{money(totals.total)}</b></div>
        <motion.button className="btn-primary" whileTap={{ scale: 0.95 }} onClick={confirm} disabled={state !== 'idle'}>
          {state === 'loading' ? <Loader2 className="spin" size={20} /> : <>Confirm & Pay</>}
        </motion.button>
      </div>

      <Portal><AnimatePresence>
        {state === 'done' && (
          <motion.div className="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="success-card" initial={{ y: 60, scale: 0.9 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
              <div className="check-wrap">
                <motion.span className="ring" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1.8], opacity: [0.6, 0.3, 0] }} transition={{ duration: 1.2, delay: 0.2 }} />
                <motion.svg width="84" height="84" viewBox="0 0 84 84" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
                  <circle cx="42" cy="42" r="40" fill="#F2383D" />
                  <motion.path d="M26 43 l11 11 l21 -23" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.5 }} />
                </motion.svg>
              </div>
              <h2>You're all set!</h2>
              <p className="muted">Your {car.brand} {car.model} is reserved for {fmtDate(pickup.date)} at {pickup.location}.</p>
              <motion.img src={car.cutout} alt="" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
              <button className="btn-primary block" onClick={() => nav('/trips', { replace: true })}>View my trips</button>
              <button className="link center" onClick={() => nav('/home', { replace: true })}>Back to home</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence></Portal>
    </Page>
  )
}

const Row = ({ k, v, accent }) => <div className={`sum-row ${accent ? 'accent' : ''}`}><span>{k}</span><b>{v}</b></div>
