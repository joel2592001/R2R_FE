# 🎙️ Voice Analytics Dashboard

A modern, real-time voice agent analytics dashboard built with React, TypeScript, and Supabase. This project demonstrates advanced data visualization, user data persistence, and a polished dark-themed UI.

![Voice Analytics Dashboard](https://img.shields.io/badge/React-19.1.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-teal)

## 📋 Assessment Overview

This project was built as a frontend assessment to demonstrate:

- **Modern UI/UX Design**: Dark theme with glassmorphism effects inspired by superbryn.com
- **Data Visualization**: Interactive charts including line charts, bar charts, and pie charts
- **State Management**: Complex state handling with React hooks
- **Database Integration**: Real-time data persistence with Supabase
- **User Experience**: Custom modals, toast notifications, and smooth animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## ✨ Features

### 📊 Real-time Analytics
- **Call Duration Trends**: Line chart showing average call duration throughout the day
- **Daily Call Volume**: Stacked bar chart comparing total vs successful calls
- **Failure Analysis**: Interactive pie chart with editable failure reasons
- **Key Metrics**: Live dashboard cards showing total calls, success rate, average duration, and failed calls

### 💾 Data Persistence
- **Email-based User Identification**: Users can save their customized data
- **Supabase Integration**: Secure cloud storage for user analytics
- **Load Previous Data**: Returning users can retrieve their saved configurations
- **Overwrite Protection**: Confirmation modal before overwriting existing data

### 🎨 Modern UI Components
- **Custom Toast Notifications**: Beautiful success/error messages (no system alerts)
- **Confirmation Modals**: Elegant dialogs for user confirmations
- **Email Input Modal**: Smooth modal for collecting user emails
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Professional gradient background with teal accents
- **Hover Effects**: Interactive elements with smooth transitions

### 🔧 Technical Highlights
- **Component Architecture**: Modular, reusable components
- **Custom SVG Charts**: Hand-crafted visualizations without heavy libraries
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Graceful error states with user-friendly messages
- **Loading States**: Visual feedback during async operations

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- A Supabase account (free tier works)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd r2r-fe-assessment
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Create the database table**

Run this SQL in your Supabase SQL Editor:
```sql
CREATE TABLE user_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  chart_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations
CREATE POLICY "Allow all operations" ON user_analytics
FOR ALL USING (true);
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
r2r-fe-assessment/
├── public/
│   └── favicon.svg              # Custom waveform favicon
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx        # Main dashboard container
│   │   ├── DashboardHeader.tsx  # Header with live status
│   │   ├── MetricCard.tsx       # Reusable metric display card
│   │   ├── CallDurationChart.tsx # Line chart component
│   │   ├── CallVolumeChart.tsx  # Bar chart component
│   │   ├── FailureAnalysis.tsx  # Pie chart with legend
│   │   ├── EmailModal.tsx       # Email input modal
│   │   ├── Toast.tsx            # Toast notification component
│   │   └── ConfirmModal.tsx     # Confirmation dialog
│   ├── lib/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template with SEO meta tags
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎯 Key Components

### Dashboard
The main container that orchestrates all components and manages global state including:
- Chart data state
- Edit mode state
- User email state
- Modal visibility
- Toast notifications

### Charts
- **CallDurationChart**: SVG-based line chart with gradient fill
- **CallVolumeChart**: Stacked bar chart with pixel-based heights
- **FailureAnalysis**: Custom pie chart with editable values

### Modals & Notifications
- **EmailModal**: Collects user email for data persistence
- **ConfirmModal**: Handles user confirmations (overwrite, discard changes)
- **Toast**: Non-intrusive success/error notifications

## 🛠️ Technologies Used

- **React 19.1.1**: Latest React with hooks
- **TypeScript 5.9.3**: Type-safe development
- **Vite 5.0**: Lightning-fast build tool
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **Supabase 2.80.0**: Backend as a Service (BaaS)
- **Lucide React**: Beautiful icon library

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

## 🎨 Design Philosophy

- **Dark Theme**: Professional appearance with reduced eye strain
- **Teal Accents**: Primary color (#14b8a6) for interactive elements
- **Glassmorphism**: Subtle backdrop blur effects on cards
- **Smooth Animations**: Fade-in, slide-up, and hover transitions
- **Visual Hierarchy**: Clear information architecture

## 🔐 Security

- Environment variables for sensitive keys
- Row Level Security (RLS) enabled on Supabase
- Client-side validation
- Error boundary handling

## 📈 Future Enhancements

- [ ] Real-time data updates with Supabase subscriptions
- [ ] Export data to CSV/PDF
- [ ] Date range filters
- [ ] Multiple chart themes
- [ ] User authentication
- [ ] Team collaboration features
- [ ] Advanced analytics and insights

## 🚢 Deployment to Netlify

### Quick Deploy

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify** (3 methods)

#### Method 1: Netlify CLI (Recommended)
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Method 2: Drag & Drop
1. Build your project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the upload area

#### Method 3: Git Integration
1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variable:
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key
7. Click "Deploy site"

### Environment Variables on Netlify

After deployment, add your environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add the following:
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Configuration Files

The project includes:
- `netlify.toml`: Build configuration and redirects
- `public/_redirects`: SPA routing fallback

## 🧪 Testing the Application

1. **View Default Data**: Open the app to see sample analytics
2. **Edit Mode**: Click "Edit Data" to modify failure analysis values
3. **Save Data**: Click "Save Changes" and enter your email
4. **Load Data**: Click "Load Data" and enter the same email to retrieve saved data
5. **Overwrite Protection**: Try saving again with the same email to see the confirmation modal
6. **Discard Changes**: Make edits and click "Cancel" to see the discard confirmation

## 📝 Assessment Requirements Met

✅ **Similar theme to superbryn.com**: Dark gradient background with modern aesthetics  
✅ **Call analytics charts**: Line chart, bar chart, and pie chart implemented  
✅ **User data customization**: Editable failure analysis values  
✅ **Email collection**: Modal for user identification  
✅ **Supabase storage**: Data persistence with cloud database  
✅ **Previous data detection**: Checks for existing user data  
✅ **Professional UI**: Custom components, no system alerts  
✅ **Responsive design**: Works on all screen sizes  
✅ **Type safety**: Full TypeScript implementation  

## 🤝 Contributing

This is an assessment project, but feedback and suggestions are welcome!

## 📄 License

This project is created for assessment purposes.

## 👤 Author

Built with ❤️ as a frontend development assessment

---

**Note**: This project demonstrates modern React development practices, clean code architecture, and attention to user experience details.
