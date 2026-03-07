

async function createDemoUsers() {
    const baseUrl = 'https://syncheart-backend-production.up.railway.app/api/v1';

    // User 1
    let res1 = await fetch(`${baseUrl}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'demo1@syncheart.com', password: 'password123' }) });
    if (res1.status === 409) {
        res1 = await fetch(`${baseUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'demo1@syncheart.com', password: 'password123' }) });
    }
    const user1 = await res1.json();

    // User 2
    let res2 = await fetch(`${baseUrl}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'demo2@syncheart.com', password: 'password123' }) });
    if (res2.status === 409) {
        res2 = await fetch(`${baseUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'demo2@syncheart.com', password: 'password123' }) });
    }
    const user2 = await res2.json();

    // Patch profiles
    await fetch(`${baseUrl}/users/me`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user1.access_token}` }, body: JSON.stringify({ display_name: 'Romeo' }) });
    await fetch(`${baseUrl}/users/me`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user2.access_token}` }, body: JSON.stringify({ display_name: 'Juliet' }) });

    // Get profiles to get invite codes
    const p1 = await (await fetch(`${baseUrl}/users/me`, { headers: { 'Authorization': `Bearer ${user1.access_token}` } })).json();
    const p2 = await (await fetch(`${baseUrl}/users/me`, { headers: { 'Authorization': `Bearer ${user2.access_token}` } })).json();

    console.log("DEMO 1:", "demo1@syncheart.com", "password123", "Invite:", p1.invite_code);
    console.log("DEMO 2:", "demo2@syncheart.com", "password123", "Invite:", p2.invite_code);

    // Attempt sync
    const syncRes = await fetch(`${baseUrl}/users/sync-couple`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user1.access_token}` }, body: JSON.stringify({ invite_code: p2.invite_code }) });
    console.log("SYNC STATUS:", syncRes.status, await syncRes.text());
}

createDemoUsers().catch(console.error);
