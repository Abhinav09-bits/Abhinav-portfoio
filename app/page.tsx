"use client"

// ============================================================================
// IMPORTS - All necessary React hooks, UI components, and icons
// ============================================================================
import type React from "react"

import { useState, useEffect, useMemo } from "react"
import {
  Search,
  Download,
  User,
  Code,
  Briefcase,
  Award,
  Activity,
  Mail,
  Share2,
  BookOpen,
  Github,
  ExternalLink,
  Play,
  ImageIcon,
  Palette,
  Home,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// ============================================================================
// TYPE DEFINITIONS - TypeScript interfaces for type safety
// ============================================================================

/**
 * Available theme options for the portfolio
 * - baby-blue: Light blue professional theme
 * - cyberpunk: Galaxy theme with stars, red moon, and enhanced text visibility
 * - dark: Classic dark mode with gray tones
 */
type Theme = "baby-blue" | "cyberpunk" | "dark"

/**
 * Different sections/pages of the portfolio application
 * Each section represents a different view/page in the single-page app
 */
type Section = "home" | "about" | "projects" | "skills" | "activities" | "contact" | "social" | "blogs"

/**
 * Structure for each section card displayed on the homepage
 * These cards act as navigation buttons to different sections
 */
interface SectionCard {
  id: Section // Unique identifier matching the Section type
  title: string // Display title for the card
  description: string // Brief description of what the section contains
  icon: React.ReactNode // Lucide React icon component
  keywords: string[] // Search keywords for filtering functionality
}

/**
 * Structure for project data - represents each portfolio project
 * Contains all information needed to display project details
 */
interface Project {
  id: string // Unique project identifier
  title: string // Project name/title
  description: string // Brief project description
  technologies: string[] // Array of technologies/frameworks used
  githubUrl: string // Link to GitHub repository
  liveUrl?: string // Link to live demo/deployment
  videoUrl?: string // Optional YouTube video demo URL
  images: string[] // Array of project screenshot URLs
  lines: string[] // Key features/highlights as bullet points
}

/**
 * Structure for skills organized by category
 * Groups related skills together for better organization
 */
interface SkillCategory {
  title: string // Category name (e.g., "Programming Languages")
  skills: string[] // Array of skill names in this category
  icon: React.ReactNode // Icon representing this category
}

// ============================================================================
// DATA CONFIGURATION - Static data for the portfolio
// ============================================================================

/**
 * Section cards displayed on the homepage
 * Each card represents a different section of the portfolio
 * Users click these to navigate to different views
 */
const sectionCards: SectionCard[] = [
  {
    id: "about",
    title: "About Me",
    description: "Learn about my background, experience, and passion for technology.",
    icon: <User className="w-6 h-6" />,
    keywords: ["about", "bio", "background", "experience", "story"],
  },
  {
    id: "projects",
    title: "Projects",
    description: "Explore my featured work, with links, videos, and images.",
    icon: <Code className="w-6 h-6" />,
    keywords: ["projects", "work", "portfolio", "code", "development", "apps"],
  },
  {
    id: "skills",
    title: "Skills",
    description: "Technical skills and expertise across various technologies.",
    icon: <Award className="w-6 h-6" />,
    keywords: ["skills", "technologies", "expertise", "programming", "tools"],
  },
  {
    id: "activities",
    title: "Activities",
    description: "Professional activities, certifications, and achievements.",
    icon: <Activity className="w-6 h-6" />,
    keywords: ["activities", "certifications", "achievements", "awards", "recognition"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with me for opportunities and collaborations.",
    icon: <Mail className="w-6 h-6" />,
    keywords: ["contact", "email", "reach", "connect", "hire", "collaborate"],
  },
  {
    id: "social",
    title: "Social Media",
    description: "Connect with me on various social platforms.",
    icon: <Share2 className="w-6 h-6" />,
    keywords: ["social", "twitter", "linkedin", "github", "instagram", "follow"],
  },
  {
    id: "blogs",
    title: "Blogs",
    description: "Read my thoughts on technology, development, and industry trends.",
    icon: <BookOpen className="w-6 h-6" />,
    keywords: ["blogs", "articles", "writing", "thoughts", "tutorials", "insights"],
  },
]

/**
 * Abhinav's actual projects from portfolio
 * These are the real projects that will be displayed in the projects section
 * Each project includes detailed information, technologies used, and links
 */
const projects: Project[] = [
  {
    id: "1",
    title: "Ai-logo-gen",
    description:
      "Developed an AI-powered responsive logo generator that transforms user ideas into custom logos using Gemini API and Hugging Face.",
    technologies: ["Next.js", "React", "Firebase", "Gemini API", "Hugging Face"],
    githubUrl: "https://github.com/Abhinav09-bits/Ai-logo-gen",
  //  liveUrl: "https://ai-logo-gen-demo.com",
   // videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    lines: [
      "Developed an AI-powered responsive logo generator that transforms user ideas into custom logos using Gemini API and Hugging Face",
      "Implemented a credit-based access model and stored user data with role-based access (user/admin) using Firebase Firestore",
      "Enabled users to securely log in, generate logos, and access their previously created designs",
    ],
  },
  {
    id: "2",
    title: "Web-Helper",
    description:
      "Built an AI-powered Chrome Extension using manifest.json and React.js to explain code snippets and enhance developer productivity.",
    technologies: ["HTML", "CSS", "React.js", "OpenAI API", "Chrome Extension"],
    githubUrl: "https://github.com/Abhinav09-bits/AiCodeExplainerExtension",
   // liveUrl: "https://chrome.google.com/webstore/detail/web-helper",
   images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    lines: [
      "Built an AI-powered Chrome Extension using manifest.json and React.js to explain code snippets and enhance developer productivity",
      "Integrated OpenAI API to generate real-time code explanations within the browser environment",
    ],
  },
  {
    id: "3",
    title: "SPS TicTactoe",
    description:
      "Designed and developed a hybrid dual-game engine combining Tic-Tac-Toe and Stone-Paper-Scissors to enhance interactivity and user engagement.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Abhinav09-bits/TicTacToe",
    liveUrl: "https://advanced-tictactoe.vercel.app/",
 images: ["/placeholder.svg?height=300&width=400"],
    lines: [
      "Designed and developed a hybrid dual-game engine combining Tic-Tac-Toe and Stone-Paper-Scissors to enhance interactivity and user engagement",
      "Implemented logic to handle simultaneous interactions and shared gameplay outcomes between both games",
    ],
  },
]

/**
 * Skills organized by categories - Abhinav's actual technical skills
 * Grouped into logical categories for better presentation and organization
 * Each category has an icon and contains related skills
 */
const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["C++", "C", "JavaScript", "Python", "HTML", "CSS", "Solidity"],
    icon: <Code className="w-5 h-5" />,
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React + Vite", "Next.js", "Node.js", "Tailwind CSS"],
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: "Tools & Software",
    skills: ["Git", "GitHub", "VS Code", "Docker", "Cursor Ai", "Figma", "Canva", "MATLAB"],
    icon: <Award className="w-5 h-5" />,
  },
  {
    title: "Databases",
    skills: ["MySQL", "Firebase"],
    icon: <Activity className="w-5 h-5" />,
  },
  {
    title: "Design & Development",
    skills: ["UI/UX Design", "Data Structures & Algorithms"],
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "Emerging Technologies",
    skills: ["Iot","Prompt Engineering", "Blockchain Development"],
    icon: <Share2 className="w-5 h-5" />,
  },
]

// ============================================================================
// THEME CONFIGURATION - Styling for different color themes
// ============================================================================

/**
 * Background gradient classes for each theme
 * Updated cyberpunk theme to galaxy theme with stars and red moon
 */
const themeClasses = {
  "baby-blue": "bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-slate-800",
  cyberpunk: "galaxy-bg text-gray-100",
  dark: "bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100",
}

/**
 * Card styling classes for each theme
 * Updated cyberpunk/galaxy theme with enhanced visibility and red accents
 */
const cardThemeClasses = {
  "baby-blue":
    "bg-white/70 backdrop-blur-sm border-sky-200/50 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-400/15",
  cyberpunk: "galaxy-card",
  dark: "bg-gray-800/80 backdrop-blur-sm border-gray-600/30 hover:border-gray-500 hover:shadow-xl hover:shadow-gray-500/20",
}

// ============================================================================
// MAIN PORTFOLIO COMPONENT - The root component of the application
// ============================================================================

/**
 * Main Portfolio Component
 * This is the root component that manages the entire portfolio application
 * Handles navigation between sections, theme switching, and search functionality
 */
export default function Portfolio() {
  // ============================================================================
  // STATE MANAGEMENT - React hooks for managing component state
  // ============================================================================

  /**
   * Search query state - stores the current search input value
   * Used to filter section cards and projects based on user input
   */
  const [searchQuery, setSearchQuery] = useState("")

  /**
   * Current section state - tracks which section/page is currently active
   * Controls which content is displayed in the main area
   * Default is "home" to show the landing page with section cards
   */
  const [currentSection, setCurrentSection] = useState<Section>("home")

  /**
   * Theme state - manages the current color theme of the application
   * Default is "baby-blue" for a professional, clean appearance
   */
  const [theme, setTheme] = useState<Theme>("baby-blue")

  // ============================================================================
  // EFFECTS - Side effects and lifecycle management
  // ============================================================================

  /**
   * Theme effect - applies the selected theme to the document root
   * This allows CSS variables to be updated globally when theme changes
   * Runs whenever the theme state changes
   */
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  // ============================================================================
  // COMPUTED VALUES - Memoized calculations for performance optimization
  // ============================================================================

  /**
   * Filtered section cards based on search query
   * Uses useMemo for performance - only recalculates when searchQuery changes
   * Searches through title, description, and keywords for matches
   */
  const filteredCards = useMemo(() => {
    // If no search query, return all cards
    if (!searchQuery) return sectionCards

    // Filter cards based on search query matching title, description, or keywords
    return sectionCards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [searchQuery])

  /**
   * Filtered projects based on search query
   * Similar to filtered cards but for project data
   * Searches through title, description, and technologies
   */
  const filteredProjects = useMemo(() => {
    // If no search query, return all projects
    if (!searchQuery) return projects

    // Filter projects based on search query matching title, description, or technologies
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [searchQuery])

  // ============================================================================
  // EVENT HANDLERS - Functions that handle user interactions
  // ============================================================================

  /**
   * Handle section card click - navigates to a specific section
   * @param sectionId - The section to navigate to
   * Also clears the search query to reset the view
   */
  const handleCardClick = (sectionId: Section) => {
    setCurrentSection(sectionId)
    setSearchQuery("") // Clear search when navigating
  }

  /**
   * Handle search form submission
   * @param e - Form submission event
   * Navigates to the first filtered result if available
   * Prevents default form submission behavior
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredCards.length > 0) {
      handleCardClick(filteredCards[0].id)
    }
  }

  // ============================================================================
  // RENDER COMPONENT - JSX structure of the application
  // ============================================================================

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses[theme]}`}>
      {/* ============================================================================ */}
      {/* HEADER SECTION - Top navigation bar with branding and controls */}
      {/* ============================================================================ */}
      <header className="flex items-center justify-between p-4">
        {/* Left side - Personal branding with name and enhanced hover animations */}
        <div className="flex items-center gap-4">
          {/* Enhanced Abhinav brand button with hover animations */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentSection("home")}
            className="text-sm font-bold group relative overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>

            {/* Sliding underline effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>

            {/* Text with color transition */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Abhinav
            </span>

            {/* Subtle glow effect for cyberpunk theme */}
            {theme === "cyberpunk" && (
              <div className="absolute inset-0 bg-[#7a72e5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md blur-sm"></div>
            )}
          </Button>
        </div>

        {/* Right side - Action buttons and profile */}
        <div className="flex items-center gap-4">
          {/* Resume download button - triggers download of resume PDF */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
            onClick={() => {
              // Create temporary link element to trigger download
              const link = document.createElement("a")
              link.href = "https://drive.google.com/drive/folders/1zB_8VAppkd-hGLz2yZDaYl_l1V1H7lET"
            //  link.download = "resume.pdf"
              link.click()
            }}
          >
            <Download className="w-4 h-4" />
            Resume
          </Button>

          {/* Theme selector dropdown - allows switching between color themes */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Baby Blue theme option */}
              <DropdownMenuItem onClick={() => setTheme("baby-blue")}>
                <div className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-sky-200 to-blue-200 border"></div>
                Baby Blue
              </DropdownMenuItem>
              {/* Updated Galaxy theme option */}
              <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
                <div className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-red-600 to-gray-900 border"></div>
                Galaxy
              </DropdownMenuItem>
              {/* Dark mode theme option */}
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <div className="w-4 h-4 mr-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 border"></div>
                Dark Mode
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile picture with modal - Enhanced with hover animations */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8 group">
                {/* Small profile avatar in header */}
                <Avatar className="w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  <AvatarImage
                    src="/profile.jpg"
                    alt="Abhinav's Profile"
                    className="transition-all duration-300 group-hover:brightness-110"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </Button>
            </DialogTrigger>
            {/* Profile modal with larger image and details */}
            <DialogContent className="max-w-md">
              <div className="flex flex-col items-center gap-4 p-6">
                {/* Large profile picture with hover animation */}
                <div className="group cursor-pointer">
                  <Avatar className="w-32 h-32 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
                    <AvatarImage
                      src="/profile.jpg"
                      alt="Abhinav's Profile"
                      className="transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                    />
                    <AvatarFallback className="text-2xl">AB</AvatarFallback>
                  </Avatar>
                  {/* Animated ring around profile picture */}
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-500 group-hover:animate-pulse"></div>
                </div>

                {/* Profile information */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Abhinav</h3>
                  <p className="text-muted-foreground">Software Developer</p>
                  <p className="text-sm mt-2">Passionate about creating amazing web experiences</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* ============================================================================ */}
      {/* MAIN CONTENT AREA - Different sections based on currentSection state */}
      {/* ============================================================================ */}
      <main className="container mx-auto px-4 py-8">
        {/* ============================================================================ */}
        {/* HOME SECTION - Landing page with search and section cards */}
        {/* ============================================================================ */}
        {currentSection === "home" && (
          <div className="max-w-2xl mx-auto">
            {/* Chrome-style search bar for filtering content */}
            <form onSubmit={handleSearchSubmit} className="mb-12">
              <div className="relative">
                {/* Search icon inside input field */}
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                {/* Main search input */}
                <Input
                  type="text"
                  placeholder="Search sections or projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg rounded-full border-2 focus:border-blue-500 transition-colors"
                />
              </div>
            </form>

            {/* Section cards grid - Chrome shortcut style navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${cardThemeClasses[theme]}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <CardHeader className="text-center">
                    {/* Icon container with background */}
                    <div className="mx-auto mb-4 p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 w-fit">
                      {card.icon}
                    </div>
                    {/* Card title and description */}
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription className="text-sm">{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================================ */}
        {/* ABOUT SECTION - Enhanced with bio card and improved navigation */}
        {/* ============================================================================ */}
        {currentSection === "about" && (
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Back to Home button with better styling and animations */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              {/* Animated arrow icon */}
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              {/* Home icon for better visual context */}
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>

              {/* Subtle background animation on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
            </Button>

            {/* About section header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">About Me</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-fade-in-delay"></div>
            </div>

            {/* Enhanced about content layout with bio card */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left column - Profile picture with enhanced animations */}
              <div className="lg:col-span-1 flex justify-center">
                <div className="group cursor-pointer relative">
                  {/* Main profile avatar with multiple hover effects */}
                  <Avatar className="w-80 h-80 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
                    <AvatarImage
                      src="/profile.jpg"
                      alt="Abhinav's Profile"
                      className="transition-all duration-500 group-hover:brightness-110 group-hover:contrast-105"
                    />
                    <AvatarFallback className="text-6xl">AB</AvatarFallback>
                  </Avatar>

                  {/* Animated ring effect around profile picture */}
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-500 group-hover:animate-pulse"></div>

                  {/* Outer glow effect for cyberpunk theme */}
                  {theme === "cyberpunk" && (
                    <div className="absolute inset-0 rounded-full bg-[#7a72e5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  )}

                  {/* Floating particles effect (subtle) */}
                  <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>

              {/* Right column - Bio content with animated cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio introduction card */}
                <Card
                  className={`${cardThemeClasses[theme]} group transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-in`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                      {/* Icon with color transition */}
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors duration-300">
                        <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        Who I Am
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Passionate coder and problem-solver with a knack for turning ideas into impactful digital
                      solutions. Experienced in crafting clean, efficient code across diverse programming languages,
                      specializing in front-end development, back-end systems, and Embedded Engineering. Always ready to
                      explore emerging technologies and push the boundaries of innovation. Collaborates effectively in
                      teams, thrives in fast-paced environments, and values continuous learning to stay ahead in the
                      tech landscape. Let's build something amazing together!
                    </p>
                  </CardContent>
                </Card>

                {/* Journey card */}
                <Card
                  className={`${cardThemeClasses[theme]} group transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-in`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                      {/* Icon with color transition */}
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors duration-300">
                        <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                        My Journey
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      I am a student pursuing B.Tech at NIT Hamirpur in the ECE branch. I am passionate about coding and
                      problem-solving, with experience in various programming languages like C++. I'm familiar with
                      various technologies including Frontend development, Backend systems, and Embedded Systems. I am
                      always eager to learn new things and explore emerging technologies that can make a difference in
                      the world.
                    </p>
                  </CardContent>
                </Card>

                {/* Passion & interests card */}
                <Card
                  className={`${cardThemeClasses[theme]} group transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-in`}
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                      {/* Icon with color transition */}
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors duration-300">
                        <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        Beyond Coding
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      When I'm not coding, you can find me exploring new technologies, contributing to open source
                      projects, or sharing knowledge through blog posts and mentoring. I'm particularly passionate about
                      building solutions that benefit everyone. Outside of tech, I enjoy playing badminton and chess,
                      and I'm also an avid anime fan. Wanna play a match?
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================ */}
        {/* PROJECTS SECTION - Portfolio projects with tabs (All, Videos, Images) */}
        {/* ============================================================================ */}
        {currentSection === "projects" && (
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Back to home navigation */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Button>
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            {/* Project tabs - Similar to Chrome tabs for different views */}
            <Tabs defaultValue="all" className="w-full">
              {/* Tab navigation buttons */}
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  All
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Images
                </TabsTrigger>
              </TabsList>

              {/* All projects tab content - Shows complete project information */}
              <TabsContent value="all" className="mt-8">
                <div className="grid gap-8">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className={cardThemeClasses[theme]}>
                      <CardHeader>
                        {/* Project header with title and action buttons */}
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                            <CardDescription className="text-base mb-4">{project.description}</CardDescription>
                          </div>
                          {/* GitHub and live demo buttons */}
                          <div className="flex gap-2">
                            {/* TODO: Replace with actual GitHub repository URL */}
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                            {/* TODO: Replace with actual live demo URL */}
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>

                        {/* Technology badges showing tech stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="skill-badge">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Project highlights/features as bullet points */}
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {project.lines.map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                        </ul>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Videos tab content - Shows only projects with video demos */}
              <TabsContent value="videos" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProjects
                    .filter((p) => p.videoUrl) // Only show projects with videos
                    .map((project) => (
                      <Card key={project.id} className={cardThemeClasses[theme]}>
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* Embedded YouTube video */}
                          <div className="aspect-video">
                            <iframe src={project.videoUrl} className="w-full h-full rounded-lg" allowFullScreen />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Images tab content - Shows project screenshots in a gallery */}
              <TabsContent value="images" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.flatMap((project) =>
                    project.images.map((image, index) => (
                      <Card key={`${project.id}-${index}`} className={cardThemeClasses[theme]}>
                        <CardContent className="p-0">
                          {/* Project screenshot */}
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${project.title} screenshot`}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {/* Image caption with project title */}
                          <div className="p-4">
                            <h3 className="font-semibold">{project.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    )),
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* ============================================================================ */}
        {/* SKILLS SECTION - Technical skills organized by categories with enhanced galaxy theme visibility */}
        {/* ============================================================================ */}
        {currentSection === "skills" && (
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Back to home navigation */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Button>

            {/* Skills header with decorative underline */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 animate-fade-in">My Skills</h1>
              {/* Yellow accent underline */}
              <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full animate-fade-in-delay"></div>
            </div>

            {/* Skills categories grid - Responsive layout with enhanced galaxy theme visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <Card
                  key={category.title}
                  className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
                >
                  <CardHeader className="pb-4">
                    {/* Category header with icon and title */}
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon container with hover effects - Enhanced for galaxy theme */}
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                        {category.icon}
                      </div>
                      {/* Category title with hover color change - Enhanced visibility for galaxy theme */}
                      <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.title}
                      </CardTitle>
                    </div>

                    {/* Skills badges for each skill in the category - Enhanced visibility for galaxy theme */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="skill-badge text-xs px-3 py-1 transition-all duration-200 hover:scale-105 cursor-pointer"
                          style={{ animationDelay: `${index * 0.1 + skillIndex * 0.05}s` }} // Individual badge animation delay
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Skills summary statistics - Enhanced visibility for galaxy theme */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-delay-2">
              {/* Programming Languages count */}
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">7</div>
                <div className="text-sm text-muted-foreground">Programming Languages</div>
              </div>
              {/* Frameworks count */}
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4</div>
                <div className="text-sm text-muted-foreground">Frameworks & Libraries</div>
              </div>
              {/* Tools count */}
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">8</div>
                <div className="text-sm text-muted-foreground">Tools & Software</div>
              </div>
              {/* Databases count */}
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">2</div>
                <div className="text-sm text-muted-foreground">Databases</div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================ */}
        {/* CONTACT SECTION - Gmail and WhatsApp contact options */}
        {/* ============================================================================ */}
        {currentSection === "contact" && (
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Back to home navigation */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Button>

            {/* Contact section header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 animate-fade-in">Get In Touch</h1>
              <p className="text-xl text-muted-foreground animate-fade-in-delay">
                Let's connect and discuss opportunities, collaborations, or just have a chat!
              </p>
            </div>

            {/* Contact options grid - Two main contact methods */}
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Gmail contact card - TODO: Replace with actual email address */}
              <Card
                className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1 animate-slide-in-left`}
              onClick={() =>
  window.open(
    "mailto:abhinavabhi91203@gmail.com?subject=Hello!&body=Hi%20there,%20I%20would%20like%20to%20get%20in%20touch%20with%20you.",
    "_blank"
  )
}

              >
                <CardContent className="p-8 text-center">
                  {/* Gmail icon with hover effects */}
                  <div className="mb-6 relative">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors">Email Me</h3>
                  <p className="text-muted-foreground mb-4">Send me an email directly</p>
                  <p className="text-sm font-mono bg-muted px-3 py-1 rounded-full">abhinavabhi91203@gmail.com</p>
                </CardContent>
              </Card>

              {/* WhatsApp contact card - TODO: Replace with actual phone number */}
              <Card
                className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-1 animate-slide-in-right`}
                onClick={() =>
                  window.open(
                    "https://wa.me/918580440557?text=Hi%20Abhinav%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.",

                    "_blank",
                  )
                }
              >
                <CardContent className="p-8 text-center">
                  {/* WhatsApp icon with hover effects */}
                  <div className="mb-6 relative">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                      {/* WhatsApp SVG icon */}
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-500 transition-colors">WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">Chat with me instantly</p>
                  <p className="text-sm font-mono bg-muted px-3 py-1 rounded-full">+91 8580440557</p>
                </CardContent>
              </Card>
            </div>

            {/* Response time indicator */}
            <div className="mt-12 text-center animate-fade-in-delay-2">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Usually responds within 24 hours</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================ */}
        {/* SOCIAL MEDIA SECTION - Links to all social media platforms */}
        {/* ============================================================================ */}
        {currentSection === "social" && (
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Back to home navigation */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Button>

            {/* Social media header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 animate-fade-in">Connect With Me</h1>
              <p className="text-xl text-muted-foreground animate-fade-in-delay">
                Follow me on social media for updates, insights, and behind-the-scenes content!
              </p>
            </div>

            {/* Social media platforms grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Social media links - TODO: Replace with actual social media URLs */}
              {/* Instagram Card - TODO: Update with actual Instagram username */}
              <Card
                className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-1 animate-slide-in-left`}
                onClick={() => window.open("https://instagram.com/_abinavv_09", "_blank")} // TODO: Replace your_username
              >
                <CardContent className="p-6 text-center">
                  {/* Instagram icon with gradient background */}
                  <div className="mb-4 relative">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-pink-500 transition-colors">Instagram</h3>
                  <p className="text-sm text-muted-foreground">@_abinavv_09</p>
                </CardContent>
              </Card>

              {/* X (Twitter) Card - TODO: Update with actual X/Twitter username */}
              <Card
                className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1 animate-slide-in-left`}
                onClick={() => window.open("https://x.com/abhinav9120", "_blank")} // TODO: Replace your_username
                style={{ animationDelay: "0.1s" }}
              >
                <CardContent className="p-6 text-center">
                  {/* X icon with black background */}
                  <div className="mb-4 relative">
                    <div className="mx-auto w-12 h-12 bg-black rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    X (Twitter)
                  </h3>
                  <p className="text-sm text-muted-foreground">@abhinav9120</p>
                </CardContent>
              </Card>

              {/* LinkedIn Card - TODO: Update with actual LinkedIn username */}
              <Card
                className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-1 animate-slide-in-right`}
                onClick={() => window.open("https://linkedin.com/in/Abhinav khatta", "_blank")} // TODO: Replace your_username
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-6 text-center">
                  {/* LinkedIn icon with blue background */}
                  <div className="mb-4 relative">
                    <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">in/Abhinav khatta</p>
                </CardContent>
              </Card>

              {/* GitHub Card - TODO: Update with actual GitHub username */}
              <Card
                className={`${cardThemeClasses[theme]} group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1 animate-slide-in-right`}
                onClick={() => window.open("https://github.com/Abhinav09-bits", "_blank")} // TODO: Replace your_username
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-6 text-center">
                  {/* GitHub icon with dark background */}
                  <div className="mb-4 relative">
                    <div className="mx-auto w-12 h-12 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    GitHub
                  </h3>
                  <p className="text-sm text-muted-foreground">@Abhinav09-bits</p>
                </CardContent>
              </Card>
            </div>

            {/* Social media stats or additional info */}
            <div className="mt-12 text-center animate-fade-in-delay-2">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Active on all platforms - Follow for updates!</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================ */}
        {/* ACTIVITIES SECTION - Professional activities, achievements, and leadership */}
        {/* ============================================================================ */}
        {currentSection === "activities" && (
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Back to home navigation */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Button>

            {/* Activities header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 animate-fade-in">Activities & Achievements</h1>
              <p className="text-xl text-muted-foreground animate-fade-in-delay">
                Leadership roles, competitions, and community contributions that shaped my journey
              </p>
            </div>

            {/* Activities grid */}
            <div className="grid gap-8">
              {/* NSS Executive Role */}
              <Card className={`${cardThemeClasses[theme]} animate-fade-in`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* NSS Icon */}
                      <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                        <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">NSS Executive</CardTitle>
                        <CardDescription className="text-lg">NIT Hamirpur</CardDescription>
                      </div>
                    </div>
                    {/* Achievement badge */}
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Leadership Role
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Key achievements */}
                  <div className="space-y-4">
                    {/* Tree Plantation Initiative */}
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold mb-1">Environmental Leadership Initiative</h4>
                        <p className="text-muted-foreground">
                          Launched a tree plantation initiative that involved planting <strong>150+ trees</strong>{" "}
                          across the campus with <strong>50+ volunteers</strong>, fostering partnerships with local
                          environmental groups, and promoting sustainable community development among residents.
                        </p>
                      </div>
                    </div>

                    {/* Blood Donation Drives */}
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold mb-1">Community Health Leadership</h4>
                        <p className="text-muted-foreground">
                          Demonstrated leadership by orchestrating logistics of{" "}
                          <strong>three annual NSS blood donation drives</strong>, securing participation from{" "}
                          <strong>200+ students and faculty</strong>, while coordinating with local hospitals to address
                          critical blood shortages in the community.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Impact metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">150+</div>
                      <div className="text-sm text-muted-foreground">Trees Planted</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">200+</div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-sm text-muted-foreground">Annual Drives</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NHAI Hackathon */}
              <Card className={`${cardThemeClasses[theme]} animate-fade-in`} style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Hackathon Icon */}
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">NHAI Hackathon</CardTitle>
                        <CardDescription className="text-lg">National Level Competition</CardDescription>
                      </div>
                    </div>
                    {/* Achievement badge */}
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      Round 3 Qualifier
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Project details */}
                  <div className="space-y-4">
                    {/* Engineering Solution */}
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold mb-1">IoT-Based Vehicle Safety System</h4>
                        <p className="text-muted-foreground">
                          Engineered an <strong>IoT-based safety system</strong> that detects unsafe driving behavior
                          and disables vehicle ignition via key fob integration, addressing critical road safety
                          challenges.
                        </p>
                      </div>
                    </div>

                    {/* Innovation Impact */}
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold mb-1">Prototype Development & Testing</h4>
                        <p className="text-muted-foreground">
                          Spearheaded the creation of an IoT-enabled vehicle safety system prototype featuring unsafe
                          driving detection with ignition lockout, incorporating case study analysis to improve vehicle
                          safety scores by <strong>10%</strong> within the test group.
                        </p>
                      </div>
                    </div>

                    {/* Achievement */}
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold mb-1">Competition Success</h4>
                        <p className="text-muted-foreground">
                          Secured a place for <strong>Round 3</strong> among hundreds of participants nationwide,
                          demonstrating innovation and technical excellence in transportation safety solutions.
                        </p>
                        {/* Certificate link */}
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent" asChild>
                          <a
                            href="https://drive.google.com/drive/folders/1lnt9Jx5uCF3S_YhLttbhqxrmPPiwpbbh"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Certificate
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Technologies used */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">IoT</Badge>
                      <Badge variant="outline">Embedded Systems</Badge>
                      <Badge variant="outline">Vehicle Integration</Badge>
                      <Badge variant="outline">Safety Protocols</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SDE Intern Experience */}
              <Card className={`${cardThemeClasses[theme]} animate-fade-in`} style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Internship Icon */}
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                        <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">SDE Intern</CardTitle>
                        <CardDescription className="text-lg">YUGAYATRA RETAIL (OPC) PRIVATE LIMITED</CardDescription>
                        <CardDescription className="text-sm text-muted-foreground">Remote, India</CardDescription>
                      </div>
                    </div>
                    {/* Experience badge */}
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                    >
                      Professional Experience
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Key contributions */}
                  <div className="space-y-4">
                    {/* Main project */}
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold mb-1">Online Testing Platform Integration</h4>
                        <p className="text-muted-foreground">
                          Implemented an <strong>online testing feature</strong> on YugatraRetail's official website,
                          enabling seamless candidate evaluations and enhancing platform functionality for improved
                          recruitment processes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills developed */}
                  <div className="mt-6">
                    <h5 className="font-semibold mb-2">Key Skills Developed:</h5>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Web Development</Badge>
                      <Badge variant="outline">Testing Systems</Badge>
                      <Badge variant="outline">Platform Integration</Badge>
                      <Badge variant="outline">Remote Collaboration</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary statistics */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-delay-2">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">350+</div>
                <div className="text-sm text-muted-foreground">People Impacted</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
                <div className="text-sm text-muted-foreground">Leadership Roles</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1</div>
                <div className="text-sm text-muted-foreground">Professional Internship</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">10%</div>
                <div className="text-sm text-muted-foreground">Safety Improvement</div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================================ */}
        {/* PLACEHOLDER SECTIONS - Coming soon pages for Blogs */}
        {/* These sections are not yet implemented but provide placeholder content */}
        {/* ============================================================================ */}
        {currentSection === "blogs" && (
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced Back to home navigation */}
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("home")}
              className="mb-8 group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <Home className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Button>
            {/* Section title (capitalized from section name) */}
            <h1 className="text-4xl font-bold mb-8 capitalize">{currentSection}</h1>
            {/* Coming soon message */}
            <p className="text-xl text-muted-foreground">This section is coming soon! Check back later for updates.</p>
          </div>
        )}
      </main>
    </div>
  )
}
