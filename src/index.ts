import fs from 'fs';
import path from 'path';

// Asynchronously read the JSON file and console.log its contents
fs.readFile(path.join(__dirname, 'requests.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  try {
    const jsonObj = JSON.parse(data);
    console.log(jsonObj);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});