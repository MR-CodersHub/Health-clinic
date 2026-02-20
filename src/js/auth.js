/**
 * Authentication Logic
 * - Depends on state.js
 */

const Auth = {
    register: (name, email, phone, password, role = 'user') => {
        try {
            const newUser = {
                name,
                email,
                phone,
                password, // In a real app, never store plain text passwords!
                role,
                createdAt: new Date().toISOString()
            };

            State.saveUser(newUser);
            return { success: true, message: "Registration successful!" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    login: (email, password) => {
        const user = State.findUser(email, password);
        if (user) {
            State.loginUser(user);
            return { success: true, user };
        } else {
            return { success: false, message: "Invalid email or password." };
        }
    },

    logout: () => {
        State.logout();
        window.location.href = Auth.getRedirectPath('login');
    },

    isLoggedIn: () => {
        return !!State.getCurrentUser();
    },

    checkAuth: (requiredRole = null) => {
        const user = State.getCurrentUser();

        if (!user) {
            // Not logged in, redirect to login
            // Use relative path handling based on current location
            window.location.href = Auth.getRedirectPath('login');
            return false;
        }

        if (requiredRole && user.role !== requiredRole) {
            // Wrong role, redirect to appropriate dashboard
            window.location.href = Auth.getRedirectPath(user.role === 'admin' ? 'admin_dashboard' : 'user_dashboard');
            return false;
        }

        return true;
    },

    getRedirectPath: (target) => {
        // Simple helper to handle path resolution from different directory depths
        // Assuming structure:
        // /index.html
        // /auth/login.html
        // /dashboard/user-dashboard.html

        const path = window.location.pathname;
        const isRoot = path.endsWith('index.html') || path.endsWith('/') || path === '/MR%20CodersHub/frontend%20-%20phase%202/Health%20-%20Clinic/';
        // Note: Better path handling might be needed for production, but this works for this structure

        // Define absolute-ish paths relative to root or handle ..
        // Let's assume we always want to go relative to where we are.

        let rootPrefix = '';
        if (path.includes('/auth/') || path.includes('/pages/') || path.includes('/dashboard/')) {
            rootPrefix = '../';
        }

        switch (target) {
            case 'login': return rootPrefix + 'auth/login.html';
            case 'signup': return rootPrefix + 'auth/signup.html';
            case 'admin_dashboard': return rootPrefix + 'dashboard/admin-dashboard.html';
            case 'user_dashboard': return rootPrefix + 'dashboard/user-dashboard.html';
            case 'home': return rootPrefix + 'index.html';
            default: return rootPrefix + 'index.html';
        }
    }
};
