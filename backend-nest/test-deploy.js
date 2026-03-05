const https = require('https');

function check() {
    https.get('https://syncheart-backend-production.up.railway.app/api/v1/debug/db', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            if (res.statusCode === 200) {
                console.log('Deployed! Fix is live:', data);
            } else {
                console.log('Not yet live...');
                setTimeout(check, 3000);
            }
        });
    }).on('error', (err) => {
        console.log('Error:', err.message);
        setTimeout(check, 3000);
    });
}
check();
