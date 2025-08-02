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
// Elements that might exist on both pages or only on one
const getStartedBtn = document.getElementById('get-started-btn'); // Only on index.html
const profileBtn = document.getElementById('profile-btn'); // Only on dashboard.html
const landingPageDiv = document.getElementById('landing-page'); // Only on index.html
const appContainerDiv = document.getElementById('app-container'); // Only on dashboard.html
const userGreetingDiv = document.getElementById('user-greeting'); // Only on dashboard.html
const dashboardContentDiv = document.getElementById('dashboard-content'); // Only on dashboard.html
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const langEnBtn = document.getElementById('lang-en');
const langMrBtn = document.getElementById('lang-mr');
const mainHeader = document.getElementById('main-header');

// Mobile menu elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');


// --- Core App Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // Universal listeners for language and modal
    if (langEnBtn) langEnBtn.addEventListener('click', () => switchLanguage('en'));
    if (langMrBtn) langMrBtn.addEventListener('click', () => switchLanguage('mr'));
    if (modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) closeModal();
        });
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Header scroll effect (can be on both pages)
    window.addEventListener('scroll', () => {
        // Remove scroll effect for header - only keep revealable animations
        document.querySelectorAll('.revealable').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('visible');
            }
        });
    });

    // Mobile menu toggle listener (can be on both pages)
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.toggle('hidden');
        });
    }

    // Page-specific initialization
    if (document.location.pathname.endsWith('index.html') || document.location.pathname === '/') {
        // Code specific to index.html (landing page)
        if (getStartedBtn) getStartedBtn.addEventListener('click', showProfileForm);
        const mainGetStartedBtn = document.getElementById('main-get-started-btn');
        if (mainGetStartedBtn) mainGetStartedBtn.addEventListener('click', showProfileForm);
        const aboutUsBtn = document.getElementById('about-us-btn');
        if (aboutUsBtn) aboutUsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#about-us').scrollIntoView();
        });
        
        // Hide profile button on landing page
        if (profileBtn) profileBtn.classList.add('hidden');
        if (mobileMenu && mobileMenu.querySelector('#profile-btn')) mobileMenu.querySelector('#profile-btn').classList.add('hidden');
        
        // Ensure language is applied on load
        switchLanguage(currentLang);

    } else if (document.location.pathname.endsWith('dashboard.html')) {
        // Code specific to dashboard.html
        loadUserData(); // Load user data from localStorage
        if (profileBtn) profileBtn.addEventListener('click', showUserProfile);

        // Apply language and render dashboard
        switchLanguage(currentLang);
        initializeApp();
    }
});


// --- User Data Management (using localStorage) ---
function saveUserData() {
    localStorage.setItem('agrilocalUser', JSON.stringify(user));
}

function loadUserData() {
    const storedUser = localStorage.getItem('agrilocalUser');
    if (storedUser) {
        user = JSON.parse(storedUser);
    } else {
        // Default to visitor if no user data
        user = { name: '', location: '', crops: [] };
    }
}


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

    // Add event listeners after modal is opened
    setTimeout(() => {
        const form = document.getElementById('profile-form');
        const visitorBtn = document.getElementById('visitor-btn');
        
        if (form) {
            form.addEventListener('submit', handleProfileSubmit);
        }
        
        if (visitorBtn) {
            visitorBtn.addEventListener('click', handleVisitorClick);
        }
    }, 100);
}

function handleProfileSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('farmer-name').value.trim();
    const location = document.getElementById('farm-location').value.trim();
    const crops = document.getElementById('farm-crops').value.trim();
    
    // Basic validation
    if (!name || !location || !crops) {
        alert('Please fill in all fields');
        return;
    }
    
    user.name = name;
    user.location = location;
    user.crops = crops.split(',').map(crop => crop.trim()).filter(crop => crop.length > 0);
    
    saveUserData(); // Save user data
    closeModal();
    
    // Show success message before redirect
    setTimeout(() => {
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }, 500);
}

function handleVisitorClick() {
    user.name = '';
    user.location = '';
    user.crops = [];
    saveUserData(); // Save visitor status
    closeModal();
    
    // Show success message before redirect
    setTimeout(() => {
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }, 500);
}

function initializeApp() {
    // This function now runs when dashboard.html loads
    const t = translations[currentLang];
    if (user.name && user.location) {
        userGreetingDiv.innerHTML = `<h1 class="text-4xl text-white font-bold">${t.welcomeUser(user.name)}</h1><p class="text-lg text-gray-300 mt-2 font-light">${t.welcomeUserSubtitle(user.location)}</p>`;
    } else {
        userGreetingDiv.innerHTML = `<h1 class="text-4xl text-white font-bold">${t.welcomeVisitor}</h1><p class="text-lg text-gray-300 mt-2 font-light">${t.welcomeVisitorSubtitle}</p>`;
    }
    
    // Ensure dashboard content is visible
    if (appContainerDiv) appContainerDiv.classList.remove('hidden');
    if (dashboardContentDiv) dashboardContentDiv.classList.remove('hidden');
    
    // Show profile button on dashboard
    if (profileBtn) profileBtn.classList.remove('hidden');
    if (mobileMenu && mobileMenu.querySelector('#profile-btn')) mobileMenu.querySelector('#profile-btn').classList.remove('hidden');


    renderDashboard();
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
    // The dashboard.html already has the grid structure, so we don't need to render it
    // Just add event listeners to the existing cards
    const t = translations[currentLang];
    
    // Add event listeners to the existing cards
    const plantingCard = document.getElementById('planting-card');
    const irrigationCard = document.getElementById('irrigation-card');
    const pestCard = document.getElementById('pest-card');
    const weatherCard = document.querySelector('[onclick="handleWeatherWidget()"]');
    
    if (plantingCard) {
        plantingCard.addEventListener('click', handlePlantingAdvisor);
    }
    if (irrigationCard) {
        irrigationCard.addEventListener('click', handleIrrigation);
    }
    if (pestCard) {
        pestCard.addEventListener('click', handlePestDiagnosis);
    }
    if (weatherCard) {
        weatherCard.addEventListener('click', handleWeatherWidget);
    }
    
    const fieldStatusMap = {
        Healthy: t.fieldStatusHealthy,
        'Moderate Stress': t.fieldStatusModerate,
        'High Stress': t.fieldStatusHigh,
    };
    
    document.getElementById('satellite-analysis').innerHTML = `
        <h3 class="font-bold text-lg text-white">${t.satelliteHealthTitle}</h3>
        <p class="text-sm text-gray-400 mb-4 font-light">${t.satelliteHealthSub}</p>
        <div class="space-y-3">
            ${user.crops && user.crops.length > 0 ? user.crops.map((crop, i) => {
                const statusKey = ['Healthy', 'Moderate Stress', 'High Stress'][i % 3];
                const statusText = fieldStatusMap[statusKey];
                return `
                <div class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full ${['bg-green-500', 'bg-yellow-500', 'bg-red-500'][i % 3]} border-2 border-slate-900 shadow-md"></div>
                    <span class="text-gray-300">Field ${String.fromCharCode(65 + Math.floor(i/2))}-${i%2 + 1} (${crop}): <strong class="${['text-green-400', 'text-yellow-400', 'text-red-400'][i % 3]} font-medium">${statusText}</strong></span>
                </div>
            `}).join('') : `<p class="text-gray-400 font-light">Your crop analysis will appear here.</p>`}
        </div>
    `;
    
    document.getElementById('planting-card').addEventListener('click', handlePlantingAdvisor);
    document.getElementById('irrigation-card').addEventListener('click', handleIrrigation);
    document.getElementById('pest-card').addEventListener('click', handlePestDiagnosis);
    document.getElementById('market-card').addEventListener('click', handleMarketplace);
    
    // Initialize weather widget
    initializeWeatherWidget();
    
    // Initialize search functionality
    initializeSearch();
}

// Initialize weather widget with current data
async function initializeWeatherWidget() {
    const weatherDataDiv = document.getElementById('weather-data');
    if (!weatherDataDiv) return;
    
    try {
        const location = user.location || 'Mumbai, Maharashtra';
        const weatherData = await getWeatherData(location);
        
        if (weatherData && weatherData.current) {
            weatherDataDiv.innerHTML = `
                <div class="text-3xl font-bold text-white mb-2">${Math.round(weatherData.current.temp_c)}°C</div>
                <div class="text-sm text-gray-300">${weatherData.current.condition.text}</div>
            `;
        } else {
            weatherDataDiv.innerHTML = `
                <div class="text-3xl font-bold text-white mb-2">--°C</div>
                <div class="text-sm text-gray-300">Weather unavailable</div>
            `;
        }
    } catch (error) {
        weatherDataDiv.innerHTML = `
            <div class="text-3xl font-bold text-white mb-2">--°C</div>
            <div class="text-sm text-gray-300">Weather unavailable</div>
        `;
    }
}

// --- API & Service Functions ---

async function getWeatherData(location) {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_WEATHER_API_KEY") {
        // Return mock weather data when API key is not set
        console.warn("Weather API Key is not set. Using mock data.");
        return {
            current: {
                temp_c: 28,
                humidity: 65,
                condition: { text: "Partly cloudy" },
                wind_kph: 12
            },
            forecast: {
                forecastday: [
                    { date: new Date().toISOString().split('T')[0], day: { avgtemp_c: 26 } },
                    { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], day: { avgtemp_c: 29 } },
                    { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], day: { avgtemp_c: 27 } }
                ]
            }
        };
    }
    
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=3`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
             const errorData = await response.json();
             throw new Error(`Weather data not found or API error: ${errorData.error.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Weather API call failed:", error);
        return null;
    }
}

async function callGemini(prompt, imageBase64 = null) {
     if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        // Return mock AI responses when API key is not set
        console.warn("Gemini API key is missing. Using mock responses.");
        
        const mockResponses = {
            planting: currentLang === 'mr' ? 
                `# लागवड सल्ला

## तुमच्या पिकांसाठी शिफारसी

### भात
- **लागवडीची वेळ**: जून-जुलै
- **अंतर**: 20x15 सेमी
- **खत**: NPK 120:60:60 किलो/हेक्टर

### आंबा
- **लागवडीची वेळ**: जून-जुलै किंवा फेब्रुवारी-मार्च
- **अंतर**: 8x8 मीटर
- **खत**: FYM 20 किलो/झाड

### काजू
- **लागवडीची वेळ**: जून-जुलै
- **अंतर**: 8x8 मीटर
- **खत**: NPK 500:250:250 ग्रॅम/झाड` :
                `# Planting Recommendations

## Recommendations for Your Crops

### Rice
- **Planting Time**: June-July
- **Spacing**: 20x15 cm
- **Fertilizer**: NPK 120:60:60 kg/ha

### Mango
- **Planting Time**: June-July or February-March
- **Spacing**: 8x8 meters
- **Fertilizer**: FYM 20 kg/tree

### Cashew
- **Planting Time**: June-July
- **Spacing**: 8x8 meters
- **Fertilizer**: NPK 500:250:250 grams/tree`,
            
            irrigation: currentLang === 'mr' ?
                `# स्मार्ट सिंचन वेळापत्रक

## आजचे सल्ले

### भात शेत
- **सिंचन वेळ**: सकाळी 6-8 वाजता
- **पाण्याचे प्रमाण**: 5 सेमी खोली
- **कारण**: उच्च तापमान, कमी आर्द्रता

### आंबा बाग
- **सिंचन वेळ**: संध्याकाळी 5-7 वाजता
- **पाण्याचे प्रमाण**: 40 लिटर/झाड
- **कारण**: फळ विकास टप्पा

## उद्याचे सल्ले
- हलका पाऊस अपेक्षित
- सिंचन कमी करा
- पाणी साठवणूक करा` :
                `# Smart Irrigation Schedule

## Today's Recommendations

### Rice Field
- **Irrigation Time**: 6-8 AM
- **Water Amount**: 5 cm depth
- **Reason**: High temperature, low humidity

### Mango Orchard
- **Irrigation Time**: 5-7 PM
- **Water Amount**: 40 liters/tree
- **Reason**: Fruit development stage

## Tomorrow's Advice
- Light rain expected
- Reduce irrigation
- Conserve water`,
            
            pest: currentLang === 'mr' ?
                `# कीड निदान आणि उपचार

## निदान
**रोग**: बॅक्टेरियल ब्लाइट
**आत्मविश्वास**: 85%

## लक्षणे
- पानांवर तपकिरी ठिपके
- पानांचे काळे पडणे
- वाढ रुकणे

## उपचार योजना
1. **तात्काळ**: नीम तेल 3% स्प्रे
2. **दीर्घकालीन**: कॉपर ऑक्सीक्लोराईड 0.3%
3. **जैविक**: ट्रायकोडर्मा वापर` :
                `# Pest Diagnosis and Treatment

## Diagnosis
**Disease**: Bacterial Blight
**Confidence**: 85%

## Symptoms
- Brown spots on leaves
- Leaf blackening
- Stunted growth

## Treatment Plan
1. **Immediate**: Neem oil 3% spray
2. **Long-term**: Copper oxychloride 0.3%
3. **Organic**: Use Trichoderma`
        };
        
        // Determine response type based on prompt content
        if (prompt.toLowerCase().includes('planting') || prompt.toLowerCase().includes('लागवड')) {
            return mockResponses.planting;
        } else if (prompt.toLowerCase().includes('irrigation') || prompt.toLowerCase().includes('सिंचन')) {
            return mockResponses.irrigation;
        } else {
            return mockResponses.pest;
        }
    }
    
    const model = "gemini-1.5-flash-latest";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    const parts = [{ text: prompt }];
    if (imageBase64) {
        parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
    }

    const payload = {
        contents: [{
            parts: parts
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();

        if (!response.ok) {
            const errorDetails = data?.error?.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorDetails);
        }
        
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            const finishReason = data?.candidates?.[0]?.finishReason;
            if (finishReason === 'SAFETY') {
                 const safetyRatings = JSON.stringify(data?.candidates?.[0]?.safetyRatings, null, 2);
                 throw new Error(`The AI response was blocked for safety reasons. Details: ${safetyRatings}`);
            }
            throw new Error(`Invalid or empty AI response. Finish Reason: ${finishReason || 'Unknown'}.`);
        }
        
        return text;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        return `<p class="text-red-400 font-semibold">Error fetching AI response:</p><p class="text-red-400 text-sm mt-1">${error.message}</p>`;
    }
}

// --- Feature Handlers ---
async function handlePlantingAdvisor() {
    openModal(translations[currentLang].cardPlantingTitle, '<div class="loader"></div>');
    
    let prompt = '';
    if (currentLang === 'mr') {
        prompt = `मी ${user.location} येथील शेतकरी आहे. माझी मुख्य पिके ${user.crops.join(', ')} आहेत. कृपया प्रत्येक पिकासाठी स्पष्ट, संरचित स्वरूपात, मार्कडाउनचा वापर करून लागवडीची सोपी आणि कृती करण्यायोग्य शिफारस द्या.`;
    } else {
        prompt = `I am a farmer in ${user.location}. My main crops are ${user.crops.join(', ')}. Provide a simple, actionable planting recommendation for each crop in a clear, structured format using markdown.`;
    }

    const aiResponse = await callGemini(prompt);
    modalBody.innerHTML = `<div class="prose-output">${marked.parse(aiResponse)}</div>`;
}

async function handleIrrigation() {
    openModal(translations[currentLang].cardIrrigationTitle, '<div class="loader"></div>');
    
    const weatherData = await getWeatherData(user.location);
    let weatherInfo = "Current weather data is unavailable.";
    if (weatherData) {
        const current = weatherData.current;
        weatherInfo = `The current weather is ${current.temp_c}°C, ${current.humidity}% humidity, with ${current.condition.text}. The wind is ${current.wind_kph} kph.`;
    }

    let prompt = '';
    if (currentLang === 'mr') {
        prompt = `कृषी AI म्हणून, ${user.location} येथील शेतकऱ्यासाठी ${user.crops.join(', ')} या पिकांसाठी एक स्मार्ट सिंचन वेळापत्रक तयार करा. उपग्रह डेटानुसार एका शेतात 'उच्च ताण' (High Stress) ची चिन्हे दिसत आहेत. ${weatherInfo} कृपया प्रत्येक पिकासाठी आज आणि उद्यासाठी एक अचूक, कृती करण्यायोग्य योजना, स्पष्ट मार्कडाउन शीर्षकांसह प्रदान करा.`;
    } else {
        prompt = `As an agricultural AI, create a smart irrigation schedule for a farmer in ${user.location} with crops: ${user.crops.join(', ')}. One field is showing signs of 'High Stress' according to satellite data. ${weatherInfo} Provide a precise, actionable plan for today and tomorrow for each crop, with clear markdown headings.`;
    }
    
    const aiResponse = await callGemini(prompt);
    modalBody.innerHTML = `<div class="prose-output">${marked.parse(aiResponse)}</div>`;
}

function handlePestDiagnosis() {
    const body = `
        <p class="text-gray-400 mb-4 font-light">Upload a photo of the affected crop leaf for an instant AI analysis.</p>
        <div class="flex flex-col items-center">
            <input type="file" id="pest-upload" accept="image/*" class="hidden">
            <label for="pest-upload" class="w-full text-center btn btn-primary cursor-pointer">Upload Photo</label>
            <div id="diagnosis-result" class="w-full mt-4"></div>
        </div>
    `;
    openModal(translations[currentLang].cardPestTitle, body);

    document.getElementById('pest-upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];
            const resultDiv = document.getElementById('diagnosis-result');
            resultDiv.innerHTML = '<div class="loader"></div>';
            
            let prompt = '';
            if (currentLang === 'mr') {
                prompt = `तुम्ही एक तज्ञ वनस्पती रोग विशेषज्ञ आहात. महाराष्ट्र, भारतातील एका शेतातील पिकाच्या पानाची ही प्रतिमा (image) विश्लेषण करा. वनस्पती आणि त्यात असलेल्या कोणत्याही रोगाचे किंवा किडीचे निदान करा. निदान, आत्मविश्वासाचा स्कोअर आणि एका लहान स्थानिक शेतकऱ्यासाठी योग्य असलेल्या सेंद्रिय किंवा सहज उपलब्ध पद्धती वापरून एक साधी, कृती करण्यायोग्य उपचार योजना प्रदान करा. मार्कडाउन शीर्षकांसह प्रतिसाद स्पष्टपणे स्वरूपित करा.`;
            } else {
                prompt = `You are an expert plant pathologist. Analyze this image of a crop leaf from a farm in Maharashtra, India. Identify the plant and any disease or pest present. Provide a diagnosis, confidence score, and a simple, actionable treatment plan using organic or readily available methods suitable for a small-scale local farmer. Format the response clearly with markdown headings.`;
            }
            
            const aiResponse = await callGemini(prompt, base64Image);
            resultDiv.innerHTML = `<div class="prose-output">${marked.parse(aiResponse)}</div>`;
        };
        reader.readAsDataURL(file);
    });
}

function handleMarketplace() {
    const t = translations[currentLang];
    const userCrops = user.crops && user.crops.length > 0 ? user.crops : ['Rice', 'Wheat', 'Vegetables'];
    
    const body = `
        <div class="text-gray-300">
            <h4 class="text-xl font-bold text-white mb-3">${currentLang === 'mr' ? 'नवीन ऑर्डर्स' : 'New Orders'}</h4>
            <div class="space-y-3">
                 <div class="glass-card p-3 flex justify-between items-center">
                    <p><strong>'Green Leaf Cafe'</strong> ${currentLang === 'mr' ? 'ला हवे आहे' : 'wants'} <strong>5kg ${userCrops[1] || 'Veggies'}</strong></p>
                    <button class="bg-green-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-green-700">${currentLang === 'mr' ? 'स्वीकारा' : 'Accept'}</button>
                 </div>
                 <div class="glass-card p-3 flex justify-between items-center">
                    <p><strong>${currentLang === 'mr' ? 'आशा मेहता' : 'Asha Mehta'}</strong> ${currentLang === 'mr' ? 'ला हवे आहे' : 'wants'} <strong>2kg ${userCrops[2] || 'Greens'}</strong></p>
                    <button class="bg-green-600 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-green-700">${currentLang === 'mr' ? 'स्वीकारा' : 'Accept'}</button>
                 </div>
            </div>
            <h4 class="text-xl font-bold text-white mt-6 mb-3">${currentLang === 'mr' ? 'तुमची सध्याची यादी' : 'Your Current Listings'}</h4>
            <div class="space-y-2 glass-card p-4">
                ${userCrops.map(crop => `<p>${crop} - ₹${(Math.random() * 50 + 30).toFixed(0)} / kg</p>`).join('')}
            </div>
        </div>
    `;
    openModal(t.cardMarketTitle, body);
}

// Weather Widget Handler
async function handleWeatherWidget() {
    const location = user.location || 'Mumbai, Maharashtra';
    const weatherData = await getWeatherData(location);
    
    if (!weatherData || !weatherData.current) {
        openModal(translations[currentLang].weatherTitle, `
            <div class="text-gray-300">
                <p>Weather data is currently unavailable. Please check your API key configuration.</p>
            </div>
        `);
        return;
    }
    
    const current = weatherData.current;
    const forecast = weatherData.forecast?.forecastday || [];
    
    const body = `
        <div class="text-gray-300">
            <h4 class="text-xl font-bold text-white mb-4">Weather for ${location}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="glass-card p-4">
                    <h5 class="text-lg font-semibold text-white mb-2">Current</h5>
                    <div class="text-3xl font-bold text-blue-400 mb-2">${Math.round(current.temp_c)}°C</div>
                    <div class="text-sm">${current.condition.text}</div>
                    <div class="text-sm mt-2">Humidity: ${current.humidity}%</div>
                    <div class="text-sm">Wind: ${current.wind_kph} km/h</div>
                </div>
                <div class="glass-card p-4">
                    <h5 class="text-lg font-semibold text-white mb-2">Forecast</h5>
                    <div class="space-y-2">
                        ${forecast.slice(1, 3).map(day => `
                            <div class="flex justify-between">
                                <span>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                <span class="text-blue-400">${Math.round(day.day.avgtemp_c)}°C</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="mt-4 glass-card p-4">
                <h5 class="text-lg font-semibold text-white mb-2">Farming Impact</h5>
                <p class="text-sm">${getFarmingAdvice(current)}</p>
            </div>
        </div>
    `;
    openModal(translations[currentLang].weatherTitle, body);
}

// Generate farming advice based on weather conditions
function getFarmingAdvice(weather) {
    const temp = weather.temp_c;
    const humidity = weather.humidity;
    const condition = weather.condition.text.toLowerCase();
    
    if (condition.includes('rain')) {
        return "Good conditions for irrigation. Consider reducing manual watering to avoid over-saturation.";
    } else if (temp > 30) {
        return "High temperatures detected. Ensure adequate irrigation and consider shade protection for sensitive crops.";
    } else if (temp < 10) {
        return "Low temperatures may affect crop growth. Monitor frost-sensitive plants and consider protective measures.";
    } else if (humidity > 80) {
        return "High humidity conditions. Watch for fungal diseases and ensure proper ventilation in greenhouses.";
    } else {
        return "Favorable weather conditions for most crops. Continue regular maintenance and monitoring.";
    }
}

// --- Language Switcher Logic ---
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('agrilocalLang', lang); // Save language preference

    const t = translations[lang];

    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });
    
    if (lang === 'en') {
        if (langEnBtn) langEnBtn.classList.add('active');
        if (langMrBtn) langMrBtn.classList.remove('active');
    } else {
        if (langEnBtn) langEnBtn.classList.remove('active');
        if (langMrBtn) langMrBtn.classList.add('active');
    }
    
    // Re-render dashboard content if on dashboard page to apply language changes
    if (document.location.pathname.endsWith('dashboard.html')) {
        initializeApp(); // Re-initialize greeting and dashboard cards
    }
}

// --- Modal Control ---
function openModal(title, body) {
    if (!modal || !modalTitle || !modalBody) {
        console.error("Modal elements not found. Cannot open modal.");
        return;
    }
    modalTitle.innerHTML = title;
    modalBody.innerHTML = body;
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
    }, 10);
}

function closeModal() {
    if (!modal || !modalContent) {
        console.error("Modal elements not found. Cannot close modal.");
        return;
    }
    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// --- Blog Data and Functions ---
const blogData = {
    en: {
        sugarcane: {
            title: "Sugarcane Farming Guide",
            content: `
# Sugarcane Farming Guide for Maharashtra

## Introduction
Sugarcane is one of the most important cash crops in Maharashtra, particularly in the western region. This guide provides comprehensive information for successful sugarcane cultivation.

## Climate Requirements
- **Temperature**: 20-38°C (optimal: 25-30°C)
- **Rainfall**: 1500-2000mm annually
- **Humidity**: 60-80%

## Soil Requirements
- **Type**: Deep, well-drained loamy soil
- **pH**: 6.0-7.5
- **Organic matter**: 1-2%

## Varieties for Maharashtra
1. **Co 86032** - High yielding, drought tolerant
2. **Co 94012** - Early maturing, good ratoon
3. **Co 0212** - High sugar content
4. **Co 0238** - Disease resistant

## Planting Season
- **Spring**: February-March
- **Monsoon**: June-July
- **Autumn**: September-October

## Land Preparation
1. **Plowing**: 2-3 deep plowings
2. **Harrowing**: 2-3 times for fine tilth
3. **Leveling**: Proper land leveling
4. **Furrow preparation**: 90-120cm spacing

## Planting Method
- **Spacing**: 90-120cm between rows
- **Seed rate**: 35,000-40,000 setts/ha
- **Planting depth**: 5-7cm
- **Sett treatment**: 0.1% Bavistin for 10 minutes

## Nutrient Management
### Fertilizer Application (kg/ha)
- **N**: 250-300
- **P2O5**: 60-80
- **K2O**: 100-120

### Application Schedule
- **Basal**: 50% N + 100% P + 50% K
- **Top dressing**: 25% N at 30 DAP
- **Top dressing**: 25% N at 60 DAP

## Irrigation Management
- **Frequency**: Every 7-10 days
- **Method**: Furrow irrigation
- **Critical stages**: Germination, tillering, grand growth
- **Water requirement**: 2000-2500mm

## Weed Management
- **Pre-emergence**: Atrazine 2kg/ha
- **Post-emergence**: 2,4-D 1kg/ha
- **Manual weeding**: 2-3 times

## Pest Management
### Major Pests
1. **Early shoot borer**
   - **Symptoms**: Dead hearts, shot holes
   - **Control**: Carbofuran 3G @ 33kg/ha

2. **Top borer**
   - **Symptoms**: Top drying, side shoots
   - **Control**: Monocrotophos 36EC @ 1.5L/ha

3. **Stem borer**
   - **Symptoms**: Internode tunneling
   - **Control**: Chlorpyriphos 20EC @ 2.5L/ha

## Disease Management
### Major Diseases
1. **Red rot**
   - **Symptoms**: Reddish patches on stem
   - **Control**: Seed treatment, resistant varieties

2. **Wilt**
   - **Symptoms**: Yellowing, wilting
   - **Control**: Crop rotation, soil treatment

3. **Smut**
   - **Symptoms**: Black whip-like structure
   - **Control**: Hot water treatment, resistant varieties

## Harvesting
- **Maturity**: 10-12 months after planting
- **Indicators**: Yellowing of leaves, sweet taste
- **Method**: Manual or mechanical
- **Yield**: 80-120 tons/ha

## Post-Harvest Management
- **Transport**: Within 24 hours
- **Storage**: Cool, dry place
- **Processing**: Within 48 hours

## Economics
- **Cost of cultivation**: ₹80,000-1,00,000/ha
- **Expected yield**: 80-120 tons/ha
- **Gross returns**: ₹1,60,000-2,40,000/ha
- **Net returns**: ₹60,000-1,40,000/ha

## Government Support
- **Subsidies**: 50% on drip irrigation
- **Insurance**: PMFBY coverage
- **Loans**: Kisan Credit Card facility

## Best Practices
1. **Crop rotation**: With pulses/vegetables
2. **Organic farming**: Use of FYM, vermicompost
3. **Precision farming**: GPS-guided operations
4. **Integrated pest management**: Biological control methods

## Market Information
- **Major markets**: Kolhapur, Sangli, Pune
- **Price range**: ₹2,800-3,200/ton
- **Marketing channels**: Sugar mills, jaggery units

This guide is based on research from agricultural universities and successful farming practices in Maharashtra.
        `
    },
    cotton: {
        title: "Cotton Cultivation Tips",
        content: `
# Cotton Cultivation Guide for Maharashtra

## Introduction
Cotton is a major commercial crop in Maharashtra, especially in Vidarbha and Marathwada regions. This guide covers essential aspects of cotton farming.

## Climate Requirements
- **Temperature**: 20-35°C
- **Rainfall**: 600-1200mm
- **Sunshine**: 6-8 hours daily

## Soil Requirements
- **Type**: Black cotton soil, red soil
- **pH**: 6.0-8.0
- **Drainage**: Well-drained

## Popular Varieties
1. **Bt Cotton**: BG-II, BG-III
2. **Desi Cotton**: Suvin, MCU-5
3. **Hybrid**: Bunny, Ankur

## Planting Season
- **Kharif**: June-July
- **Rabi**: January-February

## Land Preparation
- Deep plowing
- Harrowing
- Leveling
- Ridge and furrow system

## Planting
- **Spacing**: 90x60cm
- **Seed rate**: 2-3kg/ha
- **Planting depth**: 3-5cm

## Nutrient Management
- **N**: 60-80kg/ha
- **P2O5**: 30-40kg/ha
- **K2O**: 30-40kg/ha

## Irrigation
- **Frequency**: 7-10 days
- **Critical stages**: Flowering, boll formation
- **Method**: Drip irrigation recommended

## Pest Management
### Major Pests
1. **Bollworm**
2. **Aphids**
3. **Whitefly**
4. **Thrips**

### Control Measures
- **Biological**: Neem oil, neem cake
- **Chemical**: Recommended pesticides
- **Cultural**: Crop rotation, trap crops

## Disease Management
### Common Diseases
1. **Bacterial blight**
2. **Fusarium wilt**
3. **Alternaria leaf spot**

### Control
- Seed treatment
- Resistant varieties
- Crop rotation

## Harvesting
- **Duration**: 150-180 days
- **Method**: Manual picking
- **Yield**: 15-25 quintals/ha

## Economics
- **Cost**: ₹40,000-60,000/ha
- **Returns**: ₹80,000-1,20,000/ha
- **Profit**: ₹20,000-60,000/ha

## Government Schemes
- **PM-KISAN**: ₹6,000/year
- **Crop insurance**: PMFBY
- **Subsidies**: Seeds, fertilizers

## Market Information
- **APMCs**: Major trading centers
- **Price**: ₹5,000-7,000/quintal
- **Export**: International markets

## Best Practices
1. **Integrated Pest Management**
2. **Organic farming methods**
3. **Water conservation**
4. **Soil health management**

## Challenges and Solutions
### Challenges
- **Pest resistance**
- **Climate change**
- **Market fluctuations**

### Solutions
- **Crop diversification**
- **Technology adoption**
- **Market linkages**

This comprehensive guide helps farmers achieve better yields and profitability in cotton cultivation.
        `
    },
    soybean: {
        title: "Soybean Farming in Vidarbha",
        content: `
# Soybean Farming Guide for Vidarbha Region

## Introduction
Soybean is a major oilseed crop in Vidarbha region of Maharashtra. This guide provides detailed information for successful soybean cultivation.

## Climate and Soil
- **Climate**: Tropical to subtropical
- **Temperature**: 20-35°C
- **Rainfall**: 800-1200mm
- **Soil**: Well-drained, loamy soil
- **pH**: 6.0-7.5

## Popular Varieties
1. **JS 335** - High yielding, disease resistant
2. **JS 9560** - Early maturing
3. **MAUS 71** - Drought tolerant
4. **MAUS 81** - High protein content

## Land Preparation
- **Summer plowing**: Deep plowing in May-June
- **Harrowing**: 2-3 times for fine tilth
- **Leveling**: Proper land leveling
- **Ridge preparation**: 45cm spacing

## Planting
- **Season**: June-July (Kharif)
- **Spacing**: 45x10cm
- **Seed rate**: 60-80kg/ha
- **Planting depth**: 3-4cm

## Nutrient Management
### Fertilizer Application
- **N**: 20-25kg/ha
- **P2O5**: 60-80kg/ha
- **K2O**: 40-50kg/ha

### Application Method
- **Basal**: 100% P + 50% K
- **Top dressing**: 100% N at 30 DAP

## Irrigation
- **Critical stages**: Flowering, pod formation
- **Frequency**: 7-10 days
- **Method**: Sprinkler/drip irrigation

## Weed Management
- **Pre-emergence**: Pendimethalin 1kg/ha
- **Post-emergence**: Imazethapyr 100g/ha
- **Manual weeding**: 2-3 times

## Pest Management
### Major Pests
1. **Stem fly**
   - **Damage**: Stem tunneling
   - **Control**: Carbofuran 3G @ 25kg/ha

2. **Leaf miner**
   - **Damage**: Leaf mining
   - **Control**: Monocrotophos 36EC @ 1L/ha

3. **Pod borer**
   - **Damage**: Pod feeding
   - **Control**: Quinalphos 25EC @ 1.5L/ha

## Disease Management
### Major Diseases
1. **Yellow mosaic virus**
   - **Symptoms**: Yellow mosaic on leaves
   - **Control**: Resistant varieties, vector control

2. **Bacterial pustule**
   - **Symptoms**: Brown pustules on leaves
   - **Control**: Copper oxychloride 0.3%

3. **Root rot**
   - **Symptoms**: Root decay, wilting
   - **Control**: Seed treatment, crop rotation

## Harvesting
- **Maturity**: 90-110 days
- **Indicators**: Pods turn yellow, leaves fall
- **Method**: Manual or mechanical
- **Yield**: 15-25 quintals/ha

## Post-Harvest
- **Drying**: Sun drying to 12% moisture
- **Storage**: Clean, dry storage
- **Processing**: Oil extraction, meal production

## Economics
- **Cost of cultivation**: ₹25,000-35,000/ha
- **Expected yield**: 15-25 quintals/ha
- **Gross returns**: ₹45,000-75,000/ha
- **Net returns**: ₹15,000-40,000/ha

## Market Information
### Local Markets
- **Nagpur**: Major trading center
- **Amravati**: Regional market
- **Akola**: Processing hub

### Price Trends
- **Seasonal variation**: ₹3,000-5,000/quintal
- **Quality factors**: Protein content, oil content
- **Market linkages**: Oil mills, exporters

## Government Support
### Schemes
- **PM-KISAN**: Direct benefit transfer
- **PMFBY**: Crop insurance
- **Subsidies**: Seeds, fertilizers, irrigation

### Support Organizations
- **KVK**: Technical guidance
- **ATMA**: Extension services
- **FPOs**: Collective marketing

## Best Practices
### Crop Management
1. **Timely sowing**: June 15-30
2. **Proper spacing**: 45x10cm
3. **Weed control**: Critical first 30 days
4. **Pest monitoring**: Regular field visits

### Technology Adoption
1. **Seed treatment**: Fungicides, biofertilizers
2. **Drip irrigation**: Water use efficiency
3. **Precision farming**: GPS-guided operations
4. **Digital tools**: Weather apps, market apps

### Sustainability
1. **Crop rotation**: With cereals, pulses
2. **Organic farming**: FYM, vermicompost
3. **Soil conservation**: Contour farming
4. **Water management**: Rainwater harvesting

## Challenges and Solutions
### Challenges
- **Climate variability**: Drought, excess rain
- **Pest outbreaks**: Resistance development
- **Market volatility**: Price fluctuations
- **Labor shortage**: Mechanization needed

### Solutions
- **Climate-smart agriculture**: Drought-resistant varieties
- **IPM**: Integrated pest management
- **Market intelligence**: Price forecasting
- **Mechanization**: Farm equipment

## Success Stories
### Case Study 1: Progressive Farmer
- **Location**: Wardha district
- **Area**: 10 hectares
- **Yield**: 28 quintals/ha
- **Innovations**: Drip irrigation, organic farming

### Case Study 2: FPO Success
- **Organization**: Soybean Growers Association
- **Members**: 500 farmers
- **Benefits**: Collective marketing, better prices

## Future Prospects
### Market Opportunities
- **Domestic demand**: Growing oil consumption
- **Export potential**: International markets
- **Value addition**: Processing industries
- **Biofuel**: Alternative energy source

### Technology Trends
- **GM varieties**: Herbicide tolerance
- **Precision agriculture**: IoT, AI
- **Digital platforms**: E-commerce, traceability
- **Climate adaptation**: Resilient varieties

This comprehensive guide provides farmers with practical knowledge for successful soybean cultivation in Vidarbha region.
        `
    },
    pomegranate: {
        title: "Pomegranate Orchard Management",
        content: `
# Pomegranate Orchard Management Guide

## Introduction
Pomegranate is a high-value fruit crop gaining popularity in Maharashtra. This guide covers complete orchard management practices.

## Climate Requirements
- **Temperature**: 15-35°C
- **Rainfall**: 500-800mm
- **Humidity**: 40-60%
- **Altitude**: Up to 1000m

## Soil Requirements
- **Type**: Well-drained, loamy soil
- **pH**: 6.5-7.5
- **Organic matter**: 1-2%
- **Drainage**: Excellent drainage essential

## Popular Varieties
1. **Bhagwa** - High yielding, sweet
2. **Ganesh** - Early maturing
3. **Arakta** - Deep red arils
4. **Mridula** - Soft seeded

## Orchard Establishment
### Site Selection
- **Slope**: Gentle slope preferred
- **Water availability**: Reliable irrigation
- **Market access**: Near urban centers
- **Soil depth**: Minimum 1.5m

### Land Preparation
- **Deep plowing**: 60-90cm
- **Leveling**: Proper land leveling
- **Pit digging**: 60x60x60cm
- **Spacing**: 4x4m or 5x5m

### Planting
- **Season**: June-July or February-March
- **Pit filling**: FYM + soil mixture
- **Planting depth**: Same as nursery
- **Staking**: Bamboo support

## Irrigation Management
### Water Requirements
- **Young plants**: 20-30L/plant/day
- **Bearing plants**: 40-60L/plant/day
- **Critical stages**: Flowering, fruit development

### Irrigation Methods
1. **Drip irrigation**: Most efficient
2. **Sprinkler**: Overhead irrigation
3. **Basin**: Traditional method

### Scheduling
- **Summer**: Every 3-4 days
- **Monsoon**: As needed
- **Winter**: Every 7-10 days

## Nutrient Management
### Fertilizer Schedule
- **Year 1**: 100g N, 50g P, 50g K
- **Year 2**: 200g N, 100g P, 100g K
- **Year 3**: 300g N, 150g P, 150g K
- **Bearing**: 500g N, 250g P, 250g K

### Application Method
- **Basal**: FYM 20kg/plant
- **Top dressing**: Split application
- **Micronutrients**: Foliar application

## Pruning and Training
### Training System
- **Single stem**: Up to 60cm
- **Multiple stems**: 3-4 main branches
- **Bush system**: Natural growth

### Pruning
- **Formative**: First 2-3 years
- **Maintenance**: Annual pruning
- **Fruit thinning**: Remove excess fruits

## Pest Management
### Major Pests
1. **Fruit borer**
   - **Damage**: Fruit tunneling
   - **Control**: Carbaryl 50WP @ 2g/L

2. **Thrips**
   - **Damage**: Flower and fruit damage
   - **Control**: Imidacloprid 17.8SL @ 0.3ml/L

3. **Mealybug**
   - **Damage**: Sooty mold
   - **Control**: Chlorpyriphos 20EC @ 2ml/L

## Disease Management
### Major Diseases
1. **Bacterial blight**
   - **Symptoms**: Water-soaked lesions
   - **Control**: Copper oxychloride 0.3%

2. **Fruit spot**
   - **Symptoms**: Brown spots on fruits
   - **Control**: Mancozeb 0.25%

3. **Root rot**
   - **Symptoms**: Root decay, wilting
   - **Control**: Trichoderma application

## Harvesting
### Maturity Indicators
- **Color**: Deep red/yellow
- **Sound**: Metallic sound
- **Aril color**: Deep red
- **TSS**: 16-18°Brix

### Harvesting Method
- **Manual**: Hand picking
- **Tools**: Secateurs, ladders
- **Timing**: Morning hours
- **Handling**: Careful to avoid damage

## Post-Harvest Management
### Grading
- **Size**: Large, medium, small
- **Color**: Deep red, light red
- **Quality**: Blemish-free

### Storage
- **Temperature**: 5-7°C
- **Humidity**: 85-90%
- **Duration**: 2-3 months

### Packaging
- **Material**: Corrugated boxes
- **Size**: 5kg, 10kg
- **Labeling**: Grade, variety, weight

## Economics
### Cost Analysis
- **Establishment**: ₹1,50,000-2,00,000/ha
- **Annual maintenance**: ₹50,000-75,000/ha
- **Total investment**: ₹2,00,000-2,75,000/ha

### Returns
- **Yield**: 15-25 tons/ha
- **Price**: ₹80-120/kg
- **Gross returns**: ₹12,00,000-30,00,000/ha
- **Net returns**: ₹9,25,000-27,25,000/ha

## Market Information
### Domestic Markets
- **Mumbai**: Major consumption center
- **Pune**: Processing hub
- **Delhi**: Export market

### Export Markets
- **UAE**: High demand
- **UK**: Premium market
- **USA**: Growing market

### Price Trends
- **Seasonal**: Peak during festivals
- **Quality**: Premium for Bhagwa
- **Size**: Large fruits fetch higher prices

## Government Support
### Schemes
- **NHM**: 50% subsidy on planting material
- **PMKSY**: Drip irrigation subsidy
- **PMFBY**: Crop insurance

### Support Organizations
- **NHB**: Technical guidance
- **APEDA**: Export promotion
- **KVK**: Extension services

## Best Practices
### Orchard Management
1. **Regular monitoring**: Pest, disease, nutrition
2. **Record keeping**: Operations, yields, costs
3. **Technology adoption**: Drip, fertigation
4. **Quality focus**: Grade A fruits

### Marketing
1. **Brand building**: Own brand
2. **Direct marketing**: Farm to consumer
3. **Value addition**: Juice, arils
4. **Export orientation**: Quality standards

## Challenges and Solutions
### Challenges
- **Climate change**: Temperature extremes
- **Water scarcity**: Irrigation management
- **Labor shortage**: Mechanization
- **Market volatility**: Price fluctuations

### Solutions
- **Climate-smart**: Shade nets, mulching
- **Water efficient**: Drip irrigation
- **Mechanization**: Harvesting tools
- **Market intelligence**: Price forecasting

## Success Stories
### Progressive Farmer Profile
- **Location**: Solapur district
- **Area**: 5 hectares
- **Yield**: 30 tons/ha
- **Innovations**: Drip irrigation, organic farming

### FPO Success
- **Organization**: Pomegranate Growers Association
- **Members**: 200 farmers
- **Benefits**: Collective marketing, better prices

## Future Prospects
### Market Opportunities
- **Domestic growth**: Health consciousness
- **Export potential**: International markets
- **Processing**: Juice, concentrate
- **Value addition**: Arils, powder

### Technology Trends
- **Precision farming**: IoT sensors
- **Automation**: Robotic harvesting
- **Digital platforms**: E-commerce
- **Climate adaptation**: Resilient varieties

This comprehensive guide helps farmers establish and manage profitable pomegranate orchards.
        `
    },
    turmeric: {
        title: "Turmeric Farming Guide",
        content: `
# Organic Turmeric Farming Guide

## Introduction
Turmeric is an important spice crop with medicinal properties. This guide focuses on organic turmeric cultivation for better returns.

## Climate Requirements
- **Temperature**: 20-35°C
- **Rainfall**: 1000-2000mm
- **Humidity**: 70-90%
- **Altitude**: Up to 1200m

## Soil Requirements
- **Type**: Loamy, well-drained
- **pH**: 6.0-7.5
- **Organic matter**: 2-3%
- **Drainage**: Good drainage essential

## Popular Varieties
1. **Sangli turmeric** - High curcumin
2. **Erode local** - Good yield
3. **Salem** - Early maturing
4. **Rajapuri** - Aromatic

## Land Preparation
### Pre-planting
- **Deep plowing**: 30-45cm
- **Harrowing**: 2-3 times
- **Leveling**: Proper land leveling
- **Bed preparation**: 1m wide, 15cm high

### Organic Amendments
- **FYM**: 25-30 tons/ha
- **Vermicompost**: 5-10 tons/ha
- **Neem cake**: 500kg/ha
- **Rock phosphate**: 200kg/ha

## Planting
### Season
- **Main season**: May-June
- **Late season**: July-August

### Method
- **Spacing**: 30x30cm
- **Seed rate**: 2500-3000kg/ha
- **Planting depth**: 5-7cm
- **Rhizome treatment**: Trichoderma

## Irrigation Management
### Water Requirements
- **Germination**: Frequent light irrigation
- **Vegetative**: Every 5-7 days
- **Maturity**: Reduce frequency

### Methods
1. **Drip irrigation**: Most efficient
2. **Sprinkler**: Overhead irrigation
3. **Furrow**: Traditional method

## Nutrient Management
### Organic Fertilizers
- **Basal**: FYM + vermicompost
- **Top dressing**: Neem cake + vermicompost
- **Foliar**: Panchagavya, jeevamrutha

### Application Schedule
- **At planting**: 100% organic manure
- **30 DAP**: 50% top dressing
- **60 DAP**: 50% top dressing

## Weed Management
### Organic Methods
1. **Mulching**: Paddy straw, leaves
2. **Manual weeding**: 2-3 times
3. **Intercropping**: Legumes
4. **Cover crops**: Cowpea, green gram

### Critical Period
- **First 30 days**: Most critical
- **Weed-free period**: 60 days

## Pest Management
### Major Pests
1. **Rhizome scale**
   - **Damage**: Rhizome damage
   - **Control**: Neem oil 3%

2. **Shoot borer**
   - **Damage**: Stem tunneling
   - **Control**: Neem seed kernel extract

3. **Leaf folder**
   - **Damage**: Leaf rolling
   - **Control**: Bacillus thuringiensis

### Organic Control
- **Botanical**: Neem, garlic, chili
- **Biological**: Trichoderma, Beauveria
- **Cultural**: Crop rotation, trap crops

## Disease Management
### Major Diseases
1. **Rhizome rot**
   - **Symptoms**: Soft rot, foul smell
   - **Control**: Trichoderma, crop rotation

2. **Leaf spot**
   - **Symptoms**: Brown spots on leaves
   - **Control**: Copper oxychloride 0.3%

3. **Bacterial wilt**
   - **Symptoms**: Wilting, yellowing
   - **Control**: Healthy seed, soil treatment

### Organic Control
- **Seed treatment**: Trichoderma
- **Soil treatment**: Neem cake
- **Foliar spray**: Panchagavya

## Harvesting
### Maturity Indicators
- **Duration**: 8-9 months
- **Leaf drying**: 75% leaves dry
- **Rhizome color**: Deep yellow
- **Curcumin content**: Peak levels

### Harvesting Method
- **Timing**: Dry weather
- **Method**: Manual digging
- **Tools**: Spade, fork
- **Handling**: Careful to avoid damage

## Post-Harvest Processing
### Cleaning
- **Washing**: Remove soil
- **Grading**: Size-wise separation
- **Drying**: Sun drying

### Processing
- **Boiling**: 45-60 minutes
- **Drying**: 10-15 days
- **Polishing**: Manual or mechanical
- **Packaging**: Clean containers

## Value Addition
### Products
1. **Turmeric powder**: Ground rhizomes
2. **Turmeric oil**: Steam distillation
3. **Curcumin extract**: Solvent extraction
4. **Turmeric paste**: Fresh rhizomes

### Processing Methods
- **Traditional**: Manual processing
- **Modern**: Mechanical processing
- **Quality**: ISO standards

## Economics
### Cost Analysis
- **Land preparation**: ₹15,000/ha
- **Planting material**: ₹75,000/ha
- **Organic inputs**: ₹25,000/ha
- **Labor**: ₹30,000/ha
- **Total cost**: ₹1,45,000/ha

### Returns
- **Yield**: 25-35 tons/ha
- **Price**: ₹8,000-12,000/ton
- **Gross returns**: ₹2,00,000-4,20,000/ha
- **Net returns**: ₹55,000-2,75,000/ha

## Market Information
### Domestic Markets
- **Sangli**: Major trading center
- **Erode**: Processing hub
- **Mumbai**: Export market

### Export Markets
- **USA**: High demand
- **UK**: Premium market
- **UAE**: Growing market

### Price Factors
- **Curcumin content**: Higher content, higher price
- **Color**: Deep yellow preferred
- **Size**: Large rhizomes better
- **Purity**: Organic certification

## Certification
### Organic Certification
- **NPOP**: National Program for Organic Production
- **USDA**: United States Department of Agriculture
- **EU**: European Union standards

### Process
- **Application**: To certification agency
- **Inspection**: Field visits
- **Documentation**: Records maintenance
- **Certification**: Annual renewal

## Government Support
### Schemes
- **PMKSY**: Drip irrigation subsidy
- **NHM**: Planting material subsidy
- **PMFBY**: Crop insurance

### Support Organizations
- **APEDA**: Export promotion
- **KVK**: Technical guidance
- **FPOs**: Collective marketing

## Best Practices
### Organic Farming
1. **Soil health**: Regular organic amendments
2. **Biodiversity**: Mixed cropping
3. **Water conservation**: Mulching, drip
4. **Pest management**: IPM approach

### Quality Management
1. **Good Agricultural Practices**: GAP
2. **Traceability**: From farm to consumer
3. **Documentation**: Complete records
4. **Testing**: Regular quality checks

## Challenges and Solutions
### Challenges
- **Climate change**: Temperature extremes
- **Market access**: Direct marketing
- **Certification**: Cost and process
- **Labor**: Skilled workers

### Solutions
- **Climate adaptation**: Shade nets, mulching
- **Market linkages**: FPOs, cooperatives
- **Certification support**: Government schemes
- **Mechanization**: Labor-saving devices

## Success Stories
### Progressive Farmer
- **Location**: Sangli district
- **Area**: 2 hectares
- **Yield**: 40 tons/ha
- **Innovations**: Organic farming, value addition

### FPO Success
- **Organization**: Turmeric Growers Association
- **Members**: 150 farmers
- **Benefits**: Collective marketing, better prices

## Future Prospects
### Market Opportunities
- **Health consciousness**: Growing demand
- **Export potential**: International markets
- **Value addition**: Processing industries
- **Medicinal use**: Pharmaceutical industry

### Technology Trends
- **Precision farming**: IoT, AI
- **Processing**: Modern equipment
- **Marketing**: Digital platforms
- **Quality**: Advanced testing

This comprehensive guide helps farmers adopt organic turmeric farming for sustainable and profitable agriculture.
        `
    },
    mango: {
        title: "Mango Cultivation in Konkan",
        content: `
# Mango Cultivation Guide for Konkan Region

## Introduction
Konkan region of Maharashtra is famous for its Alphonso mangoes. This guide provides comprehensive information for successful mango cultivation.

## Climate Requirements
- **Temperature**: 20-35°C
- **Rainfall**: 2000-3000mm
- **Humidity**: 60-80%
- **Altitude**: Sea level to 300m

## Soil Requirements
- **Type**: Lateritic, well-drained
- **pH**: 6.0-7.5
- **Organic matter**: 1-2%
- **Drainage**: Excellent drainage essential

## Popular Varieties
1. **Alphonso** - King of mangoes, export quality
2. **Kesar** - Sweet, aromatic
3. **Dashehari** - Early maturing
4. **Langra** - Late maturing

## Orchard Establishment
### Site Selection
- **Slope**: Gentle slope preferred
- **Water availability**: Reliable irrigation
- **Market access**: Near ports, cities
- **Soil depth**: Minimum 2m

### Land Preparation
- **Deep plowing**: 60-90cm
- **Leveling**: Proper land leveling
- **Pit digging**: 1x1x1m
- **Spacing**: 8x8m or 10x10m

### Planting
- **Season**: June-July or February-March
- **Pit filling**: FYM + soil mixture
- **Planting depth**: Same as nursery
- **Staking**: Bamboo support

## Irrigation Management
### Water Requirements
- **Young plants**: 30-40L/plant/day
- **Bearing plants**: 50-80L/plant/day
- **Critical stages**: Flowering, fruit development

### Irrigation Methods
1. **Drip irrigation**: Most efficient
2. **Sprinkler**: Overhead irrigation
3. **Basin**: Traditional method

### Scheduling
- **Summer**: Every 3-4 days
- **Monsoon**: As needed
- **Winter**: Every 7-10 days

## Nutrient Management
### Fertilizer Schedule
- **Year 1**: 100g N, 50g P, 50g K
- **Year 2**: 200g N, 100g P, 100g K
- **Year 3**: 300g N, 150g P, 150g K
- **Bearing**: 500g N, 250g P, 250g K

### Application Method
- **Basal**: FYM 20kg/plant
- **Top dressing**: Split application
- **Micronutrients**: Foliar application

## Pruning and Training
### Training System
- **Single stem**: Up to 1m
- **Multiple stems**: 3-4 main branches
- **Bush system**: Natural growth

### Pruning
- **Formative**: First 3-4 years
- **Maintenance**: Annual pruning
- **Fruit thinning**: Remove excess fruits

## Pest Management
### Major Pests
1. **Mango hopper**
   - **Damage**: Flower and fruit damage
   - **Control**: Carbaryl 50WP @ 2g/L

2. **Fruit fly**
   - **Damage**: Fruit tunneling
   - **Control**: Malathion 50EC @ 2ml/L

3. **Mealybug**
   - **Damage**: Sooty mold
   - **Control**: Chlorpyriphos 20EC @ 2ml/L

## Disease Management
### Major Diseases
1. **Anthracnose**
   - **Symptoms**: Black spots on fruits
   - **Control**: Copper oxychloride 0.3%

2. **Powdery mildew**
   - **Symptoms**: White powder on flowers
   - **Control**: Sulfur 0.2%

3. **Bacterial canker**
   - **Symptoms**: Canker on stems
   - **Control**: Streptomycin 0.1%

## Harvesting
### Maturity Indicators
- **Color**: Yellow/orange
- **Firmness**: Slightly soft
- **Aroma**: Sweet smell
- **TSS**: 18-22°Brix

### Harvesting Method
- **Manual**: Hand picking
- **Tools**: Secateurs, ladders
- **Timing**: Morning hours
- **Handling**: Careful to avoid damage

## Post-Harvest Management
### Grading
- **Size**: Large, medium, small
- **Color**: Uniform color
- **Quality**: Blemish-free

### Storage
- **Temperature**: 12-15°C
- **Humidity**: 85-90%
- **Duration**: 2-3 weeks

### Packaging
- **Material**: Corrugated boxes
- **Size**: 5kg, 10kg
- **Labeling**: Grade, variety, weight

## Economics
### Cost Analysis
- **Establishment**: ₹2,00,000-3,00,000/ha
- **Annual maintenance**: ₹75,000-1,00,000/ha
- **Total investment**: ₹2,75,000-4,00,000/ha

### Returns
- **Yield**: 10-20 tons/ha
- **Price**: ₹100-200/kg
- **Gross returns**: ₹10,00,000-40,00,000/ha
- **Net returns**: ₹7,25,000-36,00,000/ha

## Market Information
### Domestic Markets
- **Mumbai**: Major consumption center
- **Pune**: Processing hub
- **Delhi**: Export market

### Export Markets
- **UAE**: High demand
- **UK**: Premium market
- **USA**: Growing market

### Price Trends
- **Seasonal**: Peak during summer
- **Quality**: Premium for Alphonso
- **Size**: Large fruits fetch higher prices

## Government Support
### Schemes
- **NHM**: 50% subsidy on planting material
- **PMKSY**: Drip irrigation subsidy
- **PMFBY**: Crop insurance

### Support Organizations
- **NHB**: Technical guidance
- **APEDA**: Export promotion
- **KVK**: Extension services

## Best Practices
### Orchard Management
1. **Regular monitoring**: Pest, disease, nutrition
2. **Record keeping**: Operations, yields, costs
3. **Technology adoption**: Drip, fertigation
4. **Quality focus**: Grade A fruits

### Marketing
1. **Brand building**: Own brand
2. **Direct marketing**: Farm to consumer
3. **Value addition**: Juice, pulp
4. **Export orientation**: Quality standards

## Challenges and Solutions
### Challenges
- **Climate change**: Temperature extremes
- **Water scarcity**: Irrigation management
- **Labor shortage**: Mechanization
- **Market volatility**: Price fluctuations

### Solutions
- **Climate-smart**: Shade nets, mulching
- **Water efficient**: Drip irrigation
- **Mechanization**: Harvesting tools
- **Market intelligence**: Price forecasting

## Success Stories
### Progressive Farmer Profile
- **Location**: Ratnagiri district
- **Area**: 3 hectares
- **Yield**: 25 tons/ha
- **Innovations**: Drip irrigation, organic farming

### FPO Success
- **Organization**: Mango Growers Association
- **Members**: 300 farmers
- **Benefits**: Collective marketing, better prices

## Future Prospects
### Market Opportunities
- **Domestic growth**: Health consciousness
- **Export potential**: International markets
- **Processing**: Juice, concentrate
- **Value addition**: Pulp, powder

### Technology Trends
- **Precision farming**: IoT sensors
- **Automation**: Robotic harvesting
- **Digital platforms**: E-commerce
- **Climate adaptation**: Resilient varieties

This comprehensive guide helps farmers establish and manage profitable mango orchards in Konkan region.
        `
    }
    },
    mr: {
        sugarcane: {
            title: "ऊस शेती मार्गदर्शक",
            content: `
# महाराष्ट्रातील ऊस शेती मार्गदर्शक

## परिचय
ऊस हे महाराष्ट्रातील सर्वात महत्वाचे रोख पीक आहे, विशेषतः पश्चिम प्रदेशात. हे मार्गदर्शक यशस्वी ऊस लागवडीसाठी सर्वसमावेशक माहिती प्रदान करते.

## हवामान आवश्यकता
- **तापमान**: २०-३८°से (इष्टतम: २५-३०°से)
- **पाऊस**: दरवर्षी १५००-२०००मिमी
- **आर्द्रता**: ६०-८०%

## माती आवश्यकता
- **प्रकार**: खोल, चांगल्या निचऱ्याची वाळूमिश्रित माती
- **pH**: ६.०-७.५
- **सेंद्रिय पदार्थ**: १-२%

## महाराष्ट्रासाठी जाती
१. **Co ८६०३२** - उच्च उत्पादन, दुष्काळ सहनशील
२. **Co ९४०१२** - लवकर पिकणारी, चांगली राटून
३. **Co ०२१२** - उच्च साखर सामग्री
४. **Co ०२३८** - रोग प्रतिरोधक

## लागवडीचा हंगाम
- **वसंत**: फेब्रुवारी-मार्च
- **मान्सून**: जून-जुलै
- **शरद**: सप्टेंबर-ऑक्टोबर

## जमीन तयारी
१. **नांगरणी**: २-३ खोल नांगरणी
२. **हरोइंग**: बारीक मातीसाठी २-३ वेळा
३. **समतल करणे**: योग्य जमीन समतल करणे
४. **नांगर तयारी**: ९०-१२०सेमी अंतर

## लागवड पद्धत
- **अंतर**: पंक्तींमध्ये ९०-१२०सेमी
- **बियाणे दर**: ३५,०००-४०,००० सेट/हेक्टर
- **लागवडीची खोली**: ५-७सेमी
- **सेट उपचार**: १० मिनिटांसाठी ०.१% बाविस्टिन

## पोषण व्यवस्थापन
### खत वापर (किलो/हेक्टर)
- **N**: २५०-३००
- **P2O5**: ६०-८०
- **K2O**: १००-१२०

### वापर कार्यक्रम
- **मूळ**: ५०% N + १००% P + ५०% K
- **वरचे खत**: ३० दिवसांनी २५% N
- **वरचे खत**: ६० दिवसांनी २५% N

## सिंचन व्यवस्थापन
- **वारंवारता**: दर ७-१० दिवसांनी
- **पद्धत**: नांगर सिंचन
- **महत्वाचे टप्पे**: अंकुरण, कुंकू, मोठी वाढ
- **पाण्याची गरज**: २०००-२५००मिमी

## तण व्यवस्थापन
- **पूर्व-उद्भव**: अट्राझिन २किलो/हेक्टर
- **पश्चात-उद्भव**: २,४-डी १किलो/हेक्टर
- **हाताने तण काढणे**: २-३ वेळा

## कीटक व्यवस्थापन
### मुख्य कीटक
१. **लवकर कोंब बोरर**
   - **लक्षणे**: मृत हृदय, छिद्रे
   - **नियंत्रण**: कार्बोफुरान ३जी @ ३३किलो/हेक्टर

२. **शीर्ष बोरर**
   - **लक्षणे**: शीर्ष सुकणे, बाजूचे कोंब
   - **नियंत्रण**: मोनोक्रोटोफॉस ३६ईसी @ १.५लिटर/हेक्टर

३. **खोड बोरर**
   - **लक्षणे**: आंतरखंड टनेलिंग
   - **नियंत्रण**: क्लोरपायरीफॉस २०ईसी @ २.५लिटर/हेक्टर

## रोग व्यवस्थापन
### मुख्य रोग
१. **लाल कुज**
   - **लक्षणे**: खोडावर लाल पट्टे
   - **नियंत्रण**: बियाणे उपचार, प्रतिरोधक जाती

२. **विल्ट**
   - **लक्षणे**: पिवळे पडणे, मुरघळणे
   - **नियंत्रण**: पीक फेरफटका, माती उपचार

३. **काळा कुज**
   - **लक्षणे**: काळी चाबूकासारखी रचना
   - **नियंत्रण**: गरम पाण्याचा उपचार, प्रतिरोधक जाती

## कापणी
- **परिपक्वता**: लागवडीनंतर १०-१२ महिने
- **सूचक**: पाने पिवळे पडणे, गोड चव
- **पद्धत**: हाताने किंवा यंत्राने
- **उत्पादन**: ८०-१२० टन/हेक्टर

## कापणीनंतर व्यवस्थापन
- **वाहतूक**: २४ तासांच्या आत
- **साठवणूक**: थंड, कोरडी जागा
- **प्रक्रिया**: ४८ तासांच्या आत

## अर्थशास्त्र
- **लागवडीचा खर्च**: ₹८०,०००-१,००,०००/हेक्टर
- **अपेक्षित उत्पादन**: ८०-१२० टन/हेक्टर
- **एकूण परतावा**: ₹१,६०,०००-२,४०,०००/हेक्टर
- **निव्वळ परतावा**: ₹६०,०००-१,४०,०००/हेक्टर

## सरकारी सहाय्य
- **सबसिडी**: ड्रिप सिंचनावर ५०%
- **विमा**: पीएमएफबीवाय कव्हरेज
- **कर्ज**: किसान क्रेडिट कार्ड सुविधा

## उत्तम पद्धती
१. **पीक फेरफटका**: डाळी/भाज्यांसह
२. **सेंद्रिय शेती**: रासायनिक खत, वर्मीकंपोस्ट वापर
३. **अचूक शेती**: जीपीएस-मार्गदर्शित कार्ये
४. **एकात्मिक कीटक व्यवस्थापन**: जैविक नियंत्रण पद्धती

## बाजार माहिती
- **मुख्य बाजार**: कोल्हापूर, सांगली, पुणे
- **किंमत श्रेणी**: ₹२,८००-३,२००/टन
- **बाजारीकरण मार्ग**: साखर कारखाने, गुळ युनिट्स

हे मार्गदर्शक महाराष्ट्रातील शेती विद्यापीठांच्या संशोधन आणि यशस्वी शेती पद्धतींवर आधारित आहे.
        `
    }
};

// Blog modal function
function openBlogModal(blogType) {
    const blogLang = localStorage.getItem('agrilocalLang') || 'en';
    const blog = blogData[blogLang]?.[blogType] || blogData.en[blogType];
    if (!blog) return;
    
    const body = `
        <div class="prose-output max-h-[60vh] overflow-y-auto">
            ${marked.parse(blog.content)}
        </div>
    `;
    openModal(blog.title, body);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) return;
        
        // Debounce search
        searchTimeout = setTimeout(() => {
            // Search through blog titles and content
            const searchResults = [];
            Object.keys(blogData).forEach(langKey => {
                Object.keys(blogData[langKey]).forEach(blogKey => {
                    const blog = blogData[langKey][blogKey];
                    if (blog.title.toLowerCase().includes(query) || 
                        blog.content.toLowerCase().includes(query)) {
                        searchResults.push({ ...blog, key: blogKey, lang: langKey });
                    }
                });
            });
            
            // Show search results in a modal
            if (searchResults.length > 0) {
                const resultsHtml = searchResults.slice(0, 5).map(blog => `
                    <div class="mb-4 p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50" onclick="openBlogModal('${blog.key}')">
                        <h3 class="text-lg font-semibold text-white mb-2">${blog.title}</h3>
                        <p class="text-gray-300 text-sm">${blog.content.substring(0, 150)}...</p>
                    </div>
                `).join('');
                
                openModal(currentLang === 'mr' ? 'शोध निकाल' : 'Search Results', `
                    <div class="max-h-[60vh] overflow-y-auto">
                        ${resultsHtml}
                    </div>
                `);
            } else {
                openModal(currentLang === 'mr' ? 'शोध निकाल' : 'Search Results', `
                    <div class="text-center text-gray-400">
                        <p>${currentLang === 'mr' ? 'काहीही सापडले नाही' : 'No results found'}</p>
                    </div>
                `);
            }
        }, 500);
    });
}