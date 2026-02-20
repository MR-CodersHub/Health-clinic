const fs = require('fs');
const filePath = 'd:\\MR CodersHub\\frontend - phase 2\\Health - Clinic\\index.html';

try {
    const data = fs.readFileSync(filePath, 'utf8');
    // Normalize line endings? No, just split by newline
    // But lines in view_file use 1-based indexing.
    // split('\n') gives 0-based array.

    // We want to KEEP lines 1 to 636 (0 to 635).
    // DELETE 637 to 770 (636 to 769).
    // KEEP 771 to END (770 to END).

    // Wait, the line numbers I saw in view_file depend on how view_file counts. 
    // Usually view_file counts physical lines.

    const lines = data.split(/\r?\n/);

    console.log(`Total lines: ${lines.length}`);

    // Verification:
    // Line 635 (index 634): <footer></footer>
    // Line 636 (index 635): <script src="src/js/layout.js"></script>
    // Line 637 (index 636): <!-- Old Footer Content
    // Line 771 (index 770): <script src="src/js/state.js"></script>

    if (!lines[636].includes('Old Footer Content')) {
        console.error('Line 637 check failed: ' + lines[636]);
        // Try fuzzy search?
    }

    if (!lines[770].includes('src/js/state.js')) {
        console.error('Line 771 check failed: ' + lines[770]);
    }

    const top = lines.slice(0, 636);
    const bottom = lines.slice(770);

    const newContent = top.join('\n') + '\n' + bottom.join('\n');

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully fixed index.html');

} catch (err) {
    console.error(err);
}
