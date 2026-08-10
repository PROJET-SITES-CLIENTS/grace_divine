import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiDir = path.join(__dirname, 'src', 'app', 'api');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'auth') arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file === 'route.ts') arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(apiDir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  const mutators = ['POST', 'PUT', 'DELETE', 'PATCH'];
  let hasMutators = mutators.some(m => content.includes(`export async function ${m}`));

  if (hasMutators && !content.includes('revalidatePath')) {
    
    // Inject import
    if (!content.includes("import { revalidatePath }")) {
      content = "import { revalidatePath } from 'next/cache';\n" + content;
      modified = true;
    }

    // Split by export async function to process each function block
    const parts = content.split('export async function ');
    
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const funcName = part.substring(0, part.indexOf('(')).trim();
      
      if (mutators.includes(funcName)) {
        let newPart = part;
        const successReturnRegex = /(return NextResponse\.json\([a-zA-Z0-9_]+(,\s*\{.*?status:\s*20[0-9].*?\})?\);)/g;
        newPart = newPart.replace(successReturnRegex, "revalidatePath('/', 'layout');\n      $1");
        
        const deleteReturnRegex = /(return new NextResponse\(null,\s*\{.*?status:\s*204.*?\}\);)/g;
        newPart = newPart.replace(deleteReturnRegex, "revalidatePath('/', 'layout');\n      $1");
        
        const msgReturnRegex = /(return NextResponse\.json\(\{.*?message:.*?\}\);)/g;
        newPart = newPart.replace(msgReturnRegex, "revalidatePath('/', 'layout');\n      $1");
        
        if (newPart !== part) {
          parts[i] = newPart;
          modified = true;
        }
      }
    }
    
    if (modified) {
      content = parts[0] + parts.slice(1).map(p => 'export async function ' + p).join('');
      fs.writeFileSync(file, content, 'utf8');
      console.log('Modified:', file);
    }
  }
});
