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
"[project]/src/app/api/transport/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transportService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transportService.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiError$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiError.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    const airport = request.nextUrl.searchParams.get('airport') ?? 'LHR';
    const direction = request.nextUrl.searchParams.get('direction') ?? 'to';
    try {
        const options = direction === 'from' ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transportService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTransportFromAirport"])(airport) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transportService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTransportToAirport"])(airport);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            options,
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
"[project]/src/lib/providers/transport/tfl.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTflTransportOption",
    ()=>buildTflTransportOption,
    "getTflLineStatus",
    ()=>getTflLineStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverCache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/serverCache.ts [app-route] (ecmascript)");
;
;
const SEVERITY_MAP = {
    'Good Service': 'good_service',
    'Minor Delays': 'minor_delays',
    'Severe Delays': 'severe_delays',
    'Part Suspended': 'part_suspended',
    'Part Closure': 'part_suspended',
    'Suspended': 'service_closed',
    'Closed': 'service_closed',
    'Service Closed': 'service_closed'
};
async function getTflLineStatus(lineIds) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$serverCache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withServerCache"])(`tfl:status:${lineIds.join(',')}`, 60_000, async ()=>{
        const url = `https://api.tfl.gov.uk/Line/${lineIds.join(',')}/Status`;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchJson"])(url, {
            revalidate: 60,
            timeoutMs: 6000
        });
    });
    return new Map(data.map((l)=>[
            l.id,
            l
        ]));
}
async function buildTflTransportOption(lineId, displayName, journeyTime, price, fallbackAlternative) {
    try {
        const statuses = await getTflLineStatus([
            lineId
        ]);
        const line = statuses.get(lineId);
        const description = line?.lineStatuses[0]?.statusSeverityDescription ?? 'Good Service';
        const status = SEVERITY_MAP[description] ?? 'unknown';
        const disrupted = status !== 'good_service' && status !== 'unknown';
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
            alternative: disrupted ? fallbackAlternative ?? null : null
        };
    } catch  {
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
            alternative: null
        };
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
"[project]/src/services/transportService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTransportFromAirport",
    ()=>getTransportFromAirport,
    "getTransportToAirport",
    ()=>getTransportToAirport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$transport$2f$tfl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/providers/transport/tfl.ts [app-route] (ecmascript)");
;
function staticOption(o) {
    return {
        ...o,
        isLive: false,
        status: 'unknown'
    };
}
async function getTransportToAirport(iata) {
    if (iata.toUpperCase() !== 'LHR') return getGenericToAirportOptions();
    const [elizabeth, piccadilly] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$transport$2f$tfl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildTflTransportOption"])('elizabeth', 'Elizabeth line', '31 min', '£13.90', {
            mode: 'Piccadilly line',
            journeyTime: '49 min'
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$providers$2f$transport$2f$tfl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildTflTransportOption"])('piccadilly', 'Piccadilly line', '49 min', '£5.80')
    ]);
    return [
        elizabeth,
        piccadilly,
        staticOption({
            mode: 'National Express',
            kind: 'bus',
            next: 'Every 20–30 min',
            journeyTime: '55 min',
            price: 'from £8',
            statusText: 'Scheduled service'
        }),
        staticOption({
            mode: 'Taxi',
            kind: 'taxi',
            next: 'On demand',
            journeyTime: '45–70 min',
            price: '£65–£95',
            statusText: 'Subject to traffic'
        }),
        staticOption({
            mode: 'Drive / parking',
            kind: 'car',
            next: 'Open',
            journeyTime: '50 min',
            price: 'from £39/day',
            statusText: 'Long Stay spaces available'
        })
    ];
}
function getGenericToAirportOptions() {
    return [
        staticOption({
            mode: 'Taxi',
            kind: 'taxi',
            next: 'On demand',
            journeyTime: 'Varies',
            price: 'Varies',
            statusText: 'Live status unavailable for this airport'
        }),
        staticOption({
            mode: 'Drive / parking',
            kind: 'car',
            next: 'Open',
            journeyTime: 'Varies',
            price: 'Varies',
            statusText: 'Live status unavailable for this airport'
        })
    ];
}
async function getTransportFromAirport(iata) {
    if (iata.toUpperCase() === 'JFK') {
        return [
            staticOption({
                mode: 'AirTrain + LIRR',
                kind: 'train',
                next: 'Every 6–12 min',
                journeyTime: '35–45 min',
                price: '~$22',
                statusText: 'Scheduled service'
            }),
            staticOption({
                mode: 'AirTrain + Subway',
                kind: 'metro',
                next: 'Every 8–12 min',
                journeyTime: '55–70 min',
                price: '~$11.40',
                statusText: 'Scheduled service'
            }),
            staticOption({
                mode: 'Yellow taxi',
                kind: 'taxi',
                next: 'On demand',
                journeyTime: '45–75 min',
                price: '~$70 + tolls/tip',
                statusText: 'Taxi rank open'
            }),
            staticOption({
                mode: 'Ride-hailing',
                kind: 'car',
                next: '3–8 min',
                journeyTime: '45–75 min',
                price: '~$60–$110',
                statusText: 'Pickup zones active'
            }),
            staticOption({
                mode: 'Rental car',
                kind: 'car',
                next: 'On demand',
                journeyTime: 'Varies',
                price: 'from ~$55/day',
                statusText: 'Counters open'
            })
        ];
    }
    return getGenericToAirportOptions();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11h44du._.js.map