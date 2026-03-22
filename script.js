// Ingredient Database
const INGREDIENT_DB = {
    "alcohol": { badForSkinTypes: ["dry","sensitive"], allergens: ["Alcohol"], conditions: ["Eczema"], lactatingWarning: false, warningMsg: "Drying, may compromise moisture barrier." },
    "fragrance": { badForSkinTypes: ["sensitive"], allergens: ["Fragrance"], conditions: ["Eczema","Acne-prone"], lactatingWarning: false, warningMsg: "Potential irritant and common allergen." },
    "retinol": { badForSkinTypes: ["sensitive"], allergens: [], conditions: [], lactatingWarning: true, warningMsg: "Avoid during lactation (vitamin A derivative)." },
    "salicylic acid": { badForSkinTypes: ["dry","sensitive"], allergens: [], conditions: ["Acne-prone"], lactatingWarning: true, warningMsg: "Consult healthcare provider if nursing." },
    "shea butter": { badForSkinTypes: [], allergens: [], conditions: ["Acne-prone"], lactatingWarning: false, warningMsg: "May be comedogenic for acne-prone skin." },
    "niacinamide": { badForSkinTypes: [], allergens: [], conditions: [], lactatingWarning: false, warningMsg: "" },
    "hyaluronic acid": { badForSkinTypes: [], allergens: [], conditions: [], lactatingWarning: false, warningMsg: "" },
    "essential oils": { badForSkinTypes: ["sensitive"], allergens: ["Essential Oils"], conditions: ["Eczema"], lactatingWarning: true, warningMsg: "May cause irritation; avoid if nursing." },
    "lactic acid": { badForSkinTypes: ["sensitive"], allergens: [], conditions: ["Eczema"], lactatingWarning: false, warningMsg: "Gentle exfoliant; may cause sensitivity." },
    "parabens": { badForSkinTypes: [], allergens: ["Parabens"], conditions: [], lactatingWarning: false, warningMsg: "Potential endocrine disruptor." },
    "glycerin": { badForSkinTypes: [], allergens: [], conditions: [], lactatingWarning: false, warningMsg: "" },
    "water": { badForSkinTypes: [], allergens: [], conditions: [], lactatingWarning: false, warningMsg: "" },
    "vitamin c": { badForSkinTypes: ["sensitive"], allergens: [], conditions: [], lactatingWarning: false, warningMsg: "May cause mild tingling on sensitive skin." },
    "arbutin": { badForSkinTypes: [], allergens: [], conditions: [], lactatingWarning: false, warningMsg: "Generally safe; patch test recommended." }
};

function normalizeIngredient(name) { 
    return name.trim().toLowerCase(); 
}

function analyzeSingleIngredient(ingName, userProfile) {
    const key = normalizeIngredient(ingName);
    const info = INGREDIENT_DB[key] || null;
    let isBad = false;
    let reasons = [];

    if (!info) return { name: ingName, status: "good", reasons: "No known conflicts documented." };

    if (userProfile.skinType && info.badForSkinTypes.includes(userProfile.skinType)) {
        isBad = true;
        reasons.push(`Not recommended for ${userProfile.skinType} skin`);
    }
    if (userProfile.allergies?.length) {
        for (let allergy of userProfile.allergies) {
            if (info.allergens?.includes(allergy)) {
                isBad = true;
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
        reasons.push("Not recommended during lactation");
    }

    if (isBad) {
        let msg = reasons.join(" · ");
        if (info.warningMsg && !reasons.includes(info.warningMsg)) msg += ` · ${info.warningMsg}`;
        return { name: ingName, status: "bad", reasons: msg };
    } else {
        let safeNote = info.warningMsg ? info.warningMsg : "Compatible with your profile";
        return { name: ingName, status: "good", reasons: safeNote };
    }
}

function analyzeFullIngredients(ingredientsList, userProfile) {
    const results = [];
    for (let ing of ingredientsList) {
        if (ing.trim() === "") continue;
        results.push(analyzeSingleIngredient(ing, userProfile));
    }
    const badCount = results.filter(r => r.status === "bad").length;
    const goodCount = results.filter(r => r.status === "good").length;
    return { results, badCount, goodCount };
}

// LocalStorage
let currentUser = null;
let ocrStream = null;
let isCameraActive = false;

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

// Camera & OCR with improved error handling
async function startCamera() {
    const modal = document.getElementById("cameraModal");
    const video = document.getElementById("ocrVideo");
    
    // Reset any previous state
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
    // Reset loading state
    const loading = document.getElementById("ocrLoading");
    if (loading) loading.style.display = "none";
}

async function captureAndExtract() {
    const video = document.getElementById("ocrVideo");
    if (!video || !video.srcObject || !isCameraActive) {
        alert("Camera is not ready. Please try again.");
        return;
    }
    
    // Create canvas and capture frame
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    
    // Show loading overlay
    const loading = document.getElementById("ocrLoading");
    loading.style.display = "flex";
    
    try {
        // Process with Tesseract with optimized settings
        const worker = await Tesseract.createWorker('eng', 1, {
            logger: m => console.log(m),
            errorHandler: err => console.error(err)
        });
        
        const { data: { text } } = await worker.recognize(imageData);
        await worker.terminate();
        
        loading.style.display = "none";
        closeCamera();
        
        if (!text || text.trim().length === 0) {
            alert("No text detected. Please ensure good lighting and clear text.");
            return;
        }
        
        const ingredients = parseIngredientText(text);
        if (ingredients.length === 0) {
            alert("Could not extract ingredients from the image. Please try again with better lighting and clearer text.");
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
    // Clean the text
    let cleaned = text
        .replace(/\n/g, ", ")
        .replace(/\r/g, "")
        .replace(/\s+/g, " ")
        .trim();
    
    // Remove common noise patterns
    const noisePatterns = [
        /ingredients:/gi, /ingredient:/gi, 
        /net wt/gi, /net weight/gi, /volume/gi, 
        /made in/gi, /dermatologically tested/gi,
        /directions/gi, /warning/gi, /caution/gi,
        /\d+\s*ml/gi, /\d+\s*g/gi, /\d+\s*oz/gi
    ];
    noisePatterns.forEach(pattern => { cleaned = cleaned.replace(pattern, ""); });
    
    // Split by common separators
    let parts = cleaned.split(/[,;•·\-]/).map(p => p.trim()).filter(p => p.length > 0 && p.length < 60);
    
    // If no separators found, try to split by common ingredient patterns
    if (parts.length === 0 || parts.length === 1) {
        // Look for common ingredient names
        const commonIngredients = Object.keys(INGREDIENT_DB);
        const foundIngredients = commonIngredients.filter(ing => 
            cleaned.toLowerCase().includes(ing.toLowerCase())
        );
        if (foundIngredients.length > 0) {
            parts = foundIngredients;
        } else {
            parts = [cleaned];
        }
    }
    
    // Remove numbers and measurements
    parts = parts.filter(p => !/^\d+$/.test(p) && !/^\d+\.\d+$/.test(p));
    
    // Capitalize first letter
    parts = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
    
    // Remove duplicates
    parts = [...new Set(parts)];
    
    return parts.slice(0, 30);
}

function openEditModal(ingredientsString) {
    const modal = document.getElementById("editModal");
    const textarea = document.getElementById("extractedIngredients");
    textarea.value = ingredientsString;
    modal.style.display = "flex";
    
    // Focus textarea for editing
    setTimeout(() => textarea.focus(), 100);
}

function closeEditModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

function closeProfileModal() {
    const modal = document.getElementById("profileModal");
    modal.style.display = "none";
}

function updateEditLactatingVisibility() {
    const gender = document.getElementById("editGender")?.value;
    const lactatingGroup = document.getElementById("editLactatingGroup");
    if (lactatingGroup) {
        lactatingGroup.style.display = gender === "female" ? "block" : "none";
        if (gender !== "female") {
            document.getElementById("editLactating").checked = false;
        }
    }
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
                <span style="font-weight: 600;">${sourceLabel}</span>
                <div class="stats-badge">
                    <span class="stat stat-safe">✓ ${analysis.goodCount} safe</span>
                    <span class="stat stat-risk">⚠ ${analysis.badCount} risks</span>
                </div>
            </div>
        </div>
    `;
    
    if (analysis.results.length === 0) {
        resultDiv.innerHTML += '<div class="empty-state">No ingredients to display</div>';
        return;
    }
    
    analysis.results.forEach(r => {
        const statusClass = r.status === "good" ? "status-safe" : "status-caution";
        const statusText = r.status === "good" ? "Safe" : "Caution";
        resultDiv.innerHTML += `
            <div class="ingredient-row">
                <div class="ingredient-name">
                    <span>${escapeHtml(r.name)}</span>
                    <span class="ingredient-status ${statusClass}">${statusText}</span>
                </div>
                <div class="ingredient-reason">${escapeHtml(r.reasons)}</div>
            </div>
        `;
    });
}

function escapeHtml(str) {
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
            <div class="history-date">${date}</div>
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
        const icon = d.status === "good" ? "✓" : "⚠";
        details += `${icon} ${d.name}: ${d.reasons}\n`;
    });
    alert(details);
}

function showEditProfile() {
    if (!currentUser) return;
    
    const modal = document.getElementById("profileModal");
    const genderSelect = document.getElementById("editGender");
    const skinSelect = document.getElementById("editSkinType");
    const allergiesInput = document.getElementById("editAllergies");
    const conditionsInput = document.getElementById("editConditions");
    const lactatingCheck = document.getElementById("editLactating");
    
    // Populate current values
    genderSelect.value = currentUser.gender || "other";
    skinSelect.value = currentUser.skinType;
    allergiesInput.value = (currentUser.allergies || []).join(", ");
    conditionsInput.value = (currentUser.conditions || []).join(", ");
    lactatingCheck.checked = currentUser.isLactating;
    
    // Update lactating visibility
    updateEditLactatingVisibility();
    
    modal.style.display = "flex";
    
    // Set up save handler
    const saveBtn = document.getElementById("saveProfileBtn");
    const newSaveHandler = () => {
        const newGender = genderSelect.value;
        const newSkin = skinSelect.value;
        const newAllergies = allergiesInput.value.split(",").map(s => s.trim()).filter(s => s);
        const newConditions = conditionsInput.value.split(",").map(s => s.trim()).filter(s => s);
        const newLactating = lactatingCheck.checked && newGender === "female";
        
        currentUser.gender = newGender;
        currentUser.skinType = newSkin;
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
    
    // Remove old listeners and add new one
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
                </div>
            </div>
            <div class="results-section">
                <div class="results-card">
                    <div class="results-header">
                        <h3><i class="fas fa-clipboard-list"></i> Analysis Results</h3>
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
}

function renderAuth() {
    const root = document.getElementById("appRoot");
    root.innerHTML = `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-logo">
                    <div class="logo">INCIQ<span class="logo-accent">.</span></div>
                    <p>Know before you glow</p>
                </div>
                <div id="authForms">
                    <div id="loginForm">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="loginUsername" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="loginPassword" placeholder="Enter password">
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
                            <input type="password" id="regPassword" placeholder="Choose password">
                        </div>
                        <div class="form-group">
                            <label>Gender</label>
                            <select id="regGender" onchange="updateLactatingVisibility()">
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
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Skin Conditions</label>
                            <div class="checkbox-group" id="conditionsGroup">
                                <label><input type="checkbox" value="Acne-prone"> Acne-prone</label>
                                <label><input type="checkbox" value="Eczema"> Eczema</label>
                                <label><input type="checkbox" value="Rosacea"> Rosacea</label>
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
    });
    
    document.getElementById("showLoginLink")?.addEventListener("click", () => {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    });
    
    document.getElementById("doRegisterBtn")?.addEventListener("click", () => {
        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value;
        const gender = document.getElementById("regGender").value;
        const skinType = document.getElementById("regSkinType").value;
        const allergies = Array.from(document.querySelectorAll("#allergiesGroup input:checked")).map(cb => cb.value);
        const conditions = Array.from(document.querySelectorAll("#conditionsGroup input:checked")).map(cb => cb.value);
        const isLactating = document.getElementById("regLactating").checked && gender === "female";
        
        if (!username || !password) {
            document.getElementById("regError").innerText = "Username and password required";
            return;
        }
        
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
}

function updateLactatingVisibility() {
    const gender = document.getElementById("regGender")?.value;
    const lactatingGroup = document.getElementById("lactatingGroup");
    if (lactatingGroup) {
        lactatingGroup.style.display = gender === "female" ? "block" : "none";
        if (gender !== "female") {
            document.getElementById("regLactating").checked = false;
        }
    }
}

function init() {
    renderAuth();
    // Initialize lactating visibility on page load
    setTimeout(() => updateLactatingVisibility(), 100);
}

init();