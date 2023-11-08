// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
import './parser.js'



import { start } from  './engine.js'

let style = fetch('styles.dcss')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch DCSS file');
    }
    return response.text();
  })
  .then(cssText => {
    
    start(cssText);

  })
  .catch(error => {
    console.error('Error fetching DCSS file:', error);
});






