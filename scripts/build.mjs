import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(projectRoot, 'src');
const publicRoot = path.join(projectRoot, 'public');
const outputRoot = path.join(projectRoot, 'dist');

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });
fs.cpSync(path.join(sourceRoot, 'index.html'), path.join(outputRoot, 'index.html'));
fs.cpSync(path.join(sourceRoot, 'styles'), path.join(outputRoot, 'styles'), { recursive: true });
fs.cpSync(path.join(sourceRoot, 'scripts'), path.join(outputRoot, 'scripts'), { recursive: true });
fs.cpSync(path.join(publicRoot, 'assets'), path.join(outputRoot, 'assets'), { recursive: true });

console.log('Built dist/ from src/ and public/.');
