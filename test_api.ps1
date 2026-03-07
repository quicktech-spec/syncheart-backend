$BASE = 'https://syncheart-backend-production.up.railway.app/api/v1'

Write-Host '=== STEP 1: Register / Login User A ===' -ForegroundColor Cyan
try {
    $r1 = Invoke-RestMethod -Uri "$BASE/auth/register" -Method POST -ContentType 'application/json' -Body '{"email":"tester_alpha@syncheart.com","password":"SynchTest123"}'
    $token1 = $r1.access_token
    Write-Host 'User A registered OK'
} catch {
    $r1 = Invoke-RestMethod -Uri "$BASE/auth/login" -Method POST -ContentType 'application/json' -Body '{"email":"tester_alpha@syncheart.com","password":"SynchTest123"}'
    $token1 = $r1.access_token
    Write-Host 'User A logged in OK'
}

Write-Host '=== STEP 2: Register / Login User B ===' -ForegroundColor Cyan
try {
    $r2 = Invoke-RestMethod -Uri "$BASE/auth/register" -Method POST -ContentType 'application/json' -Body '{"email":"tester_beta@syncheart.com","password":"SynchTest123"}'
    $token2 = $r2.access_token
    Write-Host 'User B registered OK'
} catch {
    $r2 = Invoke-RestMethod -Uri "$BASE/auth/login" -Method POST -ContentType 'application/json' -Body '{"email":"tester_beta@syncheart.com","password":"SynchTest123"}'
    $token2 = $r2.access_token
    Write-Host 'User B logged in OK'
}

$h1 = @{Authorization="Bearer $token1"}
$h2 = @{Authorization="Bearer $token2"}

Write-Host '=== STEP 3: Get User A invite code ===' -ForegroundColor Cyan
$p1 = Invoke-RestMethod -Uri "$BASE/users/me" -Headers $h1
$inviteCode = $p1.invite_code
Write-Host "User A invite code: $inviteCode"

Write-Host '=== STEP 4: Clean up any existing relationships ===' -ForegroundColor Cyan
try { Invoke-RestMethod -Uri "$BASE/users/me/relationship" -Method DELETE -Headers $h1 | Out-Null; Write-Host 'Cleaned A' } catch { Write-Host 'A had no relationship' }
try { Invoke-RestMethod -Uri "$BASE/users/me/relationship" -Method DELETE -Headers $h2 | Out-Null; Write-Host 'Cleaned B' } catch { Write-Host 'B had no relationship' }

Write-Host '=== STEP 5: Sync couple (B uses A invite code) ===' -ForegroundColor Cyan
try {
    $syncBody = "{`"invite_code`":`"$inviteCode`"}"
    $sync = Invoke-RestMethod -Uri "$BASE/users/sync-couple" -Method POST -ContentType 'application/json' -Body $syncBody -Headers $h2
    $partnerEmail = $sync.partner.email
    Write-Host "SYNC OK! B sees partner: $partnerEmail"
} catch {
    Write-Host "SYNC FAILED: $($_.Exception.Message)"
    $_.Exception | Select-Object -ExpandProperty Response | ForEach-Object { $_.GetResponseStream() | ForEach-Object { $reader = New-Object System.IO.StreamReader($_); Write-Host $reader.ReadToEnd() } }
}

Write-Host '=== STEP 6: Verify relationship from A ===' -ForegroundColor Cyan
$rel = Invoke-RestMethod -Uri "$BASE/users/me/relationship" -Headers $h1
if ($rel.data.partner) {
    $partnerFromA = $rel.data.partner.email
    Write-Host "A sees partner: $partnerFromA - PASS"
} else {
    Write-Host "A sees NO partner - FAIL"
}

Write-Host '=== STEP 7: Update profile for User A ===' -ForegroundColor Cyan
try {
    $prof = Invoke-RestMethod -Uri "$BASE/users/me" -Method PATCH -ContentType 'application/json' -Headers $h1 -Body '{"display_name":"Shubham Test","love_language":"Quality Time","attachment_style":"Secure"}'
    Write-Host "Profile update OK. Name: $($prof.display_name)"
} catch {
    Write-Host "Profile update FAILED: $($_.Exception.Message)"
}

Write-Host '=== STEP 8: BREAK SYNC from A ===' -ForegroundColor Cyan
try {
    $brk = Invoke-RestMethod -Uri "$BASE/users/me/relationship" -Method DELETE -Headers $h1
    Write-Host "BREAK SYNC OK: $($brk.message)"
} catch {
    Write-Host "BREAK SYNC FAILED: $($_.Exception.Message)"
}

Write-Host '=== STEP 9: Verify break ===' -ForegroundColor Cyan
$check = Invoke-RestMethod -Uri "$BASE/users/me/relationship" -Headers $h1
if ($check.data) {
    Write-Host "FAIL: A still has relationship!"
} else {
    Write-Host "SUCCESS: Break sync verified - no relationship!"
}

Write-Host ''
Write-Host '====================================='-ForegroundColor Green
Write-Host 'ALL BACKEND API TESTS COMPLETE' -ForegroundColor Green
Write-Host '=====================================' -ForegroundColor Green
