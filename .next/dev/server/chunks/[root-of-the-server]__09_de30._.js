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
"[project]/src/app/api/airports/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$airportService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/airportService.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiError$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiError.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    const query = request.nextUrl.searchParams.get('q');
    const servicesFor = request.nextUrl.searchParams.get('services');
    try {
        if (servicesFor) {
            const services = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$airportService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAirportServices"])(servicesFor);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                services
            });
        }
        const airports = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$airportService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findAirports"])(query ?? '');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            airports
        });
    } catch (err) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiError$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiErrorResponse"])(err);
    }
}
}),
"[project]/src/data/airportDirectory.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIRPORT_DIRECTORY",
    ()=>AIRPORT_DIRECTORY,
    "findAirport",
    ()=>findAirport,
    "searchAirports",
    ()=>searchAirports
]);
const AIRPORT_DIRECTORY = [
    {
        iata: 'LHR',
        icao: 'EGLL',
        name: 'London Heathrow Airport',
        city: 'London',
        country: 'United Kingdom',
        latitude: 51.4700,
        longitude: -0.4543,
        timezone: 'Europe/London',
        terminals: [
            '2',
            '3',
            '4',
            '5'
        ],
        website: 'https://www.heathrow.com'
    },
    {
        iata: 'LGW',
        icao: 'EGKK',
        name: 'London Gatwick Airport',
        city: 'London',
        country: 'United Kingdom',
        latitude: 51.1537,
        longitude: -0.1821,
        timezone: 'Europe/London',
        terminals: [
            'North',
            'South'
        ],
        website: 'https://www.gatwickairport.com'
    },
    {
        iata: 'JFK',
        icao: 'KJFK',
        name: 'John F. Kennedy International Airport',
        city: 'New York',
        country: 'United States',
        latitude: 40.6413,
        longitude: -73.7781,
        timezone: 'America/New_York',
        terminals: [
            '1',
            '4',
            '5',
            '7',
            '8'
        ],
        website: 'https://www.jfkairport.com'
    },
    {
        iata: 'EWR',
        icao: 'KEWR',
        name: 'Newark Liberty International Airport',
        city: 'Newark',
        country: 'United States',
        latitude: 40.6895,
        longitude: -74.1745,
        timezone: 'America/New_York',
        terminals: [
            'A',
            'B',
            'C'
        ]
    },
    {
        iata: 'LAX',
        icao: 'KLAX',
        name: 'Los Angeles International Airport',
        city: 'Los Angeles',
        country: 'United States',
        latitude: 33.9416,
        longitude: -118.4085,
        timezone: 'America/Los_Angeles',
        terminals: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            'B'
        ]
    },
    {
        iata: 'ORD',
        icao: 'KORD',
        name: "O'Hare International Airport",
        city: 'Chicago',
        country: 'United States',
        latitude: 41.9742,
        longitude: -87.9073,
        timezone: 'America/Chicago',
        terminals: [
            '1',
            '2',
            '3',
            '5'
        ]
    },
    {
        iata: 'CDG',
        icao: 'LFPG',
        name: 'Paris Charles de Gaulle Airport',
        city: 'Paris',
        country: 'France',
        latitude: 49.0097,
        longitude: 2.5479,
        timezone: 'Europe/Paris',
        terminals: [
            '1',
            '2A',
            '2B',
            '2C',
            '2D',
            '2E',
            '2F',
            '3'
        ]
    },
    {
        iata: 'AMS',
        icao: 'EHAM',
        name: 'Amsterdam Airport Schiphol',
        city: 'Amsterdam',
        country: 'Netherlands',
        latitude: 52.3105,
        longitude: 4.7683,
        timezone: 'Europe/Amsterdam',
        terminals: [
            '1',
            '2',
            '3'
        ]
    },
    {
        iata: 'FRA',
        icao: 'EDDF',
        name: 'Frankfurt Airport',
        city: 'Frankfurt',
        country: 'Germany',
        latitude: 50.0379,
        longitude: 8.5622,
        timezone: 'Europe/Berlin',
        terminals: [
            '1',
            '2'
        ]
    },
    {
        iata: 'MUC',
        icao: 'EDDM',
        name: 'Munich Airport',
        city: 'Munich',
        country: 'Germany',
        latitude: 48.3538,
        longitude: 11.7861,
        timezone: 'Europe/Berlin',
        terminals: [
            '1',
            '2'
        ]
    },
    {
        iata: 'MAD',
        icao: 'LEMD',
        name: 'Adolfo Suárez Madrid–Barajas Airport',
        city: 'Madrid',
        country: 'Spain',
        latitude: 40.4936,
        longitude: -3.5668,
        timezone: 'Europe/Madrid',
        terminals: [
            '1',
            '2',
            '3',
            '4'
        ]
    },
    {
        iata: 'FCO',
        icao: 'LIRF',
        name: 'Rome Fiumicino Airport',
        city: 'Rome',
        country: 'Italy',
        latitude: 41.8003,
        longitude: 12.2389,
        timezone: 'Europe/Rome',
        terminals: [
            '1',
            '3'
        ]
    },
    {
        iata: 'CPH',
        icao: 'EKCH',
        name: 'Copenhagen Airport',
        city: 'Copenhagen',
        country: 'Denmark',
        latitude: 55.6180,
        longitude: 12.6560,
        timezone: 'Europe/Copenhagen',
        terminals: [
            '2',
            '3'
        ]
    },
    {
        iata: 'DXB',
        icao: 'OMDB',
        name: 'Dubai International Airport',
        city: 'Dubai',
        country: 'United Arab Emirates',
        latitude: 25.2532,
        longitude: 55.3657,
        timezone: 'Asia/Dubai',
        terminals: [
            '1',
            '2',
            '3'
        ]
    },
    {
        iata: 'IST',
        icao: 'LTFM',
        name: 'Istanbul Airport',
        city: 'Istanbul',
        country: 'Türkiye',
        latitude: 41.2753,
        longitude: 28.7519,
        timezone: 'Europe/Istanbul',
        terminals: [
            '1'
        ]
    },
    {
        iata: 'SIN',
        icao: 'WSSS',
        name: 'Singapore Changi Airport',
        city: 'Singapore',
        country: 'Singapore',
        latitude: 1.3644,
        longitude: 103.9915,
        timezone: 'Asia/Singapore',
        terminals: [
            '1',
            '2',
            '3',
            '4'
        ]
    },
    {
        iata: 'HND',
        icao: 'RJTT',
        name: 'Tokyo Haneda Airport',
        city: 'Tokyo',
        country: 'Japan',
        latitude: 35.5494,
        longitude: 139.7798,
        timezone: 'Asia/Tokyo',
        terminals: [
            '1',
            '2',
            '3'
        ]
    },
    {
        iata: 'NRT',
        icao: 'RJAA',
        name: 'Narita International Airport',
        city: 'Tokyo',
        country: 'Japan',
        latitude: 35.7647,
        longitude: 140.3864,
        timezone: 'Asia/Tokyo',
        terminals: [
            '1',
            '2',
            '3'
        ]
    },
    {
        iata: 'SYD',
        icao: 'YSSY',
        name: 'Sydney Kingsford Smith Airport',
        city: 'Sydney',
        country: 'Australia',
        latitude: -33.9399,
        longitude: 151.1753,
        timezone: 'Australia/Sydney',
        terminals: [
            '1',
            '2',
            '3'
        ]
    },
    {
        iata: 'PER',
        icao: 'YPPH',
        name: 'Perth Airport',
        city: 'Perth',
        country: 'Australia',
        latitude: -31.9385,
        longitude: 115.9672,
        timezone: 'Australia/Perth',
        terminals: [
            '1',
            '2',
            '3',
            '4'
        ]
    },
    {
        iata: 'YYZ',
        icao: 'CYYZ',
        name: 'Toronto Pearson International Airport',
        city: 'Toronto',
        country: 'Canada',
        latitude: 43.6777,
        longitude: -79.6248,
        timezone: 'America/Toronto',
        terminals: [
            '1',
            '3'
        ]
    },
    {
        iata: 'SFO',
        icao: 'KSFO',
        name: 'San Francisco International Airport',
        city: 'San Francisco',
        country: 'United States',
        latitude: 37.6213,
        longitude: -122.3790,
        timezone: 'America/Los_Angeles',
        terminals: [
            '1',
            '2',
            '3',
            'International'
        ]
    },
    {
        iata: 'MIA',
        icao: 'KMIA',
        name: 'Miami International Airport',
        city: 'Miami',
        country: 'United States',
        latitude: 25.7959,
        longitude: -80.2870,
        timezone: 'America/New_York',
        terminals: [
            'J',
            'D',
            'E',
            'F',
            'H'
        ]
    },
    {
        iata: 'HKG',
        icao: 'VHHH',
        name: 'Hong Kong International Airport',
        city: 'Hong Kong',
        country: 'Hong Kong',
        latitude: 22.3080,
        longitude: 113.9185,
        timezone: 'Asia/Hong_Kong',
        terminals: [
            '1',
            '2'
        ]
    },
    {
        iata: 'DOH',
        icao: 'OTHH',
        name: 'Hamad International Airport',
        city: 'Doha',
        country: 'Qatar',
        latitude: 25.2609,
        longitude: 51.6138,
        timezone: 'Asia/Qatar',
        terminals: [
            '1'
        ]
    }
];
function findAirport(iata) {
    return AIRPORT_DIRECTORY.find((a)=>a.iata.toUpperCase() === iata.toUpperCase());
}
function searchAirports(query, limit = 8) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return AIRPORT_DIRECTORY.filter((a)=>a.iata.toLowerCase().includes(q) || a.icao.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q)).slice(0, limit);
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
"[project]/src/services/airportService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findAirports",
    ()=>findAirports,
    "getAirport",
    ()=>getAirport,
    "getAirportServices",
    ()=>getAirportServices,
    "listAirports",
    ()=>listAirports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$airportDirectory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/airportDirectory.ts [app-route] (ecmascript)");
;
async function getAirport(iata) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$airportDirectory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findAirport"])(iata) ?? null;
}
async function findAirports(query) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$airportDirectory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchAirports"])(query);
}
async function listAirports() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$airportDirectory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AIRPORT_DIRECTORY"];
}
/**
 * Terminal-level amenity info (security wait, lounges, Wi-Fi, etc.) isn't published by any
 * free real-time API, so this is maintained as static reference content per airport rather
 * than presented as live.
 */ const SERVICES_BY_AIRPORT = {
    LHR: [
        {
            title: 'Terminal information',
            detail: 'Terminal 5 · South concourse',
            icon: 'terminal'
        },
        {
            title: 'Check-in desks',
            detail: 'Zone C · desks C1–C18',
            icon: 'checkin'
        },
        {
            title: 'Security',
            detail: '8–12 min typical wait',
            icon: 'security'
        },
        {
            title: 'Passport control',
            detail: 'Not required before departure',
            icon: 'passport'
        },
        {
            title: 'Lounges',
            detail: '3 lounges near Gates A/B',
            icon: 'lounge'
        },
        {
            title: 'Shops',
            detail: 'Open · 42 stores airside',
            icon: 'shop'
        },
        {
            title: 'Restaurants',
            detail: 'Open · 18 food options',
            icon: 'food'
        },
        {
            title: 'Baggage reclaim',
            detail: 'Follow purple Arrivals signs',
            icon: 'baggage'
        },
        {
            title: 'Lost property',
            detail: 'Terminal 5 arrivals hall',
            icon: 'lost'
        },
        {
            title: 'Airport Wi-Fi',
            detail: 'Free Heathrow Wi-Fi',
            icon: 'wifi'
        },
        {
            title: 'Charging points',
            detail: 'At most seating areas',
            icon: 'charge'
        }
    ]
};
async function getAirportServices(iata) {
    return SERVICES_BY_AIRPORT[iata.toUpperCase()] ?? SERVICES_BY_AIRPORT.LHR;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09_de30._.js.map