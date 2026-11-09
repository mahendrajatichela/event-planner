export interface CalendarEvent {
  id: number
  title: string
  date: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
  time: string
  location: string
  category: 'Konferensi' | 'Corporate' | 'Workshop' | 'Koordinasi' | 'Persiapan'
  color: 'emerald' | 'sky' | 'amber' | 'purple' | 'rose'
  description?: string
}

export const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Meeting Koordinasi Vendor Tech Conf',
    date: '2026-10-28',
    time: '14:00 - 16:00 WIB',
    location: 'Ruang Rapat Utama & Zoom',
    category: 'Koordinasi',
    color: 'sky',
    description: 'Penyelarasan teknis stage lighting, streaming rig, dan konsumsi.',
  },
  {
    id: 2,
    title: 'Gladi Resik & Sound Check',
    date: '2026-11-05',
    time: '10:00 - 13:00 WIB',
    location: 'JIExpo Kemayoran, Hall A',
    category: 'Persiapan',
    color: 'amber',
    description: 'Uji coba mikrofon panggung utama, LED videotron, dan cue rundown.',
  },
  {
    id: 3,
    title: 'Tech Conference & Expo 2026',
    date: '2026-11-14',
    endDate: '2026-11-15',
    time: '08:30 - 17:00 WIB',
    location: 'JIExpo Kemayoran, Hall A-B',
    category: 'Konferensi',
    color: 'emerald',
    description: 'Konferensi inovasi teknologi tahunan skala nasional dengan 1.280 peserta.',
  },
  {
    id: 4,
    title: 'Evaluasi Pasca Acara Tech Conf',
    date: '2026-11-20',
    time: '13:30 - 15:30 WIB',
    location: 'Tech Space Co-working Hub',
    category: 'Corporate',
    color: 'purple',
    description: 'Pembahasan laporan keuangan dan feedback dari peserta.',
  },
  {
    id: 5,
    title: 'Gala Dinner Tahunan Nusantara',
    date: '2026-12-02',
    time: '18:30 - 22:00 WIB',
    location: 'Grand Ballroom Hotel Mulia',
    category: 'Corporate',
    color: 'emerald',
    description: 'Malam penganugerahan dan apresiasi rekanan tahunan.',
  },
  {
    id: 6,
    title: 'Vue.js Developer Community Meetup',
    date: '2026-12-18',
    time: '13:00 - 16:30 WIB',
    location: 'Tech Space Co-working Hub',
    category: 'Workshop',
    color: 'sky',
    description: 'Sharing session seputar ekosistem Vue 3, Vite, dan arsitektur frontend.',
  },
]
