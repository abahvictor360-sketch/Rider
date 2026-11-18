import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowUpRight, Flame, Star, Fuel, Users } from 'lucide-react'
import { useStore, money } from '../store.jsx'

export default function CarCard({ car, wide, index = 0 }) {
  const nav = useNavigate()
  const { favs, toggleFav } = useStore()
  const fav = favs.includes(car.id)
  return (
    <motion.article
      className={`car-card ${wide ? 'wide' : ''}`}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={() => nav(`/car/${car.id}`)}
    >
      <div className="car-card-media" style={{ '--tint': car.tint }}>
        {car.popular && <span className="badge-popular"><Flame size={12} /> Popular</span>}
        <motion.button
          className={`icon-btn sm fav ${fav ? 'on' : ''}`}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => { e.stopPropagation(); toggleFav(car.id) }}
          aria-label="Favourite"
        >
          <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
        </motion.button>
        <motion.img
          src={car.cutout}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          whileHover={{ scale: 1.06, y: -4 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
      </div>
      <div className="car-card-body">
        <div>
          <h3>{car.brand} {car.model}</h3>
          <p className="muted meta">
            <span><Star size={12} fill="#f5b301" color="#f5b301" /> {car.rating.toFixed(1)}</span>
            <span><Fuel size={12} /> {car.specs.fuel}</span>
            {wide && <span><Users size={12} /> {car.specs.seats}</span>}
          </p>
          <p className="price"><b>{money(car.price)}</b><span>/day</span></p>
        </div>
        <span className="go"><ArrowUpRight size={18} /></span>
      </div>
    </motion.article>
  )
}
