// Fallback branding for airline identity chips. No official logo assets are
// bundled with this demo (none were supplied by an API) — every airline here
// renders through AirlineLogo's initials fallback, tinted with each carrier's
// well-known brand color. Swap in `logoUrl` per-flight once a real logo/API
// source is available; nothing else needs to change.
export const airlines = {
  BA: { name: 'British Airways', color: '#1B3A6B' },
  VS: { name: 'Virgin Atlantic', color: '#DA0530' },
  AA: { name: 'American Airlines', color: '#0078D2' },
  DL: { name: 'Delta Air Lines', color: '#C8102E' },
  UA: { name: 'United Airlines', color: '#002244' },
  AF: { name: 'Air France', color: '#002157' },
  KL: { name: 'KLM', color: '#00A1DE' },
  LH: { name: 'Lufthansa', color: '#0A1F44' },
  EK: { name: 'Emirates', color: '#D71920' },
  QR: { name: 'Qatar Airways', color: '#5C0632' },
  EY: { name: 'Etihad Airways', color: '#8A6D3B' },
  SQ: { name: 'Singapore Airlines', color: '#00397D' },
  CX: { name: 'Cathay Pacific', color: '#00605A' },
  TK: { name: 'Turkish Airlines', color: '#C70A2E' },
  U2: { name: 'easyJet', color: '#FF6600' },
  FR: { name: 'Ryanair', color: '#073590' },
  B6: { name: 'JetBlue', color: '#00205B' },
  AC: { name: 'Air Canada', color: '#D22630' },
  QF: { name: 'Qantas', color: '#E40000' },
  SK: { name: 'Scandinavian Airlines', color: '#003468' },
}

export function getAirline(code) {
  return airlines[code]
}
