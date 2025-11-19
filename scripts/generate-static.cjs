const fs = require('fs');
const path = require('path');

const routes = [
  { path: '/', outputPath: 'index.html' },
  { path: '/forum', outputPath: 'forum/index.html' },
  { path: '/webinars', outputPath: 'webinars/index.html' },
  { path: '/conference', outputPath: 'conference/index.html' },
  { path: '/members', outputPath: 'members/index.html' },
  { path: '*', outputPath: '404.html' }
];

async function copyFiles() {
  const distPath = path.resolve(__dirname, '..', 'dist');
  const indexContent = await fs.promises.readFile(
    path.join(distPath, 'index.html'),
    'utf-8'
  );

  for (const route of routes) {
    if (route.outputPath === 'index.html') continue;

    const outputPath = path.join(distPath, route.outputPath);
    const outputDir = path.dirname(outputPath);

    // Ensure directory exists
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    // Copy index.html to each route
    await fs.promises.writeFile(outputPath, indexContent);
  }

  console.log('Static pages generated successfully!');
}

copyFiles().catch((err) => {
  console.error(err);
  process.exit(1);
});
