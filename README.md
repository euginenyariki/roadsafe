# RoadSafe - Production-Ready Roadside Assistance Marketplace

**Car trouble? Get verified help near you, see the price, track the provider and pay securely.**

RoadSafe is a comprehensive, production-ready roadside assistance marketplace platform designed for Kenya and architected for expansion across East Africa. It connects stranded motorists with verified service providers in real-time, enabling seamless assistance, transparent pricing, secure payments, and complete service history tracking.

## 🎯 Core Features

### For Customers
- **Emergency SOS Flow**: Quick access to roadside assistance with one tap
- **Smart Provider Matching**: AI-powered dispatch engine that finds the best-fit provider
- **Real-Time Tracking**: Live GPS tracking of provider location and ETA
- **Vehicle Management**: Register and manage multiple vehicles
- **Service History**: Complete maintenance and service records
- **Secure Payments**: Multiple payment methods including M-PESA
- **Ratings & Reviews**: Transparent provider ratings and customer feedback
- **Smart Notifications**: Push, SMS, and WhatsApp notifications
- **In-app Chat**: Direct communication with service providers

### For Service Providers
- **Professional Dashboard**: Manage jobs, earnings, and availability
- **Smart Job Requests**: Receive matching requests within service radius
- **Quote System**: Submit and track quotations for additional work
- **Real-Time Navigation**: Integrated routing to customer location
- **Earnings Management**: View pending and available balance
- **Performance Analytics**: Track acceptance rate, cancellation rate, and ratings
- **Document Management**: Upload and manage verification documents

### For Administrators
- **Live Operations Dashboard**: Real-time view of all active jobs
- **Provider Management**: Verification, suspension, and performance tracking
- **Dispatch Control**: Manual job assignment and provider escalation
- **Payment Management**: Transaction reconciliation and settlements
- **Dispute Resolution**: Comprehensive dispute investigation tools
- **Analytics**: Revenue, user growth, service metrics
- **System Settings**: Configurable pricing, dispatch weights, and feature flags

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Maps**: Mapbox/Google Maps abstraction layer
- **Real-time**: Socket.IO client
- **PWA Support**: Service workers for offline capability

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Runtime**: Node.js
- **API**: REST + WebSockets
- **ORM**: TypeORM
- **Validation**: Class-validator

### Database
- **Primary**: PostgreSQL 14+
- **Geospatial**: PostGIS
- **Cache**: Redis
- **Queue**: BullMQ (Redis-based)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Storage**: S3-compatible (Minio for local dev)
- **CI/CD**: GitHub Actions
- **Monitoring**: Winston, Sentry (optional)

## 📦 Project Structure

```
roadsafe/
├── apps/
│   ├── web/                    # Customer web application (Next.js)
│   ├── admin/                  # Admin dashboard (Next.js)
│   ├── provider/               # Provider app (Next.js)
│   └── api/                    # Backend API (NestJS)
├── packages/
│   ├── database/               # TypeORM entities & migrations
│   ├── types/                  # Shared TypeScript types
│   ├── ui/                     # Shared React components
│   ├── config/                 # Shared configuration
│   ├── auth/                   # Authentication utilities
│   ├── maps/                   # Maps abstraction layer
│   ├── payments/               # Payment abstraction layer
│   ├── notifications/          # Notification service
│   ├── ai/                     # AI service abstraction
│   ├── utils/                  # Common utilities
│   └── logger/                 # Logging configuration
├── infra/
│   ├── docker/                 # Docker configurations
│   ├── nginx/                  # Nginx configuration
│   ├── scripts/                # Deployment scripts
│   └── github/                 # GitHub Actions workflows
├── docs/                       # Documentation
├── tests/                      # E2E tests
├── docker-compose.yml          # Local development stack
└── package.json                # Monorepo configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+ (or use Docker)
- Redis (or use Docker)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/euginenyariki/roadsafe.git
   cd roadsafe
   ```

2. **Copy environment configuration**
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

6. **Seed development data**
   ```bash
   npm run db:seed
   ```

7. **Start development servers**
   ```bash
   npm run dev
   ```

Applications will be available at:
- Customer Web: http://localhost:3000
- Admin Dashboard: http://localhost:3002
- Provider App: http://localhost:3003
- API: http://localhost:3001

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

- [Architecture Overview](docs/architecture.md)
- [Database Schema](docs/database.md)
- [API Documentation](docs/api.md)
- [Authentication & Security](docs/authentication.md)
- [Payment System](docs/payments.md)
- [Maps Integration](docs/maps.md)
- [Dispatch Engine](docs/dispatch.md)
- [Notifications](docs/notifications.md)
- [Deployment Guide](docs/deployment.md)
- [Testing Guide](docs/testing.md)
- [Provider Onboarding Flow](docs/provider-onboarding.md)
- [Admin Guide](docs/admin-guide.md)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🐳 Docker

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📋 Key Workflows

### Customer SOS Flow
1. Customer opens app and clicks "GET HELP NOW"
2. Location permission requested and GPS location detected
3. Customer selects service type (mechanic, tow, fuel, battery, tyre, electrical, lockout, etc.)
4. Vehicle selection from registered vehicles
5. Optional details (description, photo, voice note)
6. Review and confirm request
7. Dispatch engine searches for available providers
8. Providers notified and ranked by algorithm
9. First matching provider accepts job
10. Real-time tracking of provider location
11. Provider arrives and services vehicle
12. Quote submitted for additional work (if needed)
13. Customer approves quote
14. Job marked complete
15. Payment processed (M-PESA, card, wallet)
16. Receipt generated
17. Both parties rate each other
18. Service history updated

### Provider Onboarding
1. Register with personal/business information
2. Select provider type (mechanic, garage, tow operator, etc.)
3. Define services offered with pricing
4. Set operating area (service radius)
5. Configure availability schedule
6. Upload verification documents
7. Configure payment settlement
8. Accept terms and conditions
9. Account status: PENDING → UNDER_REVIEW → VERIFIED
10. Begin receiving job requests

### Dispute Resolution
1. Customer opens dispute within 7 days of job completion
2. Admin receives notification and investigates
3. Admin reviews:
   - Chat history
   - Quote progression
   - Payment records
   - GPS tracking timeline
   - Photo evidence
4. Admin decides: APPROVED (refund), PARTIAL (partial refund), REJECTED
5. If provider violation detected, issue warning/suspension
6. Customer notified of resolution

## 🔐 Security Features

- **Authentication**: JWT with refresh tokens
- **Password Security**: Bcrypt hashing (10 rounds)
- **OTP**: 2FA for sensitive operations
- **Authorization**: Role-based access control (CUSTOMER, PROVIDER, DISPATCHER, SUPPORT, FINANCE, ADMIN, SUPERADMIN)
- **Encryption**: Secrets via environment variables, encrypted at rest
- **Validation**: Request validation with class-validator
- **Rate Limiting**: Configurable per-endpoint
- **CORS**: Whitelist configuration
- **SQL Injection**: Protected via TypeORM parameterized queries
- **XSS**: React automatic escaping + Content Security Headers
- **CSRF**: CSRF tokens for sensitive state-changing operations
- **File Upload**: MIME validation, size limits, safe storage
- **Audit Logging**: Complete activity trail for compliance

## 💰 Payment Integration

### M-PESA (Kenyan Market)
- STK Push flow for mobile USSD
- Payment status tracking
- Webhook processing with signature verification
- Transaction reconciliation
- Mock/Sandbox mode for development

### Supported Payment Methods
- M-PESA (primary)
- Card (Visa/Mastercard via Stripe/Pesapal abstraction)
- Wallet (internal balance)
- Future integrations supported via abstraction layer

## 🤖 AI Features (Feature-Flagged)

### AI Roadside Assistant
- Symptom interpretation
- Problem categorization
- Service recommendations
- Warning light explanation
- Triage questions
- Clear uncertainty communication

### AI Image Analysis
- Dashboard warning light analysis
- Tyre condition assessment
- Fluid leak detection
- Visible damage analysis
- Confidence scoring
- Safety recommendations

## 📊 Admin Analytics

- Active jobs & requests
- Provider online status
- Customer acquisition trends
- Revenue & platform fees
- Provider payouts
- Completion rates
- Average response time
- Average arrival time
- Cancellation rates
- Dispute trends
- User retention metrics

## 🌍 Localization

- Currency: KES (Kenyan Shilling)
- Language: English (extensible)
- Phone: +254 format
- Date/Time: Local timezone support
- Maps: Country-specific data

## 🚢 Deployment

### Requirements
- Ubuntu 20.04+ or equivalent
- Docker & Docker Compose
- PostgreSQL 14+ (managed or self-hosted)
- Redis (managed or self-hosted)
- S3-compatible storage (AWS S3, DigitalOcean Spaces, Minio)
- Domain name
- SSL certificate (Let's Encrypt)

### Production Deployment
See [Deployment Guide](docs/deployment.md) for comprehensive instructions.

## 📝 API Documentation

Full OpenAPI/Swagger documentation available at:
- Development: http://localhost:3001/api/docs
- Production: https://api.roadsafe.ke/api/docs

## 🤝 Contributing

Contributions welcome! Please follow:
- Conventional Commits
- TypeScript strict mode
- ESLint configuration
- Pre-commit hooks

## 📄 License

MIT License - See LICENSE file for details

## ✉️ Support

- Email: support@roadsafe.ke
- Issues: GitHub Issues
- Documentation: /docs directory

## 🗺️ Roadmap

### v1.0 (MVP) - Current
- Core SOS flow
- Provider marketplace
- Real-time tracking
- M-PESA integration
- Admin dashboard
- Ratings & disputes
- Service history

### v1.1
- AI Roadside Assistant
- AI Image Analysis
- WhatsApp integration
- Advanced analytics

### v1.2
- Garage bookings
- Maintenance reminders
- Fleet management
- Spare parts marketplace

### v2.0
- Mobile apps (React Native/Expo)
- Regional expansion (Uganda, Tanzania, Rwanda)
- Insurance integration
- Subscription plans

---

**Built with ❤️ for East African motorists**
