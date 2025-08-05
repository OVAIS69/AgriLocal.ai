<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgriBot AI - Smart Farming Assistant</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        .ai-glow { box-shadow: 0 0 30px rgba(147, 51, 234, 0.3); }
        
        /* Enhanced responsive chat container */
        .chat-container { 
            height: 45vh; 
            max-height: 350px; 
            min-height: 250px;
        }
        @media (min-width: 480px) {
            .chat-container { 
                height: 50vh; 
                max-height: 400px; 
            }
        }
        @media (min-width: 640px) {
            .chat-container { 
                height: 55vh; 
                max-height: 450px; 
            }
        }
        @media (min-width: 768px) {
            .chat-container { 
                height: 58vh; 
                max-height: 480px; 
            }
        }
        @media (min-width: 1024px) {
            .chat-container { 
                height: 60vh; 
                max-height: 500px; 
            }
        }
        
        /* Enhanced message bubble responsiveness */
        .message-bubble { 
            max-width: 90%; 
            word-wrap: break-word; 
        }
        @media (min-width: 480px) {
            .message-bubble { max-width: 85%; }
        }
        @media (min-width: 640px) {
            .message-bubble { max-width: 80%; }
        }
        @media (min-width: 768px) {
            .message-bubble { max-width: 75%; }
        }
        
        .user-message { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; }
        .bot-message { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
        
        /* Enhanced typing indicator */
        .typing-indicator { display: flex; gap: 4px; padding: 12px 16px; }
        .typing-dot { width: 8px; height: 8px; border-radius: 50%; background: #8b5cf6; animation: typing 1.4s infinite ease-in-out; }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing { 0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
        
        /* Enhanced stop button styles */
        .stop-btn {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border: none;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-height: 44px; /* Touch-friendly minimum height */
        }
        .stop-btn:hover {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            transform: scale(1.05);
        }
        .stop-btn:active {
            transform: scale(0.95);
        }
        
        /* Enhanced responsive text sizes */
        .responsive-text {
            font-size: 0.875rem;
            line-height: 1.5;
        }
        @media (min-width: 480px) {
            .responsive-text {
                font-size: 0.9rem;
            }
        }
        @media (min-width: 640px) {
            .responsive-text {
                font-size: 1rem;
            }
        }
        @media (min-width: 768px) {
            .responsive-text {
                font-size: 1.05rem;
            }
        }
        @media (min-width: 1024px) {
            .responsive-text {
                font-size: 1.125rem;
            }
        }
        
        /* Enhanced mobile optimizations */
        @media (max-width: 480px) {
            .mobile-optimized {
                padding: 0.75rem;
            }
            .mobile-text {
                font-size: 0.8rem;
            }
            .mobile-button {
                min-height: 44px;
                min-width: 44px;
            }
        }
        
        /* Enhanced touch interactions */
        .touch-friendly {
            min-height: 44px;
            min-width: 44px;
        }
        
        /* Enhanced spacing for mobile */
        @media (max-width: 640px) {
            .mobile-spacing {
                gap: 0.5rem;
                padding: 0.75rem;
            }
        }
    </style>
</head>
<body>
    <div class="background-container"></div>
    <div class="background-overlay"></div>

    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 py-2 sm:py-4">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <nav class="glass-card flex justify-between items-center p-3 sm:p-4 rounded-full">
                <a href="dashboard.html" class="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4">
                    <svg width="24" height="24" class="sm:w-7 sm:h-7" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 2.5C30.4 2.5 15 18.3 15 38c0 14.9 16.2 36.5 31.1 53.4.9 1 2.3 1.5 3.7 1.5s2.8-.5 3.7-1.5C68.8 74.5 85 52.9 85 38c0-19.7-15.4-35.5-35-35.5z" fill="var(--primary-green)"/>
                        <path d="M50 15c-12.7 0-23 10.3-23 23 0 7.5 3.6 14.1 9.2 18.4.6.4 1.3.6 2 .6 1.1 0 2.2-.6 2.8-1.7 3.3-6.1 3.2-14.7-.3-21.7C37.9 26.2 43.6 22 50 22c5.5 0 10.4 3.4 12.6 8.4 1.4 3.3 1.4 7.2 0 10.6-.6 1.2.1 2.6 1.3 3.2 1.2.6 2.6-.1 3.2-1.3 3.2-6.5 3.1-14.4-.3-20.9C63.6 18.5 57.2 15 50 15z" fill="#0f172a"/>
                    </svg>
                    <span class="text-lg sm:text-xl font-semibold logo-title text-white">AgriLocal</span>
                </a>
                <div class="flex items-center gap-2 sm:gap-4">
                    <a href="dashboard.html" class="text-white hover:text-green-300 transition-colors font-medium px-2 sm:px-4 py-2 text-sm sm:text-base">Dashboard</a>
                </div>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <!-- Hero Section -->
            <div class="text-center mb-6 sm:mb-8 lg:mb-12">
                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 px-2">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">Smart Solutions,</span>
                    <br>
                    <span class="text-white">AI-Driven Conversations</span>
                </h1>
                <p class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-3 sm:px-4 leading-relaxed">
                    Meet AgriBot - your intelligent farming assistant. Get expert advice on crops, weather, market prices, and sustainable farming practices in your preferred language.
                </p>
            </div>

            <!-- Chat Interface -->
            <div class="max-w-4xl mx-auto px-2 sm:px-4">
                <div class="glass-card rounded-2xl p-3 sm:p-4 md:p-6 ai-glow">
                    <div class="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                        <div class="flex items-center gap-2 sm:gap-3">
                            <div class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm sm:text-base md:text-lg font-semibold">AgriBot AI</h3>
                                <p class="text-xs sm:text-sm text-gray-400">Your farming assistant</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                            <span class="text-xs sm:text-sm text-gray-400">Online</span>
                        </div>
                    </div>

                    <!-- Chat Messages -->
                    <div id="chat-messages" class="chat-container overflow-y-auto mb-3 sm:mb-4 md:mb-6 space-y-2 sm:space-y-3 md:space-y-4 px-1">
                        <div class="message-bubble bot-message rounded-2xl p-2.5 sm:p-3 md:p-4 ml-0">
                            <p class="responsive-text">नमस्कार! मी AgriBot आहे, तुमचा शेती सहाय्यक. मी तुम्हाला पिकांच्या शिफारसी, हवामान सूचना, बाजार भाव आणि सेंद्रिय शेतीबद्दल मदत करू शकतो. तुम्ही मराठी, हिंदी किंवा इंग्रजीत प्रश्न विचारू शकता.</p>
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="flex gap-1.5 sm:gap-2 md:gap-3">
                        <input type="text" id="chat-input" placeholder="Ask me about farming..." class="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 text-sm sm:text-base touch-friendly">
                        
                        <!-- Voice Input Button -->
                        <button id="voice-btn" class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 relative touch-friendly">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                            <!-- Recording indicator -->
                            <div id="recording-indicator" class="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-red-500 rounded-full hidden animate-pulse"></div>
                        </button>
                        
                        <!-- Send Button -->
                        <button id="send-btn" class="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 touch-friendly">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Voice Status -->
                    <div id="voice-status" class="mt-2 sm:mt-3 text-center text-xs sm:text-sm text-gray-400 hidden">
                        <div class="flex items-center justify-center gap-1.5 sm:gap-2">
                            <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span id="voice-status-text">Listening...</span>
                        </div>
                    </div>
                    
                    <!-- Stop Speech Button -->
                    <div id="stop-speech-container" class="mt-2 sm:mt-3 text-center hidden">
                        <button id="stop-speech-btn" class="stop-btn">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                            </svg>
                            <span class="hidden sm:inline">Stop Speech</span>
                            <span class="sm:hidden">Stop</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer Section -->
    <footer class="glass-card border-t border-white/10 mt-12 sm:mt-16">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <!-- License Information -->
                <div>
                    <h3 class="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">License & Legal</h3>
                    <div class="space-y-2 text-xs sm:text-sm text-gray-300">
                        <p>© 2024 AgriLocal. All rights reserved.</p>
                        <p>This software is licensed under the MIT License.</p>
                        <p>For commercial use, please contact us.</p>
                        <div class="mt-3 sm:mt-4">
                            <a href="privacy-policy.html" class="text-green-400 hover:text-green-300 transition-colors">Privacy Policy</a>
                            <span class="mx-2 text-gray-500">•</span>
                            <a href="terms-of-service.html" class="text-green-400 hover:text-green-300 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>

                <!-- Contact Information -->
                <div>
                    <h3 class="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact Us</h3>
                    <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                        <div class="flex items-center gap-2">
                            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>agrilocal4u@gmail.com</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span>+91 8828906337</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Mumbai, Maharashtra, India</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
                    <div class="space-y-2 text-xs sm:text-sm text-gray-300">
                        <a href="dashboard.html" class="block text-green-400 hover:text-green-300 transition-colors">Dashboard</a>
                        <a href="index.html" class="block text-green-400 hover:text-green-300 transition-colors">Home</a>
                        <a href="blogs.html" class="block text-green-400 hover:text-green-300 transition-colors">Blogs</a>
                        <a href="privacy-policy.html" class="block text-green-400 hover:text-green-300 transition-colors">Privacy Policy</a>
                        <a href="terms-of-service.html" class="block text-green-400 hover:text-green-300 transition-colors">Terms of Service</a>
                    </div>
                </div>

                <!-- AI Features -->
                <div>
                    <h3 class="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">AI Features</h3>
                    <div class="space-y-2 text-xs sm:text-sm text-gray-300">
                        <div class="flex items-center gap-2">
                            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                            <span>Voice Assistant</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span>Multi-Language Support</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                            <span>Smart Farming AI</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center">
                <p class="text-xs sm:text-sm text-gray-400">
                    Made with ❤️ for Indian farmers. Empowering agriculture through AI technology.
                </p>
            </div>
        </div>
    </footer>

    <div id="language-switcher" class="lang-btn-container">
        <button id="lang-en" class="lang-btn active">English</button>
        <button id="lang-hi" class="lang-btn">हिंदी</button>
        <button id="lang-mr" class="lang-btn">मराठी</button>
    </div>

    <script src="agribot.js"></script>
</body>
</html> 
