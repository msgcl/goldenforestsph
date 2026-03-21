# PostgreSQL password reset script for msgcl user
$PostgresPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
$PostgresPassword = "hecolea718"
$NewPassword = "PostgresPassword123!"
$DbUser = "msgcl"

# Check if psql exists
if (-not (Test-Path $PostgresPath)) {
    Write-Host "Error: PostgreSQL psql not found at $PostgresPath" -ForegroundColor Red
    exit 1
}

Write-Host "Resetting PostgreSQL password for user '$DbUser'..." -ForegroundColor Green

# Try to connect and reset password
try {
    # Set password environment variable to avoid interactive prompt
    $env:PGPASSWORD = $PostgresPassword
    
    # Execute the ALTER USER command
    & $PostgresPath -U postgres -d postgres -c "ALTER USER $DbUser WITH PASSWORD '$NewPassword';" 2>$null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Password reset successfully!" -ForegroundColor Green
        
        # Update .env file
        $envPath = ".\\.env"
        $envContent = "DATABASE_URL=postgresql://${DbUser}:${NewPassword}@localhost:5432/golden_forests"
        
        Set-Content -Path $envPath -Value $envContent -Force
        Write-Host "✓ .env file updated!" -ForegroundColor Green
        Write-Host ""
        Write-Host "New .env content:" -ForegroundColor Yellow
        Write-Host $envContent
        Write-Host ""
        Write-Host "Password: $NewPassword" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "You can now run: npm run db:push" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to reset password. You may need to enter the postgres superuser password when prompted." -ForegroundColor Red
        Write-Host ""
        Write-Host "Trying with password prompt..." -ForegroundColor Yellow
        & $PostgresPath -U postgres -d postgres -c "ALTER USER $DbUser WITH PASSWORD '$NewPassword';"
        
        if ($LASTEXITCODE -eq 0) {
            $envContent = "DATABASE_URL=postgresql://${DbUser}:${NewPassword}@localhost:5432/golden_forests"
            Set-Content -Path $envPath -Value $envContent -Force
            Write-Host "✓ Password reset and .env file updated!" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}
