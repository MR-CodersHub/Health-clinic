/**
 * Dashboard Rendering Logic
 */

const Dashboard = {
    initUser: () => {
        if (!Auth.checkAuth('user')) return;

        const user = State.getCurrentUser();
        if (!user) return;

        // Render Profile Info
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-phone').textContent = user.phone || 'N/A';
        document.getElementById('user-initial').textContent = user.name.charAt(0).toUpperCase();

        // Render Appointments
        const appointments = State.getAppointments().filter(app =>
            app.userEmail === user.email // Assuming we link by email
        );

        const listContainer = document.getElementById('appointments-list');
        const statsCount = document.getElementById('appointment-count');

        if (statsCount) statsCount.textContent = appointments.length;

        if (appointments.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📅</div>
                    <h3 class="text-lg font-bold text-gray-900">No Appointments Yet</h3>
                    <p class="text-gray-500 mb-6">You haven't booked any consultations yet.</p>
                    <a href="../pages/appointment.html" class="text-medical font-bold hover:underline">Book your first appointment &rarr;</a>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = appointments.map(app => `
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div class="flex items-center gap-4 mb-4 md:mb-0">
                    <div class="w-12 h-12 bg-medical-light text-medical rounded-full flex items-center justify-center font-bold text-xl">
                        ${getServiceIcon(app.department)}
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-900 capitalize">${app.department} Consultation</h4>
                        <p class="text-sm text-gray-500">${new Date(app.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${isUpcoming(app.date) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
                        ${isUpcoming(app.date) ? 'Upcoming' : 'Completed'}
                    </span>
                    <button class="text-gray-400 hover:text-medical transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        `).join('');
    },

    initAdmin: () => {
        if (!Auth.checkAuth('admin')) return;

        const stats = State.getStats();
        // Update Stats
        document.getElementById('total-users').textContent = stats.totalUsers;
        document.getElementById('total-appointments').textContent = stats.totalAppointments;

        // Render Recent Appointments Table
        const appointments = State.getAppointments().reverse(); // Show newest first
        const tableBody = document.getElementById('appointments-table-body');

        tableBody.innerHTML = appointments.map(app => `
            <tr class="hover:bg-gray-50 transition-colors border-b border-gray-100">
                <td class="py-4 px-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                           ${app.patientName ? app.patientName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <p class="font-bold text-gray-900 text-sm">${app.patientName}</p>
                            <p class="text-xs text-gray-500">${app.patientEmail}</p>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <span class="capitalize text-sm font-medium text-gray-700">${app.department}</span>
                </td>
                <td class="py-4 px-4 text-sm text-gray-600">
                    ${new Date(app.date).toLocaleDateString()}
                </td>
                 <td class="py-4 px-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${isUpcoming(app.date) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
                        ${isUpcoming(app.date) ? 'Scheduled' : 'Done'}
                    </span>
                </td>
            </tr>
        `).join('');

        // Render Users List (Simplified)
        const users = State.getUsers().reverse().slice(0, 5); // Last 5 users
        const usersList = document.getElementById('recent-users-list');
        usersList.innerHTML = users.map(u => `
             <div class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                        ${u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-800">${u.name}</p>
                        <p class="text-xs text-gray-500 capitalize">${u.role}</p>
                    </div>
                </div>
                <div class="text-xs text-gray-400">${new Date(u.createdAt).toLocaleDateString()}</div>
            </div>
        `).join('');
    }
};

// Utils
function getServiceIcon(dept) {
    // Return emoji based on dept or default
    const map = {
        'cardiology': '❤️',
        'dental': '🦷',
        'neurology': '🧠',
        'pediatrics': '👶',
        'ophthalmology': '👁️',
        'orthopedics': '🦴'
    };
    return map[dept.toLowerCase()] || '🩺';
}

function isUpcoming(dateString) {
    return new Date(dateString) >= new Date();
}
