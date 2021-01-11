module.exports = [
  // remove emphasis around '**CONTENT**'
  [ /^\*\*(.*)\*\*$/g, '$1' ],

  // spell out punctuation
  [ / \+ /, ' PLUS ' ],
  [ / & /, ' AND ' ],
  
  // spell out 'Q&A'
  [ /Q&A/, 'Q AN A' ],

  // spell out 'C++'
  [ /C\+\+/g, 'C PLUS PLUS' ],

  // spell out '## FRAMES'
  [ /60 FRAMES/g, 'SIXTY FRAMES' ],

  // spell out '1080P'
  [ /1080P/g, 'TEN EIGHTY P' ],

  // spell out '2D'/'3D'
  [ /2D/g, 'TWO D' ],
  [ /3D/g, 'THREE D' ],

  // spell out '## BIT'
  [ /8 BIT/g, 'EIGHT BIT' ],
  [ /16 BIT/g, 'SIXTEEN BIT' ],
  [ /32 BIT/g, 'THIRTY TWO BIT' ],
  [ /64 BIT/g, 'SIXTY FOUR BIT' ],

  // spell out 'I##' / 'F##'
  [ /(I|F)32/g, '$1 THIRTY TWO' ],
  [ /(I|F)64/g, '$1 SIXTY FOUR' ],

  // expand '#XS' into # times
  [ /(\d+)XS/g, '$1 TIMES' ],

  // spell out '.#' (e.g. "point three")
  [ / \.(\d+)/g, 'POINT $1' ],
  // spell out '.rs' (file extension)
  [ / \.(RS)/g, 'DOT $1' ],

  // spell out '*xxx' (pointer math)
  [ / \*(\w)/g, 'STAR $1' ],

  // spell out domain names like 'CRATES.IO'
  [ /(\w)\.(\w)/g, '$1 DOT $2' ],
  // spell out '@handles' (e.g. Twitter)
  [ / \@(\w)/g, 'AT $1' ],
];