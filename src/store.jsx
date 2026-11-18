import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
const load = (k, d) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch { return d }
}
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

const tomorrow = () => {
  const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(10, 30, 0, 0); return d.toISOString()
}

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => load('rider.user', null))
  const [favs, setFavs] = useState(() => load('rider.favs', ['ferrari-f8', 'amg-gle']))
  const [bookings, setBookings] = useState(() => load('rider.bookings', []))
  const [pickup, setPickup] = useState(() => load('rider.pickup', { location: 'Dufferin Mall, Toronto', date: tomorrow() }))
  const [toast, setToast] = useState(null)

  useEffect(() => save('rider.user', user), [user])
  useEffect(() => save('rider.favs', favs), [favs])
  useEffect(() => save('rider.bookings', bookings), [bookings])
  useEffect(() => save('rider.pickup', pickup), [pickup])

  const notify = (msg) => {
    setToast({ msg, id: Date.now() })
    setTimeout(() => setToast((t) => (t && t.msg === msg ? null : t)), 2200)
  }

  const value = {
    user,
    login: (u) => setUser(u),
    logout: () => setUser(null),
    favs,
    toggleFav: (id) => setFavs((f) => {
      const on = f.includes(id)
      notify(on ? 'Removed from favourites' : 'Saved to favourites')
      return on ? f.filter((x) => x !== id) : [...f, id]
    }),
    bookings,
    addBooking: (b) => setBookings((list) => [b, ...list]),
    cancelBooking: (id) => setBookings((list) => list.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))),
    pickup,
    setPickup,
    toast,
    notify,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)

export const fmtDate = (iso) => {
  const d = new Date(iso)
  const wd = d.toLocaleDateString('en-US', { weekday: 'short' })
  const mo = d.toLocaleDateString('en-US', { month: 'short' })
  const t = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${wd}, ${d.getDate()} ${mo} · ${t}`
}

export const money = (n) => '$' + Number(n).toLocaleString('en-US')
