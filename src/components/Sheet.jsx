import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function Sheet({ open, onClose, title, children }) {
  const host = typeof document !== 'undefined' && document.querySelector('.screen')
  if (!host) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="sheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, i) => i.offset.y > 80 && onClose()}>
            <span className="grabber" />
            <h3>{title}</h3>
            <div className="sheet-body">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    host
  )
}
