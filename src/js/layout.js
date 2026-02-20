/**
 * layout.js
 * Handles loading and injecting consistent Navbar and Footer across all pages.
 * Handles path resolution for root vs pages/ directory.
 * Highlights active navigation link.
 */

document.addEventListener('DOMContentLoaded', () => {
    loadLayout();
});

async function loadLayout() {
    const isPagesDir = window.location.pathname.includes('/pages/');
    const basePath = isPagesDir ? '../' : './';
    const componentPath = isPagesDir ? '../components/' : 'components/';

    try {
        // Load Navbar
        const navbarRes = await fetch(`${componentPath}navbar.html`);
        if (navbarRes.ok) {
            let navbarHtml = await navbarRes.text();
            navbarHtml = fixPaths(navbarHtml, basePath);

            // Inject into header if it exists, or prepend to body
            const header = document.querySelector('header');
            if (header) {
                header.outerHTML = navbarHtml;
            } else {
                document.body.insertAdjacentHTML('afterbegin', navbarHtml);
            }

            // Re-initialize Navbar Logic
            initNavbar();
            highlightActiveLink();

            // Initialize Dropdown (Auth UI)
            if (typeof Dropdown !== 'undefined' && typeof Dropdown.init === 'function') {
                Dropdown.init();
            } else if (window.initAuth) {
                window.initAuth();
            }
        } else {
            console.error('Failed to load navbar');
        }

        // Load Footer
        const footerRes = await fetch(`${componentPath}footer.html`);
        if (footerRes.ok) {
            let footerHtml = await footerRes.text();
            footerHtml = fixPaths(footerHtml, basePath);

            // Inject into footer if it exists, or append to body
            const footer = document.querySelector('footer');
            if (footer) {
                footer.outerHTML = footerHtml;
            } else {
                document.body.insertAdjacentHTML('beforeend', footerHtml);
            }
        } else {
            console.error('Failed to load footer');
        }

    } catch (error) {
        console.error('Error loading layout:', error);
    }
}

/**
 * Fixes relative paths in HTML content based on the current depth.
 * Prepends basePath to href and src attributes that are relative (start with ./ or just filename)
 * and ignoring absolute paths, #, mailto, etc.
 */
function fixPaths(html, basePath) {
    if (basePath === './') return html; // No change needed for root

    // Regex to match src="..." and href="..."
    // We want to match values that DO NOT start with http, https, #, mailto, //, or ../ (if already fixed?)
    // Actually, the components are written as if they are in root.
    // So "index.html" becomes "../index.html".
    // "./assets/..." becomes "../assets/...".

    // We will do a simple replace for specific patterns likely used in our markup to avoid complex regex failing on edge cases.
    // Our markup uses: href="...", src="..."

    return html.replace(/(href|src)=["']([^"']+)["']/g, (match, attr, value) => {
        // Skip absolute paths, anchors, protocol-relative, etc.
        if (value.startsWith('http') || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('//')) {
            return match;
        }

        // If path starts with ./, remove it and prepend basePath (which is '../')
        if (value.startsWith('./')) {
            return `${attr}="${basePath}${value.substring(2)}"`;
        }

        // If path starts with ../, it means it's trying to go up. 
        // If we are already in pages/, and the link is ../index.html (written in component?), 
        // Component standard: Write links as if in root.
        // So component has href="index.html". 
        // In pages/, it should be href="../index.html".

        return `${attr}="${basePath}${value}"`;
    });
}

function initNavbar() {
    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        const closeBtn = document.getElementById('mobile-menu-close');
        function openMenu() {
            menu.classList.remove('translate-x-full');
            menu.classList.add('translate-x-0');
        }
        function closeMenu() {
            menu.classList.add('translate-x-full');
            menu.classList.remove('translate-x-0');
        }
        btn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    }

    // Refresh Auth State if auth.js is loaded
    // We dispatch a custom event or call a global function if available
    // Assuming auth.js listens to DOMContentLoaded, but since we inject later, we might need to trigger it.
    // However, if we put layout.js before auth.js in the script list, auth.js might run after injection?
    // Start simple.
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    // Select all nav links
    const links = document.querySelectorAll('nav a, #mobile-menu a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        // Check if href matches filename (handling ../ prefix)
        if (href && (href === filename || href.endsWith('/' + filename))) {
            // Add active class
            link.classList.add('text-medical', 'font-bold');
            link.classList.remove('text-gray-600', 'hover:text-medical');
            // Note: Our standard "Active" style in index.html for Home was: text-medical. 
            // Inactive was: text-gray-600 hover:text-medical.
        } else {
            // Ensure inactive style
            link.classList.remove('text-medical', 'font-bold');
            link.classList.add('text-gray-600', 'hover:text-medical');
        }
    });

    // Special case for root index.html matching empty path if served via server
    if (filename === '' || filename === '/') {
        // Highlight Home
        const homeLink = document.querySelector('nav a[href="index.html"], nav a[href="./index.html"]');
        if (homeLink) homeLink.classList.add('text-medical');
    }
}
