import { motion } from 'framer-motion'

const word = 'Rider'.split('')

export default function Splash() {
  return (
    <motion.div className="splash" exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }} transition={{ duration: 0.6 }}>
      <motion.div className="splash-glow" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4 }} />
      <div className="splash-center">
        <motion.div
          className="logo-mark"
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.15 }}
        >
          <svg viewBox="0 0 64 64" width="44" height="44"><path d="M20 44V20h14a9 9 0 0 1 2 17.8L44 44h-8l-7-6h-2v6zm7-12h7a3 3 0 0 0 0-6h-7z" fill="#fff"/></svg>
        </motion.div>
        <h1 className="splash-word">
          {word.map((ch, i) => (
            <motion.span key={i} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              {ch}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1 }}>Find your next drive</motion.p>
      </div>

      <div className="splash-road">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span key={i} className="speed-line" style={{ top: 18 + i * 14 }}
            initial={{ x: 420, opacity: 0 }} animate={{ x: -420, opacity: [0, 1, 0] }}
            transition={{ delay: 1 + i * 0.12, duration: 0.9, repeat: Infinity, repeatDelay: 0.4 }} />
        ))}
        <motion.img
          src="/cars/cutout/ferrari-f8.webp"
          alt=""
          initial={{ x: -460 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="splash-progress"><motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.9, ease: 'easeInOut' }} /></div>
    </motion.div>
  )
}
