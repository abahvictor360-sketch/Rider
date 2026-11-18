import { motion } from 'framer-motion'

const TopCar = ({ color = '#fff' }) => (
  <svg width="12" height="22" viewBox="0 0 12 22">
    <rect x="0.5" y="0.5" width="11" height="21" rx="4" fill={color} stroke="#c9ccd2" />
    <rect x="2" y="4" width="8" height="4" rx="1.5" fill="#3a3f47" />
    <rect x="2" y="14" width="8" height="3" rx="1.2" fill="#3a3f47" />
  </svg>
)

const movers = [
  { path: { x: [30, 150, 150], y: [70, 70, 160] }, rot: [90, 90, 180], dur: 9 },
  { path: { x: [330, 250, 250], y: [120, 120, 20] }, rot: [-90, -90, 0], dur: 11 },
  { path: { x: [90, 90, 300], y: [230, 140, 140] }, rot: [0, 0, 90], dur: 10 },
]

export default function MapView() {
  return (
    <div className="map">
      <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" className="map-svg">
        <rect width="400" height="270" fill="#eceef1" />
        <path d="M0 200 Q60 180 120 215 T260 230 T400 205 V270 H0Z" fill="#d6e6f3" />
        <rect x="185" y="20" width="70" height="45" rx="8" fill="#dcebd6" />
        <rect x="20" y="150" width="55" height="40" rx="8" fill="#dcebd6" />
        <circle cx="330" cy="60" r="26" fill="#dcebd6" />
        <g stroke="#fff" strokeLinecap="round">
          <path d="M0 70 H400" strokeWidth="9" />
          <path d="M0 140 H400" strokeWidth="9" />
          <path d="M150 0 V270" strokeWidth="9" />
          <path d="M250 0 V270" strokeWidth="9" />
          <path d="M90 0 V270" strokeWidth="5" />
          <path d="M330 0 V270" strokeWidth="5" />
          <path d="M0 105 H400" strokeWidth="4" />
          <path d="M0 30 L400 180" strokeWidth="6" />
          <path d="M40 0 V270 M200 0 V270 M0 180 H400" strokeWidth="2.5" />
        </g>
        <path d="M150 140 H250 V70" stroke="#F2383D" strokeWidth="3.5" fill="none" strokeDasharray="6 6" opacity=".55">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        <text x="190" y="14" fontSize="7" fill="#9aa0a8" fontWeight="600">Royal Ontario Museum</text>
        <text x="28" y="200" fontSize="7" fill="#9aa0a8" fontWeight="600">Christie Pits</text>
      </svg>

      {movers.map((m, i) => (
        <motion.div key={i} className="map-car"
          animate={{ left: m.path.x.map((v) => `${(v / 400) * 100}%`), top: m.path.y.map((v) => `${(v / 270) * 100}%`), rotate: m.rot }}
          transition={{ duration: m.dur, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}>
          <TopCar color={['#fff', '#f2f2f2', '#111'][i]} />
        </motion.div>
      ))}

      <div className="map-pin">
        <span className="pulse" />
        <span className="pulse d2" />
        <span className="pin-core" />
        <div className="pin-label">Dufferin Mall</div>
      </div>
      <div className="map-nearby"><i /> 5 cars nearby</div>
    </div>
  )
}
