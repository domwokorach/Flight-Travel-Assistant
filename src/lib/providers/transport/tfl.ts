import type { TransportOption, TransportServiceStatus } from '@/types/transport'
import { fetchJson } from '@/lib/http'
import { withServerCache } from '@/lib/serverCache'

interface TflLineStatus {
  id: string
  name: string
  lineStatuses: { statusSeverityDescription: string; reason?: string }[]
}

const SEVERITY_MAP: Record<string, TransportServiceStatus> = {
  'Good Service': 'good_service',
  'Minor Delays': 'minor_delays',
  'Severe Delays': 'severe_delays',
  'Part Suspended': 'part_suspended',
  'Part Closure': 'part_suspended',
  'Suspended': 'service_closed',
  'Closed': 'service_closed',
  'Service Closed': 'service_closed',
}

/** TfL's public Unified API serves line status without authentication for light usage. Real, free, no key. */
export async function getTflLineStatus(lineIds: string[]): Promise<Map<string, TflLineStatus>> {
  const data = await withServerCache(`tfl:status:${lineIds.join(',')}`, 60_000, async () => {
    const url = `https://api.tfl.gov.uk/Line/${lineIds.join(',')}/Status`
    return fetchJson<TflLineStatus[]>(url, { revalidate: 60, timeoutMs: 6000 })
  })
  return new Map(data.map((l) => [l.id, l]))
}

export async function buildTflTransportOption(lineId: string, displayName: string, journeyTime: string, price: string, fallbackAlternative?: { mode: string; journeyTime: string }): Promise<TransportOption> {
  try {
    const statuses = await getTflLineStatus([lineId])
    const line = statuses.get(lineId)
    const description = line?.lineStatuses[0]?.statusSeverityDescription ?? 'Good Service'
    const status = SEVERITY_MAP[description] ?? 'unknown'
    const disrupted = status !== 'good_service' && status !== 'unknown'

    return {
      mode: displayName,
      kind: 'metro',
      next: disrupted ? null : 'Every 5–10 min',
      journeyTime,
      price,
      status,
      statusText: description,
      isLive: true,
      disruptionReason: disrupted ? line?.lineStatuses[0]?.reason ?? null : null,
      alternative: disrupted ? fallbackAlternative ?? null : null,
    }
  } catch {
    return {
      mode: displayName,
      kind: 'metro',
      next: null,
      journeyTime,
      price,
      status: 'unknown',
      statusText: 'Status unavailable',
      isLive: false,
      disruptionReason: null,
      alternative: null,
    }
  }
}
