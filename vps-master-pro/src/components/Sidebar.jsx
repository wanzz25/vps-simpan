import { useState, useEffect } from 'react'
import { Server, Activity, Database, Terminal, ShieldCheck, Settings, Power, Bell } from 'lucide-react'
import { StatusDot } from './ui'

const TABS = [
  { id: 'dashboard',      icon: Activity,     label: 'Dashboard'      },
  { id: 'infrastructure', icon: Database,      label: 'Infrastructure' },
  { id: 'terminal',       icon: Terminal,      label: 'Web Terminal'   },
  { id: 'security',       icon: ShieldCheck,   label: 'Security'       },
  { id: 'settings',       icon: Settings,      label: 'Settings'       },
]

export default function Sidebar({ activeTab, onTabChange, stats, alertCount, onNotifToggle }) {
  const [clock, setClock] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <aside style={{
      width: 248,
      flexShrink: 0,
      background: 'rgba(5,10,20,0.95)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '18px 14px',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '4px 8px', marginBottom: 28 }}>
        <div style={{
          padding: 9,
          background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
          borderRadius: 11,
          display: 'flex',
          boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
        }}>
          <Server size={18} style={{ color: '#fff' }} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: '#f1f5f9', lineHeight: 1.2 }}>
            VPS Master
          </div>
          <div style={{ fontSize: 9, color: '#1e3a5f', fontWeight: 700, letterSpacing: '0.15em' }}>
            PRO EDITION
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
        {TABS.map(({ id, icon: Icon, label }) => {
          const active = activeTab === id
          return (
            <button key={id} onClick={() => onTabChange(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 12px', borderRadius: 9,
                border: 'none',
                background: active
                  ? 'linear-gradient(135deg,rgba(59,130,246,0.18),rgba(37,99,235,0.08))'
                  : 'transparent',
                color: active ? '#93c5fd' : '#334155',
                cursor: 'pointer', width: '100%', textAlign: 'left',
                fontWeight: 700, fontSize: 13.5,
                borderLeft: `2px solid ${active ? '#3b82f6' : 'transparent'}`,
                transition: 'all 0.15s',
                fontFamily: 'var(--sans)',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#64748b' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155' } }}>
              <Icon size={17} />
              <span>{label}</span>
              {id === 'dashboard' && alertCount > 0 && (
                <span style={{ marginLeft: 'auto', minWidth: 18, height: 18, borderRadius: 99,
                  background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                  {alertCount}
                </span>
              )}
            </button>
          )
        })}

        {/* Notifications button */}
        <button onClick={onNotifToggle}
          style={{
            display: 'flex', alignItems: 'center', gap: 11,
            padding: '10px 12px', borderRadius: 9,
            border: 'none', background: 'transparent',
            color: '#334155', cursor: 'pointer', width: '100%',
            fontWeight: 700, fontSize: 13.5,
            borderLeft: '2px solid transparent',
            fontFamily: 'var(--sans)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#64748b' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#334155' }}>
          <Bell size={17} />
          <span>Notifications</span>
          {alertCount > 0 && (
            <span style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%',
              background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
          )}
        </button>
      </nav>

      {/* Live counter */}
      <div style={{
        padding: '14px 12px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 10,
        border: '1px solid var(--border)',
        marginBottom: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: '#334155', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Live Status
          </span>
          <span style={{ fontSize: 11, color: '#1e3a5f', fontFamily: 'var(--mono)' }}>
            {clock.toLocaleTimeString('en-GB')}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
          {[
            { label: 'ONLINE',   val: stats.online,   color: '#10b981' },
            { label: 'OFFLINE',  val: stats.offline,  color: '#ef4444' },
            { label: 'CRITICAL', val: stats.critical, color: '#f59e0b' },
          ].map(({ label, val, color }) => (
            <div key={label}>
              <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1, marginBottom: 2 }}>{val}</div>
              <div style={{ fontSize: 9, color: '#1e3a5f', fontWeight: 700, letterSpacing: '0.1em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User profile */}
      <div style={{
        padding: '12px 12px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 10,
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#fff',
          }}>A</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1', lineHeight: 1.2 }}>Administrator</div>
            <div style={{ fontSize: 11, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              admin@vpsmaster.pro
            </div>
          </div>
        </div>
        <button style={{
          width: '100%', padding: '7px',
          background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 7, color: '#ef4444', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 6, fontFamily: 'var(--sans)',
          transition: 'all 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.14)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.07)'}>
          <Power size={12} /> Logout
        </button>
      </div>
    </aside>
  )
}
