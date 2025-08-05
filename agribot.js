// AgriBot AI Chatbot
const GEMINI_API_KEY = "AIzaSyDoo_0AOtdDM2IV4EREyHTn13Q-5hioQbU";
let currentLang = localStorage.getItem('agrilocalLang') || 'en';
let user = {};

// Language translations
const translations = {
    en: {
        welcome: "Hello! I'm AgriBot, your farming assistant. I can help you with crop recommendations, weather alerts, market prices, and organic farming. You can ask questions in English, Hindi, or Marathi. Use the microphone button for voice input!",
        placeholder: "Ask me about farming...",
        send: "Send",
        online: "Online",
        assistant: "Your farming assistant",
        listening: "Listening...",
        speak: "Speak"
    },
    hi: {
        welcome: "नमस्ते! मैं AgriBot हूं, आपका कृषि सहायक। मैं आपको फसल सिफारिशें, मौसम अलर्ट, बाजार भाव और जैविक खेती में मदद कर सकता हूं। आप हिंदी, अंग्रेजी या मराठी में प्रश्न पूछ सकते हैं। माइक्रोफोन बटन का उपयोग करके आवाज से पूछ सकते हैं!",
        placeholder: "मुझसे खेती के बारे में पूछें...",
        send: "भेजें",
        online: "ऑनलाइन",
        assistant: "आपका कृषि सहायक",
        listening: "सुन रहा हूं...",
        speak: "बोलें"
    },
    mr: {
        welcome: "नमस्कार! मी AgriBot आहे, तुमचा शेती सहाय्यक. मी तुम्हाला पिकांच्या शिफारसी, हवामान सूचना, बाजार भाव आणि सेंद्रिय शेतीबद्दल मदत करू शकतो. तुम्ही मराठी, हिंदी किंवा इंग्रजीत प्रश्न विचारू शकता. मायक्रोफोन बटण वापरून आवाजाने विचारू शकता!",
        placeholder: "मला शेतीबद्दल विचारा...",
        send: "पाठवा",
        online: "ऑनलाइन",
        assistant: "तुमचा शेती सहाय्यक",
        listening: "ऐकत आहे...",
        speak: "बोला"
    }
};

// System prompts for different languages
const systemPrompts = {
    en: `You are AgriBot — the smart farming assistant for AgriLocal.
Your job is to help Indian farmers by giving expert guidance based on AgriLocal's features. You must answer in English.

AgriLocal helps farmers by:
- Recommending best crops for the season
- Giving weather-based alerts
- Helping find local buyers
- Providing market prices
- Answering questions about organic and sustainable farming
- Helping with irrigation and fertilizer suggestions
- Connecting with nearby Krishi Kendras and experts

Be helpful, clear, and culturally aware. Use local terms and examples when relevant. Keep responses concise but informative. Format your responses in a clean, readable way without using markdown formatting like ** or *. Use simple text formatting with clear structure.`,

    hi: `आप AgriBot हैं — AgriLocal के लिए स्मार्ट कृषि सहायक।
आपका काम भारतीय किसानों की AgriLocal की सुविधाओं के आधार पर विशेषज्ञ मार्गदर्शन देकर मदद करना है। आपको हिंदी में जवाब देना चाहिए।

AgriLocal किसानों की मदद करता है:
- मौसम के लिए सर्वोत्तम फसलों की सिफारिश
- मौसम आधारित अलर्ट
- स्थानीय खरीदारों को खोजने में मदद
- बाजार भाव प्रदान करना
- जैविक और टिकाऊ खेती के बारे में प्रश्नों का जवाब
- सिंचाई और उर्वरक सुझावों में मदद
- पास के कृषि केंद्रों और विशेषज्ञों से जुड़ना

सहायक, स्पष्ट और सांस्कृतिक रूप से जागरूक रहें। प्रासंगिक होने पर स्थानीय शब्दों और उदाहरणों का उपयोग करें। अपने जवाब साफ, पठनीय तरीके से प्रारूपित करें, ** या * जैसे मार्कडाउन प्रारूपण का उपयोग न करें। स्पष्ट संरचना के साथ सरल पाठ प्रारूपण का उपयोग करें।`,

    mr: `तुम्ही AgriBot आहात — AgriLocal साठी स्मार्ट शेती सहाय्यक।
तुमचे काम AgriLocal च्या वैशिष्ट्यांवर आधारित तज्ञ मार्गदर्शन देऊन भारतीय शेतकऱ्यांना मदत करणे आहे. तुम्ही मराठीत उत्तर दिले पाहिजे.

AgriLocal शेतकऱ्यांना मदत करते:
- हंगामासाठी सर्वोत्तम पिकांच्या शिफारसी
- हवामान-आधारित सूचना
- स्थानिक खरेदीदार शोधण्यात मदत
- बाजार भाव प्रदान करणे
- सेंद्रिय आणि टिकाऊ शेतीबद्दल प्रश्नांची उत्तरे
- सिंचाई आणि खते सूचनांमध्ये मदत
- जवळच्या कृषी केंद्रांशी आणि तज्ज्ञांशी जोडणे

सहाय्यक, स्पष्ट आणि सांस्कृतिकदृष्ट्या जागरूक रहा. प्रासंगिक असल्यास स्थानिक शब्द आणि उदाहरणे वापरा. तुमची उत्तरे स्वच्छ, वाचनीय पद्धतीने प्रारूपित करा, ** किंवा * सारखे मार्कडाउन प्रारूपण वापरू नका. स्पष्ट संरचनेसह साधे मजकूर प्रारूपण वापरा.`
};

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');
const voiceStatus = document.getElementById('voice-status');
const voiceStatusText = document.getElementById('voice-status-text');
const recordingIndicator = document.getElementById('recording-indicator');
const stopSpeechContainer = document.getElementById('stop-speech-container');
const stopSpeechBtn = document.getElementById('stop-speech-btn');
const langEnBtn = document.getElementById('lang-en');
const langHiBtn = document.getElementById('lang-hi');
const langMrBtn = document.getElementById('lang-mr');

// Voice recognition setup
let recognition = null;
let isListening = false;
let speechSynthesis = window.speechSynthesis;
let isSpeaking = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    setupEventListeners();
    updateLanguageUI();
    updatePlaceholders();
});

function loadUserData() {
    const storedUser = localStorage.getItem('agrilocalUser');
    if (storedUser) {
        user = JSON.parse(storedUser);
    }
}

function setupEventListeners() {
    // Send button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Enter key press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Voice button click
    voiceBtn.addEventListener('click', toggleVoiceInput);
    
    // Language switchers
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    langHiBtn.addEventListener('click', () => switchLanguage('hi'));
    langMrBtn.addEventListener('click', () => switchLanguage('mr'));
    
    // Stop speech button click
    stopSpeechBtn.addEventListener('click', stopSpeech);
    
    // Initialize voice recognition
    initializeVoiceRecognition();
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('agrilocalLang', lang);
    updateLanguageUI();
    updatePlaceholders();
    updateVoiceLanguage();
    
    // Update welcome message
    const welcomeMsg = chatMessages.querySelector('.bot-message');
    if (welcomeMsg) {
        welcomeMsg.querySelector('p').textContent = translations[lang].welcome;
    }
}

function updateLanguageUI() {
    // Update language button states
    langEnBtn.classList.toggle('active', currentLang === 'en');
    langHiBtn.classList.toggle('active', currentLang === 'hi');
    langMrBtn.classList.toggle('active', currentLang === 'mr');
}

function updatePlaceholders() {
    chatInput.placeholder = translations[currentLang].placeholder;
}

// Voice Recognition Functions
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        // Set language based on current selection
        updateVoiceLanguage();
        
        recognition.onstart = () => {
            isListening = true;
            voiceStatus.classList.remove('hidden');
            recordingIndicator.classList.remove('hidden');
            voiceStatusText.textContent = translations[currentLang].listening;
            voiceBtn.classList.add('bg-red-500');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            stopVoiceRecognition();
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceRecognition();
            voiceStatusText.textContent = 'Error: ' + event.error;
        };
        
        recognition.onend = () => {
            stopVoiceRecognition();
        };
    } else {
        voiceBtn.style.display = 'none';
        console.log('Speech recognition not supported');
    }
}

function updateVoiceLanguage() {
    if (recognition) {
        const languageMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'mr': 'mr-IN'
        };
        recognition.lang = languageMap[currentLang] || 'en-US';
    }
}

function toggleVoiceInput() {
    if (isListening) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

function startVoiceRecognition() {
    if (recognition) {
        updateVoiceLanguage();
        recognition.start();
    }
}

function stopVoiceRecognition() {
    if (recognition && isListening) {
        recognition.stop();
        isListening = false;
        voiceStatus.classList.add('hidden');
        recordingIndicator.classList.add('hidden');
        voiceBtn.classList.remove('bg-red-500');
    }
}

// Text-to-Speech function
function speakText(text) {
    if (speechSynthesis) {
        // Stop any ongoing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on current selection
        const languageMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'mr': 'mr-IN'
        };
        utterance.lang = languageMap[currentLang] || 'en-US';
        
        // Set voice properties
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        // Show stop button when speaking starts
        utterance.onstart = () => {
            isSpeaking = true;
            stopSpeechContainer.classList.remove('hidden');
        };
        
        // Hide stop button when speaking ends
        utterance.onend = () => {
            isSpeaking = false;
            stopSpeechContainer.classList.add('hidden');
        };
        
        // Hide stop button if speech is cancelled
        utterance.oncancel = () => {
            isSpeaking = false;
            stopSpeechContainer.classList.add('hidden');
        };
        
        speechSynthesis.speak(utterance);
    }
}

// Stop speech function
function stopSpeech() {
    if (speechSynthesis && isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        stopSpeechContainer.classList.add('hidden');
    }
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Remove typing indicator and add bot response
        removeTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error getting AI response:', error);
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${sender}-message rounded-2xl p-3 sm:p-4 ${sender === 'user' ? 'ml-auto' : 'ml-0'}`;
    
    // Format the text properly (remove markdown formatting)
    const formattedText = formatResponse(text);
    
    const messageText = document.createElement('div');
    messageText.className = 'responsive-text';
    messageText.innerHTML = formattedText;
    messageDiv.appendChild(messageText);
    
    // Add voice button for bot messages
    if (sender === 'bot') {
        const voiceButton = document.createElement('button');
        voiceButton.className = 'mt-2 text-green-400 hover:text-green-300 transition-colors text-xs sm:text-sm';
        voiceButton.innerHTML = `
            <svg class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
            </svg>
            ${translations[currentLang].speak}
        `;
        voiceButton.onclick = () => speakText(text);
        messageDiv.appendChild(voiceButton);
        
        // Auto-speak bot responses (optional - can be disabled)
        // speakText(text);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to format AI responses properly
function formatResponse(text) {
    // Remove markdown formatting and convert to proper HTML
    let formatted = text
        // Remove ** and __ markdown
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        // Remove * and _ markdown
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        // Convert line breaks to <br> tags
        .replace(/\n/g, '<br>')
        // Convert bullet points
        .replace(/^[-*]\s+/gm, '• ')
        // Convert numbered lists
        .replace(/^\d+\.\s+/gm, (match) => `<span class="text-green-400">${match}</span>`)
        // Highlight important terms
        .replace(/(\b(?:crop|crops|weather|price|organic|fertilizer|irrigation|pest|disease)\b)/gi, '<span class="text-green-300">$1</span>');
    
    return formatted;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-bubble bot-message rounded-2xl ml-0 typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function getAIResponse(userMessage) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        // Mock responses for testing
        return getMockResponse(userMessage);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `${systemPrompts[currentLang]}\n\nUser: ${userMessage}\n\nAgriBot:`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });
        
        const data = await response.json();
        
        if (!response.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error(data?.error?.message || 'Invalid AI response');
        }
        
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw error;
    }
}

function getMockResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const lang = currentLang;
    
    // Mock responses based on keywords
    if (message.includes('crop') || message.includes('फसल') || message.includes('पीक')) {
        return lang === 'en' ? 
            "Based on your location and current season, I recommend planting wheat, mustard, and vegetables. These crops are well-suited for the current weather conditions and have good market demand." :
            lang === 'hi' ?
            "आपके स्थान और वर्तमान मौसम के आधार पर, मैं गेहूं, सरसों और सब्जियां लगाने की सिफारिश करता हूं। ये फसलें वर्तमान मौसम की स्थितियों के लिए उपयुक्त हैं और इनकी बाजार में अच्छी मांग है।" :
            "तुमच्या स्थान आणि सध्याच्या हंगामाच्या आधारे, मी गहू, मोहरी आणि भाज्या लावण्याची शिफारस करतो. ही पिके सध्याच्या हवामान परिस्थितीसाठी योग्य आहेत आणि त्यांची बाजारात चांगली मागणी आहे.";
    }
    
    if (message.includes('weather') || message.includes('मौसम') || message.includes('हवामान')) {
        return lang === 'en' ?
            "The weather forecast shows partly cloudy conditions with temperatures between 25-30°C. Light rain is expected in the next 2-3 days. This is good for your crops, but monitor for any fungal diseases." :
            lang === 'hi' ?
            "मौसम पूर्वानुमान आंशिक रूप से बादलों के साथ 25-30°C के तापमान के साथ दिखाता है। अगले 2-3 दिनों में हल्की बारिश की उम्मीद है। यह आपकी फसलों के लिए अच्छा है, लेकिन किसी भी फंगल रोग की निगरानी करें।" :
            "हवामान अंदाज आंशिक ढगाळ परिस्थिती दाखवतो ज्यामध्ये तापमान 25-30°C दरम्यान आहे. पुढच्या 2-3 दिवसांत हलकी पाऊस अपेक्षित आहे. हे तुमच्या पिकांसाठी चांगले आहे, पण कोणत्याही बुरशीजन्य रोगांचे निरीक्षण करा.";
    }
    
    if (message.includes('price') || message.includes('भाव') || message.includes('किंमत')) {
        return lang === 'en' ?
            "Current market prices: Wheat ₹2,450/ton, Rice ₹3,200/ton, Corn ₹1,850/ton. Prices are stable this week. I recommend selling wheat now as prices are expected to remain steady." :
            lang === 'hi' ?
            "वर्तमान बाजार भाव: गेहूं ₹2,450/टन, चावल ₹3,200/टन, मक्का ₹1,850/टन। इस सप्ताह कीमतें स्थिर हैं। मैं अभी गेहूं बेचने की सिफारिश करता हूं क्योंकि कीमतें स्थिर रहने की उम्मीद है।" :
            "सध्याचे बाजार भाव: गहू ₹2,450/टन, भात ₹3,200/टन, मका ₹1,850/टन. या आठवड्यात किंमती स्थिर आहेत. मी आता गहू विकण्याची शिफारस करतो कारण किंमती स्थिर राहण्याची अपेक्षा आहे.";
    }
    
    if (message.includes('organic') || message.includes('जैविक') || message.includes('सेंद्रिय')) {
        return lang === 'en' ?
            "For organic farming, use neem oil for pest control, cow dung and vermicompost for fertilizers, and crop rotation to maintain soil health. These methods are sustainable and improve soil quality over time." :
            lang === 'hi' ?
            "जैविक खेती के लिए, कीट नियंत्रण के लिए नीम का तेल, उर्वरक के लिए गोबर और वर्मीकम्पोस्ट, और मिट्टी के स्वास्थ्य को बनाए रखने के लिए फसल रोटेशन का उपयोग करें। ये तरीके टिकाऊ हैं और समय के साथ मिट्टी की गुणवत्ता में सुधार करते हैं।" :
            "सेंद्रिय शेतीसाठी, कीड नियंत्रणासाठी नीम तेल, खतेसाठी शेण आणि वर्मीकंपोस्ट, आणि मातीचे आरोग्य राखण्यासाठी पीक फेरफार वापरा. हे पद्धती टिकाऊ आहेत आणि कालांतराने मातीची गुणवत्ता सुधारतात.";
    }
    
    // Default response
    return lang === 'en' ?
        "I'm here to help you with farming advice. You can ask me about crops, weather, market prices, organic farming, irrigation, or any other farming-related questions." :
        lang === 'hi' ?
        "मैं आपकी खेती की सलाह में मदद करने के लिए यहां हूं। आप मुझसे फसलों, मौसम, बाजार भाव, जैविक खेती, सिंचाई, या किसी अन्य खेती से संबंधित प्रश्न पूछ सकते हैं।" :
        "मी तुमच्या शेती सल्ल्यात मदत करण्यासाठी येथे आहे. तुम्ही मला पिके, हवामान, बाजार भाव, सेंद्रिय शेती, सिंचाई किंवा इतर कोणत्याही शेती संबंधित प्रश्नांबद्दल विचारू शकता.";
}

// Function to open AgriBot from dashboard
function openAgriBot() {
    window.open('agribot.html', '_blank');
} 