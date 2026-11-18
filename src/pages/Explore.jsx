import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import CarCard from '../components/CarCard.jsx'
import { CARS, CATEGORIES } from '../data/cars.js'

export default function Explore() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState('all')
  const [max, setMax] = useState(2500)
  const [showF, setShowF] = useState(false)

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    return CARS.filter((c) => (cat === 'all' || c.type === cat) && c.price <= max &&
      (!t || `${c.brand} ${c.model} ${c.type} ${c.specs.fuel}`.toLowerCase().includes(t)))
  }, [q, cat, max])

  return (
    <Page className="explore has-nav">
      <motion.div className="pad" variants={stagger} initial="initial" animate="animate">
        <motion.p variants={rise} className="muted">{CARS.length} cars available near you</motion.p>
        <motion.h1 variants={rise} className="title">Explore</motion.h1>
        <motion.div variants={rise} className="search">
          <Search size={18} />
          <input placeholder="Search brand, model or type" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button onClick={() => setQ('')} aria-label="Clear"><X size={16} /></button>}
          <motion.button className={`filter-btn ${showF ? 'on' : ''}`} whileTap={{ scale: 0.9 }} onClick={() => setShowF(!showF)} aria-label="Filters"><SlidersHorizontal size={17} /></motion.button>
        </motion.div>
        <AnimatePresence>
          {showF && (
            <motion.div className="card filters" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <div className="row between"><b>Max price / day</b><span className="red">${max.toLocaleString()}</span></div>
              <input type="range" min="150" max="2500" step="50" value={max} onChange={(e) => setMax(+e.target.value)} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div variants={rise} className="chips hscroll flush">
          {CATEGORIES.map((c) => (
            <button key={c.id} className={`chip ${cat === c.id ? 'dark' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </motion.div>
      </motion.div>

      <div className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((c, i) => (
            <motion.div key={c.id} layout exit={{ opacity: 0, scale: 0.9 }}>
              <CarCard car={c} wide index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
        {!list.length && <p className="empty">No cars found. Try a different search.</p>}
      </div>
    </Page>
  )
}
