# NOW Payments Configuration

## Live Credentials
- **API Key**: `Y1PBEWN-SNT4GWM-N7KPW58-QQ7BRQH`
- **IPN Secret**: `t482t52TYznaGksvd0fhMoMGoDnBzN96`

## Backend Server Configuration

The NOW Payments credentials need to be configured on the backend server at:
`https://web-production-4a4e.up.railway.app`

### Environment Variables to Set:

```bash
NOWPAYMENTS_API_KEY=Y1PBEWN-SNT4GWM-N7KPW58-QQ7BRQH
NOWPAYMENTS_IPN_SECRET=t482t52TYznaGksvd0fhMoMGoDnBzN96
NOWPAYMENTS_ENVIRONMENT=production
```

### API Endpoints Used:

1. **Status Check**: `GET /api/nowpayments/status`
2. **Supported Currencies**: `GET /api/nowpayments/currencies`
3. **Minimum Amount**: `GET /api/nowpayments/min-amount/:currency`
4. **Create Payment**: `POST /api/nowpayments/payment`
5. **Payment Status**: `GET /api/nowpayments/payment/:paymentId`

### IPN Configuration:

The IPN (Instant Payment Notification) URL should be configured in your NOW Payments dashboard to:
`https://web-production-4a4e.up.railway.app/api/nowpayments/ipn`

## Frontend Integration

The frontend will automatically detect when live credentials are configured and switch from demo mode to live mode. Users will see:

- **Demo Mode**: "🧪 Running in demo mode"
- **Live Mode**: "🔗 LIVE cryptocurrency payments are now active!"

## Testing

Once configured, the system will:
1. Fetch real supported currencies from NOW Payments
2. Create actual payment addresses on the blockchain
3. Monitor real transactions
4. Process live cryptocurrency payments

## Security Notes

- Never expose API keys in frontend code
- Use environment variables on the server
- Validate IPN signatures using the IPN secret
- Implement proper error handling for API failures