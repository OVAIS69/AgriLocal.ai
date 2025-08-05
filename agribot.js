// --- App State & Configuration ---
let user = {}; // Initialize as empty object
let currentLang = localStorage.getItem('agrilocalLang') || 'en'; // Load language preference
const GEMINI_API_KEY = "AIzaSyDoo_0AOtdDM2IV4EREyHTn13Q-5hioQbU"; // Gemini API Key
const WEATHER_API_KEY = "e55e04a5803e45a689c134510252407"; // Weather API Key

// Global error handler for better debugging
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    console.error('Error details:', e.filename, e.lineno, e.colno);
});

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
        cardPestTitle: "Pest Diagnosis", cardPestSub: "Upload a photo for analysis.", cardChatbotTitle: "AgriBot AI", cardChatbotSub: "AI farming assistant", cardMarketTitle: "Local Marketplace", cardMarketSub: "Sell produce to your community.",
        satelliteHealthTitle: "Field Health Analysis", satelliteHealthSub: "Based on your main crops.", fieldStatusHealthy: "Healthy", fieldStatusModerate: "Moderate Stress", fieldStatusHigh: "High Stress",
        weatherTitle: "Weather", loadingWeather: "Loading...",
        cropManagementTitle: "Crop Management", currentCropsTitle: "Current Crops", soilHealthTitle: "Soil Health", upcomingTasksTitle: "Upcoming Tasks",
        marketInsightsTitle: "Market Insights", priceTrendsTitle: "Price Trends", localDemandTitle: "Local Demand",
        recentActivitiesTitle: "Recent Activities",
        blogsTitle: "Farmer in Maharashtra - Blogs",
        farmersDirectory: "Farmers Directory"
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
        cardPestTitle: "कीड निदान", cardPestSub: "विश्लेषणासाठी फोटो अपलोड करा.", cardChatbotTitle: "AgriBot AI", cardChatbotSub: "AI शेती सहाय्यक", cardMarketTitle: "स्थानिक बाजारपेठ", cardMarketSub: "तुमच्या समाजाला उत्पादन विका.",
        satelliteHealthTitle: "शेत आरोग्य विश्लेषण", satelliteHealthSub: "तुमच्या मुख्य पिकांवर आधारित.", fieldStatusHealthy: "निरोगी", fieldStatusModerate: "मध्यम ताण", fieldStatusHigh: "उच्च ताण",
        weatherTitle: "हवामान", loadingWeather: "लोड होत आहे...",
        cropManagementTitle: "पीक व्यवस्थापन", currentCropsTitle: "सध्याची पिके", soilHealthTitle: "माती आरोग्य", upcomingTasksTitle: "आगामी कामे",
        marketInsightsTitle: "बाजार अंतर्दृष्टी", priceTrendsTitle: "किंमत ट्रेंड", localDemandTitle: "स्थानिक मागणी",
        recentActivitiesTitle: "अलीकडील क्रियाकलाप",
        blogsTitle: "महाराष्ट्रातील शेतकरी - ब्लॉग्स",
        farmersDirectory: "शेतकरी निर्देशिका"
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
    // Initialize mobile menu state
    if (mobileMenu) {
        mobileMenu.style.pointerEvents = '';
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.add('opacity-0');
        mobileMenu.classList.add('scale-95');
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.remove('scale-100');
    }
    
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
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    if (mobileProfileBtn) {
        mobileProfileBtn.addEventListener('click', () => {
            showUserProfile();
            closeMobileMenu();
        });
    }
    
    // Mobile menu functionality for index page
    const mobileGetStartedBtn = document.getElementById('mobile-get-started-btn');
    const mobileAboutUsBtn = document.getElementById('mobile-about-us-btn');
    
    if (mobileGetStartedBtn) {
        mobileGetStartedBtn.addEventListener('click', () => {
            showProfileForm();
            closeMobileMenu();
        });
    }
    
    if (mobileAboutUsBtn) {
        mobileAboutUsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about-us');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
            closeMobileMenu();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenuBtn && !mobileMenu.classList.contains('hidden') && 
            !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
    
    // Feedback form functionality
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }

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
    
    // Add event listeners for dashboard cards
    const plantingCard = document.getElementById('planting-card');
    const irrigationCard = document.getElementById('irrigation-card');
    const pestCard = document.getElementById('pest-card');
    const chatbotCard = document.getElementById('chatbot-card');
    
    if (plantingCard) {
        plantingCard.addEventListener('click', handlePlantingAdvisor);
    }
    if (irrigationCard) {
        irrigationCard.addEventListener('click', handleIrrigation);
    }
    if (pestCard) {
        pestCard.addEventListener('click', handlePestDiagnosis);
    }
    if (chatbotCard) {
        chatbotCard.addEventListener('click', openAgriBot);
    }
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
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 86400000);
        const dayAfter = new Date(today.getTime() + 172800000);
        
        return {
            current: { 
                temp_c: 28, 
                humidity: 65, 
                condition: { text: "Partly cloudy" }, 
                wind_kph: 12,
                feelslike_c: 30,
                uv: 6,
                pressure_mb: 1013
            },
            forecast: { 
                forecastday: [ 
                    { 
                        date: today.toISOString().split('T')[0], 
                        day: { 
                            avgtemp_c: 28,
                            maxtemp_c: 32,
                            mintemp_c: 24,
                            condition: { text: "Partly cloudy" },
                            daily_chance_of_rain: 20
                        } 
                    }, 
                    { 
                        date: tomorrow.toISOString().split('T')[0], 
                        day: { 
                            avgtemp_c: 29,
                            maxtemp_c: 33,
                            mintemp_c: 25,
                            condition: { text: "Sunny" },
                            daily_chance_of_rain: 10
                        } 
                    }, 
                    { 
                        date: dayAfter.toISOString().split('T')[0], 
                        day: { 
                            avgtemp_c: 27,
                            maxtemp_c: 31,
                            mintemp_c: 23,
                            condition: { text: "Light rain" },
                            daily_chance_of_rain: 60
                        } 
                    } 
                ] 
            }
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
            planting: `# 🌱 Planting Advice for ${user.location || 'Maharashtra'}

## Recommended Planting Schedule

### Wheat
- **Best Time**: October to November
- **Soil Temperature**: 20-25°C
- **Depth**: 2-3 cm
- **Spacing**: 20-25 cm between rows

### Rice
- **Best Time**: June to July (Kharif)
- **Soil Temperature**: 25-30°C
- **Depth**: 1-2 cm
- **Spacing**: 20 cm between rows

### Corn
- **Best Time**: June to July
- **Soil Temperature**: 18-24°C
- **Depth**: 3-5 cm
- **Spacing**: 60-75 cm between rows

## Tips
- Ensure soil is well-drained
- Add organic compost before planting
- Monitor weather forecasts
- Consider crop rotation for better yield`,
            
            irrigation: `# 💧 Smart Irrigation Schedule

## Today's Schedule

### Wheat Field
- **Time**: 6:00 AM - 8:00 AM
- **Duration**: 2 hours
- **Method**: Drip irrigation
- **Amount**: 15-20 liters per square meter

### Rice Field
- **Time**: 5:00 AM - 7:00 AM
- **Duration**: 2 hours
- **Method**: Flood irrigation
- **Amount**: Maintain 5-7 cm water level

### Corn Field
- **Time**: 6:30 AM - 8:30 AM
- **Duration**: 2 hours
- **Method**: Sprinkler irrigation
- **Amount**: 20-25 liters per square meter

## Tomorrow's Forecast
- **Weather**: Partly cloudy
- **Temperature**: 28°C
- **Humidity**: 65%
- **Recommendation**: Reduce irrigation by 20% due to expected light rain

## Water Conservation Tips
- Use mulching to retain soil moisture
- Install soil moisture sensors
- Water early morning to reduce evaporation
- Monitor weather forecasts regularly`,
            
            pest: `# 🐛 Pest Diagnosis & Treatment

## Identified Issue
**Common Name**: Aphids (Aphidoidea)
**Scientific Name**: Various species
**Severity**: Moderate

## Symptoms
- Curled and yellowing leaves
- Sticky honeydew on leaves
- Stunted plant growth
- Presence of small, soft-bodied insects

## Treatment Plan

### Immediate Action (Today)
1. **Natural Solution**: Mix 1 tablespoon of dish soap with 1 liter of water
2. **Application**: Spray directly on affected areas
3. **Frequency**: Apply twice daily for 3 days

### Organic Treatment (Next 3 Days)
1. **Neem Oil Solution**
   - Mix 2 tablespoons neem oil with 1 liter water
   - Add 1 teaspoon dish soap as emulsifier
   - Spray every evening

2. **Garlic Spray**
   - Crush 4-5 garlic cloves
   - Mix with 1 liter water
   - Let sit for 24 hours
   - Strain and spray

### Prevention (Ongoing)
- Plant companion crops like marigolds
- Encourage beneficial insects (ladybugs, lacewings)
- Regular monitoring of plant health
- Maintain proper plant spacing

## Monitoring
- Check plants daily for 1 week
- Reapply treatment if pests persist
- Document any changes in plant health

## When to Seek Professional Help
- If infestation spreads rapidly
- If plants show severe damage
- If treatment shows no improvement after 1 week`
        };
        
        // Determine which mock response to return based on prompt content
        if (prompt.toLowerCase().includes('planting') || prompt.toLowerCase().includes('plant')) {
            return mockResponses.planting;
        } else if (prompt.toLowerCase().includes('irrigation') || prompt.toLowerCase().includes('water') || prompt.toLowerCase().includes('watering')) {
            return mockResponses.irrigation;
        } else if (prompt.toLowerCase().includes('pest') || prompt.toLowerCase().includes('disease') || prompt.toLowerCase().includes('diagnosis')) {
            return mockResponses.pest;
        }
        
        return mockResponses.planting; // Default fallback
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

function openAgriBot() {
    window.open('agribot.html', '_blank');
}

async function handleWeatherWidget() {
    const t = translations[currentLang];
    const location = user.location || 'Mumbai, Maharashtra';
    openModal(t.weatherTitle, '<div class="loader"></div>');
    const weatherData = await getWeatherData(location);

    if (!weatherData) {
        modalBody.innerHTML = `<p class="text-red-400">Weather data currently unavailable.</p>`;
        return;
    }

    const { current, forecast } = weatherData;
    const body = `
        <div class="text-gray-300">
            <h4 class="text-xl font-bold text-white mb-4">🌤️ Weather for ${location}</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="glass-card p-4">
                    <h5 class="text-lg font-semibold text-white mb-3">Current Conditions</h5>
                    <div class="text-4xl font-bold text-blue-400 mb-2">${Math.round(current.temp_c)}°C</div>
                    <p class="text-lg mb-2">${current.condition.text}</p>
                    <div class="space-y-1 text-sm">
                        <p>Feels like: ${Math.round(current.feelslike_c)}°C</p>
                        <p>Humidity: ${current.humidity}%</p>
                        <p>Wind: ${current.wind_kph} km/h</p>
                        <p>UV Index: ${current.uv}</p>
                        <p>Pressure: ${current.pressure_mb} mb</p>
                    </div>
                </div>
                <div class="glass-card p-4">
                    <h5 class="text-lg font-semibold text-white mb-3">3-Day Forecast</h5>
                    <div class="space-y-3">
                        ${forecast.forecastday.slice(1, 4).map(day => `
                            <div class="flex justify-between items-center p-2 bg-gray-800/30 rounded-lg">
                                <div>
                                    <span class="font-medium">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                    <p class="text-xs text-gray-400">${day.day.condition.text}</p>
                                </div>
                                <div class="text-right">
                                    <span class="text-blue-400 font-bold">${Math.round(day.day.maxtemp_c)}°</span>
                                    <span class="text-gray-400"> / ${Math.round(day.day.mintemp_c)}°</span>
                                    <p class="text-xs text-green-400">${day.day.daily_chance_of_rain}% rain</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="mt-4 glass-card p-4">
                <h5 class="text-lg font-semibold text-white mb-2">🌾 Farming Recommendations</h5>
                <div class="text-sm space-y-1">
                    <p>• ${current.temp_c > 30 ? 'High temperature alert: Consider extra irrigation' : 'Temperature is optimal for most crops'}</p>
                    <p>• ${current.humidity > 70 ? 'High humidity: Monitor for fungal diseases' : 'Humidity levels are good for crop growth'}</p>
                    <p>• ${forecast.forecastday[1].day.daily_chance_of_rain > 50 ? 'Rain expected tomorrow: Reduce irrigation schedule' : 'No significant rain expected: Continue normal irrigation'}</p>
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
        sugarcane: { 
            title: "Sugarcane Farming Guide", 
            content: `# 🌾 Complete Sugarcane Farming Guide for Maharashtra

## Introduction
Sugarcane is one of the most important cash crops in Maharashtra, contributing significantly to the state's agricultural economy. This comprehensive guide covers everything from soil preparation to harvest.

## Climate Requirements
- **Temperature**: 20-38°C (optimal: 25-30°C)
- **Rainfall**: 1500-2000mm annually
- **Humidity**: 70-80% during growth period
- **Sunlight**: Full sun exposure required

## Soil Requirements
- **Type**: Well-drained loamy soil
- **pH**: 6.0-7.5 (slightly acidic to neutral)
- **Depth**: Minimum 45cm
- **Organic Matter**: 2-3%

## Land Preparation
1. **Deep Plowing**: 30-45cm depth
2. **Harrowing**: 2-3 times for fine tilth
3. **Leveling**: Ensure uniform slope
4. **Furrow Preparation**: 90-120cm spacing

## Planting Season
- **Spring Planting**: February-March
- **Autumn Planting**: September-October
- **Best Time**: Early spring for maximum yield

## Seed Selection & Treatment
- **Varieties**: Co 86032, Co 86249, Co 94012
- **Seed Rate**: 35,000-40,000 setts per hectare
- **Sett Size**: 3-4 budded setts
- **Treatment**: Hot water treatment at 52°C for 30 minutes

## Planting Method
1. **Furrow Planting**: Most common method
2. **Spacing**: 90cm between rows, 15cm between setts
3. **Depth**: 5-7cm
4. **Orientation**: Setts placed horizontally

## Irrigation Management
- **Frequency**: Every 7-10 days initially
- **Method**: Furrow irrigation
- **Critical Stages**: Germination, tillering, grand growth
- **Water Requirement**: 2000-2500mm per crop cycle

## Nutrient Management
### Fertilizer Application (per hectare)
- **Nitrogen**: 250-300kg (split application)
- **Phosphorus**: 60-80kg (basal)
- **Potassium**: 120-150kg (basal)
- **Micronutrients**: Zinc, Iron, Boron

### Application Schedule
- **Basal**: 50% N + 100% P + 100% K
- **1st Top Dressing**: 25% N at 30 DAP
- **2nd Top Dressing**: 25% N at 60 DAP

## Weed Management
- **Pre-emergence**: Atrazine @ 2kg/ha
- **Post-emergence**: 2,4-D @ 1kg/ha
- **Manual Weeding**: 2-3 times
- **Critical Period**: First 60 days

## Pest Management
### Major Pests
1. **Sugarcane Borer**
   - **Damage**: Stalk tunneling
   - **Control**: Trichogramma release, carbofuran

2. **White Grub**
   - **Damage**: Root feeding
   - **Control**: Chlorpyriphos soil application

3. **Aphids**
   - **Damage**: Sap sucking
   - **Control**: Imidacloprid spray

## Disease Management
### Major Diseases
1. **Red Rot**
   - **Symptoms**: Reddish lesions on stalks
   - **Control**: Disease-free setts, crop rotation

2. **Wilt**
   - **Symptoms**: Yellowing and wilting
   - **Control**: Soil treatment, resistant varieties

3. **Smut**
   - **Symptoms**: Black whip-like structures
   - **Control**: Hot water treatment, resistant varieties

## Harvesting
- **Maturity**: 10-12 months after planting
- **Indicators**: Yellowing of leaves, sweet taste
- **Method**: Manual or mechanical
- **Timing**: October to March

## Post-Harvest Management
- **Transport**: Within 24 hours
- **Storage**: Cool, dry conditions
- **Processing**: Within 48 hours for best quality

## Yield & Economics
- **Expected Yield**: 80-120 tons per hectare
- **Sugar Recovery**: 10-12%
- **Cost of Cultivation**: ₹80,000-1,00,000 per hectare
- **Net Profit**: ₹40,000-60,000 per hectare

## Government Support
- **Subsidies**: Available for drip irrigation
- **Insurance**: PMFBY coverage
- **Loans**: Priority sector lending
- **Extension Services**: KVK support

## Best Practices
1. **Crop Rotation**: With pulses or oilseeds
2. **Organic Farming**: Use of FYM and green manure
3. **Precision Agriculture**: GPS-guided operations
4. **Water Conservation**: Drip irrigation adoption

## Market Information
- **MSP**: ₹315 per quintal (2023-24)
- **Market Demand**: High domestic and export demand
- **Processing Units**: Sugar mills across Maharashtra
- **Export Potential**: Middle East, Southeast Asia

## Success Tips
- Choose disease-resistant varieties
- Maintain proper spacing for better yield
- Monitor soil moisture regularly
- Adopt integrated pest management
- Keep detailed farm records
- Network with other farmers for knowledge sharing

## Emergency Contacts
- **Agricultural Extension Officer**: Local KVK
- **Pest Control**: State Agriculture Department
- **Market Information**: APMC offices
- **Technical Support**: Sugar mill extension services

*This guide is based on research and farmer experiences in Maharashtra. Always consult local agricultural experts for region-specific advice.*`
        },
        cotton: { 
            title: "Cotton Cultivation Tips", 
            content: `# 🧵 Comprehensive Cotton Cultivation Guide

## Introduction
Cotton is a major commercial crop in Maharashtra, especially in Vidarbha and Marathwada regions. This guide provides detailed information for successful cotton farming.

## Climate & Soil
- **Temperature**: 21-37°C
- **Rainfall**: 600-1200mm
- **Soil**: Black cotton soil, well-drained
- **pH**: 6.0-8.0

## Varieties for Maharashtra
- **BT Cotton**: Bollgard II, Roundup Ready
- **Desi Cotton**: Suvin, MCU-5
- **Hybrid**: RCH-2, RCH-20

## Land Preparation
1. **Summer Plowing**: Deep plowing in May-June
2. **Harrowing**: 2-3 times for fine tilth
3. **Ridge Formation**: 90-120cm spacing

## Planting
- **Season**: June-July (Kharif)
- **Spacing**: 90x60cm
- **Seed Rate**: 1.5-2kg/ha
- **Depth**: 3-5cm

## Irrigation
- **Critical Stages**: Flowering, Boll formation
- **Frequency**: Every 7-10 days
- **Method**: Furrow or drip irrigation

## Nutrient Management
- **N**: 120-150kg/ha
- **P**: 60-80kg/ha  
- **K**: 60-80kg/ha
- **Micronutrients**: Zn, B, Fe

## Pest Management
### Major Pests
- **Bollworm**: Use BT cotton, pheromone traps
- **Aphids**: Imidacloprid spray
- **Whitefly**: Yellow sticky traps

## Harvesting
- **Duration**: 150-180 days
- **Method**: Manual picking
- **Yield**: 15-25 quintals/ha

## Economics
- **Cost**: ₹40,000-60,000/ha
- **Income**: ₹80,000-1,20,000/ha
- **Profit**: ₹30,000-60,000/ha`
        },
        soybean: { 
            title: "Soybean Farming in Vidarbha", 
            content: `# 🟢 Soybean Farming Guide for Vidarbha

## Introduction
Soybean is a major oilseed crop in Vidarbha region, known for its high protein content and market demand.

## Climate Requirements
- **Temperature**: 20-35°C
- **Rainfall**: 600-1000mm
- **Soil**: Well-drained loamy soil
- **pH**: 6.0-7.5

## Popular Varieties
- **JS-335**: High yielding, disease resistant
- **JS-9560**: Early maturing
- **MAUS-71**: Drought tolerant

## Land Preparation
1. **Summer Plowing**: Deep plowing
2. **Harrowing**: Fine tilth preparation
3. **Ridge Formation**: 45cm spacing

## Planting
- **Season**: June-July
- **Spacing**: 45x10cm
- **Seed Rate**: 60-80kg/ha
- **Depth**: 3-4cm

## Irrigation
- **Critical Period**: Flowering to pod filling
- **Method**: Sprinkler or drip
- **Frequency**: As needed

## Nutrient Management
- **N**: 20-25kg/ha
- **P**: 60-80kg/ha
- **K**: 40-60kg/ha
- **Rhizobium**: Seed treatment

## Pest Management
- **Pod Borer**: Spinosad spray
- **Leaf Miner**: Neem oil
- **Aphids**: Imidacloprid

## Harvesting
- **Duration**: 90-110 days
- **Indicators**: Pods turn yellow
- **Method**: Manual or mechanical

## Yield & Economics
- **Yield**: 20-30 quintals/ha
- **Price**: ₹4,000-5,000/quintal
- **Profit**: ₹40,000-80,000/ha`
        },
        pomegranate: { 
            title: "Pomegranate Orchard Management", 
            content: `# 🍎 Pomegranate Orchard Management Guide

## Introduction
Pomegranate is a high-value fruit crop gaining popularity in Maharashtra for its export potential and health benefits.

## Climate & Soil
- **Temperature**: 15-35°C
- **Rainfall**: 500-800mm
- **Soil**: Well-drained, sandy loam
- **pH**: 6.5-7.5

## Varieties
- **Bhagwa**: Most popular, export quality
- **Ganesh**: Sweet, table variety
- **Arakta**: Deep red, high yielding

## Planting
- **Season**: June-July or February-March
- **Spacing**: 4x4m or 5x5m
- **Pit Size**: 60x60x60cm
- **Planting Material**: Grafted saplings

## Irrigation
- **Drip Irrigation**: Recommended
- **Frequency**: Every 3-4 days
- **Critical Stages**: Flowering, fruit development

## Pruning
- **Training**: Modified central leader
- **Pruning**: Annual winter pruning
- **Thinning**: Remove weak branches

## Nutrient Management
- **FYM**: 20-25kg per tree
- **NPK**: 500:250:250g per tree
- **Micronutrients**: Zn, B, Fe

## Pest Management
- **Fruit Borer**: Pheromone traps
- **Thrips**: Spinosad spray
- **Mealybug**: Systemic insecticides

## Harvesting
- **Duration**: 5-6 years to full bearing
- **Season**: February-March, June-July
- **Yield**: 15-25kg per tree

## Post-Harvest
- **Grading**: Size and color
- **Storage**: 5-7°C, 90% RH
- **Packaging**: Export quality boxes

## Economics
- **Investment**: ₹2-3 lakhs per acre
- **Income**: ₹4-6 lakhs per acre
- **Profit**: ₹2-3 lakhs per acre`
        },
        turmeric: { 
            title: "Turmeric Farming Guide", 
            content: `# 🟡 Organic Turmeric Farming Guide

## Introduction
Turmeric is a valuable spice crop with medicinal properties, suitable for organic farming in Maharashtra.

## Climate & Soil
- **Temperature**: 20-35°C
- **Rainfall**: 1000-2000mm
- **Soil**: Sandy loam, well-drained
- **pH**: 6.0-7.5

## Varieties
- **Sangli Turmeric**: High curcumin content
- **Rajapuri**: Bold rhizomes
- **Salem**: High yielding

## Land Preparation
1. **Plowing**: 2-3 times
2. **Ridging**: 45cm spacing
3. **Organic Matter**: FYM 10-15 tons/ha

## Planting
- **Season**: May-June
- **Spacing**: 30x15cm
- **Seed Rate**: 2.5-3 tons/ha
- **Depth**: 5-7cm

## Irrigation
- **Method**: Furrow irrigation
- **Frequency**: Every 7-10 days
- **Critical Period**: Rhizome development

## Organic Management
- **Fertilizers**: FYM, vermicompost
- **Pest Control**: Neem oil, garlic spray
- **Disease Control**: Trichoderma application

## Harvesting
- **Duration**: 8-9 months
- **Indicators**: Leaves turn yellow
- **Method**: Manual digging

## Processing
- **Boiling**: 45-60 minutes
- **Drying**: Sun drying 10-15 days
- **Polishing**: Manual or mechanical

## Yield & Economics
- **Yield**: 25-35 tons/ha (fresh)
- **Price**: ₹8,000-12,000/quintal
- **Profit**: ₹2-3 lakhs/ha`
        },
        mango: { 
            title: "Mango Cultivation in Konkan", 
            content: `# 🥭 Mango Cultivation Guide for Konkan Region

## Introduction
Konkan region is famous for its Alphonso mangoes, known as the 'King of Mangoes' worldwide.

## Climate & Soil
- **Temperature**: 20-35°C
- **Rainfall**: 2000-3000mm
- **Soil**: Lateritic, well-drained
- **pH**: 6.0-7.5

## Varieties
- **Alphonso**: Premium export variety
- **Kesar**: Sweet, aromatic
- **Dashehari**: North Indian variety
- **Langra**: Green skin, sweet

## Planting
- **Season**: June-July
- **Spacing**: 10x10m
- **Pit Size**: 1x1x1m
- **Planting Material**: Grafted plants

## Irrigation
- **Drip System**: Recommended
- **Frequency**: Every 4-5 days
- **Critical Stages**: Flowering, fruit set

## Pruning & Training
- **Training**: Modified central leader
- **Pruning**: After harvest
- **Thinning**: Remove crowded fruits

## Nutrient Management
- **FYM**: 50-100kg per tree
- **NPK**: 1:0.5:1 kg per tree
- **Micronutrients**: Zn, B, Fe

## Pest Management
- **Mango Hopper**: Carbaryl spray
- **Fruit Fly**: Bait traps
- **Powdery Mildew**: Sulfur spray

## Harvesting
- **Duration**: 5-7 years to bearing
- **Season**: March-June
- **Method**: Manual picking

## Post-Harvest
- **Grading**: Size and quality
- **Storage**: 12-15°C
- **Packaging**: Export standards

## Economics
- **Investment**: ₹3-4 lakhs per acre
- **Income**: ₹6-10 lakhs per acre
- **Export Value**: ₹500-1000 per kg

## Market Opportunities
- **Domestic**: Premium markets
- **Export**: Middle East, Europe
- **Processing**: Pulp, juice, pickles`
        }
    },
    mr: {
        sugarcane: { title: "ऊस शेती मार्गदर्शक", content: `# 🌾 महाराष्ट्रातील ऊस शेतीचे संपूर्ण मार्गदर्शक\n\n## परिचय\nऊस हे महाराष्ट्रातील सर्वात महत्वाचे रोख पीक आहे...` },
        cotton: { title: "कापूस लागवड टिप्स", content: `# 🧵 कापूस लागवडीचे संपूर्ण मार्गदर्शक\n\n## परिचय\nकापूस हे महाराष्ट्रातील प्रमुख व्यावसायिक पीक आहे...` },
        soybean: { title: "विदर्भातील सोयाबीन शेती", content: `# 🟢 विदर्भातील सोयाबीन शेती मार्गदर्शक\n\n## परिचय\nसोयाबीन हे विदर्भ प्रदेशातील प्रमुख तेलबिया पीक आहे...` },
        pomegranate: { title: "डाळिंब बाग व्यवस्थापन", content: `# 🍎 डाळिंब बाग व्यवस्थापन मार्गदर्शक\n\n## परिचय\nडाळिंब हे उच्च मूल्याचे फळ पीक आहे...` },
        turmeric: { title: "हळद शेती मार्गदर्शक", content: `# 🟡 सेंद्रिय हळद शेती मार्गदर्शक\n\n## परिचय\nहळद हे औषधी गुणधर्म असलेले मौल्यवान मसाला पीक आहे...` },
        mango: { title: "कोकणातील आंबा लागवड", content: `# 🥭 कोकण प्रदेशातील आंबा लागवड मार्गदर्शक\n\n## परिचय\nकोकण प्रदेश त्याच्या अल्फोन्सो आंब्यांसाठी प्रसिद्ध आहे...` }
    }
};

function openBlogModal(blogType) {
    const blog = blogData[currentLang]?.[blogType] || blogData.en[blogType];
    if (!blog) return;
    
    // Get the image path for the blog
    const imageMap = {
        'sugarcane': 'assets/sugarcane.png',
        'cotton': 'assets/cotton.jpeg',
        'soybean': 'assets/soybean.jpeg',
        'pomegranate': 'assets/pomegranate.jpeg',
        'turmeric': 'assets/turmeric.jpeg',
        'mango': 'assets/mang.jpeg'
    };
    
    const imagePath = imageMap[blogType] || '';
    const imageHtml = imagePath ? `<div class="mb-6"><img src="${imagePath}" alt="${blog.title}" class="w-full h-48 object-cover rounded-lg"></div>` : '';
    
    openModal(blog.title, `${imageHtml}<div class="prose-output">${marked.parse(blog.content)}</div>`);
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
            <div class="text-xs text-gray-400 mt-1">H: ${Math.round(data.current.humidity)}%</div>
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
    
    // Enable pointer events
    mobileMenu.style.pointerEvents = 'auto';
    
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
    
    // Disable pointer events immediately
    mobileMenu.style.pointerEvents = 'none';
    
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
        // Reset pointer events after hiding
        mobileMenu.style.pointerEvents = '';
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

// --- Feedback Form Functions ---
function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const message = document.getElementById('feedback-message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        showFeedbackMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFeedbackMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (in a real app, this would send to a server)
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Reset form
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showFeedbackMessage('Thank you for your feedback! We\'ll get back to you soon.', 'success');
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFeedbackMessage(message, type = 'success') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 z-[102] px-6 py-4 rounded-lg text-white font-medium transition-all duration-300 transform translate-x-full ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    messageDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.classList.add('translate-x-full');
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}
