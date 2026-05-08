# 📝 GOAT Note-Taking Application

A modern, full-stack note-taking application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **Supabase Authentication**, **PostgreSQL**, and **AI-powered features** using OpenAI API.

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)

---

## 🎯 Project Overview

**GOAT Note-Taking** is an intelligent note-taking application that combines simplicity with powerful features. It allows users to:

- ✍️ Create, read, update, and delete notes seamlessly
- 🔐 Secure authentication via Supabase
- 🤖 AI-powered note features with OpenAI integration
- 🌙 Dark mode support with theme management
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Real-time updates and smooth user experience
- 📱 Mobile-friendly design

---

## 🚀 Tech Stack

### Frontend
- **Next.js 16.2.3** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5.0** - Type safety and better developer experience
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **next-themes** - Dark mode support
- **Lucide React** - Beautiful, customizable SVG icons
- **shadcn** - High-quality UI components
- **Fuse.js** - Lightweight fuzzy-search library
- **Sonner** - Toast notifications

### Backend & Database
- **Prisma 7.8.0** - ORM for database management
- **PostgreSQL** - Relational database
- **Supabase** - Authentication and real-time features
- **@supabase/ssr** - Server-side rendering support

### AI & Utilities
- **OpenAI API** - AI-powered features
- **UUID** - Unique identifier generation
- **clsx** - Conditional className utility
- **class-variance-authority** - CSS-in-JS utility for variants

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS** - CSS transformations
- **Node.js 20+** - JavaScript runtime

---

## 📁 Project Structure

```
goat-note-taking/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── auth/                   # Authentication logic and middleware
│   ├── components/             # Reusable React components
│   ├── actions/                # Server actions
│   ├── OpenAi/                 # OpenAI integration
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   ├── providers/              # Context providers
│   └── style/                  # Global styles
├── prisma/
│   ├── schema.prisma           # Database schema definition
│   └── migrations/             # Database migrations
├── public/                     # Static assets
├── middleware.ts               # Next.js middleware for auth gating
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
└── package.json                # Project dependencies
```

---

## 🗄️ Database Schema

### User Model
```typescript
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
  notes     Note[]
}
```

### Note Model
```typescript
model Note {
  id        String   @id @default(uuid())
  text      String
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
  author    User     @relation(fields: [authorId], references: [id])
}
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager
- PostgreSQL database
- Supabase account
- OpenAI API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/Dev26khatri/GOAT-Note.git
cd goat-note-taking
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory and add:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/goat_notes

# Application Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### Step 4: Set Up Database
```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### Step 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📚 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🔐 Authentication Flow

The application uses **Supabase Authentication** with middleware-based auth gating:

1. **Middleware** (`middleware.ts`) intercepts all requests
2. **Auth Routes** (`/login`, `/sign-up`) check if user is authenticated
   - If authenticated, redirects to home page
   - If not, shows login/signup forms
3. **Protected Routes** require authentication
   - Automatically redirects to newest note or creates a new note
   - Uses server-side session management

---

## 🤖 AI Features

The application integrates **OpenAI API** for intelligent note features:

- **Smart suggestions** for note content
- **AI-powered search** and filtering
- **Text generation** and completion

Refer to `src/OpenAi/` for implementation details.

---

## 🎨 UI/UX Features

- **Dark Mode Support** - Theme switching with `next-themes`
- **Responsive Design** - Works seamlessly on all devices
- **Toast Notifications** - User feedback with `Sonner`
- **Icon Library** - Lucide React for consistent icons
- **Accessible Components** - Built with accessibility in mind

---

## 📦 Key Dependencies Explained

| Dependency | Purpose |
|---|---|
| `next` | React framework with server-side rendering |
| `@supabase/supabase-js` | Authentication and database |
| `@prisma/client` | Database ORM |
| `tailwindcss` | Styling framework |
| `openai` | AI-powered features |
| `next-themes` | Dark mode support |
| `fuse.js` | Fuzzy search functionality |
| `sonner` | Toast notifications |
| `lucide-react` | Icon library |

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "Import Project" and select the repository
4. Add environment variables in Vercel settings
5. Click "Deploy"

### Deploy on Other Platforms

For detailed deployment instructions, refer to [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Code Style & Linting

This project uses **ESLint** for code quality. Run linting with:

```bash
npm run lint
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change the port
npm run dev -- -p 3001
```

### Database Connection Issues
- Verify `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Check Prisma migrations: `npx prisma migrate status`

### Supabase Authentication Not Working
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Check Supabase project settings
- Ensure redirect URLs are configured

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Dev26khatri**

---

## 🔗 Links & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainer.

---

**Built with ❤️ by Dev26khatri**
