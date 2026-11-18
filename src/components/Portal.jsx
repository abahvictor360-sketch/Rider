import { createPortal } from 'react-dom'
export default function Portal({ children }) {
  const host = typeof document !== 'undefined' && document.querySelector('.screen')
  return host ? createPortal(children, host) : null
}
