import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.25 } },
}

export default function Page({ children, className = '', ...rest }) {
  return (
    <motion.main className={`page ${className}`} variants={variants} initial="initial" animate="animate" exit="exit" {...rest}>
      {children}
    </motion.main>
  )
}

export const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}
export const rise = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
