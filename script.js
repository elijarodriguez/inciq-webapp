// FDA-Based Advanced Ingredient Database
const INGREDIENT_DB = {
    "retinol": {
        name: "Retinol",
        category: "Active Ingredient",
        fdaStatus: "Approved for OTC use up to 1%",
        safetyRating: "Caution",
        comedogenicRating: 1,
        badForSkinTypes: ["sensitive"],
        allergens: [],
        conditions: [],
        lactatingWarning: true,
        pregnancyWarning: true,
        sunSensitivity: true,
        warningMsg: "Vitamin A derivative. Avoid during pregnancy/lactation. Increases sun sensitivity.",
        benefits: "Anti-aging, stimulates collagen production, reduces fine lines and wrinkles.",
        mechanism: "Increases cell turnover, stimulates collagen synthesis.",
        synonyms: ["vitamin a", "retinaldehyde", "retinyl palmitate", "retinoic acid", "tretinoin"]
    },
    "salicylic acid": {
        name: "Salicylic Acid",
        category: "Beta Hydroxy Acid (BHA)",
        fdaStatus: "Approved for OTC use up to 2%",
        safetyRating: "Caution",
        comedogenicRating: 0,
        badForSkinTypes: ["dry", "sensitive"],
        allergens: [],
        conditions: ["Acne-prone"],
        lactatingWarning: true,
        pregnancyWarning: true,
        sunSensitivity: false,
        warningMsg: "Consult healthcare provider if pregnant or nursing. May cause dryness.",
        benefits: "Exfoliates, unclogs pores, reduces acne, anti-inflammatory.",
        mechanism: "Oil-soluble, penetrates deep into pores to dissolve excess sebum.",
        synonyms: ["bha", "beta hydroxy acid", "2-hydroxybenzoic acid"]
    },
    "hyaluronic acid": {
        name: "Hyaluronic Acid",
        category: "Humectant",
        fdaStatus: "Generally Recognized as Safe (GRAS)",
        safetyRating: "Safe",
        comedogenicRating: 0,
        badForSkinTypes: [],
        allergens: [],
        conditions: [],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "Generally safe for all skin types. Can hold 1000x its weight in water.",
        benefits: "Intense hydration, plumps skin, reduces appearance of fine lines.",
        mechanism: "Attracts and retains moisture in the skin.",
        synonyms: ["sodium hyaluronate", "hyaluronan", "ha", "sodium hyaluronate"]
    },
    "niacinamide": {
        name: "Niacinamide",
        category: "Vitamin B3",
        fdaStatus: "Generally Recognized as Safe (GRAS)",
        safetyRating: "Safe",
        comedogenicRating: 0,
        badForSkinTypes: [],
        allergens: [],
        conditions: ["Acne-prone"],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "Well-tolerated. May cause mild flushing in high concentrations.",
        benefits: "Reduces inflammation, minimizes pores, improves skin barrier, fades hyperpigmentation.",
        mechanism: "Increases ceramide production, regulates oil, reduces inflammation.",
        synonyms: ["vitamin b3", "nicotinamide", "niacin", "vitamin b3"]
    },
    "vitamin c": {
        name: "Vitamin C (Ascorbic Acid)",
        category: "Antioxidant",
        fdaStatus: "Generally Recognized as Safe (GRAS)",
        safetyRating: "Safe",
        comedogenicRating: 0,
        badForSkinTypes: ["sensitive"],
        allergens: [],
        conditions: [],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "May cause mild tingling. Store in dark container to prevent oxidation.",
        benefits: "Antioxidant protection, brightens skin, boosts collagen, reduces hyperpigmentation.",
        mechanism: "Neutralizes free radicals, inhibits melanin production.",
        synonyms: ["l-ascorbic acid", "ascorbyl palmitate", "sodium ascorbyl phosphate", "tetrahexyldecyl ascorbate", "ascorbic acid"]
    },
    "glycolic acid": {
        name: "Glycolic Acid",
        category: "Alpha Hydroxy Acid (AHA)",
        fdaStatus: "Approved for OTC use up to 10%",
        safetyRating: "Caution",
        comedogenicRating: 0,
        badForSkinTypes: ["sensitive"],
        allergens: [],
        conditions: ["Eczema"],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: true,
        warningMsg: "Increases sun sensitivity. Use SPF. Start with low concentration.",
        benefits: "Exfoliates, improves texture, reduces hyperpigmentation, stimulates collagen.",
        mechanism: "Dissolves dead skin cells, promotes cell turnover.",
        synonyms: ["aha", "alpha hydroxy acid", "hydroxyacetic acid"]
    },
    "benzoyl peroxide": {
        name: "Benzoyl Peroxide",
        category: "Antimicrobial",
        fdaStatus: "Approved for OTC use up to 10%",
        safetyRating: "Caution",
        comedogenicRating: 0,
        badForSkinTypes: ["dry", "sensitive"],
        allergens: ["Benzoyl Peroxide"],
        conditions: ["Acne-prone"],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "May cause dryness, redness, and bleaching of fabrics.",
        benefits: "Kills acne-causing bacteria, reduces inflammation, unclogs pores.",
        mechanism: "Releases oxygen to kill Cutibacterium acnes bacteria.",
        synonyms: ["bp", "benzac", "panoxyl"]
    },
    "fragrance": {
        name: "Fragrance/Parfum",
        category: "Additive",
        fdaStatus: "FDA requires listing as 'fragrance' or 'parfum'",
        safetyRating: "Risk",
        comedogenicRating: 2,
        badForSkinTypes: ["sensitive"],
        allergens: ["Fragrance"],
        conditions: ["Eczema", "Contact Dermatitis"],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "Common allergen. May cause contact dermatitis and irritation.",
        benefits: "Provides scent only, no skincare benefits.",
        mechanism: "Mixture of undisclosed aromatic compounds.",
        synonyms: ["parfum", "perfume", "aroma", "essential oil blend"]
    },
    "alcohol denat": {
        name: "Alcohol Denat (Denatured Alcohol)",
        category: "Solvent",
        fdaStatus: "Approved for use in cosmetics",
        safetyRating: "Risk",
        comedogenicRating: 0,
        badForSkinTypes: ["dry", "sensitive"],
        allergens: ["Alcohol"],
        conditions: ["Eczema"],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "Drying, strips natural oils, may compromise skin barrier.",
        benefits: "Helps products dry quickly, improves texture.",
        mechanism: "Evaporates quickly, removes oils from skin surface.",
        synonyms: ["sd alcohol", "ethyl alcohol", "ethanol", "denatured alcohol", "alcohol"]
    },
    "ceramides": {
        name: "Ceramides",
        category: "Lipid",
        fdaStatus: "Generally Recognized as Safe (GRAS)",
        safetyRating: "Safe",
        comedogenicRating: 1,
        badForSkinTypes: [],
        allergens: [],
        conditions: ["Eczema"],
        lactatingWarning: false,
        pregnancyWarning: false,
        sunSensitivity: false,
        warningMsg: "Excellent for barrier repair. Suitable for sensitive skin.",
        benefits: "Restores skin barrier, locks in moisture, reduces sensitivity.",
        mechanism: "Replenishes natural lipids in the skin barrier.",
        synonyms: ["ceramide np", "ceramide ap", "ceramide eop", "ceramide complex"]
    }
};

// Ingredient Synonyms Mapping
const SYNONYM_MAP = {};
for (const [key, data] of Object.entries(INGREDIENT_DB)) {
    SYNONYM_MAP[key] = key;
    if (data.synonyms) {
        data.synonyms.forEach(syn => {
            SYNONYM_MAP[syn.toLowerCase()] = key;
        });
    }
}

function normalizeIngredient(name) {
    let normalized = name.trim().toLowerCase();
    normalized = normalized.replace(/\(.*?\)/g, '').trim();
    normalized = normalized.replace(/\s+/g, ' ');
    
    if (SYNONYM_MAP[normalized]) {
        return SYNONYM_MAP[normalized];
    }
    
    if (INGREDIENT_DB[normalized]) {
        return normalized;
    }
    
    for (const [key, data] of Object.entries(INGREDIENT_DB)) {
        if (normalized.includes(key) || (data.synonyms && data.synonyms.some(s => normalized.includes(s)))) {
            return key;
        }
    }
    
    return normalized;
}

function analyzeSingleIngredient(ingName, userProfile) {
    const key = normalizeIngredient(ingName);
    const info = INGREDIENT_DB[key] || null;
    
    if (!info) {
        return {
            name: ingName,
            originalName: ingName,
            status: "info",
            statusText: "Unknown",
            reasons: "No FDA information available. Patch test recommended.",
            safetyRating: "Unknown",
            comedogenicRating: "?",
            benefits: "Information not available in database.",
            category: "Unknown",
            fdaStatus: "Not in database"
        };
    }
    
    let isBad = false;
    let reasons = [];
    let riskLevel = "low";
    
    if (info.safetyRating === "Risk") {
        isBad = true;
        riskLevel = "high";
        reasons.push("FDA: Potential irritant or allergen");
    } else if (info.safetyRating === "Caution") {
        isBad = true;
        riskLevel = "medium";
        reasons.push("Use with caution");
    }
    
    if (userProfile.skinType && info.badForSkinTypes.includes(userProfile.skinType)) {
        isBad = true;
        riskLevel = riskLevel === "high" ? "high" : "medium";
        reasons.push(`Not recommended for ${userProfile.skinType} skin`);
    }
    
    if (userProfile.allergies?.length) {
        for (let allergy of userProfile.allergies) {
            if (info.allergens?.includes(allergy)) {
                isBad = true;
                riskLevel = "high";
                reasons.push(`Contains ${allergy} allergen`);
                break;
            }
        }
    }
    
    if (userProfile.conditions?.length) {
        for (let cond of userProfile.conditions) {
            if (info.conditions?.includes(cond)) {
                isBad = true;
                reasons.push(`May exacerbate ${cond}`);
                break;
            }
        }
    }
    
    if (userProfile.isLactating && info.lactatingWarning) {
        isBad = true;
        riskLevel = "high";
        reasons.push("FDA: Avoid during lactation");
    }
    
    let status = "safe";
    if (isBad) {
        status = riskLevel === "high" ? "risk" : "caution";
    }
    
    let statusText = "Safe";
    if (status === "caution") statusText = "Caution";
    if (status === "risk") statusText = "Risk";
    
    let reasonMsg = reasons.join(" · ");
    if (!reasonMsg && info.warningMsg) reasonMsg = info.warningMsg;
    if (!reasonMsg) reasonMsg = "Compatible with your profile";
    
    return {
        name: info.name || ingName,
        originalName: ingName,
        status,
        statusText,
        reasons: reasonMsg,
        safetyRating: info.safetyRating,
        comedogenicRating: info.comedogenicRating,
        benefits: info.benefits,
        mechanism: info.mechanism,
        category: info.category,
        fdaStatus: info.fdaStatus,
        sunSensitivity: info.sunSensitivity
    };
}

function analyzeFullIngredients(ingredientsList, userProfile) {
    const results = [];
    for (let ing of ingredientsList) {
        if (ing.trim() === "") continue;
        results.push(analyzeSingleIngredient(ing, userProfile));
    }
    const badCount = results.filter(r => r.status === "risk" || r.status === "caution").length;
    const goodCount = results.filter(r => r.status === "safe").length;
    return { results, badCount, goodCount };
}

// LocalStorage
let currentUser = null;
let ocrStream = null;
let isCameraActive = false;
let currentTheme = localStorage.getItem('theme') || 'light';
let currentAnalysisResults = [];

function applyTheme() {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
}

function getUsers() {
    const data = localStorage.getItem("inciq_users");
    return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
    localStorage.setItem("inciq_users", JSON.stringify(users));
}

function getScans(username) {
    const scans = localStorage.getItem(`inciq_scans_${username}`);
    return scans ? JSON.parse(scans) : [];
}

function saveScans(username, scans) {
    localStorage.setItem(`inciq_scans_${username}`, JSON.stringify(scans));
}

function addScanToHistory(username, scanEntry) {
    const scans = getScans(username);
    scans.unshift(scanEntry);
    saveScans(username, scans);
}

function registerUser(username, password, profile) {
    let users = getUsers();
    if (users.find(u => u.username === username)) return { success: false, error: "Username already exists" };
    if (password.length < 4) return { success: false, error: "Password must be at least 4 characters" };
    const newUser = {
        username,
        password,
        gender: profile.gender || "other",
        skinType: profile.skinType,
        allergies: profile.allergies || [],
        conditions: profile.conditions || [],
        isLactating: (profile.gender === "female" && profile.isLactating) || false
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true };
}

function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) return { success: true, user: { ...user } };
    return { success: false, error: "Invalid credentials" };
}

// Camera & OCR
async function startCamera() {
    const modal = document.getElementById("cameraModal");
    const video = document.getElementById("ocrVideo");
    
    if (isCameraActive) {
        await stopCamera();
    }
    
    modal.style.display = "block";
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        ocrStream = stream;
        video.srcObject = stream;
        await video.play();
        isCameraActive = true;
    } catch (err) {
        console.error("Camera error", err);
        let errorMessage = "Unable to access camera. ";
        if (err.name === "NotAllowedError") {
            errorMessage += "Please grant camera permission to use this feature.";
        } else if (err.name === "NotFoundError") {
            errorMessage += "No camera found on this device.";
        } else {
            errorMessage += "Please check your camera settings.";
        }
        alert(errorMessage);
        closeCamera();
    }
}

async function stopCamera() {
    if (ocrStream) {
        ocrStream.getTracks().forEach(track => {
            track.stop();
        });
        ocrStream = null;
    }
    const video = document.getElementById("ocrVideo");
    if (video && video.srcObject) {
        video.srcObject = null;
    }
    isCameraActive = false;
}

function closeCamera() {
    stopCamera();
    const cameraModal = document.getElementById("cameraModal");
    if (cameraModal) {
        cameraModal.style.display = "none";
    }
    const loading = document.getElementById("ocrLoading");
    if (loading) loading.style.display = "none";
}

async function captureAndExtract() {
    const video = document.getElementById("ocrVideo");
    if (!video || !video.srcObject || !isCameraActive) {
        alert("Camera is not ready. Please try again.");
        return;
    }
    
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Image preprocessing for better OCR
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Increase contrast
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const enhanced = gray > 128 ? 255 : 0;
        data[i] = enhanced;
        data[i + 1] = enhanced;
        data[i + 2] = enhanced;
    }
    ctx.putImageData(imageData, 0, 0);
    
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.95);
    
    const loading = document.getElementById("ocrLoading");
    loading.style.display = "flex";
    
    try {
        const worker = await Tesseract.createWorker('eng', 1, {
            logger: m => console.log(m),
            errorHandler: err => console.error(err)
        });
        
        await worker.setParameters({
            tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.- ',
            preserve_interword_spaces: '1'
        });
        
        const { data: { text } } = await worker.recognize(imageDataUrl);
        await worker.terminate();
        
        loading.style.display = "none";
        closeCamera();
        
        if (!text || text.trim().length === 0) {
            alert("No text detected. Please ensure good lighting, clear text, and try again.");
            return;
        }
        
        const ingredients = parseIngredientText(text);
        if (ingredients.length === 0) {
            alert("Could not extract ingredients. Please try with better lighting and ensure the ingredient list is clearly visible.");
            return;
        }
        
        openEditModal(ingredients.join(", "));
    } catch (err) {
        console.error("OCR error", err);
        loading.style.display = "none";
        alert("OCR processing failed. Please try again with better lighting and clearer text.");
        closeCamera();
    }
}

function parseIngredientText(text) {
    let cleaned = text
        .replace(/\n/g, ", ")
        .replace(/\r/g, "")
        .replace(/\s+/g, " ")
        .replace(/[^\w\s,.-]/g, '')
        .trim();
    
    const noisePatterns = [
        /ingredients:/gi, /ingredient:/gi, /inci:/gi,
        /net wt/gi, /net weight/gi, /volume/gi, /made in/gi,
        /dermatologically tested/gi, /directions/gi, /warning/gi,
        /caution/gi, /keep out/gi, /store in/gi, /use only/gi,
        /\d+\s*ml/gi, /\d+\s*g/gi, /\d+\s*oz/gi, /\d+\s*fl oz/gi,
        /\([^)]*\)/g, /\[[^\]]*\]/g
    ];
    noisePatterns.forEach(pattern => { cleaned = cleaned.replace(pattern, ""); });
    
    let parts = cleaned.split(/[,;•·\-|/\\]/).map(p => p.trim()).filter(p => p.length > 0 && p.length < 80);
    parts = parts.filter(p => !/^\d+$/.test(p) && !/^\d+\.\d+$/.test(p) && !/^\d+%$/.test(p));
    parts = parts.map(p => p.replace(/^[•·\-|/\\]+/, '').trim());
    parts = parts.filter(p => p.length > 1);
    parts = parts.map(p => p.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '));
    parts = [...new Set(parts)];
    
    return parts.slice(0, 40);
}

function openEditModal(ingredientsString) {
    const modal = document.getElementById("editModal");
    const textarea = document.getElementById("extractedIngredients");
    textarea.value = ingredientsString;
    modal.style.display = "flex";
    setTimeout(() => textarea.focus(), 100);
}

function closeEditModal() {
    const modal = document.getElementById("editModal");
    if (modal) modal.style.display = "none";
}

function closeProfileModal() {
    const modal = document.getElementById("profileModal");
    if (modal) modal.style.display = "none";
}

function closeIngredientModal() {
    const modal = document.getElementById("ingredientModal");
    if (modal) modal.style.display = "none";
}

function closeGlossaryModal() {
    const modal = document.getElementById("glossaryModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function openGlossaryModal() {
    const modal = document.getElementById("glossaryModal");
    if (!modal) {
        console.error("Glossary modal element not found in DOM");
        alert("Glossary modal not found. Please refresh the page.");
        return;
    }
    
    const glossaryList = document.getElementById("glossaryList");
    if (!glossaryList) {
        console.error("Glossary list element not found");
        alert("Glossary list not found. Please refresh the page.");
        return;
    }
    
    // Clear and populate glossary
    glossaryList.innerHTML = '';
    
    // Get all ingredients from database
    const ingredients = Object.values(INGREDIENT_DB);
    
    if (ingredients.length === 0) {
        glossaryList.innerHTML = '<div class="empty-state">No ingredients available</div>';
        modal.style.display = "flex";
        return;
    }
    
    // Sort ingredients alphabetically
    ingredients.sort((a, b) => a.name.localeCompare(b.name));
    
    // Create glossary items
    ingredients.forEach(ingredient => {
        const div = document.createElement('div');
        div.className = 'glossary-item';
        div.innerHTML = `
            <div class="glossary-term">${escapeHtml(ingredient.name)}</div>
            <div class="glossary-category">${escapeHtml(ingredient.category)}</div>
            <div class="glossary-definition">${escapeHtml(ingredient.benefits.substring(0, 100))}${ingredient.benefits.length > 100 ? '...' : ''}</div>
        `;
        
        // Add click handler to show ingredient details
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            closeGlossaryModal(); // Close glossary modal first
            showIngredientInfo({
                name: ingredient.name,
                category: ingredient.category,
                fdaStatus: ingredient.fdaStatus,
                safetyRating: ingredient.safetyRating,
                comedogenicRating: ingredient.comedogenicRating,
                benefits: ingredient.benefits,
                mechanism: ingredient.mechanism,
                reasons: ingredient.warningMsg,
                sunSensitivity: ingredient.sunSensitivity
            });
        });
        
        glossaryList.appendChild(div);
    });
    
    // Show the modal
    modal.style.display = "flex";
}

function showIngredientInfo(ingredient) {
    const modal = document.getElementById("ingredientModal");
    const title = document.getElementById("ingredientModalTitle");
    const body = document.getElementById("ingredientModalBody");
    
    if (!modal || !title || !body) {
        console.error("Ingredient modal elements not found");
        return;
    }
    
    title.textContent = ingredient.name || "Ingredient Information";
    body.innerHTML = `
        <div class="ingredient-detail-card">
            <p><strong>Category:</strong> ${escapeHtml(ingredient.category || 'Unknown')}</p>
            <p><strong>FDA Status:</strong> ${escapeHtml(ingredient.fdaStatus || 'Not specified')}</p>
            <p><strong>Safety Rating:</strong> ${escapeHtml(ingredient.safetyRating || 'Unknown')}</p>
            <p><strong>Comedogenic Rating:</strong> ${ingredient.comedogenicRating || '?'}/5 (0 = non-comedogenic, 5 = highly comedogenic)</p>
            ${ingredient.sunSensitivity ? '<p><strong>⚠️ Sun Sensitivity:</strong> Increases UV sensitivity. Use SPF.</p>' : ''}
            <hr style="margin: 1rem 0; border-color: var(--color-border);">
            <p><strong>Benefits:</strong> ${escapeHtml(ingredient.benefits || 'No information available')}</p>
            <p><strong>Mechanism:</strong> ${escapeHtml(ingredient.mechanism || 'No information available')}</p>
            <p><strong>Safety Notes:</strong> ${escapeHtml(ingredient.reasons || ingredient.warningMsg || 'Generally safe for most users')}</p>
        </div>
    `;
    modal.style.display = "flex";
}

function performAnalysis(ingredientsArray, sourceLabel) {
    if (!currentUser) {
        alert("Please log in to analyze ingredients.");
        return;
    }
    
    if (!ingredientsArray || ingredientsArray.length === 0) {
        alert("No ingredients to analyze.");
        return;
    }
    
    const analysis = analyzeFullIngredients(ingredientsArray, currentUser);
    currentAnalysisResults = analysis.results;
    displayResults(analysis, sourceLabel);
    
    const historyEntry = {
        timestamp: new Date().toISOString(),
        source: sourceLabel,
        goodCount: analysis.goodCount,
        badCount: analysis.badCount,
        details: analysis.results
    };
    addScanToHistory(currentUser.username, historyEntry);
    renderHistory();
}

function displayResults(analysis, sourceLabel) {
    const resultDiv = document.getElementById("resultList");
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
        <div class="ingredient-row" style="background: none; padding-bottom: 0.75rem; border-bottom: 2px solid var(--color-border); margin-bottom: 0.5rem;">
            <div class="ingredient-name" style="justify-content: space-between;">
                <span style="font-weight: 600;">${escapeHtml(sourceLabel)}</span>
                <div class="stats-badge">
                    <span class="stat stat-safe">✓ ${analysis.goodCount} safe</span>
                    <span class="stat stat-risk">⚠ ${analysis.badCount} risks</span>
                </div>
            </div>
        </div>
    `;
    
    if (analysis.results.length === 0) {
        resultDiv.innerHTML += '<div class="empty-state">No ingredients found</div>';
        return;
    }
    
    analysis.results.forEach(r => {
        let statusClass = "status-safe";
        if (r.status === "caution") statusClass = "status-caution";
        if (r.status === "risk") statusClass = "status-risk";
        if (r.status === "info") statusClass = "status-info";
        
        const comedogenicBadge = r.comedogenicRating && r.comedogenicRating > 2 ? 
            `<span class="comedogenic-badge">⚠️ Comedogenic ${r.comedogenicRating}/5</span>` : 
            (r.comedogenicRating && r.comedogenicRating > 0 ? `<span class="comedogenic-badge">Comedogenic ${r.comedogenicRating}/5</span>` : '');
        
        resultDiv.innerHTML += `
            <div class="ingredient-row" onclick="showIngredientInfo(${JSON.stringify(r).replace(/"/g, '&quot;')})">
                <div class="ingredient-name">
                    <span>${escapeHtml(r.name)} ${comedogenicBadge}</span>
                    <span class="ingredient-status ${statusClass}">${r.statusText}</span>
                </div>
                <div class="ingredient-reason">${escapeHtml(r.reasons)}</div>
            </div>
        `;
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderHistory() {
    if (!currentUser) return;
    const scans = getScans(currentUser.username);
    const container = document.getElementById("historyList");
    if (!container) return;
    
    if (scans.length === 0) {
        container.innerHTML = '<div class="empty-state">No scans recorded yet</div>';
        return;
    }
    
    container.innerHTML = "";
    scans.forEach((scan, idx) => {
        const date = new Date(scan.timestamp).toLocaleString();
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <div class="history-date">${escapeHtml(date)}</div>
            <div class="history-source">${escapeHtml(scan.source)}</div>
            <div class="history-stats">✓ ${scan.goodCount} safe · ⚠ ${scan.badCount} risks</div>
        `;
        div.addEventListener("click", () => showHistoryDetails(scan));
        container.appendChild(div);
    });
}

function showHistoryDetails(scan) {
    let details = `${scan.source}\n${new Date(scan.timestamp).toLocaleString()}\n\n`;
    scan.details.forEach(d => {
        const icon = d.status === "safe" ? "✓" : (d.status === "caution" ? "⚠" : "✗");
        details += `${icon} ${d.name}: ${d.reasons}\n`;
    });
    alert(details);
}

function showEditProfile() {
    if (!currentUser) return;
    
    const modal = document.getElementById("profileModal");
    const allergiesInput = document.getElementById("editAllergies");
    const conditionsInput = document.getElementById("editConditions");
    const lactatingCheck = document.getElementById("editLactating");
    const lactatingGroup = document.getElementById("editLactatingGroup");
    
    if (!modal || !allergiesInput || !conditionsInput) return;
    
    allergiesInput.value = (currentUser.allergies || []).join(", ");
    conditionsInput.value = (currentUser.conditions || []).join(", ");
    
    // Only show lactating option for female users
    if (currentUser.gender === "female" && lactatingGroup) {
        lactatingGroup.style.display = "block";
        if (lactatingCheck) lactatingCheck.checked = currentUser.isLactating || false;
    } else if (lactatingGroup) {
        lactatingGroup.style.display = "none";
        if (lactatingCheck) lactatingCheck.checked = false;
    }
    
    modal.style.display = "flex";
    
    // Remove old listener if exists
    const saveBtn = document.getElementById("saveProfileBtn");
    if (!saveBtn) return;
    
    const newSaveHandler = () => {
        const newAllergies = allergiesInput.value.split(",").map(s => s.trim()).filter(s => s);
        const newConditions = conditionsInput.value.split(",").map(s => s.trim()).filter(s => s);
        const newLactating = lactatingCheck ? (lactatingCheck.checked && currentUser.gender === "female") : false;
        
        currentUser.allergies = newAllergies;
        currentUser.conditions = newConditions;
        currentUser.isLactating = newLactating;
        
        const users = getUsers();
        const idx = users.findIndex(u => u.username === currentUser.username);
        if (idx !== -1) {
            users[idx] = { ...currentUser };
            saveUsers(users);
        }
        
        closeProfileModal();
        renderApp();
    };
    
    // Remove old event listener
    const oldSave = saveBtn._listener;
    if (oldSave) saveBtn.removeEventListener("click", oldSave);
    saveBtn.addEventListener("click", newSaveHandler);
    saveBtn._listener = newSaveHandler;
}

// Main App Render
function renderApp() {
    const root = document.getElementById("appRoot");
    if (!currentUser) {
        renderAuth();
        return;
    }
    
    root.innerHTML = `
        <div class="app-container">
            <div class="app-header">
                <div class="header-top">
                    <div class="logo">INCIQ<span class="logo-accent">.</span></div>
                    <div class="user-menu">
                        <span class="username">${escapeHtml(currentUser.username)}</span>
                        <button class="logout-btn" id="logoutBtn"><i class="fas fa-sign-out-alt"></i></button>
                    </div>
                </div>
                <div class="profile-card">
                    <div class="profile-row">
                        <div class="profile-info">
                            <span class="profile-tag"><i class="fas fa-venus-mars"></i> ${currentUser.gender ? currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1) : "Other"}</span>
                            <span class="profile-tag"><i class="fas fa-droplet"></i> ${currentUser.skinType}</span>
                            <span class="profile-tag"><i class="fas fa-allergies"></i> ${currentUser.allergies?.length ? currentUser.allergies.join(", ") : "No allergies"}</span>
                            <span class="profile-tag"><i class="fas fa-stethoscope"></i> ${currentUser.conditions?.length ? currentUser.conditions.join(", ") : "No conditions"}</span>
                            ${currentUser.gender === "female" ? `<span class="profile-tag"><i class="fas fa-baby-carriage"></i> ${currentUser.isLactating ? "Lactating" : "Not lactating"}</span>` : ""}
                        </div>
                        <button class="edit-profile-btn" id="editProfileBtn"><i class="fas fa-pen"></i> Edit</button>
                    </div>
                </div>
            </div>
            <div class="scanner-section">
                <div class="scanner-card">
                    <h2 class="scanner-title">Ingredient Analysis</h2>
                    <p class="scanner-subtitle">Scan ingredient list or enter manually to evaluate safety based on your profile.</p>
                    <button class="primary-button" id="openCameraBtn"><i class="fas fa-camera"></i> Scan with Camera</button>
                    <div class="divider"><span>or</span></div>
                    <button class="manual-toggle" id="toggleManualBtn"><i class="fas fa-keyboard"></i> Enter manually</button>
                    <div class="manual-input" id="manualInputDiv">
                        <textarea id="manualIngredients" rows="3" placeholder="Enter ingredients separated by commas&#10;e.g., Hyaluronic Acid, Retinol, Glycerin"></textarea>
                        <button class="analyze-button" id="analyzeManualBtn"><i class="fas fa-chart-line"></i> Analyze</button>
                    </div>
                    <button class="glossary-button" id="openGlossaryBtn"><i class="fas fa-graduation-cap"></i> View Ingredient Glossary</button>
                </div>
            </div>
            <div class="results-section">
                <div class="results-card">
                    <div class="results-header">
                        <i class="fas fa-clipboard-list"></i>
                        <h3>Analysis Results</h3>
                    </div>
                    <div id="resultList" class="ingredients-list">
                        <div class="empty-state">No analysis performed yet</div>
                    </div>
                </div>
            </div>
            <div class="history-section">
                <div class="history-card">
                    <div class="history-header">
                        <i class="fas fa-clock"></i>
                        <h3>Recent Scans</h3>
                    </div>
                    <div id="historyList" class="history-list">
                        <div class="empty-state">No scan history</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    renderHistory();
    attachEvents();
}

function attachEvents() {
    const openCameraBtn = document.getElementById("openCameraBtn");
    if (openCameraBtn) openCameraBtn.addEventListener("click", startCamera);
    
    const captureBtn = document.getElementById("captureOcrBtn");
    if (captureBtn) captureBtn.addEventListener("click", captureAndExtract);
    
    const closeCameraBtn = document.getElementById("closeCameraBtn");
    if (closeCameraBtn) closeCameraBtn.addEventListener("click", closeCamera);
    
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => {
        closeCamera();
        currentUser = null;
        renderApp();
    });
    
    const editProfileBtn = document.getElementById("editProfileBtn");
    if (editProfileBtn) editProfileBtn.addEventListener("click", showEditProfile);
    
    const toggleManual = document.getElementById("toggleManualBtn");
    const manualDiv = document.getElementById("manualInputDiv");
    if (toggleManual) {
        toggleManual.addEventListener("click", () => {
            if (manualDiv) {
                manualDiv.style.display = manualDiv.style.display === "none" ? "block" : "none";
            }
        });
    }
    
    const analyzeManualBtn = document.getElementById("analyzeManualBtn");
    if (analyzeManualBtn) {
        analyzeManualBtn.addEventListener("click", () => {
            const raw = document.getElementById("manualIngredients").value;
            const ingredients = raw.split(',').map(i => i.trim()).filter(i => i);
            if (ingredients.length === 0) {
                alert("Please enter at least one ingredient.");
            } else {
                performAnalysis(ingredients, "Manual Entry");
            }
        });
    }
    
    const confirmIngredientsBtn = document.getElementById("confirmIngredientsBtn");
    if (confirmIngredientsBtn) {
        confirmIngredientsBtn.addEventListener("click", () => {
            const text = document.getElementById("extractedIngredients").value;
            const ingredients = text.split(',').map(i => i.trim()).filter(i => i);
            if (ingredients.length === 0) {
                alert("No ingredients to analyze.");
            } else {
                performAnalysis(ingredients, "OCR Scan");
                closeEditModal();
            }
        });
    }
    
    const cancelEditBtn = document.getElementById("cancelEditBtn");
    if (cancelEditBtn) cancelEditBtn.addEventListener("click", closeEditModal);
    
    const closeEditModalBtn = document.getElementById("closeEditModalBtn");
    if (closeEditModalBtn) closeEditModalBtn.addEventListener("click", closeEditModal);
    
    const cancelProfileBtn = document.getElementById("cancelProfileBtn");
    if (cancelProfileBtn) cancelProfileBtn.addEventListener("click", closeProfileModal);
    
    const closeProfileModalBtn = document.getElementById("closeProfileModalBtn");
    if (closeProfileModalBtn) closeProfileModalBtn.addEventListener("click", closeProfileModal);
    
    const closeIngredientModalBtn = document.getElementById("closeIngredientModalBtn");
    const closeIngredientModalBtn2 = document.getElementById("closeIngredientModalBtn2");
    if (closeIngredientModalBtn) closeIngredientModalBtn.addEventListener("click", closeIngredientModal);
    if (closeIngredientModalBtn2) closeIngredientModalBtn2.addEventListener("click", closeIngredientModal);
    
    const openGlossaryBtn = document.getElementById("openGlossaryBtn");
    if (openGlossaryBtn) {
        openGlossaryBtn.addEventListener("click", openGlossaryModal);
    }
    
    const closeGlossaryModalBtn = document.getElementById("closeGlossaryModalBtn");
    const closeGlossaryModalBtn2 = document.getElementById("closeGlossaryModalBtn2");
    if (closeGlossaryModalBtn) closeGlossaryModalBtn.addEventListener("click", closeGlossaryModal);
    if (closeGlossaryModalBtn2) closeGlossaryModalBtn2.addEventListener("click", closeGlossaryModal);
}

function renderAuth() {
    const root = document.getElementById("appRoot");
    root.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-logo">
                    <div class="logo">INCIQ<span class="logo-accent">.</span></div>
                    <p>Know before you glow.r</p>
                </div>
                <div id="authForms">
                    <div id="loginForm">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="loginUsername" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="loginPassword" placeholder="Enter password">
                                <button type="button" class="toggle-password" data-target="loginPassword">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <button id="doLoginBtn" class="auth-button">Sign In</button>
                        <div class="auth-toggle">No account? <a id="showRegisterLink">Create account</a></div>
                        <div id="authError" class="auth-error"></div>
                    </div>
                    <div id="registerForm" style="display: none;">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="regUsername" placeholder="Choose username">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="regPassword" placeholder="Choose password">
                                <button type="button" class="toggle-password" data-target="regPassword">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="regConfirmPassword" placeholder="Confirm password">
                                <button type="button" class="toggle-password" data-target="regConfirmPassword">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Gender</label>
                            <select id="regGender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Skin Type</label>
                            <select id="regSkinType">
                                <option value="dry">Dry</option>
                                <option value="oily">Oily</option>
                                <option value="combination">Combination</option>
                                <option value="sensitive">Sensitive</option>
                                <option value="normal">Normal</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Allergies</label>
                            <div class="checkbox-group" id="allergiesGroup">
                                <label><input type="checkbox" value="Fragrance"> Fragrance</label>
                                <label><input type="checkbox" value="Alcohol"> Alcohol</label>
                                <label><input type="checkbox" value="Essential Oils"> Essential Oils</label>
                                <label><input type="checkbox" value="Parabens"> Parabens</label>
                                <label><input type="checkbox" value="Benzoyl Peroxide"> Benzoyl Peroxide</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Skin Conditions</label>
                            <div class="checkbox-group" id="conditionsGroup">
                                <label><input type="checkbox" value="Acne-prone"> Acne-prone</label>
                                <label><input type="checkbox" value="Eczema"> Eczema</label>
                                <label><input type="checkbox" value="Rosacea"> Rosacea</label>
                                <label><input type="checkbox" value="Contact Dermatitis"> Contact Dermatitis</label>
                            </div>
                        </div>
                        <div class="form-group" id="lactatingGroup" style="display: none;">
                            <label><input type="checkbox" id="regLactating"> I am lactating / breastfeeding</label>
                        </div>
                        <button id="doRegisterBtn" class="auth-button">Create Account</button>
                        <div class="auth-toggle">Already have an account? <a id="showLoginLink">Sign in</a></div>
                        <div id="regError" class="auth-error"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Setup password toggle functionality
    document.querySelectorAll(".toggle-password").forEach(btn => {
        btn.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (input.type === "password") {
                input.type = "text";
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = "password";
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
    
    document.getElementById("doLoginBtn")?.addEventListener("click", () => {
        const un = document.getElementById("loginUsername").value;
        const pw = document.getElementById("loginPassword").value;
        const res = loginUser(un, pw);
        if (res.success) {
            currentUser = res.user;
            renderApp();
        } else {
            document.getElementById("authError").innerText = res.error;
        }
    });
    
    document.getElementById("showRegisterLink")?.addEventListener("click", () => {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
        document.getElementById("authError").innerText = "";
    });
    
    document.getElementById("showLoginLink")?.addEventListener("click", () => {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("regError").innerText = "";
    });
    
    document.getElementById("doRegisterBtn")?.addEventListener("click", () => {
        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("regConfirmPassword").value;
        
        if (!username || !password) {
            document.getElementById("regError").innerText = "Username and password required";
            return;
        }
        
        if (password !== confirmPassword) {
            document.getElementById("regError").innerText = "Passwords do not match";
            return;
        }
        
        if (password.length < 4) {
            document.getElementById("regError").innerText = "Password must be at least 4 characters";
            return;
        }
        
        const gender = document.getElementById("regGender").value;
        const skinType = document.getElementById("regSkinType").value;
        const allergies = Array.from(document.querySelectorAll("#allergiesGroup input:checked")).map(cb => cb.value);
        const conditions = Array.from(document.querySelectorAll("#conditionsGroup input:checked")).map(cb => cb.value);
        const isLactating = document.getElementById("regLactating").checked && gender === "female";
        
        const regResult = registerUser(username, password, { gender, skinType, allergies, conditions, isLactating });
        if (regResult.success) {
            const loginNow = loginUser(username, password);
            if (loginNow.success) {
                currentUser = loginNow.user;
                renderApp();
            } else {
                document.getElementById("regError").innerText = "Auto-login error";
            }
        } else {
            document.getElementById("regError").innerText = regResult.error;
        }
    });
    
    document.getElementById("regGender")?.addEventListener("change", function() {
        const lactatingGroup = document.getElementById("lactatingGroup");
        if (lactatingGroup) {
            lactatingGroup.style.display = this.value === "female" ? "block" : "none";
            if (this.value !== "female") {
                document.getElementById("regLactating").checked = false;
            }
        }
    });
}

function init() {
    applyTheme();
    renderAuth();
    // Add theme toggle button
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeBtn.onclick = toggleTheme;
    document.body.appendChild(themeBtn);
}

// Make functions globally accessible
window.showIngredientInfo = showIngredientInfo;
window.closeIngredientModal = closeIngredientModal;
window.openGlossaryModal = openGlossaryModal;
window.closeGlossaryModal = closeGlossaryModal;

// Initialize the app
init();
