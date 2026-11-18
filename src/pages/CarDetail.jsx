import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { ChevronLeft, Share2, Heart, Star, ChevronRight, Box, ShieldCheck, Check, ArrowRight, Fuel, Armchair, Zap, Gauge, Cog, Activity, MapPin } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import { getCar, CARS } from '../data/cars.js'
import { useStore, money } from '../store.jsx'

export default function CarDetail() {
  const { id } = useParams()
  const car = getCar(id)
  const nav = useNavigate()
  const { favs, toggleFav, notify, pickup } = useStore()
  const [view, setView] = useState(0)
  const [spin, setSpin] = useState(false)
  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-150, 150], [-35, 35])
  if (!car) return <Navigate to="/home" replace />
  const fav = favs.includes(car.id)
  const s = car.specs
  const specs = [
    { Icon: Fuel, k: 'Fuel Type', v: s.fuel },
    { Icon: Armchair, k: 'Seat Capacity', v: s.seats },
    { Icon: Zap, k: 'Max Power', v: s.power },
    { Icon: Gauge, k: 'Max Speed', v: s.speed },
    { Icon: Cog, k: 'Transmission', v: s.gearbox },
    { Icon: Activity, k: 'Torque', v: s.torque },
  ]
  const share = async () => {
    const data = { title: `Rider · ${car.brand} ${car.model}`, url: window.location.href }
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify('Link copied') } } catch {}
  }
  const similar = CARS.filter((c) => c.type === car.type && c.id !== car.id).slice(0, 4)

  return (
    <Page className="detail">
      <section className={`detail-hero v${view}`} style={{ '--tint': car.tint }}>
        <AnimatePresence mode="wait">
          {view === 1 ? (
            <motion.img key="photo" className="hero-photo" src={car.photo} alt="" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
          ) : (
            <motion.div key="studio" className="hero-studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="arch" />
              <div className="floor" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="detail-bar">
          <motion.button className="icon-btn glass" whileTap={{ scale: 0.85 }} onClick={() => nav(-1)} aria-label="Back"><ChevronLeft size={20} /></motion.button>
          <div className="row gap8">
            <motion.button className="icon-btn glass" whileTap={{ scale: 0.85 }} onClick={share} aria-label="Share"><Share2 size={17} /></motion.button>
            <motion.button className={`icon-btn glass ${fav ? 'fav-on' : ''}`} whileTap={{ scale: 0.7 }} onClick={() => toggleFav(car.id)} aria-label="Favourite">
              <Heart size={17} fill={fav ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>

        {view !== 1 && (
          <motion.div className="hero-title" variants={stagger} initial="initial" animate="animate">
            <motion.small variants={rise}>{car.brand.toUpperCase()}</motion.small>
            <motion.h1 variants={rise}>{car.model}</motion.h1>
            <motion.span variants={rise}>{car.year}</motion.span>
          </motion.div>
        )}

        {view !== 1 && (
          <motion.div className="hero-car" style={{ perspective: 900 }}>
            <motion.img
              src={car.cutout}
              alt={`${car.brand} ${car.model}`}
              drag={spin ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.9}
              style={{ x, rotateY }}
              onDragEnd={() => animate(x, 0, { type: 'spring', stiffness: 120 })}
              initial={{ x: 220, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className={`car-shadow ${view === 2 ? 'dark' : ''}`} />
          </motion.div>
        )}

        <div className="hero-meta">
          <button className="rating-pill" onClick={() => notify(`${car.reviews} verified reviews`)}>
            <Star size={14} fill="#f5b301" color="#f5b301" /> {car.rating.toFixed(1)} <span>({car.reviews}+ reviews)</span> <ChevronRight size={14} />
          </button>
          <motion.button className={`pill-dark ${spin ? 'on' : ''}`} whileTap={{ scale: 0.92 }} onClick={() => { setView(view === 1 ? 0 : view); setSpin(!spin); if (!spin) notify('Drag the car to rotate') }}>
            <Box size={14} /> 360° View <ChevronRight size={14} />
          </motion.button>
        </div>
      </section>

      <motion.div className="detail-body" variants={stagger} initial="initial" animate="animate">
        <motion.div variants={rise} className="thumbs">
          {[0, 1, 2].map((i) => (
            <button key={i} className={`thumb t${i} ${view === i ? 'on' : ''}`} style={{ '--tint': car.tint }} onClick={() => { setView(i); setSpin(false) }}>
              <img src={i === 1 ? car.photo : car.cutout} alt="" />
            </button>
          ))}
          <button className="thumb more" onClick={() => setView(1)}>
            <img src={car.photo} alt="" /><span>+12</span>
          </button>
        </motion.div>

        <motion.div variants={rise} className="insure">
          <span className="insure-ic"><ShieldCheck size={18} /></span>
          <div><b>Co-operators Canada</b><small>Fully insured for a worry-free drive.</small></div>
          <span className="ok"><Check size={13} /> Insured</span>
          <ChevronRight size={16} className="muted" />
        </motion.div>

        <motion.div variants={rise} className="section-head tight">
          <h2>Specifications</h2>
          <span className="muted small">{car.type}</span>
        </motion.div>
        <motion.div variants={stagger} className="spec-grid">
          {specs.map(({ Icon, k, v }) => (
            <motion.div key={k} variants={rise} className="spec" whileHover={{ y: -3 }}>
              <Icon size={17} />
              <small>{k}</small>
              <b>{v}</b>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={rise} className="about">
          <h2>About this car</h2>
          <p className="muted">
            The {car.year} {car.brand} {car.model} pairs {s.power} with a {s.gearbox.toLowerCase()} gearbox for effortless, confident driving.
            Delivered fully detailed and fuelled, with roadside assistance and unlimited city mileage included.
          </p>
          <div className="pickup-mini"><MapPin size={15} /> Pickup at <b>{pickup.location}</b></div>
        </motion.div>

        {similar.length > 0 && (
          <motion.div variants={rise}>
            <div className="section-head tight"><h2>Similar cars</h2></div>
            <div className="similar hscroll">
              {similar.map((c) => (
                <button key={c.id} className="sim" style={{ '--tint': c.tint }} onClick={() => nav(`/car/${c.id}`, { replace: true })}>
                  <img src={c.cutout} alt="" />
                  <b>{c.brand} {c.model}</b>
                  <small>{money(c.price)}/day</small>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div className="book-bar" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 200, damping: 24 }}>
        <div><small>Price</small><b>{money(car.price)}</b><span> / day</span></div>
        <motion.button className="btn-primary" whileTap={{ scale: 0.95 }} onClick={() => nav(`/book/${car.id}`)}>
          Book Now <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </Page>
  )
}
