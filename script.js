/* ==========================================================================
   SKILLNEXUS — Core Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DEMO STATE & DATA MODEL
  // ==========================================
  
  let currentUser = {
    name: "Demo User",
    email: "demo@skillnexus.edu",
    dept: "General",
    year: "1st Year",
    bio: "Passionate about technology and creative problem solving.",
    teaches: ["Python", "Canva", "Graphic Design", "Data Analysis", "HTML/CSS"],
    learns: ["Video Editing", "Digital Marketing", "Public Speaking", "Machine Learning"],
    interests: ["Technology", "Creativity", "Innovation", "Design", "Collaboration"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    connectedIds: []
  };

  const users = [
    {
      id: 1,
      name: "Aarav",
      dept: "CSE",
      year: "3rd Year",
      bio: "Technology enthusiast and data science practitioner who loves teaching Python and learning creative arts.",
      teaches: ["Python", "UI/UX", "Data Analysis"],
      learns: ["Graphic Design", "Canva", "Video Editing"],
      category: "Programming",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Priya",
      dept: "ECE",
      year: "2nd Year",
      bio: "Digital media expert specializing in video production, eager to master backend programming.",
      teaches: ["Video Editing", "Canva", "Media"],
      learns: ["Python", "Data Analysis"],
      category: "Media",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Rohan",
      dept: "Marketing",
      year: "4th Year",
      bio: "Growth marketer interested in tech automation, data analysis, and effective public speaking.",
      teaches: ["Digital Marketing", "Public Speaking", "Business"],
      learns: ["Graphic Design", "Canva"],
      category: "Marketing",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Sneha",
      dept: "Design",
      year: "3rd Year",
      bio: "Product designer crafting intuitive UI/UX systems. Passionate about machine learning applications.",
      teaches: ["UI/UX", "Graphic Design", "Figma"],
      learns: ["Python", "Machine Learning"],
      category: "Design",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "Vikram",
      dept: "AI & ML",
      year: "4th Year",
      bio: "AI researcher focusing on neural network architectures. Looking to enhance presentation skills.",
      teaches: ["Machine Learning", "Python"],
      learns: ["Public Speaking", "UI/UX"],
      category: "Science",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      name: "Diya",
      dept: "Communication",
      year: "1st Year",
      bio: "Speech writer and public relations enthusiast looking to learn digital strategy.",
      teaches: ["Public Speaking", "Communication"],
      learns: ["Digital Marketing"],
      category: "Communication",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
    }
  ];

  let goals = [
    {
      id: 101,
      skill: "Video Editing",
      progress: 65,
      targetDate: "30 Sep 2026",
      status: "ongoing",
      milestones: [
        { title: "Learn editing interface", done: true },
        { title: "Basic cuts and transitions", done: true },
        { title: "Complete first project", done: false },
        { title: "Publish final video", done: false }
      ]
    },
    {
      id: 102,
      skill: "Public Speaking",
      progress: 30,
      targetDate: "15 Oct 2026",
      status: "ongoing",
      milestones: [
        { title: "Practice 3-minute speech", done: true },
        { title: "Record presentation", done: false },
        { title: "Deliver live workshop", done: false }
      ]
    },
    {
      id: 103,
      skill: "Digital Marketing",
      progress: 20,
      targetDate: "30 Oct 2026",
      status: "ongoing",
      milestones: [
        { title: "SEO Fundamentals", done: true },
        { title: "Social Media Campaigns", done: false }
      ]
    }
  ];

  let activities = [
    { id: 1, title: "Video Editing Session", partner: "Priya", duration: 60, date: "21 Sep 2026", notes: "Practiced timeline transitions and color grading.", type: "learning" },
    { id: 2, title: "Python Discussion", partner: "Aarav", duration: 45, date: "17 Sep 2026", notes: "Reviewed data structures & list comprehension.", type: "teaching" },
    { id: 3, title: "Graphic Design Session", partner: "Sneha", duration: 90, date: "12 Sep 2026", notes: "Explored visual hierarchy and grid layouts.", type: "learning" }
  ];

  const achievements = [
    { id: 1, title: "FIRST GOAL", desc: "Complete your first learning goal.", icon: "🎯", unlocked: true },
    { id: 2, title: "7 DAY STREAK", desc: "Learn consistently for 7 days.", icon: "🔥", unlocked: true },
    { id: 3, title: "KNOWLEDGE SHARER", desc: "Complete 5 knowledge-sharing sessions.", icon: "🤝", unlocked: true },
    { id: 4, title: "SKILL EXPLORER", desc: "Add 5 different skills.", icon: "🚀", unlocked: true },
    { id: 5, title: "ACTIVE LEARNER", desc: "Complete 10 sessions.", icon: "⚡", unlocked: true },
    { id: 6, title: "COMMUNITY BUILDER", desc: "Connect with 5 people.", icon: "🌟", unlocked: false }
  ];

  const weeklyActivity = [
    { day: "MON", hours: 2 },
    { day: "TUE", hours: 3 },
    { day: "WED", hours: 1.5 },
    { day: "THU", hours: 4 },
    { day: "FRI", hours: 2.5 },
    { day: "SAT", hours: 3.5 },
    { day: "SUN", hours: 1 }
  ];

  // ==========================================
  // 2. MATCHING ALGORITHM
  // ==========================================

  function calculateMatch(user) {
    // 1-way: currentUser wants to learn what 'user' teaches
    const myMatch = currentUser.learns.filter(s => user.teaches.includes(s));
    // 2-way: 'user' wants to learn what currentUser teaches
    const theirMatch = user.learns.filter(s => currentUser.teaches.includes(s));

    const isMutual = (myMatch.length > 0 && theirMatch.length > 0);
    const score = Math.min(98, 70 + (myMatch.length * 10) + (theirMatch.length * 12));

    return {
      myMatch,
      theirMatch,
      isMutual,
      score
    };
  }

  // ==========================================
  // 3. NAVIGATION & VIEW SWITCHING
  // ==========================================

  const landingView = document.getElementById('landing-view');
  const appLayout = document.getElementById('app-layout');
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.app-view');

  function switchView(viewTarget) {
    views.forEach(v => v.classList.add('hidden'));
    const targetSection = document.getElementById(`view-${viewTarget}`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewTarget) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // View specific renders
    if (viewTarget === 'dashboard') renderDashboard();
    if (viewTarget === 'discover') renderDiscover('All');
    if (viewTarget === 'matches') renderMatches();
    if (viewTarget === 'goals') renderGoals('ongoing');
    if (viewTarget === 'tracker') renderTracker();
    if (viewTarget === 'analytics') renderAnalytics();
    if (viewTarget === 'achievements') renderAchievements();
    if (viewTarget === 'history') renderHistory('all');
    if (viewTarget === 'profile') renderProfile();
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-view');
      switchView(target);
    });
  });

  // Landing CTAs
  document.getElementById('hero-get-started').addEventListener('click', () => openModal('modal-auth'));
  document.getElementById('landing-join-btn').addEventListener('click', () => openModal('modal-auth'));
  document.getElementById('landing-explore-btn').addEventListener('click', () => openModal('modal-auth'));
  document.getElementById('hero-explore').addEventListener('click', () => openModal('modal-auth'));

  function enterApp() {
    landingView.classList.add('hidden');
    appLayout.classList.remove('hidden');
    switchView('dashboard');
    showToast(`Welcome back, ${currentUser.name}!`);
  }

  // Auth Form
  document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('auth-name').value.trim();
    const emailInput = document.getElementById('auth-email').value.trim();
    const deptInput = document.getElementById('auth-dept').value.trim();
    const yearInput = document.getElementById('auth-year').value.trim();

    currentUser.name = nameInput || "Demo User";
    currentUser.email = emailInput || "demo@skillnexus.edu";
    currentUser.dept = deptInput || "General";
    currentUser.year = yearInput || "1st Year";

    closeModal('modal-auth');
    enterApp();
  });

  document.getElementById('auth-demo-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('auth-name').value.trim();
    const emailInput = document.getElementById('auth-email').value.trim();
    const deptInput = document.getElementById('auth-dept').value.trim();
    const yearInput = document.getElementById('auth-year').value.trim();

    currentUser.name = nameInput || "Demo User";
    currentUser.email = emailInput || "demo@skillnexus.edu";
    currentUser.dept = deptInput || "General";
    currentUser.year = yearInput || "1st Year";

    closeModal('modal-auth');
    enterApp();
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    appLayout.classList.add('hidden');
    landingView.classList.remove('hidden');
    showToast("Logged out successfully.");
  });

  // Notifications Toggle
  const notifBtn = document.getElementById('notif-toggle-btn');
  const notifPanel = document.getElementById('notif-panel');
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('hidden');
  });
  document.body.addEventListener('click', () => {
    notifPanel.classList.add('hidden');
  });

  document.getElementById('clear-notif').addEventListener('click', () => {
    document.getElementById('notif-badge').style.display = 'none';
    showToast("Notifications marked as read.");
  });

  // ==========================================
  // 4. RENDERING FUNCTIONS
  // ==========================================

  // Toast System
  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Render Dashboard
  function renderDashboard() {
    document.getElementById('dash-greeting-name').textContent = currentUser.name.split(' ')[0];
    document.getElementById('topbar-user-name').textContent = currentUser.name.split(' ')[0];
    document.getElementById('topbar-user-dept').textContent = `${currentUser.dept} • ${currentUser.year}`;
    const avatarPill = document.getElementById('user-avatar-pill');
    if (avatarPill) avatarPill.textContent = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
    document.getElementById('stat-offered').textContent = currentUser.teaches.length;
    document.getElementById('stat-learning').textContent = currentUser.learns.length;
    document.getElementById('stat-sessions').textContent = activities.length + 9;

    // Progress bars
    const progContainer = document.getElementById('dashboard-progress-list');
    progContainer.innerHTML = '';
    const sampleProgress = [
      { name: "Python", val: 85 },
      { name: "Graphic Design", val: 60 },
      { name: "Video Editing", val: 40 },
      { name: "Digital Marketing", val: 30 }
    ];

    sampleProgress.forEach(item => {
      progContainer.innerHTML += `
        <div class="progress-item">
          <div class="progress-info">
            <span>${item.name}</span>
            <span style="color: var(--gold-light); font-weight: 700;">${item.val}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${item.val}%"></div>
          </div>
        </div>
      `;
    });

    // Recommendations
    const recContainer = document.getElementById('dashboard-recommended-list');
    recContainer.innerHTML = '';

    users.slice(0, 3).forEach(user => {
      const match = calculateMatch(user);
      const isConnected = currentUser.connectedIds.includes(user.id);
      recContainer.innerHTML += `
        <div class="card-glass" style="padding: 1rem; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="avatar" style="background-image: url('${user.avatar}')"></div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${user.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${user.dept} • ${user.year}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="match-badge">${match.score}% MATCH</span>
            <button class="btn ${isConnected ? 'btn-secondary' : 'btn-primary'} btn-sm connect-btn" data-id="${user.id}">
              ${isConnected ? 'CONNECTED' : 'CONNECT'}
            </button>
          </div>
        </div>
      `;
    });

    attachConnectListeners();
  }

  // Render Discover View
  function renderDiscover(selectedCategory = 'All', searchQuery = '') {
    const grid = document.getElementById('discover-users-grid');
    grid.innerHTML = '';

    let filtered = users;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(u => u.category === selectedCategory || u.teaches.includes(selectedCategory));
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(q) ||
        u.dept.toLowerCase().includes(q) ||
        u.teaches.some(s => s.toLowerCase().includes(q)) ||
        u.learns.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
          No learners found matching your criteria. Try another search or filter!
        </div>
      `;
      return;
    }

    filtered.forEach(user => {
      const match = calculateMatch(user);
      const isConnected = currentUser.connectedIds.includes(user.id);

      const teachPills = user.teaches.map(s => `<span class="pill pill-gold">${s}</span>`).join('');
      const learnPills = user.learns.map(s => `<span class="pill">${s}</span>`).join('');

      grid.innerHTML += `
        <div class="card user-card">
          <div class="user-card-header">
            <div class="user-card-avatar" style="background-image: url('${user.avatar}')"></div>
            <div class="user-card-names">
              <div class="user-card-name">${user.name}</div>
              <div class="user-card-dept">${user.dept} • ${user.year}</div>
            </div>
            <div class="match-badge">${match.score}% MATCH</div>
          </div>

          <p style="font-size: 0.8rem; margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.4;">${user.bio}</p>

          <div class="skill-tag-group">
            <div class="skill-tag-label">CAN TEACH</div>
            <div class="skills-container">${teachPills}</div>
          </div>

          <div class="skill-tag-group">
            <div class="skill-tag-label">WANTS TO LEARN</div>
            <div class="skills-container">${learnPills}</div>
          </div>

          <div class="user-card-actions">
            <button class="btn btn-secondary btn-sm view-profile-btn" data-id="${user.id}" style="flex: 1;">VIEW PROFILE</button>
            <button class="btn ${isConnected ? 'btn-secondary' : 'btn-primary'} btn-sm connect-btn" data-id="${user.id}" style="flex: 1;">
              ${isConnected ? 'CONNECTED' : 'CONNECT'}
            </button>
          </div>
        </div>
      `;
    });

    attachConnectListeners();
    attachProfileModalListeners();
  }

  // Category Filter Pills Handler
  const catBtns = document.querySelectorAll('.cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDiscover(btn.getAttribute('data-cat'));
    });
  });

  // Global Search Handler
  document.getElementById('global-search').addEventListener('input', (e) => {
    const val = e.target.value;
    if (!document.getElementById('view-discover').classList.contains('hidden')) {
      const activeCat = document.querySelector('.cat-btn.active').getAttribute('data-cat');
      renderDiscover(activeCat, val);
    } else {
      switchView('discover');
      renderDiscover('All', val);
    }
  });

  // Render Skill Matches View
  function renderMatches() {
    const mutualContainer = document.getElementById('mutual-match-container');
    const matchesGrid = document.getElementById('matches-users-grid');
    mutualContainer.innerHTML = '';
    matchesGrid.innerHTML = '';

    // Find first mutual match user
    const mutualUser = users.find(u => calculateMatch(u).isMutual);

    if (mutualUser) {
      const matchDetails = calculateMatch(mutualUser);
      mutualContainer.innerHTML = `
        <div class="mutual-match-banner">
          <div class="mutual-header-tag">✦ MUTUAL SKILL EXCHANGE ✦</div>
          <div class="exchange-diagram">
            <div class="exchange-user-box">
              <div class="exchange-user-avatar" style="background-image: url('${currentUser.avatar}')"></div>
              <div style="font-weight: 700; font-size: 1rem;">${currentUser.name.split(' ')[0]} (YOU)</div>
              <div style="font-size: 0.75rem; color: var(--gold-light);">Teaches: ${currentUser.teaches[0]}</div>
            </div>

            <div class="exchange-arrows">
              <span class="exchange-score">${matchDetails.score}%</span>
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-light);">Two-Way Opportunity</span>
              <span style="font-size: 1.2rem;">⇄</span>
            </div>

            <div class="exchange-user-box">
              <div class="exchange-user-avatar" style="background-image: url('${mutualUser.avatar}')"></div>
              <div style="font-weight: 700; font-size: 1rem;">${mutualUser.name}</div>
              <div style="font-size: 0.75rem; color: var(--gold-light);">Teaches: ${mutualUser.teaches[0]}</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 1.5rem;">
            <button class="btn btn-primary connect-btn" data-id="${mutualUser.id}">
              ${currentUser.connectedIds.includes(mutualUser.id) ? 'CONNECTED & LEARNING' : 'CONNECT & LEARN →'}
            </button>
          </div>
        </div>
      `;
    }

    // Render other matching users
    users.forEach(user => {
      const match = calculateMatch(user);
      const isConnected = currentUser.connectedIds.includes(user.id);
      const teachPills = user.teaches.map(s => `<span class="pill pill-gold">${s}</span>`).join('');
      const learnPills = user.learns.map(s => `<span class="pill">${s}</span>`).join('');

      matchesGrid.innerHTML += `
        <div class="card user-card">
          <div class="user-card-header">
            <div class="user-card-avatar" style="background-image: url('${user.avatar}')"></div>
            <div class="user-card-names">
              <div class="user-card-name">${user.name}</div>
              <div class="user-card-dept">${user.dept} • ${user.year}</div>
            </div>
            <div class="match-badge">${match.score}% MATCH</div>
          </div>

          <div class="skill-tag-group">
            <div class="skill-tag-label">CAN TEACH YOU</div>
            <div class="skills-container">${teachPills}</div>
          </div>

          <div class="skill-tag-group">
            <div class="skill-tag-label">WANTS TO LEARN FROM YOU</div>
            <div class="skills-container">${learnPills}</div>
          </div>

          <div class="user-card-actions">
            <button class="btn btn-secondary btn-sm view-profile-btn" data-id="${user.id}" style="flex: 1;">VIEW DETAILS</button>
            <button class="btn ${isConnected ? 'btn-secondary' : 'btn-primary'} btn-sm connect-btn" data-id="${user.id}" style="flex: 1;">
              ${isConnected ? 'CONNECTED' : 'CONNECT'}
            </button>
          </div>
        </div>
      `;
    });

    attachConnectListeners();
    attachProfileModalListeners();
  }

  // Render Learning Goals View
  function renderGoals(filterStatus = 'ongoing') {
    const grid = document.getElementById('goals-list-grid');
    grid.innerHTML = '';

    const filtered = goals.filter(g => g.status === filterStatus);
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
          No ${filterStatus} goals yet. Click '+ ADD GOAL' to create one!
        </div>
      `;
      return;
    }

    filtered.forEach(goal => {
      const milestoneItems = goal.milestones.map((m, idx) => `
        <li class="milestone-item">
          <input type="checkbox" class="milestone-checkbox" data-goal="${goal.id}" data-idx="${idx}" ${m.done ? 'checked' : ''}>
          <span style="${m.done ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${m.title}</span>
        </li>
      `).join('');

      grid.innerHTML += `
        <div class="card goal-card">
          <div class="goal-header">
            <div>
              <div class="goal-title">${goal.skill}</div>
              <div class="goal-date">Target: ${goal.targetDate}</div>
            </div>
            <div style="font-weight: 800; color: var(--gold-light); font-size: 1.1rem;">${goal.progress}%</div>
          </div>

          <div class="progress-track">
            <div class="progress-fill" style="width: ${goal.progress}%"></div>
          </div>

          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.4rem;">MILESTONES</div>
            <ul class="milestones-list">${milestoneItems}</ul>
          </div>
        </div>
      `;
    });

    // Attach milestone checkbox toggles
    document.querySelectorAll('.milestone-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const goalId = parseInt(e.target.getAttribute('data-goal'));
        const idx = parseInt(e.target.getAttribute('data-idx'));
        const targetGoal = goals.find(g => g.id === goalId);
        if (targetGoal) {
          targetGoal.milestones[idx].done = e.target.checked;
          const completedCount = targetGoal.milestones.filter(m => m.done).length;
          targetGoal.progress = Math.round((completedCount / targetGoal.milestones.length) * 100);
          if (targetGoal.progress === 100) targetGoal.status = 'completed';
          renderGoals(filterStatus);
          showToast(`Progress updated for ${targetGoal.skill}!`);
        }
      });
    });
  }

  // Goals Tab Switcher
  const goalTabs = document.querySelectorAll('[data-goaltab]');
  goalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      goalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGoals(tab.getAttribute('data-goaltab'));
    });
  });

  // Add Goal Modal Form
  document.getElementById('open-add-goal-btn').addEventListener('click', () => openModal('modal-add-goal'));

  document.getElementById('add-goal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const skill = document.getElementById('goal-skill-name').value;
    const targetDate = document.getElementById('goal-target-date').value || "30 Oct 2026";
    const startingProg = parseInt(document.getElementById('goal-starting-prog').value) || 0;

    const newGoal = {
      id: Date.now(),
      skill,
      progress: startingProg,
      targetDate,
      status: "ongoing",
      milestones: [
        { title: "Understand fundamentals", done: startingProg > 0 },
        { title: "Complete practical exercises", done: false },
        { title: "Build real-world project", done: false }
      ]
    };

    goals.unshift(newGoal);
    closeModal('modal-add-goal');
    renderGoals('ongoing');
    showToast(`New learning goal '${skill}' created!`);
  });

  // Render Tracker View
  function renderTracker() {
    const skillSelect = document.getElementById('session-skill');
    const partnerSelect = document.getElementById('session-partner');

    skillSelect.innerHTML = '<option value="">-- Select Skill --</option>';
    currentUser.learns.concat(currentUser.teaches).forEach(s => {
      skillSelect.innerHTML += `<option value="${s}">${s}</option>`;
    });

    partnerSelect.innerHTML = '<option value="">-- Select Partner --</option>';
    users.forEach(u => {
      partnerSelect.innerHTML += `<option value="${u.name}">${u.name} (${u.dept})</option>`;
    });

    // Render Recent Activities Timeline
    const timeline = document.getElementById('recent-activities-timeline');
    timeline.innerHTML = '';
    activities.forEach(act => {
      timeline.innerHTML += `
        <div class="timeline-item">
          <div class="timeline-title">${act.title}</div>
          <div class="timeline-meta">with ${act.partner} • ${act.duration} min • ${act.date}</div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.4rem;">${act.notes}</p>
        </div>
      `;
    });
  }

  // Record Session Form Handler
  document.getElementById('record-session-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const skill = document.getElementById('session-skill').value;
    const partner = document.getElementById('session-partner').value;
    const duration = document.getElementById('session-duration').value;
    const date = document.getElementById('session-date').value || "Today";
    const notes = document.getElementById('session-notes').value || "Knowledge exchange session.";

    activities.unshift({
      id: Date.now(),
      title: `${skill} Session`,
      partner,
      duration,
      date,
      notes,
      type: "learning"
    });

    renderTracker();
    showToast(`Session recorded with ${partner}!`);
    document.getElementById('record-session-form').reset();
  });

  // Render Analytics View
  function renderAnalytics() {
    document.getElementById('analytics-total-sessions').textContent = activities.length + 21;
    document.getElementById('analytics-goals-completed').textContent = goals.filter(g => g.status === 'completed').length + 5;
    document.getElementById('analytics-skills-dev').textContent = currentUser.teaches.length + currentUser.learns.length;

    // Render pure CSS/JS Bar Chart
    const barContainer = document.getElementById('bar-chart-bars');
    barContainer.innerHTML = '';
    const maxVal = 5;

    weeklyActivity.forEach(item => {
      const heightPercent = Math.round((item.hours / maxVal) * 100);
      barContainer.innerHTML += `
        <div class="chart-bar-wrapper">
          <div class="chart-bar" style="height: ${heightPercent}%;">
            <div class="chart-bar-val">${item.hours}h</div>
          </div>
          <div class="chart-label">${item.day}</div>
        </div>
      `;
    });
  }

  // Render Achievements View
  function renderAchievements() {
    const grid = document.getElementById('achievements-grid-container');
    grid.innerHTML = '';

    achievements.forEach(ach => {
      grid.innerHTML += `
        <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${ach.icon}</div>
          <div class="achievement-info">
            <h4 style="color: ${ach.unlocked ? 'var(--gold-light)' : 'var(--text-muted)'}">${ach.title}</h4>
            <p style="color: var(--text-secondary);">${ach.desc}</p>
          </div>
        </div>
      `;
    });
  }

  // Render Learning History View
  function renderHistory(filter = 'all') {
    const timeline = document.getElementById('history-timeline');
    timeline.innerHTML = '';

    activities.forEach(act => {
      timeline.innerHTML += `
        <div class="timeline-item">
          <div class="timeline-title">${act.title}</div>
          <div class="timeline-meta">with ${act.partner} • ${act.duration} mins • ${act.date}</div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem;">${act.notes}</p>
        </div>
      `;
    });
  }

  // Render My Profile View
  function renderProfile() {
    document.getElementById('profile-page-name').textContent = currentUser.name;
    document.getElementById('profile-page-dept').textContent = `${currentUser.dept} • ${currentUser.year}`;
    document.getElementById('profile-skills-count').textContent = currentUser.teaches.length + currentUser.learns.length;

    // Teach Chips
    const teachContainer = document.getElementById('profile-teach-chips');
    teachContainer.innerHTML = '';
    currentUser.teaches.forEach((skill, idx) => {
      teachContainer.innerHTML += `
        <div class="editable-skill-chip">
          <span>${skill}</span>
          <button class="chip-remove" data-type="teach" data-idx="${idx}">&times;</button>
        </div>
      `;
    });

    // Learn Chips
    const learnContainer = document.getElementById('profile-learn-chips');
    learnContainer.innerHTML = '';
    currentUser.learns.forEach((skill, idx) => {
      learnContainer.innerHTML += `
        <div class="editable-skill-chip">
          <span>${skill}</span>
          <button class="chip-remove" data-type="learn" data-idx="${idx}">&times;</button>
        </div>
      `;
    });

    // Remove Chip Handlers
    document.querySelectorAll('.chip-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data-type');
        const idx = parseInt(e.target.getAttribute('data-idx'));
        if (type === 'teach') {
          currentUser.teaches.splice(idx, 1);
        } else {
          currentUser.learns.splice(idx, 1);
        }
        renderProfile();
        showToast("Skill removed from profile.");
      });
    });
  }

  // Add Skill Modal Handlers
  document.getElementById('add-teach-skill-btn').addEventListener('click', () => {
    document.getElementById('modal-skill-title').textContent = "Add Skill You Can Teach";
    document.getElementById('skill-type-hidden').value = "teach";
    openModal('modal-add-skill');
  });

  document.getElementById('add-learn-skill-btn').addEventListener('click', () => {
    document.getElementById('modal-skill-title').textContent = "Add Skill You Want To Learn";
    document.getElementById('skill-type-hidden').value = "learn";
    openModal('modal-add-skill');
  });

  document.getElementById('add-skill-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('skill-type-hidden').value;
    const newSkill = document.getElementById('new-skill-input').value.trim();

    if (newSkill) {
      if (type === 'teach') {
        if (!currentUser.teaches.includes(newSkill)) currentUser.teaches.push(newSkill);
      } else {
        if (!currentUser.learns.includes(newSkill)) currentUser.learns.push(newSkill);
      }
      closeModal('modal-add-skill');
      document.getElementById('new-skill-input').value = '';
      renderProfile();
      showToast(`Skill '${newSkill}' added to profile!`);
    }
  });

  // Attach Connect Listeners
  function attachConnectListeners() {
    document.querySelectorAll('.connect-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = parseInt(e.target.getAttribute('data-id'));
        const targetUser = users.find(u => u.id === userId);
        if (!currentUser.connectedIds.includes(userId)) {
          currentUser.connectedIds.push(userId);
          e.target.textContent = 'CONNECTED';
          e.target.classList.remove('btn-primary');
          e.target.classList.add('btn-secondary');
          showToast(`✓ Connection request sent to ${targetUser.name}!`);
        }
      });
    });
  }

  // Attach Profile Modal Listeners
  function attachProfileModalListeners() {
    document.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = parseInt(e.target.getAttribute('data-id'));
        const user = users.find(u => u.id === userId);
        const match = calculateMatch(user);

        const content = document.getElementById('modal-profile-content');
        content.innerHTML = `
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <div class="user-card-avatar" style="width: 80px; height: 80px; margin: 0 auto 1rem auto; background-image: url('${user.avatar}')"></div>
            <h2 style="font-size: 1.4rem;">${user.name}</h2>
            <p style="color: var(--gold-light); font-weight: 600; font-size: 0.9rem;">${user.dept} • ${user.year}</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <div class="skill-tag-label" style="margin-bottom: 0.3rem;">ABOUT</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${user.bio}</p>
          </div>

          <div class="skill-tag-group" style="margin-bottom: 1rem;">
            <div class="skill-tag-label">SKILLS THEY CAN TEACH</div>
            <div class="skills-container">${user.teaches.map(s => `<span class="pill pill-gold">${s}</span>`).join('')}</div>
          </div>

          <div class="skill-tag-group" style="margin-bottom: 1.5rem;">
            <div class="skill-tag-label">SKILLS THEY WANT TO LEARN</div>
            <div class="skills-container">${user.learns.map(s => `<span class="pill">${s}</span>`).join('')}</div>
          </div>

          <div style="text-align: center; padding: 1rem; background: rgba(214,168,95,0.1); border: 1px solid var(--border); border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
            <span style="font-weight: 800; color: var(--gold-light); font-size: 1.1rem;">${match.score}% SKILL MATCH</span>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">High compatibility for mutual peer learning</p>
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="btn btn-primary connect-btn" data-id="${user.id}" style="flex: 1;">
              ${currentUser.connectedIds.includes(user.id) ? 'CONNECTED' : 'CONNECT'}
            </button>
          </div>
        `;

        openModal('modal-profile');
        attachConnectListeners();
      });
    });
  }

  // ==========================================
  // 5. HELPER MODAL UTILITIES
  // ==========================================

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  }

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.add('hidden');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  });

});
