/* ENFOQUE - CORE APPLICATION ENGINE */
const App = {
    user: null,
    progress: null,

    init() {
        this.user = Storage.getUser();
        this.progress = Storage.getProgress();

        if (!this.user) {
            this.showScreen('screen-landing');
        } else {
            this.showScreen('screen-main-app');
            this.renderDashboard();
        }
    },

    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(id);
        if (target) target.classList.add('active');
    },

    startOnboarding() {
        this.showScreen('screen-onboarding');
        this.showObStep(1);
    },

    showObStep(step) {
        document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active'));
        const currentStep = document.getElementById(`ob-step-${step}`);
        if (currentStep) currentStep.classList.add('active');
        const stepNum = document.getElementById('onboarding-step-num');
        if (stepNum) stepNum.innerText = step;
    },

    tempUser: {},

    selectGoal(goal) {
        this.tempUser.goal = goal;
        this.showObStep(2);
    },

    nextOnboardingStep(step) {
        if (step === 3) {
            this.tempUser.name = document.getElementById('ob-name').value || "Atleta";
            this.tempUser.age = document.getElementById('ob-age').value || 30;
            this.tempUser.city = document.getElementById('ob-city').value || "Medellín";
            this.tempUser.weight = parseFloat(document.getElementById('ob-weight').value) || 75;
            this.tempUser.height = parseFloat(document.getElementById('ob-height').value) || 170;
            this.showObStep(3);
        }
    },

    selectLevel(level) {
        this.tempUser.level = level;
        this.tempUser.currentWeek = 1;
        
        const summary = document.getElementById('ob-summary');
        if (summary) {
            summary.innerHTML = `
                <p><strong>Atleta:</strong> ${this.tempUser.name}</p>
                <p><strong>Objetivo:</strong> ${this.tempUser.goal === 'gain' ? 'Ganar Masa Muscular' : 'Perder Grasa'}</p>
                <p><strong>Peso Inicial:</strong> ${this.tempUser.weight} kg</p>
            `;
        }
        this.showObStep(4);
    },

    finishOnboarding() {
        this.user = { ...this.tempUser };
        Storage.saveUser(this.user);
        this.showScreen('screen-main-app');
        this.renderDashboard();
    },

    navigateTo(tabName) {
        document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        
        const tab = document.getElementById(`tab-${tabName}`);
        if (tab) tab.classList.add('active');

        if (tabName === 'profile') this.renderProfile();
    },

    renderDashboard() {
        const userName = document.getElementById('header-user-name');
        if (userName) userName.innerText = `Hola, ${this.user.name} 👋`;
        
        const userBadge = document.getElementById('header-user-badge');
        if (userBadge) userBadge.innerText = `SEMANA ${this.user.currentWeek}`;

        const weight = document.getElementById('dash-weight');
        if (weight) weight.innerText = this.user.weight;

        const streak = document.getElementById('dash-streak');
        if (streak) streak.innerText = this.progress.streak || 0;
    },

    renderProfile() {
        const name = document.getElementById('prof-name');
        if (name) name.value = this.user.name;
        
        const weight = document.getElementById('prof-weight');
        if (weight) weight.value = this.user.weight;

        const goal = document.getElementById('prof-goal');
        if (goal) goal.value = this.user.goal;
    },

    updateProfile() {
        this.user.name = document.getElementById('prof-name').value;
        this.user.weight = parseFloat(document.getElementById('prof-weight').value);
        this.user.goal = document.getElementById('prof-goal').value;
        Storage.saveUser(this.user);
        alert("Perfil actualizado correctamente.");
        this.renderDashboard();
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
