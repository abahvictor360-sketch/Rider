import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bell, MapPin, CalendarDays, ArrowRight, LayoutGrid, Zap, ChevronRight, Sparkles, LocateFixed, ChevronDown } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import MapView from '../components/MapView.jsx'
import CarCard from '../components/CarCard.jsx'
import Sheet from '../components/Sheet.jsx'
import { CARS, CATEGORIES, LOCATIONS } from '../data/cars.js'
import { useStore, fmtDate } from '../store.jsx'

const catImg = { SUV: 'land-cruiser', Sports: 'ferrari-f8', Coupe: 'bmw-m4', Luxury: 'rr-concept', Electric: 'hyundai-n' }
const SORTS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated']
const FUELS = ['Any fuel', 'Petrol', 'Diesel', 'Hybrid', 'Electric']

const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export default function Home() {
  const nav = useNavigate()
  const { user, pickup, setPickup, notify } = useStore()
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('Recommended')
  const [fuel, setFuel] = useState('Any fuel')
  const [sheet, setSheet] = useState(null)

  const list = useMemo(() => {
    let l = CARS.filter((c) => (cat === 'all' || c.type === cat) && (fuel === 'Any fuel' || c.specs.fuel === fuel))
    if (sort === 'Price: Low to High') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'Price: High to Low') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'Top Rated') l = [...l].sort((a, b) => b.rating - a.rating)
    if (sort === 'Recommended') l = [...l].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    return l
  }, [cat, sort, fuel])

  const initials = (user?.name || 'R').split(' ').map((s) => s[0]).join('').slice(0, 2)

  return (
    <Page className="home has-nav">
      <section className="home-top">
        <MapView />
        <div className="home-top-fade" />
        <motion.div className="home-head" variants={stagger} initial="initial" animate="animate">
          <motion.p variants={rise} className="muted">{greeting()}, {user?.name?.split(' ')[0]}</motion.p>
          <motion.h1 variants={rise}>Find your<br />next drive</motion.h1>
        </motion.div>
        <div className="home-actions">
          <motion.button className="icon-btn glass" whileTap={{ scale: 0.85 }} onClick={() => nav('/notifications')} aria-label="Notifications">
            <Bell size={18} /><span className="dot" />
          </motion.button>
          <motion.button className="avatar" whileTap={{ scale: 0.9 }} onClick={() => nav('/profile')}><img src="/avatar.webp" alt={user?.name} /></motion.button>
        </div>
        <motion.button className="icon-btn glass locate" whileTap={{ scale: 0.85, rotate: 90 }} onClick={() => notify('Location updated')} aria-label="Locate me">
          <LocateFixed size={18} />
        </motion.button>
      </section>

      <motion.section className="pickup-card" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <button className="pickup-row" onClick={() => setSheet('loc')}>
          <MapPin size={18} />
          <div><small>Pickup location</small><b>{pickup.location}</b></div>
        </button>
        <label className="pickup-row">
          <CalendarDays size={18} />
          <div><small>Pickup date & time</small><b>{fmtDate(pickup.date)}</b></div>
          <input type="datetime-local" className="ghost-input" value={toLocal(pickup.date)}
            onChange={(e) => e.target.value && setPickup({ ...pickup, date: new Date(e.target.value).toISOString() })} />
        </label>
        <motion.button className="fab" whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.06 }} onClick={() => nav('/explore')} aria-label="Search cars">
          <ArrowRight size={22} />
        </motion.button>
      </motion.section>

      <section className="cats hscroll">
        {CATEGORIES.map((c, i) => {
          const on = cat === c.id
          const count = c.id === 'all' ? CARS.length : CARS.filter((x) => x.type === c.id).length
          return (
            <motion.button key={c.id} className={`cat ${on ? 'on' : ''}`} onClick={() => setCat(c.id)}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }} whileTap={{ scale: 0.94 }}>
              {c.id === 'all' ? <span className="cat-icon"><LayoutGrid size={18} /></span> : <img src={`/cars/cutout/${catImg[c.id]}.webp`} alt="" />}
              <span className="cat-txt"><b>{c.label}</b><small>{count} cars</small></span>
            </motion.button>
          )
        })}
      </section>

      <motion.section className="promo" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        onClick={() => nav('/car/phantom-x')}>
        <motion.img src="/cars/photo/phantom-x.webp" alt="" initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} transition={{ duration: 1.4 }} />
        <div className="promo-shade" />
        <span className="promo-tag"><Zap size={12} /> Limited time</span>
        <div className="promo-copy">
          <small>SPECIAL OFFER</small>
          <h2>Drive<br />More<br /><span>For Less</span></h2>
          <p>Get up to 30% off<br />on weekend rentals.</p>
          <span className="promo-go"><ArrowRight size={16} /></span>
        </div>
      </motion.section>

      <section className="section-head">
        <h2>Available cars</h2>
        <button className="link" onClick={() => nav('/explore')}>View all <ChevronRight size={16} /></button>
      </section>

      <section className="chips hscroll">
        <button className="chip dark" onClick={() => setSheet('sort')}><Sparkles size={14} /> {sort}</button>
        <button className={`chip ${sort === 'Price: Low to High' ? 'on' : ''}`} onClick={() => setSort(sort === 'Price: Low to High' ? 'Recommended' : 'Price: Low to High')}>Price: Low to High</button>
        <button className={`chip ${fuel !== 'Any fuel' ? 'on' : ''}`} onClick={() => setSheet('fuel')}>{fuel === 'Any fuel' ? 'Fuel Type' : fuel} <ChevronDown size={14} /></button>
      </section>

      <section className="cards hscroll">
        <AnimatePresence mode="popLayout">
          {list.length ? list.map((c, i) => <CarCard key={c.id} car={c} index={i} />) : (
            <motion.p className="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No cars match these filters.</motion.p>
          )}
        </AnimatePresence>
      </section>

      <section className="section-head"><h2>Top brands</h2></section>
      <section className="brands hscroll">
        {['Ferrari', 'Lamborghini', 'BMW', 'Mercedes-AMG', 'Audi', 'Range Rover', 'Toyota', 'Rolls-Royce'].map((b, i) => (
          <motion.button key={b} className="brand" whileTap={{ scale: 0.92 }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
            onClick={() => nav(`/explore?q=${encodeURIComponent(b)}`)}>
            <span>{b[0]}</span>{b}
          </motion.button>
        ))}
      </section>

      <Sheet open={sheet === 'loc'} onClose={() => setSheet(null)} title="Pickup location">
        {LOCATIONS.map((l) => (
          <button key={l} className={`sheet-opt ${pickup.location === l ? 'on' : ''}`} onClick={() => { setPickup({ ...pickup, location: l }); setSheet(null) }}>
            <MapPin size={18} /> {l}
          </button>
        ))}
      </Sheet>
      <Sheet open={sheet === 'sort'} onClose={() => setSheet(null)} title="Sort by">
        {SORTS.map((s) => <button key={s} className={`sheet-opt ${sort === s ? 'on' : ''}`} onClick={() => { setSort(s); setSheet(null) }}>{s}</button>)}
      </Sheet>
      <Sheet open={sheet === 'fuel'} onClose={() => setSheet(null)} title="Fuel type">
        {FUELS.map((s) => <button key={s} className={`sheet-opt ${fuel === s ? 'on' : ''}`} onClick={() => { setFuel(s); setSheet(null) }}>{s}</button>)}
      </Sheet>
    </Page>
  )
}

export function toLocal(iso) {
  const d = new Date(iso)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}
