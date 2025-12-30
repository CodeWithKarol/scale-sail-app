const fs = require('fs');
const path = require('path');
const targetPath = path.join(__dirname, 'environment.ts');

// Load dotenv to read .env file locally
const dotenvResult = require('dotenv').config();
if (dotenvResult.error) {
  console.log('ℹ️  No .env file found (expected in production/CI)');
}

// Check for encrypted env vars (Vercel specific)
if (process.env.VERCEL_ENCRYPTED_ENV_CONTENT) {
  console.log('ℹ️  Detected VERCEL_ENCRYPTED_ENV_CONTENT.');
}

console.log(
  'ℹ️  Available Environment Keys:',
  Object.keys(process.env)
    .filter((k) => !k.startsWith('npm_'))
    .join(', ')
);

const token = process.env.GUMROAD_ACCESS_TOKEN || '';
const isProduction = process.env.NODE_ENV === 'production';

console.log(
  `ℹ️  GUMROAD_ACCESS_TOKEN found: ${token ? 'YES (' + token.substring(0, 5) + '...)' : 'NO'}`
);

const envConfig = `export const environment = {
  production: ${isProduction},
  GUMROAD_ACCESS_TOKEN: '${token}',
};
`;

fs.writeFileSync(targetPath, envConfig);
console.log(`✅ Environment file generated at ${targetPath}`);
