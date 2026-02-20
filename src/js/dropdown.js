/**
 * Profile Dropdown UI Component
 * - Manages the navbar state based on auth status
 */

const Dropdown = {
    init: () => {
        const user = State.getCurrentUser();
        const placeholder = document.getElementById('auth-dropdown-placeholder');

        if (!placeholder) return;

        // Ensure placeholder is visible on mobile by removing hidden class if present
        placeholder.classList.remove('hidden', 'md:block');

        // Path helpers
        const path = window.location.pathname;
        // Simple heuristic for relative path to appointment page
        const bookBtnLink = (path.includes('/pages/') || path.includes('/dashboard/') || path.includes('/auth/'))
            ? '../pages/appointment.html'
            : 'pages/appointment.html';

        // 1. "Book Appointment" Button - ALWAYS Visible
        const bookBtnHTML = `
            <a href="${bookBtnLink}"
                class="hidden md:inline-block bg-medical text-white px-6 py-2.5 rounded-full font-medium hover:bg-medical-dark transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mr-4">
                Book Appointment
            </a>
        `;

        // 2. Profile Trigger Icon
        const triggerHTML = user
            ? `<div class="w-10 h-10 rounded-full bg-medical text-white flex items-center justify-center font-bold text-lg shadow-md ring-2 ring-gray-100 border-2 border-white cursor-pointer hover:bg-medical-dark transition">${user.name.charAt(0).toUpperCase()}</div>`
            : `<div class="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shadow-sm ring-1 ring-gray-200 cursor-pointer hover:bg-gray-200 transition">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               </div>`;

        // 3. Dropdown Menu Items
        let menuItemsHTML = '';

        if (user) {
            // LOGGED IN
            const dashboardLink = user.role === 'admin' ? Auth.getRedirectPath('admin_dashboard') : Auth.getRedirectPath('user_dashboard');
            menuItemsHTML = `
                <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Signed in as</p>
                    <p class="text-sm font-bold text-gray-900 truncate" title="${user.email}">${user.name}</p>
                </div>
                <div class="py-1">
                    <a href="${dashboardLink}" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-medical-light/30 hover:text-medical transition">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        My Dashboard
                    </a>
                    <a href="#" onclick="Auth.logout()" class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Sign Out
                    </a>
                </div>
            `;
        } else {
            // LOGGED OUT
            const loginPath = Auth.getRedirectPath('login');
            const signupPath = Auth.getRedirectPath('signup');
            menuItemsHTML = `
                <div class="py-1">
                    <p class="px-4 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">Account</p>
                    <a href="${loginPath}" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-medical-light/30 hover:text-medical transition">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                        Log In
                    </a>
                    <a href="${signupPath}" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-medical-light/30 hover:text-medical transition">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        Create Account
                    </a>
                </div>
            `;
        }

        // Render Combined Component
        placeholder.innerHTML = `
            <div class="flex items-center">
                ${bookBtnHTML}
                
                <div class="relative group" id="user-menu-group">
                    <button class="focus:outline-none transition-transform active:scale-95 flex items-center p-1 rounded-full hover:bg-gray-50">
                        ${triggerHTML}
                    </button>
                    
                    <!-- Dropdown Panel -->
                    <div class="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden">
                        ${menuItemsHTML}
                    </div>
                </div>
            </div>
        `;
    }
};

// Initialize dropdown on load
document.addEventListener('DOMContentLoaded', Dropdown.init);
