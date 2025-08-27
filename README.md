# AutoBlog AI - Full Stack Application

🚀 **AI-powered blog generation tool with HIPAA compliance focus, modern web UI, and automated content creation.**

## 🎯 Features

- **AI-Powered Content Generation**: Uses GROQ/Llama models for creating healthcare-focused blog posts
- **Smart Topic Suggestions**: LLM-generated trending topics for HIPAA, AI, and latest tech trends
- **Dynamic Resource Integration**: Web scraping of Technology Rivers links with user selection
- **Professional Formatting**: HTML-structured blogs with proper headings, lists, and links
- **Multiple Export Formats**: Download as DOCX or HTML with preserved formatting
- **Real-time UI**: Modern React interface with Material-UI components
- **Automated Workflows**: CLI commands for blog generation and email distribution

## 🏗️ Architecture

```
autoblog-ai/          # NestJS Backend API
├── src/
│   ├── blog-generator/    # Core blog generation service
│   ├── web-scraper/       # Technology Rivers link scraping
│   ├── email-service/     # Email automation
│   └── topic-research/    # Trending topic research
└── ...

blog-ui/              # React Frontend Dashboard
├── src/
│   └── App.tsx           # Main UI component
└── ...

start-both.sh         # Single command to run both services
package.json          # Root package management
```

## 🚀 Quick Start

### Option 1: Single Command (Recommended)
```bash
# Start both backend and frontend
npm start
# or
npm run dev
# or
./start-both.sh
```

### Option 2: Separate Commands
```bash
# Terminal 1 - Backend
npm run start:backend

# Terminal 2 - Frontend  
npm run start:frontend
```

## 📦 Installation

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Environment Setup
Create `autoblog-ai/.env` file:
```bash
# LLM Configuration (GROQ recommended)
LLM_PROVIDER=groq
LLM_API_KEY=your_groq_api_key_here
LLM_MODEL=llama-3.1-8b-instant

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MARKETING_EMAIL=marketing@yourcompany.com
```

### 3. Start the Application
```bash
npm start
```

## 🌐 Access Points

- **Frontend Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api (if Swagger is enabled)

## 🎮 Usage

### Web Interface
1. **Select or Enter Topic**: Choose from AI-generated suggestions or enter custom topic
2. **Add Keywords**: Specify relevant keywords for SEO optimization
3. **Choose Links**: Select Technology Rivers resources to include
4. **Configure Settings**: Set word count, tone, and other preferences
5. **Generate Blog**: AI creates professional blog with proper formatting
6. **Download/Copy**: Export as DOCX/HTML or copy formatted content

### CLI Commands
```bash
# Generate single blog from trending topic
npm run blog:single

# Generate multiple blogs for weekly digest
npm run blog
```

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start both frontend and backend |
| `npm run dev` | Same as start (development mode) |
| `npm run start:backend` | Start only NestJS backend |
| `npm run start:frontend` | Start only React frontend |
| `npm run install:all` | Install dependencies for both projects |
| `npm run build:frontend` | Build React app for production |
| `npm run blog` | Generate and email weekly blog digest |
| `npm run blog:single` | Generate single blog from trending topic |

### Backend Development
```bash
cd autoblog-ai
npm run start:dev    # Hot reload development
npm run build        # Build for production
npm run test         # Run tests
```

### Frontend Development
```bash
cd blog-ui
npm start           # Development server with hot reload
npm run build       # Build for production
npm test            # Run tests
```

## 📚 API Endpoints

### Blog Generation
- `POST /blog-generator/generate` - Generate blog from topic
- `GET /blog-generator/suggested-topics` - Get AI-generated topic suggestions
- `POST /blog-generator/download-docx` - Download blog as DOCX
- `POST /blog-generator/download-html` - Download blog as HTML

### Resource Management
- `GET /blog-generator/separated-links` - Get Technology Rivers resources and blog links
- `GET /blog-generator/load-more-blogs/:page` - Load additional blog pages

## 🎨 UI Features

### Topic Selection
- **AI-Generated Suggestions**: Fresh topics focused on HIPAA, AI, and tech trends
- **Refresh Functionality**: Generate new topics on-demand with LLM
- **Custom Topics**: Enter any topic with keyword suggestions
- **Visual Feedback**: Loading states and success messages

### Resource Integration
- **Dynamic Link Scraping**: Real-time fetching of Technology Rivers content
- **Resource Categorization**: Separate resources and blog posts
- **Pagination**: Load more blog links as needed
- **Smart Selection**: Auto-select relevant links based on keywords

### Content Generation
- **Professional Formatting**: HTML structure with headings, lists, links
- **Word Count Control**: Precise targeting of content length
- **SEO Optimization**: Keyword integration and meta information
- **Dynamic Resources**: User-selected resources appended to content

## 🔒 Security & Compliance

- **HIPAA-Focused Content**: All topics and examples target healthcare compliance
- **Secure API Keys**: Environment-based configuration
- **Input Validation**: Comprehensive DTO validation with class-validator
- **Error Handling**: Graceful fallbacks and user-friendly error messages

## 🚦 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's running on ports
lsof -i :3000  # Backend
lsof -i :3001  # Frontend

# Kill existing processes
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)
```

**Dependencies:**
```bash
# Reinstall all dependencies
rm -rf node_modules autoblog-ai/node_modules blog-ui/node_modules
npm run install:all
```

**Environment:**
```bash
# Verify environment variables
cd autoblog-ai && node -e "console.log(require('dotenv').config())"
```

## 📈 Performance

- **Concurrent Services**: Backend and frontend run simultaneously
- **Smart Caching**: Resource links cached to reduce scraping calls
- **Loading States**: Non-blocking UI with proper feedback
- **Error Recovery**: Graceful handling of API failures

## 🔮 Future Enhancements

- [ ] Docker containerization
- [ ] Database integration for blog storage
- [ ] User authentication and multi-tenancy
- [ ] Advanced SEO analytics
- [ ] Social media integration
- [ ] Automated publishing workflows

---

**Built with**: NestJS, React, Material-UI, GROQ/Llama, TypeScript

**License**: MIT
