module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/src/app/api/flights/connection/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$flightService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/flightService.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiError$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiError.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    const params = request.nextUrl.searchParams;
    const arrival = params.get('arrival') ?? 'KL1002';
    const departure = params.get('departure') ?? 'KL641';
    const walk = Number(params.get('walk') ?? '20');
    try {
        const { journey, isLive } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$flightService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConnectionJourney"])(arrival, departure, walk);
        if (!journey) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Connection flights not found'
        }, {
            status: 404
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            journey,
            isLive,
            fetchedAt: new Date().toISOString()
        });
    } catch (err) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiError$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiErrorResponse"])(err);
    }
}
}),
"[project]/src/lib/apiError.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiErrorResponse",
    ()=>apiErrorResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-route] (ecmascript)");
;
;
function apiErrorResponse(err) {
    if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProviderError"]) {
        const status = err.kind === 'rate_limit' ? 429 : err.kind === 'timeout' ? 504 : err.kind === 'not_found' ? 404 : 502;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message,
            kind: err.kind
        }, {
            status
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Unexpected server error'
    }, {
        status: 500
    });
}
}),
"[project]/src/lib/flightMath.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeDelayMinutes",
    ()=>computeDelayMinutes,
    "formatDelayLabel",
    ()=>formatDelayLabel,
    "formatMinutesAsClock",
    ()=>formatMinutesAsClock,
    "isMeaningfulStatusChange",
    ()=>isMeaningfulStatusChange,
    "minutesUntil",
    ()=>minutesUntil
]);
function computeDelayMinutes(point) {
    const scheduled = point.scheduled ? new Date(point.scheduled).getTime() : null;
    const revised = point.actual ?? point.estimated;
    const revisedMs = revised ? new Date(revised).getTime() : null;
    if (scheduled === null || revisedMs === null) return null;
    const diff = Math.round((revisedMs - scheduled) / 60000);
    return diff > 0 ? diff : null;
}
function formatDelayLabel(minutes, direction) {
    if (!minutes || minutes <= 0) return null;
    const verb = direction === 'departure' ? 'Delayed' : 'Estimated';
    const suffix = direction === 'departure' ? '' : ' late';
    return `${verb} ${minutes} min${suffix}`;
}
/** Rank used to decide whether an incoming status update is a meaningful change worth animating/notifying. */ const STATUS_RANK = {
    scheduled: 0,
    on_time: 1,
    gate_open: 2,
    boarding: 3,
    gate_closing: 4,
    delayed: 2.5,
    departed: 5,
    in_air: 6,
    landed: 7,
    arrived: 8,
    diverted: 9,
    cancelled: 10,
    unknown: -1
};
function isMeaningfulStatusChange(previous, next) {
    if (!previous) return false;
    if (previous === next) return false;
    return STATUS_RANK[next] !== STATUS_RANK[previous];
}
function minutesUntil(iso, from = new Date()) {
    if (!iso) return null;
    const target = new Date(iso).getTime();
    if (Number.isNaN(target)) return null;
    return Math.round((target - from.getTime()) / 60000);
}
function formatMinutesAsClock(totalMinutes) {
    const clamped = Math.max(0, totalMinutes);
    const mins = Math.floor(clamped) % 60;
    const hours = Math.floor(clamped / 60);
    const secondsPart = '00';
    if (hours > 0) return `${hours}:${String(mins).padStart(2, '0')}:${secondsPart}`;
    return `${String(mins).padStart(2, '0')}:${secondsPart}`;
}
}),
"[project]/src/lib/http.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProviderError",
    ()=>ProviderError,
    "fetchJson",
    ()=>fetchJson
]);
class ProviderError extends Error {
    kind;
    constructor(message, kind = 'unknown'){
        super(message);
        this.kind = kind;
        this.name = 'ProviderError';
    }
}
async function fetchJson(url, init = {}) {
    const { timeoutMs = 8000, revalidate, ...rest } = init;
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, {
            ...rest,
            signal: controller.signal,
            ...revalidate !== undefined ? {
                next: {
                    revalidate
                }
            } : {}
        });
        if (res.status === 404) throw new ProviderError('Resource not found', 'not_found');
        if (res.status === 429) throw new ProviderError('Provider rate limit exceeded', 'rate_limit');
        if (res.status >= 500) throw new ProviderError('Provider outage', 'outage');
        if (!res.ok) throw new ProviderError(`Request failed with status ${res.status}`, 'invalid');
        return await res.json();
    } catch (err) {
        if (err instanceof ProviderError) throw err;
        if (err instanceof Error && err.name === 'AbortError') {
            throw new ProviderError('Provider request timed out', 'timeout');
        }
        throw new ProviderError(err instanceof Error ? err.message : 'Unknown provider error', 'unknown');
    } finally{
        clearTimeout(timer);
    }
}
}),
"[project]/src/lib/journey/connectionStatus.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeConnectionJourney",
    ()=>computeConnectionJourney
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flightMath$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flightMath.ts [app-route] (ecmascript)");
;
const URGENT_THRESHOLD_MIN = 20;
const LIMITED_THRESHOLD_MIN = 60;
function classify(effectiveMinutes) {
    if (effectiveMinutes === null) return 'unknown';
    if (effectiveMinutes <= 0) return 'missed';
    if (effectiveMinutes <= URGENT_THRESHOLD_MIN) return 'urgent';
    if (effectiveMinutes <= LIMITED_THRESHOLD_MIN) return 'limited';
    return 'plenty';
}
function urgencyLabel(urgency, minutes) {
    if (urgency === 'missed') return 'Connection at risk — see rebooking options';
    if (minutes === null) return 'Connection time unavailable';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const time = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    if (urgency === 'urgent') return `Urgent connection · ${time} available`;
    if (urgency === 'limited') return `Limited connection · ${time} available`;
    return `Plenty of time · ${time} available`;
}
function computeConnectionJourney(arrivalLeg, departureLeg, walkMinutes) {
    const bestArrival = arrivalLeg.arrival.estimated ?? arrivalLeg.arrival.actual ?? arrivalLeg.arrival.scheduled;
    const boardingDeadline = departureLeg.gateClosingTime ?? departureLeg.boardingTime ?? departureLeg.departure.estimated ?? departureLeg.departure.scheduled;
    const minutesToDeadline = bestArrival && boardingDeadline ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flightMath$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["minutesUntil"])(boardingDeadline, new Date(bestArrival)) : null;
    const effectiveConnectionMinutes = minutesToDeadline !== null ? minutesToDeadline - walkMinutes : null;
    const scheduledConnectionMinutes = arrivalLeg.arrival.scheduled && departureLeg.departure.scheduled ? Math.round((new Date(departureLeg.departure.scheduled).getTime() - new Date(arrivalLeg.arrival.scheduled).getTime()) / 60000) : null;
    const urgency = classify(effectiveConnectionMinutes);
    const terminalChanged = Boolean(arrivalLeg.destination.terminal && departureLeg.origin.terminal && arrivalLeg.destination.terminal !== departureLeg.origin.terminal);
    return {
        id: `${arrivalLeg.flightNumber}-${departureLeg.flightNumber}`,
        legs: [
            arrivalLeg,
            departureLeg
        ],
        effectiveConnectionMinutes,
        scheduledConnectionMinutes,
        walkMinutes,
        urgency,
        statusText: urgencyLabel(urgency, effectiveConnectionMinutes),
        terminalChanged,
        gateChanged: false
    };
}
}),
"[project]/src/lib/providers/flight/aerodatabox.normalize.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeAeroDataBoxFlight",
    ()=>normalizeAeroDataBoxFlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flightMath$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/flightMath.ts [app-route] (ecmascript)");
;
function toTimePoint(scheduled, revised, actual) {
    return {
        scheduled: scheduled?.utc ?? null,
        estimated: revised?.utc ?? null,
        actual: actual?.utc ?? null
    };
}
function toAirportRef(a, move) {
    return {
        iata: a?.iata ?? '—',
        icao: a?.icao ?? null,
        name: a?.name ?? null,
        city: a?.municipalityName ?? null,
        country: a?.countryCode ?? null,
        terminal: move?.terminal ?? null,
        gate: move?.gate ?? null,
        baggageBelt: move?.baggageBelt ?? null
    };
}
const STATUS_MAP = {
    Expected: 'scheduled',
    Scheduled: 'scheduled',
    CheckIn: 'scheduled',
    Boarding: 'boarding',
    GateOpen: 'gate_open',
    GateClosing: 'gate_closing',
    GateClosed: 'gate_closing',
    Delayed: 'delayed',
    Departed: 'departed',
    EnRoute: 'in_air',
    Approaching: 'in_air',
    Landed: 'landed',
    Arrived: 'arrived',
    Canceled: 'cancelled',
    Cancelled: 'cancelled',
    Diverted: 'diverted',
    Unknown: 'unknown'
};
function deriveStatus(raw, direction, departureDelay, arrivalDelay) {
    const mapped = raw.status ? STATUS_MAP[raw.status] : undefined;
    if (mapped === 'cancelled' || mapped === 'diverted') return mapped;
    if (mapped) {
        if (mapped === 'scheduled' && (direction === 'departure' ? departureDelay : arrivalDelay)) return 'delayed';
        return mapped;
    }
    if (direction === 'departure' && departureDelay) return 'delayed';
    if (direction === 'arrival' && arrivalDelay) return 'delayed';
    return 'unknown';
}
function statusText(status, delayMinutes) {
    switch(status){
        case 'scheduled':
            return 'Scheduled';
        case 'on_time':
            return 'On Time';
        case 'gate_open':
            return 'Gate Open';
        case 'boarding':
            return 'Boarding';
        case 'gate_closing':
            return 'Gate Closing';
        case 'delayed':
            return delayMinutes ? `Delayed ${delayMinutes} min` : 'Delayed';
        case 'departed':
            return 'Departed';
        case 'in_air':
            return 'In Flight';
        case 'landed':
            return 'Landed';
        case 'arrived':
            return 'Arrived';
        case 'cancelled':
            return 'Cancelled';
        case 'diverted':
            return 'Diverted';
        default:
            return 'Status pending';
    }
}
function normalizeAeroDataBoxFlight(raw, direction) {
    const dep = raw.departure;
    const arr = raw.arrival;
    const departure = toTimePoint(dep?.scheduledTime, dep?.revisedTime, dep?.runwayTime);
    const arrival = toTimePoint(arr?.scheduledTime, arr?.revisedTime, arr?.runwayTime);
    const departureDelay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flightMath$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeDelayMinutes"])(departure);
    const arrivalDelay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$flightMath$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeDelayMinutes"])(arrival);
    const delayMinutes = direction === 'departure' ? departureDelay : arrivalDelay;
    const status = deriveStatus(raw, direction, departureDelay, arrivalDelay);
    const flightNumber = raw.number ?? raw.callSign ?? 'UNKNOWN';
    const durationMinutes = departure.scheduled && arrival.scheduled ? Math.round((new Date(arrival.scheduled).getTime() - new Date(departure.scheduled).getTime()) / 60000) : null;
    return {
        id: `${flightNumber}-${departure.scheduled ?? 'unknown'}`.toLowerCase().replace(/\s+/g, ''),
        direction,
        flightNumber,
        airline: {
            name: raw.airline?.name ?? (flightNumber.replace(/[0-9]/g, '').trim() || 'Unknown Airline'),
            iata: raw.airline?.iata ?? null,
            icao: raw.airline?.icao ?? null
        },
        aircraft: raw.aircraft?.model ?? null,
        origin: toAirportRef(dep?.airport, dep),
        destination: toAirportRef(arr?.airport, arr),
        departure,
        arrival,
        boardingTime: null,
        gateClosingTime: null,
        status,
        statusText: statusText(status, delayMinutes),
        delayMinutes,
        durationMinutes,
        codeshareOf: raw.codeshareStatus === 'IsCodeshare' ? raw.callSign ?? null : null,
        lastUpdated: new Date().toISOString(),
        isLive: true,
        disruption: status === 'cancelled' ? {
            reason: 'Cancelled by operating airline',
            rebookingInfo: 'Contact the operating airline for rebooking options.',
            customerServiceUrl: null,
            alternativeFlights: []
        } : null
    };
}
}),
"[project]/src/lib/providers/flight/aerodatabox.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AeroDataBoxProvider",
    ()=>AeroDataBoxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverCache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/serverCache.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$aerodatabox$2e$normalize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/providers/flight/aerodatabox.normalize.ts [app-route] (ecmascript)");
;
;
;
const BASE_URL = 'https://aerodatabox.p.rapidapi.com';
function pad(n) {
    return String(n).padStart(2, '0');
}
/** AeroDataBox windows are max 12h; we split "now" into two adjacent 6h windows to cover a 12h board. */ function timeWindow(hoursBack, hoursForward) {
    const now = new Date();
    const from = new Date(now.getTime() - hoursBack * 3600_000);
    const to = new Date(now.getTime() + hoursForward * 3600_000);
    const fmt = (d)=>`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return {
        from: fmt(from),
        to: fmt(to)
    };
}
class AeroDataBoxProvider {
    apiKey;
    name;
    isLive;
    constructor(apiKey){
        this.apiKey = apiKey;
        this.name = 'AeroDataBox';
        this.isLive = true;
    }
    headers() {
        return {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        };
    }
    async fetchBoard(airportIata) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverCache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withServerCache"])(`adb:fids:${airportIata}`, 30_000, async ()=>{
            const { from, to } = timeWindow(1, 5);
            const url = `${BASE_URL}/flights/airports/iata/${airportIata}/${from}/${to}?withLeg=true&direction=Both&withCancelled=true&withCodeshared=true&withCargo=false&withPrivate=false`;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchJson"])(url, {
                headers: this.headers(),
                timeoutMs: 9000
            });
        });
    }
    async getDepartures(airportIata) {
        const board = await this.fetchBoard(airportIata);
        return (board.departures ?? []).map((f)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$aerodatabox$2e$normalize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAeroDataBoxFlight"])(f, 'departure'));
    }
    async getArrivals(airportIata) {
        const board = await this.fetchBoard(airportIata);
        return (board.arrivals ?? []).map((f)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$aerodatabox$2e$normalize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAeroDataBoxFlight"])(f, 'arrival'));
    }
    async getFlight(flightNumber, date) {
        const day = date ?? new Date().toISOString().slice(0, 10);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverCache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withServerCache"])(`adb:flight:${flightNumber}:${day}`, 20_000, async ()=>{
            try {
                const url = `${BASE_URL}/flights/number/${encodeURIComponent(flightNumber)}/${day}`;
                const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchJson"])(url, {
                    headers: this.headers(),
                    timeoutMs: 9000
                });
                const first = results?.[0];
                if (!first) return null;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$aerodatabox$2e$normalize$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeAeroDataBoxFlight"])(first, first.departure ? 'departure' : 'arrival');
            } catch (err) {
                if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProviderError"] && err.kind === 'not_found') return null;
                throw err;
            }
        });
    }
    async searchFlights(query) {
        const flight = await this.getFlight(query.trim().toUpperCase());
        return flight ? [
            flight
        ] : [];
    }
}
}),
"[project]/src/lib/providers/flight/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFlightProvider",
    ()=>getFlightProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$aerodatabox$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/providers/flight/aerodatabox.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/providers/flight/mock.ts [app-route] (ecmascript)");
;
;
let cached = null;
function getFlightProvider() {
    if (cached) return cached;
    const apiKey = process.env.AERODATABOX_API_KEY;
    cached = apiKey ? new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$aerodatabox$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AeroDataBoxProvider"](apiKey) : new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MockFlightProvider"]();
    return cached;
}
}),
"[project]/src/lib/providers/flight/mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MockFlightProvider",
    ()=>MockFlightProvider
]);
const SEEDS = [
    {
        flightNumber: 'BA117',
        airline: 'British Airways',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'JFK',
        originTerminal: '5',
        destinationTerminal: '8',
        gate: 'B42',
        status: 'boarding',
        departureOffsetMin: 45,
        durationMin: 475
    },
    {
        flightNumber: 'SK500',
        airline: 'Scandinavian Airlines',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'CPH',
        originTerminal: '2',
        destinationTerminal: '3',
        gate: 'A18',
        status: 'on_time',
        departureOffsetMin: 100,
        durationMin: 115
    },
    {
        flightNumber: 'AA106',
        airline: 'American Airlines',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'JFK',
        originTerminal: '3',
        destinationTerminal: '8',
        gate: '31',
        status: 'delayed',
        departureOffsetMin: 130,
        durationMin: 465,
        delayMin: 45
    },
    {
        flightNumber: 'AF1281',
        airline: 'Air France',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'CDG',
        originTerminal: '4',
        destinationTerminal: '2E',
        gate: '22',
        status: 'gate_open',
        departureOffsetMin: 160,
        durationMin: 80
    },
    {
        flightNumber: 'LH921',
        airline: 'Lufthansa',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'FRA',
        originTerminal: '2',
        destinationTerminal: '1',
        gate: '—',
        status: 'cancelled',
        departureOffsetMin: 220,
        durationMin: 95
    },
    {
        flightNumber: 'VS103',
        airline: 'Virgin Atlantic',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'JFK',
        originTerminal: '3',
        destinationTerminal: '4',
        gate: '17',
        status: 'on_time',
        departureOffsetMin: 250,
        durationMin: 470
    },
    {
        flightNumber: 'EK007',
        airline: 'Emirates',
        direction: 'departure',
        originIata: 'LHR',
        destinationIata: 'DXB',
        originTerminal: '3',
        destinationTerminal: '3',
        gate: '9',
        status: 'on_time',
        departureOffsetMin: 330,
        durationMin: 415
    },
    {
        flightNumber: 'BA178',
        airline: 'British Airways',
        direction: 'arrival',
        originIata: 'JFK',
        destinationIata: 'LHR',
        originTerminal: '8',
        destinationTerminal: '5',
        gate: 'C61',
        status: 'arrived',
        departureOffsetMin: -30,
        durationMin: 464
    },
    {
        flightNumber: 'KL1008',
        airline: 'KLM',
        direction: 'arrival',
        originIata: 'AMS',
        destinationIata: 'LHR',
        originTerminal: '1',
        destinationTerminal: '4',
        gate: '14',
        status: 'arrived',
        departureOffsetMin: -60,
        durationMin: 80
    },
    {
        flightNumber: 'TK1979',
        airline: 'Turkish Airlines',
        direction: 'arrival',
        originIata: 'IST',
        destinationIata: 'LHR',
        originTerminal: '1',
        destinationTerminal: '2',
        gate: '9',
        status: 'delayed',
        departureOffsetMin: 20,
        durationMin: 260,
        delayMin: 42
    },
    {
        flightNumber: 'KL1002',
        airline: 'KLM',
        direction: 'arrival',
        originIata: 'LHR',
        destinationIata: 'AMS',
        originTerminal: '2',
        destinationTerminal: '2',
        gate: 'D7',
        status: 'on_time',
        departureOffsetMin: -45,
        durationMin: 85
    },
    {
        flightNumber: 'KL641',
        airline: 'KLM',
        direction: 'departure',
        originIata: 'AMS',
        destinationIata: 'JFK',
        originTerminal: '2',
        destinationTerminal: '4',
        gate: 'E22',
        status: 'gate_open',
        departureOffsetMin: 40,
        durationMin: 545
    }
];
function iso(minutesFromNow) {
    return new Date(Date.now() + minutesFromNow * 60_000).toISOString();
}
function buildFlight(seed) {
    const scheduledDeparture = iso(seed.departureOffsetMin);
    const estimatedDeparture = seed.delayMin ? iso(seed.departureOffsetMin + seed.delayMin) : null;
    const scheduledArrival = iso(seed.departureOffsetMin + seed.durationMin);
    const estimatedArrival = seed.delayMin ? iso(seed.departureOffsetMin + seed.durationMin + seed.delayMin) : null;
    const relevantScheduled = seed.direction === 'departure' ? seed.departureOffsetMin : seed.departureOffsetMin + seed.durationMin;
    const boardingTime = seed.status === 'boarding' || seed.status === 'gate_open' ? iso(Math.max(relevantScheduled - 40, 1)) : null;
    const gateClosingTime = seed.status === 'boarding' || seed.status === 'gate_open' ? iso(Math.max(relevantScheduled - 15, 1)) : null;
    const statusTextMap = {
        scheduled: 'Scheduled',
        on_time: 'On Time',
        gate_open: 'Gate Open',
        boarding: 'Boarding',
        gate_closing: 'Gate Closing',
        delayed: seed.delayMin ? `Delayed ${seed.delayMin} min` : 'Delayed',
        departed: 'Departed',
        in_air: 'In Flight',
        landed: 'Landed',
        arrived: 'Arrived',
        cancelled: 'Cancelled',
        diverted: 'Diverted',
        unknown: 'Status pending'
    };
    return {
        id: seed.flightNumber.toLowerCase(),
        direction: seed.direction,
        flightNumber: seed.flightNumber,
        airline: {
            name: seed.airline,
            iata: seed.flightNumber.replace(/[0-9]/g, ''),
            icao: null
        },
        aircraft: null,
        origin: {
            iata: seed.originIata,
            terminal: seed.originTerminal,
            gate: seed.direction === 'departure' ? seed.gate : null
        },
        destination: {
            iata: seed.destinationIata,
            terminal: seed.destinationTerminal,
            gate: seed.direction === 'arrival' ? seed.gate : null,
            baggageBelt: seed.status === 'arrived' ? '6' : null
        },
        departure: {
            scheduled: scheduledDeparture,
            estimated: estimatedDeparture,
            actual: seed.status === 'departed' || seed.status === 'in_air' || seed.status === 'landed' || seed.status === 'arrived' ? scheduledDeparture : null
        },
        arrival: {
            scheduled: scheduledArrival,
            estimated: estimatedArrival,
            actual: seed.status === 'arrived' ? estimatedArrival ?? scheduledArrival : null
        },
        boardingTime,
        gateClosingTime,
        status: seed.status,
        statusText: statusTextMap[seed.status],
        delayMinutes: seed.delayMin ?? null,
        durationMinutes: seed.durationMin,
        lastUpdated: new Date().toISOString(),
        isLive: false,
        disruption: seed.status === 'cancelled' ? {
            reason: 'Inbound aircraft unavailable',
            rebookingInfo: 'Rebook free of charge on the next available flight, or request a refund.',
            customerServiceUrl: null,
            alternativeFlights: [
                'LH923 · 21:10',
                'LH925 · 06:30 (+1 day)'
            ]
        } : null
    };
}
class MockFlightProvider {
    name = 'Mock';
    isLive = false;
    async getDepartures(airportIata) {
        return SEEDS.filter((s)=>s.direction === 'departure' && s.originIata === airportIata.toUpperCase()).map(buildFlight);
    }
    async getArrivals(airportIata) {
        return SEEDS.filter((s)=>s.direction === 'arrival' && s.destinationIata === airportIata.toUpperCase()).map(buildFlight);
    }
    async getFlight(flightNumber) {
        const seed = SEEDS.find((s)=>s.flightNumber.toLowerCase() === flightNumber.trim().toLowerCase());
        return seed ? buildFlight(seed) : null;
    }
    async searchFlights(query) {
        const q = query.trim().toLowerCase();
        return SEEDS.filter((s)=>s.flightNumber.toLowerCase().includes(q) || s.airline.toLowerCase().includes(q) || s.originIata.toLowerCase() === q || s.destinationIata.toLowerCase() === q).map(buildFlight);
    }
}
}),
"[project]/src/lib/serverCache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStaleServerCache",
    ()=>getStaleServerCache,
    "setServerCache",
    ()=>setServerCache,
    "withServerCache",
    ()=>withServerCache
]);
const store = new Map();
async function withServerCache(key, ttlMs, loader) {
    const hit = store.get(key);
    if (hit && hit.expiresAt > Date.now()) {
        return hit.value;
    }
    const value = await loader();
    store.set(key, {
        value,
        expiresAt: Date.now() + ttlMs
    });
    return value;
}
function getStaleServerCache(key) {
    const hit = store.get(key);
    return hit ? hit.value : null;
}
function setServerCache(key, value, ttlMs) {
    store.set(key, {
        value,
        expiresAt: Date.now() + ttlMs
    });
}
}),
"[project]/src/services/flightService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getArrivals",
    ()=>getArrivals,
    "getConnectionJourney",
    ()=>getConnectionJourney,
    "getDepartures",
    ()=>getDepartures,
    "getFlightByNumber",
    ()=>getFlightByNumber,
    "searchFlights",
    ()=>searchFlights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/providers/flight/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2f$connectionStatus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey/connectionStatus.ts [app-route] (ecmascript)");
;
;
async function getDepartures(airportIata) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlightProvider"])();
    const flights = await provider.getDepartures(airportIata);
    return {
        flights: flights.sort(sortByDepartureTime),
        isLive: provider.isLive
    };
}
async function getArrivals(airportIata) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlightProvider"])();
    const flights = await provider.getArrivals(airportIata);
    return {
        flights: flights.sort(sortByArrivalTime),
        isLive: provider.isLive
    };
}
async function getFlightByNumber(flightNumber, date) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlightProvider"])();
    const flight = await provider.getFlight(flightNumber, date);
    return {
        flight,
        isLive: provider.isLive
    };
}
async function searchFlights(query) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlightProvider"])();
    const flights = await provider.searchFlights(query);
    return {
        flights,
        isLive: provider.isLive
    };
}
async function getConnectionJourney(arrivalFlightNumber, departureFlightNumber, walkMinutes = 20) {
    const provider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$flight$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlightProvider"])();
    const [arrivalLeg, departureLeg] = await Promise.all([
        provider.getFlight(arrivalFlightNumber),
        provider.getFlight(departureFlightNumber)
    ]);
    if (!arrivalLeg || !departureLeg) return {
        journey: null,
        isLive: provider.isLive
    };
    return {
        journey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2f$connectionStatus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeConnectionJourney"])(arrivalLeg, departureLeg, walkMinutes),
        isLive: provider.isLive
    };
}
function sortByDepartureTime(a, b) {
    const at = a.departure.estimated ?? a.departure.scheduled ?? '';
    const bt = b.departure.estimated ?? b.departure.scheduled ?? '';
    return at.localeCompare(bt);
}
function sortByArrivalTime(a, b) {
    const at = a.arrival.estimated ?? a.arrival.scheduled ?? '';
    const bt = b.arrival.estimated ?? b.arrival.scheduled ?? '';
    return at.localeCompare(bt);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b7mraq._.js.map