/**
 * State Management for Health Clinic App
 * - Handles all interactions with localStorage and sessionStorage
 */

const STORAGE_KEYS = {
    USERS: 'medicare_users',
    CURRENT_USER: 'medicare_current_user', // Session storage
    APPOINTMENTS: 'medicare_appointments',
};

const State = {
    // Users
    getUsers: () => {
        const users = localStorage.getItem(STORAGE_KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    saveUser: (user) => {
        const users = State.getUsers();
        // Prevent duplicate emails
        if (users.find(u => u.email === user.email)) {
            throw new Error("User with this email already exists.");
        }
        users.push(user);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    },

    findUser: (email, password) => {
        // Hardcoded admin access as per requirement
        if (email === 'admin@gmail.com' && password === 'admin123') {
            return {
                name: 'Administrator',
                email: 'admin@gmail.com',
                password: 'admin123',
                role: 'admin',
                phone: '123-456-7890',
                createdAt: new Date().toISOString()
            };
        }

        const users = State.getUsers();
        return users.find(u => u.email === email && u.password === password);
    },

    // Session (Auth)
    loginUser: (user) => {
        // Store only necessary info in session
        const sessionUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        };
        sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
    },

    getCurrentUser: () => {
        const user = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    },

    logout: () => {
        sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    // Appointments
    getAppointments: () => {
        const appointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
        return appointments ? JSON.parse(appointments) : [];
    },

    saveAppointment: (appointment) => {
        const appointments = State.getAppointments();
        // Add ID if not present
        if (!appointment.id) {
            appointment.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        }
        appointment.createdAt = new Date().toISOString();
        appointments.push(appointment);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    },

    // Get stats for admin
    getStats: () => {
        return {
            totalUsers: State.getUsers().length,
            totalAppointments: State.getAppointments().length,
        };
    }
};

// Export for usage if using modules, but we are using vanilla script tags
// so we attach to window or just let it define global consts.
// window.AppState = State; 
