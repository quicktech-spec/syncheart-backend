async function test() {
    const ts = Date.now();
    const u1 = `u1_${ts}@ex.com`;
    const u2 = `u2_${ts}@ex.com`;

    const res1 = await fetch('https://syncheart-backend-production.up.railway.app/api/v1/auth/register', {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: u1, password: 'password123' })
    });
    const t1 = (await res1.json()).access_token;
    const prof1 = await (await fetch('https://syncheart-backend-production.up.railway.app/api/v1/users/me', { headers: { Authorization: `Bearer ${t1}` } })).json();

    const res2 = await fetch('https://syncheart-backend-production.up.railway.app/api/v1/auth/register', {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: u2, password: 'password123' })
    });
    const t2 = (await res2.json()).access_token;

    await fetch('https://syncheart-backend-production.up.railway.app/api/v1/users/sync-couple', {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${t2}` },
        body: JSON.stringify({ invite_code: prof1.invite_code })
    });

    const rel = await (await fetch('https://syncheart-backend-production.up.railway.app/api/v1/users/me/relationship', { headers: { Authorization: `Bearer ${t1}` } })).json();
    const relationship_id = rel.data.relationship_id;

    // Post Message 1
    await fetch('https://syncheart-backend-production.up.railway.app/api/v1/users/messages', {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${t1}` },
        body: JSON.stringify({ relationship_id, ciphertext: "ABC", iv: "DEF", auth_tag: "GHI" })
    });

    for (let i = 0; i < 15; i++) {
        const fetch1 = await fetch(`https://syncheart-backend-production.up.railway.app/api/v1/users/messages/${relationship_id}`, {
            headers: { Authorization: `Bearer ${t1}` }
        });
        const result = await fetch1.json();
        console.log(`Fetch ${i}: msgs length =`, result.length);
    }
}
test();
