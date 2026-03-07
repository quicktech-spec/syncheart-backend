$BASE = 'https://syncheart-backend-production.up.railway.app/api/v1'

# Test 1: Health
Write-Host '=== Health Check ===' -ForegroundColor Cyan
try {
    $h = Invoke-RestMethod -Uri "$BASE/health"
    Write-Host "Health: $($h.status)" -ForegroundColor Green
} catch { Write-Host "HEALTH FAIL: $($_.Exception.Message)" -ForegroundColor Red }

# Test 2: Login with known test accounts
Write-Host "`n=== Login Test ===" -ForegroundColor Cyan
try {
    $r = Invoke-RestMethod -Uri "$BASE/auth/login" -Method POST -ContentType 'application/json' -Body '{"email":"tester_alpha@syncheart.com","password":"SynchTest123"}'
    $tok = $r.access_token
    Write-Host "Login OK. Token: $($tok.Substring(0,15))..." -ForegroundColor Green
    
    # Test 3: Get profile
    Write-Host "`n=== Get Profile ===" -ForegroundColor Cyan
    $p = Invoke-RestMethod -Uri "$BASE/users/me" -Headers @{Authorization="Bearer $tok"}
    Write-Host "Profile: $($p | ConvertTo-Json)" -ForegroundColor Green

    # Test 4: Relationship
    Write-Host "`n=== Relationship ===" -ForegroundColor Cyan
    $rel = Invoke-RestMethod -Uri "$BASE/users/me/relationship" -Headers @{Authorization="Bearer $tok"}
    Write-Host "Relationship data: $($rel | ConvertTo-Json -Depth 4)" -ForegroundColor Yellow

} catch { 
    Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Response: $($reader.ReadToEnd())" -ForegroundColor Red
    }
}

# Test 5: Check CORS/OPTIONS for DELETE
Write-Host "`n=== CORS Check for DELETE ===" -ForegroundColor Cyan
try {
    $resp = Invoke-WebRequest -Uri "$BASE/users/me/relationship" -Method OPTIONS
    Write-Host "CORS Status: $($resp.StatusCode)" -ForegroundColor Green
    Write-Host "Allow-Origin: $($resp.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Green
    Write-Host "Allow-Methods: $($resp.Headers['Access-Control-Allow-Methods'])" -ForegroundColor Green
} catch { Write-Host "CORS check: $($_.Exception.Message)" -ForegroundColor Yellow }

Write-Host "`n=== DONE ===" -ForegroundColor Green
