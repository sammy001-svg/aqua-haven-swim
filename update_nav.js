const fs = require('fs');
const path = require('path');

const dir = 'c:\\Aqua Haven Swim';
const indexPath = path.join(dir, 'index.html');

try {
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Extract navbar and footer from index.html
  const navMatch = indexContent.match(/<nav class="navbar">([\s\S]*?)<\/nav>/);
  const footerMatch = indexContent.match(/<footer>([\s\S]*?)<\/footer>/);

  if (!navMatch || !footerMatch) {
    console.error("Could not find nav or footer in index.html");
    process.exit(1);
  }

  const baseNav = navMatch[0];
  const baseFooter = footerMatch[0];

  // Prepare the subpage versions by fixing the anchor links
  let subpageNav = baseNav.replace(/href="#/g, 'href="index.html#');
  let subpageFooter = baseFooter.replace(/href="#/g, 'href="index.html#');

  const files = fs.readdirSync(dir);
  let updatedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html') {
      let filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');

      let pageNav = subpageNav;
      
      // Preserve the specific classes on the <nav> tag if any, like "navbar scrolled"
      const currentNavTagMatch = content.match(/<nav class="navbar[^>]*">/);
      if (currentNavTagMatch) {
        pageNav = pageNav.replace('<nav class="navbar">', currentNavTagMatch[0]);
      }

      // Add 'active' class based on filename
      if (file === 'about.html') {
        pageNav = pageNav.replace('<a href="about.html">About</a>', '<a href="about.html" class="active">About</a>');
      } else if (file === 'facilities.html') {
        pageNav = pageNav.replace('<a href="facilities.html">Facilities</a>', '<a href="facilities.html" class="active">Facilities</a>');
      }

      // Replace the nav
      content = content.replace(/<nav class="navbar[^>]*>[\s\S]*?<\/nav>/, pageNav);
      
      // Replace the footer
      content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/, subpageFooter);

      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`Updated ${file}`);
    }
  });

  console.log(`Successfully updated ${updatedCount} files.`);
} catch (err) {
  console.error(err);
}
