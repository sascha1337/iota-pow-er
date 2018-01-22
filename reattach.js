var IOTA = require('iota.lib.js');
var iota = new IOTA({
  'host': 'http://iota-tangle.io',
  'port': 14265
});



global.reattachTx = function (txHash){
  document.getElementById("status").innerHTML = "Reattaching...";
  iota.api.replayBundle(txHash, 3, 14, function(e, s){
    if(s){
      document.getElementById("status").innerHTML = "Success!";
      console.log(s);
    }
    if(e){
      document.getElementById("status").innerHTML = "Error";
      console.log(e);
    }
  });
}
