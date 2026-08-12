# 🐚 Little Pearl

Little Pearl is a premium e-commerce store specializing in soft, natural fabrics and delicate pearls designed for little ones. This repository contains the full-stack codebase for the storefront and admin dashboard.

## ✨ Features

### Customer Storefront
- **Modern, Responsive Design**: A beautifully crafted UI using Tailwind CSS with a custom color palette, smooth animations, and glassmorphism effects. Fully responsive across desktop, tablet, and mobile.
- **Product Discovery**: Browse by category (Baby Wear, Pearl Jewellery, Occasions), view featured products, and discover new arrivals.
- **Advanced Search**: Real-time product search functionality built right into the navigation header.
- **Product Details**: Rich product pages with image galleries, variant selection, pricing (with discount indicators), and related trust badges.
- **Cart & Wishlist**: Client-side state management (via Zustand) with local storage persistence. Easily add items, update quantities, and toggle wishlist favorites.
- **SEO Optimized**: Built on Next.js App Router for optimal performance, server-side rendering, and dynamic metadata.

### Admin Dashboard (Harshafeni)
- **Centralized Management**: Manage the entire store from the `/harshafeni` portal.
- **Product Management**: Create, edit, and organize products, variants, and categories.
- **Media Uploads**: Seamless image uploads powered by Cloudinary.
- **Order & Inventory Tracking**: Keep tabs on sales, customer orders, and stock levels.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Client-side cart/wishlist)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/little-pearl.git
cd little-pearl
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add your keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary Configuration (For Admin Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway (Optional/Future)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 4. Database Setup

The project uses Supabase. You can find the initial database schemas in the `supabase/migrations/` folder. Execute these SQL scripts in your Supabase SQL Editor to create the necessary tables for products, categories, variants, and settings.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚢 Deployment

The project is configured for seamless deployment on **Vercel**. 

1. Push your code to a Git repository (GitHub/GitLab/Bitbucket).
2. Import the project in Vercel.
3. Add the environment variables from your `.env.local` to the Vercel project settings.
4. Deploy!

Ensure that you add your Vercel deployment URL to the **Redirect URLs** in your Supabase Authentication settings.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
