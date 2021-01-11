const fs = require('fs');
const replacements = require('./replacements');

const file = process.argv[process.argv.length-1];
console.log(file);
if (require.main === module && fs.existsSync(file)) {
  getLines(file);
}

module.exports = {
  getLines
};


function getLines(file) {

  let cont = fs.readFileSync(file).toString();

  // Unicode accent stripping
  cont = cont.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let lines;

  // Split into lines, ignore empty lines, trim excess whitespace and blockquote marks
  lines = cont.split(/\n+/).map(l => l.replace(/^>\s+/, '').trim());

  // Filter speaker names
  lines = lines.filter(
    l => !l.match(/:\*\*$/)
  );

  // Split on punctuation
  lines = lines.flatMap(
    l => l.split(/\.+\s|\.+$|\?\s|\?$|!\s|!$/g)
  );

  // Filter whitespace & blank lines
  lines = lines.map(l => l.replace(/\s+/g,' ').trim()).filter(l => l != '');

  // Remove meta (non-verbal) notes in brackets
  lines = lines.map(l => l.replace(/\[[^\]]*\]/g,''));
  // Ditch quotes, parens
  lines = lines.map(l => l.replace(/"([^"]*)"/g,'$1').replace(/\(([^\)]*)\)/g,'$1'));
  // Ditch commas
  lines = lines.map(l => l.replace(/,\s*/g, ' '));
  // Turn dashes, slashes, underscores, colons, backticks, excess punctuation into whitespace
  lines = lines.map(l => l.replace(/-|\/|_|`|:|;|!|\?|\./g,' '));
  // ALL UPPERCASE
  lines = lines.map(l => l.toUpperCase());

  // Process replacements
  lines = lines.map(
    l => {
      replacements.forEach(
        ([rFrom,rTo]) => l = l.replace(rFrom, rTo)
      );

      return l;
    }
  );

  lines = lines.map(l => l.replace(/\s+/g,' ').trim());
  lines.sort( (a,b) => a.localeCompare(b));
  //console.log(lines.join('\n'));

  const invalid = lines.map(
    l => [l, l.match(/[^A-Z' ]/)]
  ).filter(
    ([l, match]) => !!match
  )
  if (invalid.length) {
    console.log('In ' + file);
    console.log('Lines with non-alphabet characters: ' + invalid.length);
    console.log(invalid.map(([l, match]) => `[ ${match} ]: ${l}` ).join('\n'));
  }

  return lines;
}
