import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2 } from 'lucide-react'
import Page, { stagger, rise } from '../components/Page.jsx'
import { useStore } from '../store.jsx'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
)
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>
)

export default function Login() {
  const [mode, setMode] = useState('login')
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useStore()
  const nav = useNavigate()
  const loc = useLocation()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (mode === 'signup' && form.name.trim().length < 2) er.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Enter a valid email address'
    if (form.password.length < 6) er.password = 'Password must be at least 6 characters'
    setErr(er)
    if (Object.keys(er).length) return
    setLoading(true)
    setTimeout(() => {
      const name = form.name.trim() || form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      login({ name, email: form.email })
      nav(loc.state?.from || '/home', { replace: true })
    }, 1100)
  }

  const quick = () => {
    setLoading(true)
    setTimeout(() => { login({ name: 'Alex Morgan', email: 'alex@rider.app' }); nav('/home', { replace: true }) }, 900)
  }

  return (
    <Page className="login">
      <div className="login-hero">
        <motion.img src="/cars/photo/audi-r8.webp" alt="" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />
        <div className="login-hero-fade" />
        <motion.div className="login-brand" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span className="logo-dot">R</span> Rider
        </motion.div>
      </div>

      <motion.div className="login-sheet" variants={stagger} initial="initial" animate="animate">
        <motion.h1 variants={rise}>
          {mode === 'login' ? <>Welcome<br />back.</> : <>Create your<br />account.</>}
        </motion.h1>
        <motion.p variants={rise} className="muted">
          {mode === 'login' ? 'Sign in to book your next drive.' : 'Join Rider and drive the cars you love.'}
        </motion.p>

        <motion.div variants={rise} className="seg">
          {['login', 'signup'].map((m) => (
            <button key={m} type="button" onClick={() => { setMode(m); setErr({}) }} className={mode === m ? 'on' : ''}>
              {mode === m && <motion.span layoutId="seg" className="seg-pill" />}
              <span>{m === 'login' ? 'Log in' : 'Sign up'}</span>
            </button>
          ))}
        </motion.div>

        <form onSubmit={submit} noValidate>
          <AnimatePresence initial={false}>
            {mode === 'signup' && (
              <motion.div key="name" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <Field icon={User} placeholder="Full name" value={form.name} onChange={set('name')} error={err.name} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div variants={rise}>
            <Field icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={set('email')} error={err.email} autoComplete="email" />
          </motion.div>
          <motion.div variants={rise}>
            <Field icon={Lock} type={show ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={set('password')} error={err.password}
              trailing={<button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Toggle password">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>} />
          </motion.div>
          {mode === 'login' && <motion.button variants={rise} type="button" className="link forgot">Forgot password?</motion.button>}

          <motion.button variants={rise} className="btn-primary block" whileTap={{ scale: 0.97 }} disabled={loading}>
            {loading ? <Loader2 className="spin" size={20} /> : <>{mode === 'login' ? 'Log in' : 'Create account'} <ArrowRight size={18} /></>}
          </motion.button>
        </form>

        <motion.div variants={rise} className="divider"><span>or continue with</span></motion.div>
        <motion.div variants={rise} className="socials">
          <button type="button" onClick={quick}><GoogleIcon /> Google</button>
          <button type="button" onClick={quick}><AppleIcon /> Apple</button>
        </motion.div>
        <motion.button variants={rise} type="button" className="link demo" onClick={quick}>Skip — explore with a demo account</motion.button>
      </motion.div>
    </Page>
  )
}

function Field({ icon: Icon, error, trailing, ...props }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label>
        <Icon size={18} />
        <input {...props} />
        {trailing}
      </label>
      <AnimatePresence>
        {error && <motion.small initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{error}</motion.small>}
      </AnimatePresence>
    </div>
  )
}
