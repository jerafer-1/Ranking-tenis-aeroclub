const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const scriptMatch = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (scriptMatch) {
    const scriptContent = scriptMatch[1];
    try {
        // We use a temporary function wrapper to check syntax
        new Function(scriptContent);
        console.log('Syntax check passed!');
    } catch (e) {
        console.error('Syntax error detected:');
        console.error(e.message);

        // Try to find the line number
        const lines = scriptContent.split('\n');
        // Note: Babel/Function error messages don't always give the exact line in a helpful way for raw string check,
        // but often they do if we look at the stack or just the error message.
    }
} else {
    console.error('No Babel script tag found');
}
