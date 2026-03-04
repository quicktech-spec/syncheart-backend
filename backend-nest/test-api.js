async function test() {
    try {
        const res = await fetch('https://syncheart-backend-production.up.railway.app/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'shubham@example.com', password: 'password123' })
        });
        const data = await res.json();
        const token = data.access_token;
        console.log('Login token:', token.substring(0, 10));

        const relRes = await fetch('https://syncheart-backend-production.up.railway.app/api/v1/users/me/relationship', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const relData = await relRes.json();
        const relId = relData.data.relationship_id;
        console.log('Got relId', relId);

        const getRes = await fetch(`https://syncheart-backend-production.up.railway.app/api/v1/users/messages/${relId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const messages = await getRes.json();
        console.log('GET messages len:', messages.length || messages);

    } catch (e) {
        console.log('Error:', e);
    }
}
test();
