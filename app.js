document.addEventListener("DOMContentLoaded", function () {
    let isRecording = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const micButton = document.getElementById("micButton");
    const textArea = document.getElementById("text");
    const statusText = document.querySelector(".status");
    const languageSelect = document.getElementById("language");

    // Supported languages
    const languages = {
        "en-US": "English (US)",
        "hi-IN": "Hindi (हिन्दी)",
        "te-IN": "Telugu (తెలుగు)",
        "ta-IN": "Tamil (தமிழ்)",
        "kn-IN": "Kannada (ಕನ್ನಡ)",
        "ml-IN": "Malayalam (മലയാളം)",
        "mr-IN": "Marathi (मराठी)",
        "gu-IN": "Gujarati (ગુજરાતી)",
        "bn-IN": "Bengali (বাংলা)",
        "pa-IN": "Punjabi (ਪੰਜਾਬੀ)",
        "ur-PK": "Urdu (اردو)",
        "fr-FR": "French (Français)",
        "de-DE": "German (Deutsch)",
        "es-ES": "Spanish (Español)",
        "zh-CN": "Chinese (Mandarin)",
        "ja-JP": "Japanese (日本語)",
        "ko-KR": "Korean (한국어)",
        "ar-SA": "Arabic (العربية)",
        "ru-RU": "Russian (Русский)"
    };

    // Populate language dropdown
    for (const [code, name] of Object.entries(languages)) {
        let option = document.createElement("option");
        option.value = code;
        option.textContent = name;
        languageSelect.appendChild(option);
    }

    micButton.addEventListener("click", function () {
        if (!isRecording) {
            recognition.lang = languageSelect.value;
            recognition.start();
            micButton.src = "assets/record-button-thumb.png";
            statusText.textContent = "Listening...";
        } else {
            recognition.stop();
            micButton.src = "assets/mic-1.png";
            statusText.textContent = "Click the mic to start";
        }
        isRecording = !isRecording;
    });

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        textArea.value = transcript;
        console.log("Confidence: " + event.results[0][0].confidence);
    };

    recognition.onerror = function (event) {
        textArea.value = "Error: " + event.error;
        statusText.textContent = "Error occurred!";
        micButton.src = "assets/mic-1.png";
    };
});
