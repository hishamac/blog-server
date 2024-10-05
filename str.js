const fs = require('fs');
const path = require('path');

function printDirectoryStructure(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach((file, index) => {
    if (file === 'node_modules' || file === '.git') return; // Skip node_modules and .git
    
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const isLast = index === files.length - 1;
    
    console.log(`${prefix}${isLast ? '└── ' : '├── '}${file}`);
    
    if (stats.isDirectory()) {
      printDirectoryStructure(filePath, `${prefix}${isLast ? '    ' : '│   '}`);
    }
  });
}

// Start from the current directory
printDirectoryStructure('.');