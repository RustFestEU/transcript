const fs = require('fs');
const path = require('path');

const modelize = require('./modelize');

const files = [
  infolder('./2020-global/talks/01_APAC'),
  infolder('./2020-global/talks/02_UTC'),
  infolder('./2020-global/talks/03_LATAM'),
].flat();

console.log(files);

let lines

// Grab all lines from transcription files
lines = files.map(
  f => modelize.getLines(f)
).flat();

// Dedupe lines
lines = Array.from(new Set(lines).values());

lines.sort( (a,b) => a.localeCompare(b));

console.log(`Extracted corpus consists of ${lines.length} lines.`);

fs.writeFileSync('corpus.txt', lines.join('\n')+'\n');

function infolder(p) {
  return fs.readdirSync(p).map(f => path.join(p,f));
}
