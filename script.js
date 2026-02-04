document.addEventListener('DOMContentLoaded', function () {
    // Navigation & Section Toggling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            // Allow display:none to take effect before removing active
            setTimeout(() => {
                if (!section.classList.contains('active')) {
                    // logic handled by CSS transitions usually, but here we force state
                }
            }, 300);
        });

        // Deactivate all nav links
        navLinks.forEach(link => link.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 10);
        }

        // Activate nav link
        const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Reset scroll on content column
        const contentColumn = document.querySelector('.content');
        if (contentColumn) contentColumn.scrollTop = 0;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Initial Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.info-section, .education-item, .project-item, .skill-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(el);
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Reset animation for reappearance
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Background Parallax
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // --- ADMIN MODE LOGIC ---
    const urlParams = new URLSearchParams(window.location.search);

    // Always check for saved content
    loadSavedContent();

    if (urlParams.has('admin') && urlParams.get('admin') === 'true') {
        enableAdminMode();
    }
});

// --- ADMIN FUNCTIONS ---

function loadSavedContent() {
    // Load Education Container
    const savedEdu = localStorage.getItem('portfolio_edu_html');
    if (savedEdu) {
        const eduContainer = document.getElementById('education-container');
        if (eduContainer) eduContainer.innerHTML = savedEdu;
    }

    // Load Skills Container
    const savedSkills = localStorage.getItem('portfolio_skills_html');
    if (savedSkills) {
        const skillsContainer = document.querySelector('.detailed-skills');
        if (skillsContainer) skillsContainer.innerHTML = savedSkills;
    }

    // Load Projects Container
    const savedProjects = localStorage.getItem('portfolio_projects_html');
    if (savedProjects) {
        const projContainer = document.getElementById('projects-container');
        if (projContainer) projContainer.innerHTML = savedProjects;
    }

    // Check if Projects section should be visible
    checkProjectsVisibility();

    // Load specific text fields (Profile/About) that are outside containers
    const textSelectors = ['.profile-name', '.profile-role', '.about-text', '.contact-item span'];
    textSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            const storageKey = `portfolio_text_${selector}_${index}`;
            const saved = localStorage.getItem(storageKey);
            if (saved) el.innerHTML = saved;
        });
    });
}

function enableAdminMode() {
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
        showAdminToolbar();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'adminLoginModal';
    modal.innerHTML = `
        <div class="login-box">
            <h3>Admin Login</h3>
            <input type="text" id="adminUser" placeholder="Username">
            <input type="password" id="adminPass" placeholder="Password">
            <button onclick="verifyLogin()">Login</button>
            <button onclick="window.location.href = window.location.pathname" style="background:#ef4444; margin-top:5px;">Cancel</button>
        </div>
        <style>
            #adminLoginModal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99999;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            .login-box {
                background: rgba(255, 255, 255, 0.95);
                padding: 2.5rem;
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: 350px;
                text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.5);
                animation: slideUp 0.3s ease-out;
            }
            .login-box h3 {
                margin-bottom: 10px;
                color: #1f2937;
                font-family: 'Inter', sans-serif;
                font-size: 1.5rem;
                font-weight: 700;
            }
            .login-box input {
                padding: 12px 15px;
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                width: 100%;
                font-size: 1rem;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box; /* Ensure padding doesn't affect width */
            }
            .login-box input:focus {
                border-color: #3b82f6;
            }
            .login-box button {
                padding: 12px;
                border: none;
                border-radius: 12px;
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                color: white;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .login-box button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    `;
    document.body.appendChild(modal);

    window.verifyLogin = function () {
        const u = document.getElementById('adminUser').value;
        const p = document.getElementById('adminPass').value;
        if (u === 'admin' && p === 'admin123') {
            sessionStorage.setItem('admin_authenticated', 'true');
            document.getElementById('adminLoginModal').remove();
            showAdminToolbar();
        } else {
            alert('Invalid Credentials');
        }
    };
}

function showAdminToolbar() {
    console.log("Admin Mode Enabled");

    const toolbar = document.createElement('div');
    toolbar.className = 'admin-toolbar';
    toolbar.innerHTML = `
        <div class="admin-controls">
            <div class="admin-badge">
                <i class="bi bi-shield-lock-fill"></i> Admin
            </div>
            <div class="divider"></div>
            <button onclick="toggleEdit()" id="editToggle" title="Toggle Edit Mode">
                <i class="bi bi-pencil-square"></i> <span>Edit</span>
            </button>
            <button onclick="resetChanges()" class="danger-btn" title="Reset All">
                <i class="bi bi-arrow-counterclockwise"></i> <span>Reset</span>
            </button>
            <button onclick="logoutAdmin()" class="secondary-btn" title="Logout">
                <i class="bi bi-box-arrow-right"></i>
            </button>
        </div>
        <style>
            .admin-toolbar {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(17, 24, 39, 0.85);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                padding: 8px 12px;
                border-radius: 100px;
                box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
                z-index: 10000;
                border: 1px solid rgba(255,255,255,0.1);
                transition: all 0.3s ease;
                display: flex;
            }
            .admin-toolbar:hover {
                background: rgba(17, 24, 39, 0.95);
                transform: translateX(-50%) translateY(-2px);
            }
            .admin-controls {
                display: flex;
                gap: 8px;
                align-items: center;
            }
            .admin-badge {
                color: #9ca3af;
                font-size: 0.85rem;
                font-weight: 600;
                padding: 0 8px;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .divider {
                width: 1px;
                height: 24px;
                background: rgba(255,255,255,0.1);
                margin: 0 4px;
            }
            .admin-controls button {
                background: transparent;
                border: none;
                padding: 8px 16px;
                border-radius: 50px;
                color: white;
                cursor: pointer;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s;
                font-family: 'Inter', sans-serif;
                font-size: 0.9rem;
            }
            .admin-controls button:hover {
                background: rgba(255,255,255,0.1);
            }
            #editToggle {
                background: #3b82f6;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            #editToggle:hover {
                background: #2563eb;
            }
            .danger-btn:hover {
                background: rgba(239, 68, 68, 0.2) !important;
                color: #f87171 !important;
            }
            .secondary-btn {
                padding: 8px !important;
            }
            
            /* Editing Highlights */
            .editable-highlight {
                outline: 2px dashed rgba(59, 130, 246, 0.3);
                outline-offset: 4px;
                border-radius: 6px;
                transition: all 0.2s;
                position: relative;
            }
            .editable-highlight:hover, .editable-highlight:focus {
                outline: 2px solid #3b82f6;
                background: rgba(59, 130, 246, 0.05);
            }
            
            /* Admin Buttons */
            .admin-action-btn {
                transition: all 0.2s;
                opacity: 0.8;
            }
            .admin-action-btn:hover {
                opacity: 1;
                transform: scale(1.05);
            }
            
            /* Toast */
            .admin-toast {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                background: #10b981;
                color: white;
                padding: 10px 20px;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: 10002;
                pointer-events: none;
            }
            .admin-toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        </style>
    `;
    document.body.appendChild(toolbar);

    // Helpers exposed to window
    window.logoutAdmin = function () {
        sessionStorage.removeItem('admin_authenticated');
        location.reload();
    };

    window.showToast = function (msg = "Changes Saved") {
        let toast = document.querySelector('.admin-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'admin-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${msg}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    };

    window.toggleEdit = function () {
        const isEditing = document.body.getAttribute('data-editing') === 'true';
        const btn = document.getElementById('editToggle');
        const eduContainer = document.getElementById('education-container');
        const skillsContainer = document.querySelector('.detailed-skills');

        if (isEditing) {
            // --- DISABLE EDITING ---
            document.querySelectorAll('[contenteditable]').forEach(el => {
                el.contentEditable = "false";
                el.classList.remove('editable-highlight');
            });

            // Remove Admin Controls
            document.querySelectorAll('.admin-add-btn, .admin-del-btn, .admin-mini-btn, .admin-add-sub-btn').forEach(el => el.remove());

            document.body.setAttribute('data-editing', 'false');
            btn.innerHTML = `<i class="bi bi-pencil-square"></i> <span>Edit</span>`;
            btn.style.background = "#3b82f6";
        } else {
            // --- ENABLE EDITING ---

            // 1. Text Fields
            const textSelectors = ['.profile-name', '.profile-role', '.about-text', '.contact-item span'];
            textSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach((el, index) => {
                    el.contentEditable = "true";
                    el.classList.add('editable-highlight');
                    el.oninput = () => {
                        localStorage.setItem(`portfolio_text_${selector}_${index}`, el.innerHTML);
                        showToast("Text Saved");
                    };
                });
            });

            // 2. Container Items
            const containerSelectors = ['.degree', '.college', '.university', '.cgpa', '.year', '.skill-title', '.skill-sublist li'];
            containerSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    el.contentEditable = "true";
                    el.classList.add('editable-highlight');
                    el.oninput = () => {
                        saveContainer('portfolio_edu_html', eduContainer);
                        saveContainer('portfolio_skills_html', skillsContainer);
                        const projContainer = document.getElementById('projects-container');
                        if (projContainer) saveContainer('portfolio_projects_html', projContainer);
                    };
                });
            });

            injectAdminControls();

            document.body.setAttribute('data-editing', 'true');
            btn.innerHTML = `<i class="bi bi-check-lg"></i> <span>Done</span>`;
            btn.style.background = "#10b981";
        }
        // Update visibility based on new state
        checkProjectsVisibility();
    };

    window.resetChanges = function () {
        if (confirm("Are you sure you want to reset all changes? This will revert to the original file content.")) {
            localStorage.clear();
            location.reload();
        }
    };

    // Initial Injection for persistence if already editing (rare but good practice)
    if (document.body.getAttribute('data-editing') === 'true') {
        injectAdminControls();
    }
}

function injectAdminControls() {
    // Remove existing
    document.querySelectorAll('.admin-del-btn, .admin-mini-btn, .admin-add-sub-btn, .admin-add-btn').forEach(el => el.remove());

    const eduContainer = document.getElementById('education-container');
    const skillsContainer = document.querySelector('.detailed-skills');
    const projectsContainer = document.getElementById('projects-container');

    // 1. Add Section Buttons
    if (projectsContainer) addSectionBtn(projectsContainer, () => {
        const template = `
            <div class="project-card" style="position:relative; background:white; padding:1.5rem; border-radius:16px; margin-bottom:1rem; box-shadow:0 4px 6px rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.05);">
                <h3 class="project-title" contenteditable="true" style="font-size:1.2rem; font-weight:600; margin-bottom:0.5rem;">New Project</h3>
                <p class="project-desc" contenteditable="true" style="color:#666; font-size:0.95rem;">Project description goes here. Explain what you built and the tools used.</p>
                <div class="project-tags" style="margin-top:10px; display:flex; gap:8px;">
                    <span contenteditable="true" style="background:#f3f4f6; padding:4px 12px; border-radius:100px; font-size:0.8rem; color:#4b5563;">Tag 1</span>
                    <span contenteditable="true" style="background:#f3f4f6; padding:4px 12px; border-radius:100px; font-size:0.8rem; color:#4b5563;">Tag 2</span>
                </div>
                <button onclick="window.open('#', '_blank')" style="margin-top:15px; padding:8px 16px; background:#3b82f6; color:white; border:none; border-radius:8px; cursor:pointer; font-size:0.9rem;">View Project</button>
            </div>`;
        projectsContainer.insertAdjacentHTML('beforeend', template);
        injectAdminControls();
        saveContainer('portfolio_projects_html', projectsContainer);
    }, "+ Add Project");

    if (eduContainer) addSectionBtn(eduContainer, () => {
        const template = `
            <div class="education-item" style="position:relative">
                <div class="education-header">
                    <h3 class="degree" contenteditable="true">New Degree</h3>
                    <span class="year" contenteditable="true">202X - 202X</span>
                </div>
                <span class="college" contenteditable="true">College Name</span>
                <span class="university" contenteditable="true">University Name</span>
                <span class="cgpa" contenteditable="true">Grade/CGPA</span>
            </div>`;
        eduContainer.insertAdjacentHTML('beforeend', template);
        injectAdminControls();
        saveContainer('portfolio_edu_html', eduContainer);
    }, "+ Add Education");

    if (skillsContainer) addSectionBtn(skillsContainer, () => {
        const template = `
            <div class="skill-row" style="position:relative">
                <div class="skill-icon devops"><i class="bi bi-code-square"></i></div>
                <div class="skill-details">
                    <h3 class="skill-title" contenteditable="true">New Skill Category</h3>
                    <ul class="skill-sublist">
                        <li contenteditable="true">Skill Item 1</li>
                        <li contenteditable="true">Skill Item 2</li>
                    </ul>
                </div>
            </div>`;
        skillsContainer.insertAdjacentHTML('beforeend', template);
        injectAdminControls();
        saveContainer('portfolio_skills_html', skillsContainer);
    }, "+ Add Skill Category");

    // 2. Delete Section Buttons
    const items = [...document.querySelectorAll('.education-item'), ...document.querySelectorAll('.skill-row'), ...document.querySelectorAll('.project-card')];
    items.forEach(item => {
        item.style.position = 'relative';
        const delBtn = createDelBtn(() => {
            item.remove();
            if (item.classList.contains('education-item')) saveContainer('portfolio_edu_html', eduContainer);
            else if (item.classList.contains('project-card')) saveContainer('portfolio_projects_html', projectsContainer);
            else saveContainer('portfolio_skills_html', skillsContainer);
        });
        item.appendChild(delBtn);

        // 3. Add Sub-Skill Buttons
        const sublist = item.querySelector('.skill-sublist');
        if (sublist) {
            const addSubBtn = document.createElement('button');
            addSubBtn.innerHTML = '<i class="bi bi-plus"></i>';
            addSubBtn.className = 'admin-add-sub-btn admin-action-btn';
            addSubBtn.title = "Add Skill Item";
            addSubBtn.style.cssText = "display:block; margin:5px auto; width:100%; background:rgba(16, 185, 129, 0.1); color:#10b981; border:1px dashed #10b981; border-radius:6px; cursor:pointer; padding:2px; font-size:1.2rem; transition:all 0.2s;";
            addSubBtn.onmouseover = () => addSubBtn.style.background = "rgba(16, 185, 129, 0.2)";
            addSubBtn.onmouseout = () => addSubBtn.style.background = "rgba(16, 185, 129, 0.1)";

            addSubBtn.onclick = (e) => {
                const newLi = document.createElement('li');
                newLi.contentEditable = "true";
                newLi.className = "editable-highlight";
                newLi.innerText = "New Skill";
                newLi.oninput = () => saveContainer('portfolio_skills_html', skillsContainer);
                sublist.appendChild(newLi);
                injectAdminControls();
                saveContainer('portfolio_skills_html', skillsContainer);
                e.stopPropagation();
            };
            sublist.after(addSubBtn);
        }
    });

    // 4. Delete Sub-Skill Buttons
    document.querySelectorAll('.skill-sublist li').forEach(li => {
        li.style.position = 'relative';
        const delBtn = document.createElement('span');
        delBtn.innerHTML = '<i class="bi bi-x"></i>';
        delBtn.className = 'admin-mini-btn';
        delBtn.title = "Remove Item";
        delBtn.style.cssText = "position:absolute; right:-25px; top:0; color:#ef4444; cursor:pointer; font-size:1.2rem; opacity:0; transition:opacity 0.2s;";

        li.onmouseenter = () => delBtn.style.opacity = '1';
        li.onmouseleave = () => delBtn.style.opacity = '0';

        delBtn.onclick = (e) => {
            li.remove();
            saveContainer('portfolio_skills_html', skillsContainer);
            e.stopPropagation();
        };
        li.appendChild(delBtn);
    });
}

function addSectionBtn(container, onClick, text) {
    const btn = document.createElement('button');
    btn.innerHTML = `<i class="bi bi-plus-lg"></i> ${text}`;
    btn.className = "admin-add-btn admin-action-btn";
    btn.style.cssText = "display:block; margin:15px auto; padding:10px 24px; background:linear-gradient(135deg, #10b981, #059669); color:white; border:none; border-radius:50px; cursor:pointer; font-weight:600; box-shadow:0 4px 12px rgba(16, 185, 129, 0.3); font-family:'Inter', sans-serif;";
    btn.onclick = onClick;
    container.after(btn);
}

function createDelBtn(onClick, customStyle = "") {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="bi bi-trash3-fill"></i>';
    btn.className = 'admin-del-btn admin-action-btn';
    btn.title = "Delete Section";
    btn.style.cssText = `position:absolute; top:-15px; right:-15px; background:white; color:#ef4444; width:32px; height:32px; border-radius:50%; border:1px solid #fee2e2; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:100; box-shadow:0 4px 12px rgba(0,0,0,0.1); font-size:1rem; ${customStyle}`;
    btn.onclick = (e) => {
        if (confirm('Delete this item?')) onClick();
        e.stopPropagation();
    };
    return btn;
}

function saveContainer(key, element) {
    if (!element) return;
    // Hide controls
    const controls = element.querySelectorAll('.admin-del-btn, .admin-mini-btn, .admin-add-sub-btn, .admin-add-btn');
    controls.forEach(c => c.style.display = 'none');

    // Save
    localStorage.setItem(key, element.innerHTML);
    if (window.showToast) window.showToast("Structure Saved");

    // Show controls back
    controls.forEach(c => c.style.display = '');

    // Re-check project visibility in case items were added/removed
    if (key === 'portfolio_projects_html') checkProjectsVisibility();
}

function checkProjectsVisibility() {
    const container = document.getElementById('projects-container');
    const section = document.getElementById('projects');
    const navLink = document.getElementById('nav-projects');

    // Logic: if container has no .project-card children (ignoring admin buttons), hide.
    // However, in Admin Mode, we might want to see the empty container to add buttons?
    // Actually, if we use addSectionBtn, that button is external to the container usually?
    // Wait, addSectionBtn appends *after* the container.
    // So we check container.children.

    // BUT: If in Admin mode, we want to SEE the section so we can click the "Add Project" button (which is adjacent to container).
    // If we hide the section, we hide the button too if it's inside or after?
    // Let's see: `showSection` logic manages visibility.
    // We want to physically toggle `display:none` on the section element itself if empty AND not in admin mode?
    // Or just always hide if empty, but logic: how to add first project?

    // FIX: If admin mode is active (body attribute), ALWAYS show project section so user can add.
    // If not admin, check count.

    const isAdmin = document.body.getAttribute('data-editing') === 'true';
    let hasProjects = false;

    if (container) {
        // Count just project cards
        const cards = container.querySelectorAll('.project-card');
        hasProjects = cards.length > 0;
    }

    if (hasProjects || isAdmin) {
        if (section) section.style.display = 'block';
        if (navLink) navLink.parentElement.style.display = 'block';
    } else {
        if (section) section.style.display = 'none';
        if (navLink) navLink.parentElement.style.display = 'none';
    }
}

// Modal Functions
function openImageModal(pdfSrc, title) {
    const modal = document.getElementById('imageModal');
    const iframe = document.getElementById('modalPdf');
    const label = document.getElementById('modalTitle');
    iframe.src = pdfSrc;
    label.textContent = title;
    modal.style.display = 'block';
    const content = modal.querySelector('.modal-content');
    content.style.opacity = '0';
    content.style.transform = 'translate(-50%, -40%)';
    setTimeout(() => {
        content.style.transition = 'all 0.3s ease';
        content.style.opacity = '1';
        content.style.transform = 'translate(-50%, -50%)';
    }, 10);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.getElementById('modalPdf').src = '';
}

window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/resume/VIGNESHWARAN_CV.pdf';
    link.download = 'VIGNESHWARAN_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
