import { Plus, RefreshCw, Search, Server } from 'lucide-react'
import { Activity, Database, AlertTriangle, Cpu } from 'lucide-react'
import { StatCard, Button } from '../ui'
import ServerCard from '../ServerCard'
import DetailPanel from '../DetailPanel'

export default function Dashboard({
  servers, stats, checkingIds,
  selectedId, onSelect,
  onDelete, onCheck, onCheckAll,
  onOpenTerminal, onAddClick,
  search, onSearch,
}) {
  const filtered = servers.filter(s =>
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.ip.includes(search) ||
    (s.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
  )
  const selected = servers.find(s => s.id === selectedId)

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Stats row */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard label="Total VPS"    value={stats.total}   icon={Server}        color="blue"   sub="registered" />
        <StatCard label="Online"       value={stats.online}  icon={Activity}      color="green"  sub={stats.total ? `${Math.round(stats.online / stats.total * 100)}% uptime` : '—'} />
        <StatCard label="Status Kritis" value={stats.critical} icon={AlertTriangle} color="red"    sub="high load" />
        <StatCard label="Avg CPU"      value={`${stats.avgCpu}%`} icon={Cpu}      color="purple" sub={`RAM avg ${stats.avgRam}%`} />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 2 }}>Server Aktif</h3>
              <span style={{ fontSize: 12, color: '#334155' }}>{filtered.length} server</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{
                  position: 'absolute', left: 11, top: '50%',
                  transform: 'translateY(-50%)', color: '#334155',
                }} />
                <input
                  value={search}
                  onChange={e => onSearch(e.target.value)}
                  placeholder="Search…"
                  style={{
                    background: 'rgba(8,15,30,0.7)',
                    border: '1px solid var(--border2)',
                    borderRadius: 8, paddingLeft: 32, paddingRight: 12,
                    paddingTop: 7, paddingBottom: 7,
                    color: '#e2e8f0', fontSize: 13, outline: 'none', width: 180,
                  }}
                />
              </div>
              <Button variant="secondary" size="sm" onClick={onCheckAll}>
                <RefreshCw size={13} /> Ping All
              </Button>
            </div>
          </div>

          {/* Server list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.length === 0 ? (
              <div className="glass" style={{
                borderRadius: 14, padding: '52px 20px', textAlign: 'center',
              }}>
                <Server size={36} style={{ color: '#0f172a', margin: '0 auto 14px', display: 'block' }} />
                <p style={{ color: '#334155', marginBottom: 14 }}>
                  {search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada VPS terdaftar.'}
                </p>
                {!search && (
                  <Button variant="primary" size="sm" onClick={onAddClick}>
                    <Plus size={14} /> Tambah VPS Pertama
                  </Button>
                )}
              </div>
            ) : (
              filtered.map(s => (
                <ServerCard
                  key={s.id}
                  server={s}
                  isSelected={selectedId === s.id}
                  onClick={() => onSelect(s.id)}
                  onDelete={() => onDelete(s.id)}
                  onCheck={() => onCheck(s.id)}
                  onOpenTerminal={() => onOpenTerminal(s.id)}
                  isChecking={checkingIds.has(s.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: Detail */}
        <DetailPanel
          server={selected}
          onCheck={() => onCheck(selected?.id)}
          onDelete={() => onDelete(selected?.id)}
          onOpenTerminal={() => onOpenTerminal(selected?.id)}
          isChecking={selected ? checkingIds.has(selected.id) : false}
        />
      </div>
    </div>
  )
}
