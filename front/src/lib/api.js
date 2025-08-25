export async function postJSON(url, data) {
const res = await fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
})
if (!res.ok) {
let message = `Request failed with ${res.status}`
try {
const err = await res.json()
message = err?.error || err?.message || message
} catch (_) {}
throw new Error(message)
}
try {
return await res.json()
} catch (_) {
return { message: 'OK' }
}
}