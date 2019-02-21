var parseJSON = function(json) {};

/* FOR OBJECT
  onKey = false
  onVal = false
  currentKey
  cKeyQouteCount
  currentVal

  for(loop)
    If both false => on a new key/val pair
    So, check for key
    if !onKey && !onVal
      onKey = true

    if onKey    // Check for qoutes
    if char[i] === '"'
      if char[i-1] && char[i-1] !== "\\"
      cKeyQouteCount++;
    
    if cKeyQuoteCount
      currentKey += char[i]
    else
      onKey=false
      onVal=true
      if !currentKey || (currentkey[0] !== '"' && currentKey[currentKey.length - 1] !== '"')



*/
