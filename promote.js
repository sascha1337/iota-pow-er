var IOTA = require('iota.lib.js');

var iota1 = new IOTA({
  'provider': 'http://iri1.iota.fm:80'
});

var iota2 = new IOTA({
  'provider': 'http://iri2.iota.fm:80'
});

var iota3 = new IOTA({
  'provider': 'http://iri3.iota.fm:80'
});

var iota4 = new IOTA({
  'provider': 'http://iri4.iota.fm:80'
});

var iota5 = new IOTA({
  'provider': 'http://tanglelove.com:14265'
});

var iota6 = new IOTA({
  'provider': 'https://iotanode.us:443',
})

var iotaArray = [
  iota1,iota2,iota3,iota4, iota5, iota6
];


iota1.api.getNodeInfo(function(err,data){
  console.log("IOTA1", data);
});

iota2.api.getNodeInfo(function(err,data){
  console.log("IOTA2", data);
});

iota3.api.getNodeInfo(function(err,data){
  console.log("IOTA3", data);
});

iota4.api.getNodeInfo(function(err,data){
  console.log("IOTA4", data);
});

iota5.api.getNodeInfo(function(err,data){
  console.log("IOTA5", data);
});

iota6.api.getNodeInfo(function(err,data){
  console.log("IOTA6", data);
});

global.promoteTx = function (txHash){

  iotaArray.forEach(function(iota){

    //document.getElementById("newStatus").innerHTML = 

    var count = 0;
    const MAX_PROMOTIONS = 3;
    document.getElementById("status").innerHTML = `Promoting...${count} of ${MAX_PROMOTIONS}`;
    const transfer = [{
      address: "RAJIV9PROMOTER99VS99IOTASQUAD99999999999999999999999999999999999999999999999999999",
      value: 0,
      message: "ABC",
      tag: "IOTASQUAD999"
    }];
  
    var checkDelay = 15000;
    function interrupt() {
      console.log(count);
      document.getElementById("status").innerHTML = `Promoting...${count} of ${MAX_PROMOTIONS}`;
      return count++ >= MAX_PROMOTIONS;
    }
    var params = { interrupt, delay: 1000 };
    iota.api.promoteTransaction(txHash, 3, 14, transfer, params, function(e, s){
      if(s){
        console.log(s);
        document.getElementById("status").innerHTML = "Success!";
      }
      if(e){
        document.getElementById("status").innerHTML = "Error";
        console.log(e);
      }
    });
    function checkInclusion (err, isIncluded) {
      if (isIncluded[0]) {
        console.log(isIncluded[0]);
        params.interrupt = true;
        document.getElementById("status").innerHTML = "Success!";
      } else {
        setTimeout(function () {
          iota.api.getLatestInclusion([txHash], checkInclusion)
        }, checkDelay);
      }
    }
    iota.api.getLatestInclusion([txHash], checkInclusion);
  });
  
}
