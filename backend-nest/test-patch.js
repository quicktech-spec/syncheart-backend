

(async () => {
    try {
        const res = await fetch('https://syncheart-backend-production.up.railway.app/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'testpat333@hi.com', password: 'password' })
        });
        const data = await res.json();
        console.log('REG:', data.access_token);

        const res2 = await fetch('https://syncheart-backend-production.up.railway.app/api/v1/users/me', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data.access_token },
            body: JSON.stringify({ display_name: 'Testing' })
        });
        const text = await res2.text();
        console.log('PATCH:', res2.status, text);
    } catch (e) {
        console.log("ERR", e);
    }
})();
