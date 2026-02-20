/**
 * Main Entry Point logic for typical pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Path Validation Check
    // Handle specific issue where server might serve a page for invalid paths like /.............
    const invalidPath = window.location.pathname.includes('..') || (window.location.pathname.length > 1 && window.location.pathname.endsWith('.'));
    if (invalidPath) {
        window.location.replace('/index.html');
        return; // Stop further execution
    }

    // Check if we need to secure the page
    // Note: Dashboard checks happen inside dashboard.js init methods, 
    // but general redirects can happen here if needed.

    // Future expansion: Global error handling, etc.

    // Initialize Dropdown (handled in dropdown.js on load, but ensuring order)
    if (typeof Dropdown !== 'undefined' && typeof Dropdown.init === 'function') {
        // Already initialized by event listener in dropdown.js
    }

    // Active Navigation Highlight
    const currentPath = window.location.pathname;
    const desktopLinks = document.querySelectorAll('#desktop-nav a');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    const allLinks = [...desktopLinks, ...mobileLinks];

    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Check if the link matches the current path
        // Handling relative paths by comparing the end of the pathname
        // e.g. href="about.html" matches "/about.html" or "/project/about.html"
        // Also handle root "/" matching "index.html"

        let isActive = false;

        // Normalize paths for comparison
        const linkPath = href.split('?')[0].split('#')[0];
        const currentFile = currentPath.split('/').pop() || 'index.html';

        // Simple filename comparison
        if (linkPath === currentFile) {
            isActive = true;
        } else if (linkPath === '/' && currentFile === 'index.html') {
            isActive = true;
        } else if (linkPath.endsWith(currentFile) && currentFile !== '') {
            isActive = true;
        }

        if (isActive) {
            // Apply active styles
            link.classList.add('text-medical');

            // For desktop nav with underline
            const underline = link.querySelector('.nav-underline');
            if (underline) {
                underline.classList.remove('w-0');
                underline.classList.add('w-full');
            }
        }
    });
});
