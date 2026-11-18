import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Page from '../components/Page.jsx'
import CarCard from '../components/CarCard.jsx'
import { CARS } from '../data/cars.js'
import { useStore } from '../store.jsx'

export default function Favorites() {
  const nav = useNavigate()
  const { favs } = useStore()
  const list = CARS.filter((c) => favs.includes(c.id))
  return (
    <Page>
      <header className="topbar">
        <motion.button className="icon-btn" whileTap={{ scale: 0.85 }} onClick={() => nav(-1)} aria-label="Back"><ChevronLeft size={20} /></motion.button>
        <h1>Favourites</h1><span style={{ width: 40 }} />
      </header>
      <div className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((c, i) => <motion.div key={c.id} layout exit={{ opacity: 0, scale: 0.85 }}><CarCard car={c} wide index={i} /></motion.div>)}
        </AnimatePresence>
        {!list.length && <p className="empty">Tap ♥ on any car to save it here.</p>}
      </div>
    </Page>
  )
}
