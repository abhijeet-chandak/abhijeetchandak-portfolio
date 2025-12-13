# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately via email.

## Security Best Practices

1. **Never commit secrets**: Use environment variables for sensitive data
2. **Keep dependencies updated**: Run `npm audit` regularly
3. **Run security scans**: Use `npm run security:check` before committing

## Security Tools

This project uses:

- **ESLint**: Code quality and security linting
- **npm audit**: Dependency vulnerability scanning
- **Gitleaks**: Secret scanning in git history

### Running Security Checks

```bash
# Check for vulnerable dependencies
npm run security:check

# Fix automatically fixable vulnerabilities
npm run security:fix

# Scan for secrets in code
npm run gitleaks
```

## Known Security Considerations

### Static Export

This project uses Next.js static export (`output: 'export'`), which means:

- No server-side code execution
- All pages are pre-rendered
- No API routes
- Client-side only JavaScript

### Environment Variables

- Never commit `.env` files
- Use `.env.local` for local development
- All environment variables are exposed to the client in static exports

### Content Security

- All content is static and pre-rendered
- No user input is processed server-side
- Contact forms should use external services (e.g., Formspree, Netlify Forms)

### Known Vulnerabilities

**glob package vulnerability (High severity)**

- **Status**: Known issue, non-blocking
- **Reason**: Transitive dependency from `eslint-config-next@14.x`
- **Impact**: Low - affects development tooling only, not production runtime
- **Fix**: Will be resolved when upgrading to Next.js 15+ (requires
  `eslint-config-next@16.x`)
- **Action**: Security check set to only fail on critical issues. This
  vulnerability is monitored but doesn't block deployments.
