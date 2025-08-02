// --- App State & Configuration ---
let user = {}; // Initialize as empty object
let currentLang = localStorage.getItem('agrilocalLang') || 'en'; // Load language preference
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual Gemini API Key
const WEATHER_API_KEY = "YOUR_WEATHER_API_KEY"; // Replace with your actual Weather API Key

const translations = {
    en: {
        getStarted: "Get Started", profile: "Profile", aboutUs: "About Us", blogs: "Blogs",
        justAVisitor: "Just a Visitor",
        featuresTitle: "Your All-in-One Farming Toolkit",
        featurePlantingText: "Get hyper-local, AI-driven recommendations on the perfect time to plant your crops, maximizing potential yield and minimizing climate-related risks.",
        featureIrrigationText: "Based on real-time weather data and satellite analysis, our AI generates precise watering schedules to save water and ensure your crops are never thirsty.",
        featurePestText: "Upload a photo of an affected leaf, and our AI will diagnose the issue, providing immediate, actionable treatment plans to protect your harvest.",
        aboutTitle: "About AgriLocal", aboutText: "AgriLocal was born from a simple mission: to empower local farmers with the same advanced technology used by large agricultural corporations. We believe that by providing accessible, AI-driven insights, we can help build a more sustainable and profitable future for the farming communities that feed us all. Our platform is designed to be intuitive, hyper-local, and a true partner in your daily work.",
        profileTitle: "Your Farm Profile", mainTitle: "Cultivating Insight, <br> <span class='text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500'>Harvesting Success.</span>",
        mainSubtitle: "AgriLocal is your AI co-pilot for the field. We combine satellite imagery with advanced AI to give you precise, actionable advice for your crops, right when you need it.",
        dashboardTitle: "Your Farm Dashboard", satelliteTitle: "Satellite Farm Overview", welcomeTitle: "Welcome to AgriLocal",
        formSubtitle: "Let's set up your farm profile to get personalized AI advice.", formNameLabel: "Your Name", formLocationLabel: "Your Location (City, State)",
        formCropsLabel: "Your Main Crops (comma-separated)", formSubmitBtn: "Create My Profile & View Dashboard",
        welcomeUser: (name) => `Welcome, ${name}!`, welcomeUserSubtitle: (location) => `Here is the latest analysis for your farm in ${location}.`,
        welcomeVisitor: "Welcome, Visitor!", welcomeVisitorSubtitle: "Here is a general overview of the AgriLocal platform.",
        cardPlantingTitle: "Planting Advisor", cardPlantingSub: "AI-driven planting dates.", cardIrrigationTitle: "Smart Irrigation", cardIrrigationSub: "Precise watering schedules.",
        cardPestTitle: "Pest Diagnosis", cardPestSub: "Upload a photo for analysis.", cardMarketTitle: "Local Marketplace", cardMarketSub: "Sell produce to your community.",
        satelliteHealthTitle: "Field Health Analysis", satelliteHealthSub: "Based on your main crops.", fieldStatusHealthy: "Healthy", fieldStatusModerate: "Moderate Stress", fieldStatusHigh: "High Stress",
        weatherTitle: "Weather", loadingWeather: "Loading...",
        cropManagementTitle: "Crop Management", currentCropsTitle: "Current Crops", soilHealthTitle: "Soil Health", upcomingTasksTitle: "Upcoming Tasks",
        marketInsightsTitle: "Market Insights", priceTrendsTitle: "Price Trends", localDemandTitle: "Local Demand",
        recentActivitiesTitle: "Recent Activities",
        blogsTitle: "Farmer in Maharashtra - Blogs"
    },
    mr: {
        getStarted: "सुरु करा", profile: "प्रोफाइल", aboutUs: "आमच्याबद्दल", blogs: "ब्लॉग्स",
        justAVisitor: "फक्त एक अभ्यागत",
        featuresTitle: "तुमची सर्वसमावेशक शेती साधने",
        featurePlantingText: "तुमची पिके लावण्यासाठी सर्वोत्तम वेळेबद्दल अत्यंत-स्थानिक, AI-आधारित शिफारसि मिळवा, ज्यामुळे संभाव्य उत्पन्न वाढते आणि हवामानाशी संबंधित धोके कमी होतात.",
        featureIrrigationText: "वास्तविक हवामान डेटा आणि उपग्रह विश्लेषणावर आधारित, आमचे AI अचूक पाणी देण्याचे वेळापत्रक तयार करते जेकरून पाण्याची बचत होईल आणि तुमची पिके कधीही तहानलेली राहणार नाहीत.",
        featurePestText: "प्रभावित पानाचा फोटो अपलोड करा, आणि आमचे AI समस्येचे निदान करेल, तुमच्या कापणीचे संरक्षण करण्यासाठी त्वरित, कृती करण्यायोग्य उपचार योजना प्रदान करेल.",
        aboutTitle: "ॲग्रीलोकल बद्दल", aboutText: "ॲग्रीलोकलचा जन्म एका साध्या ध्येयातून झाला आहे: स्थानिक शेतकऱ्यांना मोठ्या कृषी कंपन्यांप्रमाणेच प्रगत तंत्रज्ञानाने सक्षम करणे. आम्हाला विश्वास आहे की सुलभ, AI-आधारित अंतर्दृष्टी प्रदान करून, आम्ही आपल्या सर्वांना अन्न पुरवणाऱ्या शेतकरी समुदायांसाठी अधिक टिकाऊ आणि फायदेशीर भविष्य घडविण्यात मदत करू इच्छितो. आमचे प्लॅटफॉर्म अंतर्ज्ञानी, अत्यंत-स्थानिक आणि तुमच्या दैनंदिन कामात खरा भागीदार होण्यासाठी डिझाइन केलेले आहे.",
        profileTitle: "तुमचे फार्म प्रोफाइल", mainTitle: "अंतरदृष्टी जोपासा, <br> <span class='text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500'>यश मिळवा.</span>",
        mainSubtitle: "ॲग्रीलोकल हे तुमच्या शेतीसाठी AI सहाय्यक आहे. आम्ही उपग्रह प्रतिमा आणि प्रगत AI वापरून तुम्हाला तुमच्या पिकांसाठी अचूक आणि वेळेवर सल्ला देतो.",
        dashboardTitle: "तुमचा फार्म डॅशबोर्ड", satelliteTitle: "उपग्रह फार्म आढावा", welcomeTitle: "ॲग्रीलोकल मध्ये आपले स्वागत आहे",
        formSubtitle: "वैयक्तिक AI सल्ला मिळवण्यासाठी चला तुमचे फार्म प्रोफाइल सेट करूया.", formNameLabel: "तुमचे नाव", formLocationLabel: "तुमचे स्थान (शहर, राज्य)",
        formCropsLabel: "तुमची मुख्य पिके (स्वल्पविरामाने वेगळी करा)", formSubmitBtn: "माझे प्रोफाइल तयार करा आणि डॅशबोर्ड पहा",
        welcomeUser: (name) => `${name}, आपले स्वागत आहे!`, welcomeUserSubtitle: (location) => `${location} येथील तुमच्या शेताचे नवीनतम विश्लेषण येथे आहे.`,
        welcomeVisitor: "स्वागत, अभ्यागत!", welcomeVisitorSubtitle: "ॲग्रीलोकल प्लॅटफॉर्मची सामान्य माहिती येथे आहे.",
        cardPlantingTitle: "लागवड सल्लागार", cardPlantingSub: "AI-आधारित लागवडीच्या तारखा.", cardIrrigationTitle: "स्मार्ट सिंचन", cardIrrigationSub: "अचूक पाणी देण्याचे वेळापत्रक.",
        cardPestTitle: "कीड निदान", cardPestSub: "विश्लेषणासाठी फोटो अपलोड करा.", cardMarketTitle: "स्थानिक बाजारपेठ", cardMarketSub: "तुमच्या समाजाला उत्पादन विका.",
        satelliteHealthTitle: "शेत आरोग्य विश्लेषण", satelliteHealthSub: "तुमच्या मुख्य पिकांवर आधारित.", fieldStatusHealthy: "निरोगी", fieldStatusModerate: "मध्यम ताण", fieldStatusHigh: "उच्च ताण",
        weatherTitle: "हवामान", loadingWeather: "लोड होत आहे...",
        cropManagementTitle: "पीक व्यवस्थापन", currentCropsTitle: "सध्याची पिके", soilHealthTitle: "माती आरोग्य", upcomingTasksTitle: "आगामी कामे",
        marketInsightsTitle: "बाजार अंतर्दृष्टी", priceTrendsTitle: "किंमत ट्रेंड", localDemandTitle: "स्थानिक मागणी",
        recentActivitiesTitle: "अलीकडील क्रियाकलाप",
        blogsTitle: "महाराष्ट्रातील शेतकरी - ब्लॉग्स"
    }
};


// --- DOM Elements ---
const getStartedBtn = document.getElementById('get-started-btn');
const profileBtn = document.getElementById('profile-btn');
const mobileProfileBtn = document.getElementById('mobile-profile-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const landingPageDiv = document.getElementById('landing-page');
const appContainerDiv = document.getElementById('app-container');
const userGreetingDiv = document.getElementById('user-greeting');
const dashboardContentDiv = document.getElementById('dashboard-content');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const langEnBtn = document.getElementById('lang-en');
const langMrBtn = document.getElementById('lang-mr');
const mainHeader = document.getElementById('main-header');

// --- Core App Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // Universal listeners
    if (langEnBtn) langEnBtn.addEventListener('click', () => switchLanguage('en'));
    if (langMrBtn) langMrBtn.addEventListener('click', () => switchLanguage('mr'));
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    // Mobile menu functionality
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileProfileBtn) {
        mobileProfileBtn.addEventListener('click', () => {
            showUserProfile();
            closeMobileMenu();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });

    // Page-specific initialization
    const pageName = document.location.pathname.split('/').pop();

    if (pageName === 'index.html' || pageName === '') {
        // Landing Page Logic
        if (getStartedBtn) getStartedBtn.addEventListener('click', showProfileForm);
        const mainGetStartedBtn = document.getElementById('main-get-started-btn');
        if (mainGetStartedBtn) mainGetStartedBtn.addEventListener('click', showProfileForm);
        
        const aboutUsBtn = document.getElementById('about-us-btn');
        if (aboutUsBtn) {
            aboutUsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const aboutSection = document.querySelector('#about-us');
                if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        if (profileBtn) profileBtn.classList.add('hidden');
        switchLanguage(currentLang);

    } else if (pageName === 'dashboard.html') {
        // Dashboard Logic
        loadUserData();
        if (profileBtn) profileBtn.addEventListener('click', showUserProfile);
        initializeApp();
        switchLanguage(currentLang); // Apply language after initialization
    } else if (pageName === 'blogs.html') {
        // Blogs Page Logic
        switchLanguage(currentLang);
        initializeSearch(); // Search is on the blogs page too
    }
});


// --- User Data Management ---
function saveUserData() {
    localStorage.setItem('agrilocalUser', JSON.stringify(user));
}

function loadUserData() {
    const storedUser = localStorage.getItem('agrilocalUser');
    if (storedUser) {
        user = JSON.parse(storedUser);
    } else {
        user = { name: '', location: '', crops: [] };
    }
}

// --- Initial UI Setup ---
function showProfileForm() {
    const t = translations[currentLang];
    const formHtml = `
        <p class="text-center text-gray-400 mb-6 font-light">${t.formSubtitle}</p>
        <form id="profile-form" class="space-y-4">
            <div>
                <label for="farmer-name" class="block text-sm font-medium text-gray-300 mb-1">${t.formNameLabel}</label>
                <input type="text" id="farmer-name" name="farmer-name" required class="form-input" placeholder="e.g., Radha More">
            </div>
            <div>
                <label for="farm-location" class="block text-sm font-medium text-gray-300 mb-1">${t.formLocationLabel}</label>
                <input type="text" id="farm-location" name="farm-location" required class="form-input" placeholder="e.g., Palghar, Maharashtra">
            </div>
            <div>
                <label for="farm-crops" class="block text-sm font-medium text-gray-300 mb-1">${t.formCropsLabel}</label>
                <input type="text" id="farm-crops" name="farm-crops" required class="form-input" placeholder="e.g., Rice, Mango, Cashew">
            </div>
            <button type="submit" class="w-full btn btn-primary mt-2">
                ${t.formSubmitBtn}
            </button>
            <button type="button" id="visitor-btn" class="w-full btn btn-ghost mt-4">
                ${t.justAVisitor}
            </button>
        </form>
    `;
    openModal(t.welcomeTitle, formHtml);

    document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);
    document.getElementById('visitor-btn').addEventListener('click', handleVisitorClick);
}

function handleProfileSubmit(e) {
    e.preventDefault();
    user.name = document.getElementById('farmer-name').value.trim();
    user.location = document.getElementById('farm-location').value.trim();
    user.crops = document.getElementById('farm-crops').value.trim().split(',').map(c => c.trim()).filter(Boolean);
    saveUserData();
    closeModal();
    setTimeout(() => window.location.href = 'dashboard.html', 300);
}

function handleVisitorClick() {
    user = { name: '', location: '', crops: [] };
    saveUserData();
    closeModal();
    setTimeout(() => window.location.href = 'dashboard.html', 300);
}

function initializeApp() {
    if (appContainerDiv) appContainerDiv.classList.remove('hidden');
    if (dashboardContentDiv) dashboardContentDiv.classList.remove('hidden');
    if (profileBtn) profileBtn.classList.remove('hidden');
    
    renderDashboard();
    initializeSearch();
    initializeWeatherWidget();
}

function showUserProfile() {
    const t = translations[currentLang];
    const profileHtml = `
        <div class="space-y-4 text-gray-300">
            <div>
                <p class="text-sm font-medium text-gray-400">${t.formNameLabel}</p>
                <p class="text-lg text-white">${user.name || 'N/A'}</p>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-400">${t.formLocationLabel}</p>
                <p class="text-lg text-white">${user.location || 'N/A'}</p>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-400">${t.formCropsLabel}</p>
                <p class="text-lg text-white">${user.crops.length > 0 ? user.crops.join(', ') : 'N/A'}</p>
            </div>
        </div>
    `;
    openModal(t.profileTitle, profileHtml);
}

function renderDashboard() {
    // Note: Event listeners for cards are handled by 'onclick' attributes in dashboard.html
    // This function is now mainly for rendering dynamic content.
    applyTranslations(currentLang);
}

// --- API & Service Functions ---
async function getWeatherData(location) {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_WEATHER_API_KEY") {
        console.warn("Weather API Key not set. Using mock data.");
        return {
            current: { temp_c: 28, humidity: 65, condition: { text: "Partly cloudy" }, wind_kph: 12 },
            forecast: { forecastday: [ {}, { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], day: { avgtemp_c: 29 } }, { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], day: { avgtemp_c: 27 } } ] }
        };
    }
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=3`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not found.');
        return await response.json();
    } catch (error) {
        console.error("Weather API call failed:", error);
        return null;
    }
}

async function callGemini(prompt, imageBase64 = null) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("Gemini API key is missing. Using mock responses.");
        const mockResponses = {
            planting: `# Planting Advice\n- **Crop**: Your Crop\n- **Best Time**: Now`,
            irrigation: `# Irrigation Schedule\n- **Today**: Water deeply.\n- **Tomorrow**: Monitor soil moisture.`,
            pest: `# Pest Diagnosis\n- **Issue**: Looks like a common pest.\n- **Action**: Use organic pesticide.`
        };
        if (prompt.includes('planting')) return mockResponses.planting;
        if (prompt.includes('irrigation')) return mockResponses.irrigation;
        return mockResponses.pest;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const parts = [{ text: prompt }];
    if (imageBase64) {
        parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts }] })
        });
        const data = await response.json();
        if (!response.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
             throw new Error(data?.error?.message || 'Invalid AI response');
        }
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return `<p class="text-red-400">Error: ${error.message}</p>`;
    }
}

// --- Feature Handlers ---
async function handlePlantingAdvisor() {
    const t = translations[currentLang];
    openModal(t.cardPlantingTitle, '<div class="loader"></div>');
    const prompt = `I am a farmer in ${user.location || 'Maharashtra, India'}. My main crops are ${user.crops.join(', ') || 'local staples'}. Provide a simple, actionable planting recommendation for each crop in a clear, structured format using markdown in ${currentLang === 'mr' ? 'Marathi' : 'English'}.`;
    const aiResponse = await callGemini(prompt);
    modalBody.innerHTML = `<div class="prose-output">${marked.parse(aiResponse)}</div>`;
}

async function handleIrrigation() {
    const t = translations[currentLang];
    openModal(t.cardIrrigationTitle, '<div class="loader"></div>');
    const weatherData = await getWeatherData(user.location);
    const weatherInfo = weatherData ? `Current weather: ${weatherData.current.temp_c}°C, ${weatherData.current.condition.text}.` : "Weather data unavailable.";
    const prompt = `As an agricultural AI, create a smart irrigation schedule for a farmer in ${user.location || 'Maharashtra, India'} with crops: ${user.crops.join(', ') || 'local staples'}. ${weatherInfo} Provide a precise, actionable plan for today and tomorrow for each crop in ${currentLang === 'mr' ? 'Marathi' : 'English'}. Use clear markdown.`;
    const aiResponse = await callGemini(prompt);
    modalBody.innerHTML = `<div class="prose-output">${marked.parse(aiResponse)}</div>`;
}

function handlePestDiagnosis() {
    const t = translations[currentLang];
    const body = `
        <p class="text-gray-400 mb-4 font-light">${t.cardPestSub}</p>
        <div class="flex flex-col items-center">
            <input type="file" id="pest-upload" accept="image/*" class="hidden">
            <label for="pest-upload" class="w-full text-center btn btn-primary cursor-pointer">Upload Photo</label>
            <div id="diagnosis-result" class="w-full mt-4"></div>
        </div>
    `;
    openModal(t.cardPestTitle, body);

    document.getElementById('pest-upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];
            document.getElementById('diagnosis-result').innerHTML = '<div class="loader"></div>';
            const prompt = `You are an expert plant pathologist. Analyze this image of a crop leaf from a farm in Maharashtra, India. In ${currentLang === 'mr' ? 'Marathi' : 'English'}, identify the plant and any disease/pest. Provide a diagnosis, confidence score, and a simple, actionable treatment plan using organic or readily available methods. Format the response clearly with markdown.`;
            const aiResponse = await callGemini(prompt, base64Image);
            document.getElementById('diagnosis-result').innerHTML = `<div class="prose-output">${marked.parse(aiResponse)}</div>`;
        };
        reader.readAsDataURL(file);
    });
}

async function handleWeatherWidget() {
    const t = translations[currentLang];
    const location = user.location || 'Mumbai, Maharashtra';
    openModal(t.weatherTitle, '<div class="loader"></div>');
    const weatherData = await getWeatherData(location);

    if (!weatherData) {
        modalBody.innerHTML = `<p>Weather data currently unavailable.</p>`;
        return;
    }

    const { current, forecast } = weatherData;
    const body = `
        <div class="text-gray-300">
            <h4 class="text-xl font-bold text-white mb-4">Weather for ${location}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="glass-card p-4">
                    <h5 class="text-lg font-semibold text-white mb-2">Current</h5>
                    <div class="text-3xl font-bold text-blue-400 mb-2">${Math.round(current.temp_c)}°C</div>
                    <p>${current.condition.text}</p>
                    <p>Humidity: ${current.humidity}%</p>
                </div>
                <div class="glass-card p-4">
                    <h5 class="text-lg font-semibold text-white mb-2">Forecast</h5>
                    ${forecast.forecastday.slice(1, 3).map(day => `
                        <div class="flex justify-between">
                            <span>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span class="text-blue-400">${Math.round(day.day.avgtemp_c)}°C</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    modalBody.innerHTML = body;
}


// --- Language & Translation ---
function applyTranslations(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (typeof t[key] === 'function') {
            // This is a special case for dynamic greetings, handled below
        } else if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    if (document.location.pathname.endsWith('dashboard.html')) {
        if (userGreetingDiv) {
            if (user.name) {
                userGreetingDiv.innerHTML = `<h1 class="text-4xl text-white font-bold">${t.welcomeUser(user.name)}</h1><p class="text-lg text-gray-300 mt-2 font-light">${t.welcomeUserSubtitle(user.location)}</p>`;
            } else {
                userGreetingDiv.innerHTML = `<h1 class="text-4xl text-white font-bold">${t.welcomeVisitor}</h1><p class="text-lg text-gray-300 mt-2 font-light">${t.welcomeVisitorSubtitle}</p>`;
            }
        }
        
        const satelliteAnalysisDiv = document.getElementById('satellite-analysis');
        if (satelliteAnalysisDiv) {
            const fieldStatusMap = {
                Healthy: t.fieldStatusHealthy,
                'Moderate Stress': t.fieldStatusModerate,
                'High Stress': t.fieldStatusHigh,
            };
            satelliteAnalysisDiv.innerHTML = `
                <h3 class="font-bold text-lg text-white">${t.satelliteHealthTitle}</h3>
                <p class="text-sm text-gray-400 mb-4 font-light">${t.satelliteHealthSub}</p>
                <div class="space-y-3">
                    ${user.crops && user.crops.length > 0 ? user.crops.map((crop, i) => {
                        const statusKey = ['Healthy', 'Moderate Stress', 'High Stress'][i % 3];
                        const statusText = fieldStatusMap[statusKey];
                        const colorClass = ['text-green-400', 'text-yellow-400', 'text-red-400'][i % 3];
                        return `
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full ${colorClass.replace('text', 'bg')}-500 border-2 border-slate-900 shadow-md"></div>
                            <span class="text-gray-300">Field ${String.fromCharCode(65 + Math.floor(i/2))}-${i%2 + 1} (${crop}): <strong class="${colorClass} font-medium">${statusText}</strong></span>
                        </div>
                    `}).join('') : `<p class="text-gray-400 font-light">Your crop analysis will appear here.</p>`}
                </div>
            `;
        }
    }
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('agrilocalLang', lang);

    langEnBtn.classList.toggle('active', lang === 'en');
    langMrBtn.classList.toggle('active', lang === 'mr');

    applyTranslations(lang);
}

// --- Modal Control ---
function openModal(title, body) {
    if (!modal) return;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = body;
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
    }, 10);
}

function closeModal() {
    if (!modal) return;
    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// --- Blog & Search ---
const blogData = {
    en: {
        sugarcane: { title: "Sugarcane Farming Guide", content: `# Sugarcane Guide\nDetails on sugarcane...` },
        cotton: { title: "Cotton Cultivation Tips", content: `# Cotton Guide\nDetails on cotton...` },
        soybean: { title: "Soybean Farming in Vidarbha", content: `# Soybean Guide\nDetails on soybean...` },
        pomegranate: { title: "Pomegranate Orchard Management", content: `# Pomegranate Guide\nDetails on pomegranate...` },
        turmeric: { title: "Turmeric Farming Guide", content: `# Turmeric Guide\nDetails on turmeric...` },
        mango: { title: "Mango Cultivation in Konkan", content: `# Mango Guide\nDetails on mango...` }
    },
    mr: {
        sugarcane: { title: "ऊस शेती मार्गदर्शक", content: `# ऊस मार्गदर्शक\nउसाची माहिती...` },
        // ... (add other translated blog stubs)
    }
};

function openBlogModal(blogType) {
    const blog = blogData[currentLang]?.[blogType] || blogData.en[blogType];
    if (!blog) return;
    openModal(blog.title, `<div class="prose-output">${marked.parse(blog.content)}</div>`);
}

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 3) return;

        const results = [];
        const langBlogs = blogData[currentLang] || blogData.en;
        for (const key in langBlogs) {
            const blog = langBlogs[key];
            if (blog.title.toLowerCase().includes(query) || blog.content.toLowerCase().includes(query)) {
                results.push({ ...blog, key });
            }
        }
        
        if(results.length > 0) {
            const resultsHtml = results.map(blog => `
                <div class="mb-2 p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50" onclick="openBlogModal('${blog.key}')">
                    <h3 class="font-semibold text-white">${blog.title}</h3>
                </div>
            `).join('');
            openModal('Search Results', resultsHtml);
        }
    });
}

// --- Weather Widget Specific Functions ---
async function initializeWeatherWidget() {
    const weatherDataDiv = document.getElementById('weather-data');
    if (!weatherDataDiv) return;
    
    const location = user.location || 'Mumbai, Maharashtra';
    const data = await getWeatherData(location);
    
    if (data && data.current) {
        weatherDataDiv.innerHTML = `
            <div class="text-3xl font-bold text-white mb-2">${Math.round(data.current.temp_c)}°C</div>
            <div class="text-sm text-gray-300">${data.current.condition.text}</div>
        `;
    } else {
        weatherDataDiv.innerHTML = `
            <div class="text-3xl font-bold text-white mb-2">--°C</div>
            <div class="text-sm text-gray-300">Unavailable</div>
        `;
    }
}

// --- Mobile Menu Functions ---
function toggleMobileMenu() {
    if (!mobileMenu) return;
    
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    if (!mobileMenu) return;
    
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.remove('opacity-0');
    mobileMenu.classList.remove('scale-95');
    mobileMenu.classList.add('opacity-100');
    mobileMenu.classList.add('scale-100');
    
    // Change hamburger to X
    if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
    }
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    
    mobileMenu.classList.add('opacity-0');
    mobileMenu.classList.add('scale-95');
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.remove('scale-100');
    
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
    
    // Change X back to hamburger
    if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
    }
}