const fs = require('fs').promises;
const path = require('path');

function getDbPath(filename) {
  return path.join(__dirname, '../database', `${filename}.json`);
}

async function readData(filename) {
  const filePath = getDbPath(filename);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeData(data, filename) {
  const filePath = getDbPath(filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
