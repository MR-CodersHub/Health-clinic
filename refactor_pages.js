const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const pagesDir = path.join(rootDir, 'pages');

const rootFiles = [
    'about.html',
    'contact.html',
    'doctors.html',
    'index-niche.html',
    'service-details.html',
    'services.html'
];

const pageFiles = [
    'appointment.html',
    'blog-details.html',
    'blog.html',
    'faq.html',
    'policy.html',
    'tos.html'
];

function processFile(filePath, isRoot) {
    console.log(`Processing ${filePath}...`);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Replace Header
        // Matches <header ... > ... </header>
        // Note: [\s\S]*? is non-greedy match for any char including newline
        content = content.replace(/<header[\s\S]*?<\/header>/g, '<!-- Header (Loaded via layout.js) -->\n    <header></header>');

        // 2. Replace Footer
        content = content.replace(/<footer[\s\S]*?<\/footer>/g, '<!-- Footer (Loaded via layout.js) -->\n    <footer></footer>');

        // 3. Remove Mobile Menu Script
        // Matches <script> ... document.getElementById('mobile-menu-btn') ... </script>
        // Allow whitespace variations
        content = content.replace(/<script>\s*document\.getElementById\(['"]mobile-menu-btn['"]\)[\s\S]*?<\/script>/g, '');

        // 4. Inject Layout Script
        // Script path depends on directory
        const scriptPath = isRoot ? 'src/js/layout.js' : '../src/js/layout.js';
        const scriptTag = `<script src="${scriptPath}"></script>`;

        // Check if already injected
        if (!content.includes(scriptPath)) {
            // Find insertion point. Best is before other scripts or before </body>
            // index.html had it before state.js
            // Let's put it before </body> closing tag
            if (content.includes('</body>')) {
                content = content.replace('</body>', `    ${scriptTag}\n</body>`);
            } else {
                content += `\n${scriptTag}`;
            }
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);

    } catch (e) {
        console.error(`Error processing ${filePath}:`, e);
    }
}

// Process Root Files
rootFiles.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
        processFile(fullPath, true);
    } else {
        console.warn(`File not found: ${fullPath}`);
    }
});

// Process Page Files
pageFiles.forEach(file => {
    const fullPath = path.join(pagesDir, file);
    if (fs.existsSync(fullPath)) {
        processFile(fullPath, false);
    } else {
        console.warn(`File not found: ${fullPath}`);
    }
});
