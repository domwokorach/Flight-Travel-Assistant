// Airline identity data: brand color (for the initials fallback) and a verified marketing
// domain (for Logo.dev's domain lookup — see src/lib/airlineLogo.ts). Domain lookup is
// deterministic; Logo.dev's company-name lookup picks its top Brand Search match and can
// occasionally resolve an ambiguous name incorrectly, so prefer adding a domain here over
// relying on name lookup — see AirlineLogo.tsx.
export const airlines = {
  BA: { name: 'British Airways', color: '#1B3A6B', domain: 'britishairways.com' },
  VS: { name: 'Virgin Atlantic', color: '#DA0530', domain: 'virginatlantic.com' },
  AA: { name: 'American Airlines', color: '#0078D2', domain: 'aa.com' },
  DL: { name: 'Delta Air Lines', color: '#C8102E', domain: 'delta.com' },
  UA: { name: 'United Airlines', color: '#002244', domain: 'united.com' },
  AF: { name: 'Air France', color: '#002157', domain: 'airfrance.com' },
  KL: { name: 'KLM', color: '#00A1DE', domain: 'klm.com' },
  LH: { name: 'Lufthansa', color: '#0A1F44', domain: 'lufthansa.com' },
  EK: { name: 'Emirates', color: '#D71920', domain: 'emirates.com' },
  QR: { name: 'Qatar Airways', color: '#5C0632', domain: 'qatarairways.com' },
  EY: { name: 'Etihad Airways', color: '#8A6D3B', domain: 'etihad.com' },
  SQ: { name: 'Singapore Airlines', color: '#00397D', domain: 'singaporeair.com' },
  CX: { name: 'Cathay Pacific', color: '#00605A', domain: 'cathaypacific.com' },
  TK: { name: 'Turkish Airlines', color: '#C70A2E', domain: 'turkishairlines.com' },
  U2: { name: 'easyJet', color: '#FF6600', domain: 'easyjet.com' },
  FR: { name: 'Ryanair', color: '#073590', domain: 'ryanair.com' },
  B6: { name: 'JetBlue', color: '#00205B', domain: 'jetblue.com' },
  AC: { name: 'Air Canada', color: '#D22630', domain: 'aircanada.com' },
  QF: { name: 'Qantas', color: '#E40000', domain: 'qantas.com' },
  SK: { name: 'Scandinavian Airlines', color: '#003468', domain: 'flysas.com' },
}

export function getAirline(code) {
  return airlines[code]
}

/** Verified domain for Logo.dev's domain lookup, or undefined if this airline isn't mapped
 *  yet — callers fall back to company-name lookup in that case (see AirlineLogo.tsx). */
export function getAirlineDomain(code) {
  return code ? airlines[code]?.domain : undefined
}
