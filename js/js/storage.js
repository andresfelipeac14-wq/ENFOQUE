/* ENFOQUE - STORAGE MANAGER */
const Storage = {
    KEYS: {
        USER: 'enfoque_user_profile',
        PROGRESS: 'enfoque_progress_data',
        COMMUNITY: 'enfoque_community_posts',
        RATING: 'enfoque_app_rating'
    },

    saveUser(profile) {
        localStorage.setItem(this.KEYS.USER, JSON.stringify(profile));
    },

    getUser() {
        const data = localStorage.getItem(this.KEYS.USER);
        return data ? JSON.parse(data) : null;
    },

    saveProgress(progress) {
        localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
    },

    getProgress() {
        const data = localStorage.getItem(this.KEYS.PROGRESS);
        return data ? JSON.parse(data) : { completedExercises: {}, streak: 0, weightHistory: [] };
    },

    saveCommunityPosts(posts) {
        localStorage.setItem(this.KEYS.COMMUNITY, JSON.stringify(posts));
    },

    getCommunityPosts() {
        const data = localStorage.getItem(this.KEYS.COMMUNITY);
        return data ? JSON.parse(data) : [
            { id: 1, author: "Andrés F.", text: "¡Completada la rutina de Pierna! 🔥", date: "Hoy", likes: 5 }
        ];
    },

    saveRating(stars) {
        localStorage.setItem(this.KEYS.RATING, stars);
    },

    getRating() {
        return localStorage.getItem(this.KEYS.RATING) || null;
    }
};
