/**
 * Post-build optimization script
 * Runs after Next.js build to optimize the output folder
 * Compatible with Windows, macOS, and Linux
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const outDir = path.join(process.cwd(), "out");

console.log("🚀 Starting post-build optimizations...");

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.log("⚠️  Out directory not found. Skipping post-build optimizations.");
  process.exit(0);
}

// Function to get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

// Function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Analyze build output
function analyzeBuild() {
  console.log("\n📊 Build Analysis:");
  console.log("─".repeat(50));

  const files = getAllFiles(outDir);
  let totalSize = 0;
  const fileTypes = {};

  files.forEach((file) => {
    const size = getFileSize(file);
    totalSize += size;
    const ext = path.extname(file).toLowerCase() || ".no-ext";
    fileTypes[ext] = (fileTypes[ext] || 0) + size;
  });

  console.log(`Total files: ${files.length}`);
  console.log(`Total size: ${formatBytes(totalSize)}`);
  console.log("\nFile types breakdown:");

  Object.entries(fileTypes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([ext, size]) => {
      const percentage = ((size / totalSize) * 100).toFixed(2);
      console.log(`  ${ext.padEnd(15)} ${formatBytes(size).padEnd(10)} (${percentage}%)`);
    });

  // Check for large files
  console.log("\n🔍 Large files (>500KB):");
  files
    .map((file) => ({ path: file, size: getFileSize(file) }))
    .filter((file) => file.size > 500 * 1024)
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .forEach((file) => {
      const relativePath = path.relative(outDir, file.path);
      console.log(`  ${formatBytes(file.size).padEnd(10)} ${relativePath}`);
    });

  return { files, totalSize };
}

// Optimize HTML files (remove comments, extra whitespace)
function optimizeHTML() {
  console.log("\n✨ Optimizing HTML files...");
  let optimized = 0;

  const htmlFiles = getAllFiles(outDir).filter(
    (file) => path.extname(file).toLowerCase() === ".html"
  );

  htmlFiles.forEach((file) => {
    try {
      let content = fs.readFileSync(file, "utf8");
      const originalSize = content.length;

      // Remove HTML comments (but keep conditional comments)
      content = content.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");

      // Remove extra whitespace between tags (careful not to break inline elements)
      content = content.replace(/>\s+</g, "><");

      const newSize = content.length;
      if (newSize < originalSize) {
        fs.writeFileSync(file, content, "utf8");
        optimized++;
        console.log(
          `  ✓ ${path.relative(outDir, file)} (${formatBytes(originalSize - newSize)} saved)`
        );
      }
    } catch (error) {
      console.error(`  ✗ Error optimizing ${file}:`, error.message);
    }
  });

  console.log(`Optimized ${optimized} HTML file(s)`);
}

// Create build info file
function createBuildInfo() {
  const buildInfo = {
    buildTime: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
  };

  const buildInfoPath = path.join(outDir, "build-info.json");
  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2), "utf8");
  console.log("\n📝 Created build-info.json");
}

// Main execution
try {
  const { totalSize } = analyzeBuild();
  optimizeHTML();
  createBuildInfo();

  console.log("\n✅ Post-build optimizations completed!");
  console.log(`📦 Output directory: ${outDir}`);
  console.log(`📏 Total build size: ${formatBytes(totalSize)}`);
  console.log("\n💡 Tips:");
  console.log("  - Use a CDN for static assets");
  console.log("  - Enable gzip/brotli compression on your server");
  console.log("  - Consider using Next.js Image optimization for better performance");
} catch (error) {
  console.error("\n❌ Error during post-build optimization:", error);
  process.exit(1);
}
