# BIG-TORO - Travel and Tours Platform with Meshhy AI

✈️ An innovative travel and tours booking platform with interactive 3D visualization powered by Meshhy AI and Supabase backend.

## Features

- 🌍 **Interactive 3D Plane Display** - Animated airplane visualization on homepage using Three.js and Meshhy AI
- 🏖️ **Service Management System** - Create, update, and manage travel services with custom attributes
- 🎯 **Admin Dashboard** - Secure admin panel to control all services and their properties
- 🔐 **Role-Based Access** - Admin authentication with secret key verification
- 📸 **Service Images** - Add multiple images per service with admin control
- ⚙️ **Custom Attributes** - Define custom properties for each service (price, duration, capacity, etc.)
- 🎨 **Responsive Design** - Beautiful UI that works on all devices
- 🔄 **Real-time Updates** - Services updated instantly across the platform
- 🤖 **Meshhy AI Integration** - Generate 3D models and visualizations for services

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Admin Key
- **3D Visualization**: Three.js + Meshhy AI
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: RESTful architecture

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zoeblay48-sys/BIG-TORO.git
cd BIG-TORO
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### 4. Configure Environment Variables

Edit `.env` with your settings:

```
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Meshhy AI Configuration
MESHHY_AI_API_KEY=your-meshhy-ai-api-key
MESHHY_AI_ENDPOINT=https://api.meshhy.ai

# Server Configuration
PORT=5000
NODE_ENV=development

# Admin Configuration
ADMIN_SECRET_KEY=your-secure-admin-key
```

### 5. Set Up Supabase Database

Create the following tables in your Supabase project:

```sql
-- Services Table
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  images JSONB DEFAULT '[]',
  attributes JSONB DEFAULT '{}',
  category VARCHAR(100),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_services_category ON services(category);
```

### 6. Run the Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

## Usage

### Access the Website

- **Homepage**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin.html

### Admin Panel

1. Open the Admin Panel
2. Enter your `ADMIN_SECRET_KEY`
3. Manage services:
   - View all services and statistics
   - Create new services with images and custom attributes
   - Edit existing services
   - Delete services
   - Toggle service status (active/inactive)

### Creating a Service

1. Go to Admin Panel → Manage Services
2. Fill in service details:
   - **Name**: Service name
   - **Description**: Service description
   - **Category**: flight, hotel, tour, activity
   - **Images**: Add image URLs
   - **Attributes**: Define custom properties (e.g., price, duration, capacity)
3. Click "Add Service"

### Service Attributes

You can add any custom attributes to services:

```json
{
  "price": "$199.99",
  "duration": "5 days",
  "maxCapacity": "50",
  "season": "Summer 2024",
  "rating": "4.5/5",
  "difficulty": "Moderate"
}
```

## API Endpoints

### Public Endpoints

```
GET  /api/services              - Get all active services
GET  /api/services/:id          - Get service by ID
GET  /api/services/:id/visualization - Get Meshhy AI visualization
```

### Admin Endpoints

```
GET    /api/admin/services      - Get all services (requires admin key)
POST   /api/admin/services      - Create new service
PUT    /api/admin/services/:id  - Update service
DELETE /api/admin/services/:id  - Delete service
```

### Meshhy AI Endpoints

```
POST /api/meshy/plane-model              - Generate 3D plane model
POST /api/meshy/service-visualization    - Generate service visualization
```

## Project Structure

```
BIG-TORO/
├── src/
│   ├── config/
│   │   ├── supabase.js         # Supabase client configuration
│   │   └── meshhy.js           # Meshhy AI client configuration
│   ├── routes/
│   │   ├── admin.js            # Admin API routes
│   │   ├── services.js         # Public services routes
│   │   └── meshy.js            # Meshhy AI routes
│   └── server.js               # Express server setup
├── public/
│   ├── index.html              # Homepage
│   ├── admin.html              # Admin dashboard
│   ├── app.js                  # Frontend JavaScript
│   ├── admin.js                # Admin panel JavaScript
│   ├── styles.css              # Homepage styles
│   └── admin-styles.css        # Admin styles
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Security

- Admin operations require the `ADMIN_SECRET_KEY` header
- Supabase authentication for secure data access
- Environment variables for sensitive data
- Row-level security (RLS) can be implemented in Supabase

## Meshhy AI Integration

Meshhy AI provides 3D visualization capabilities:

1. **Plane Model Generation** - Creates interactive 3D airplane models for the homepage
2. **Service Visualization** - Generates 3D representations of travel services
3. **Interactive Elements** - Allows users to interact with 3D models

Configure Meshhy AI API key in `.env` to enable all features.

## Future Enhancements

- [ ] User authentication and booking system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Review and rating system
- [ ] Recommendation engine
- [ ] Real-time availability updates

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Author

Developed by [zoeblay48-sys](https://github.com/zoeblay48-sys)

---

**Happy Traveling! ✈️🌍**
