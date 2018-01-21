$(document).ready(function() {

var ctx1 = $("#iri1-chart");
  var iri1Chart = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Transactions to Request",
        data: [],
        borderColor: 'rgba(255,255,255,1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 12
        },
      },
      scales: {
        xAxes : [{
          type: 'time',
          time: {
            displayFormats: {
              'second': 'h:mm:ss a'
            },
            unit: 'second'
          },
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white'
          }
        }]
      }
    }
  });

  var ctx2 = $("#iri2-chart");
  var iri2Chart = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Transactions to Request",
        data: [],
        borderColor: 'rgba(255,255,255,1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 12
        },
      },
      scales: {
        xAxes : [{
          type: 'time',
          time: {
            displayFormats: {
              'second': 'h:mm:ss a'
            },
            unit: 'second'
          },
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white'
          }
        }]
      }
    }
  });

  var ctx3 = $("#iri3-chart");
  var iri3Chart = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Transactions to Request",
        data: [],
        borderColor: 'rgba(255,255,255,1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 12
        }
      },
      scales: {
        xAxes : [{
          type: 'time',
          time: {
            displayFormats: {
              'second': 'h:mm:ss a'
            },
            unit: 'second'
          },
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white'
          }
        }]
      }
    }
  });

  var ctx4 = $("#iri4-chart");
  var iri4Chart = new Chart(ctx4, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Transactions to Request",
        data: [],
        borderColor: 'rgba(255,255,255,1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 12
        }
      },
      scales: {
        xAxes : [{
          type: 'time',
          time: {
            displayFormats: {
              'second': 'h:mm:ss a'
            },
            unit: 'second'
          },
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white'
          }
        }]
      }
    }
  });

  var ctxNelson1 = $("#nelson1-chart");
  var nelson1Chart = new Chart(ctxNelson1, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Transactions to Request",
        data: [],
        borderColor: 'rgba(255,255,255,1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 12
        }
      },
      scales: {
        xAxes : [{
          type: 'time',
          time: {
            displayFormats: {
              'second': 'h:mm:ss a'
            },
            unit: 'second'
          },
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white'
          }
        }]
      }
    }
  });

  function updateData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  function updateSolids() {
    
    getNodeInfo('iri3', response => {
      updateInfo('iri3', response);
      $("#currentLatestSolidBig").text(response.latestSolidSubtangleMilestoneIndex);
      $("#currentLatestBig").text(response.latestMilestoneIndex);
      updateInfo('iri3', response);
      updateData(iri3Chart, Date.now(), response.transactionsToRequest);

      getNodeInfo('iri1', response => {
        updateInfo('iri1', response);
        updateData(iri1Chart, Date.now(), response.transactionsToRequest);
      
        getNodeInfo('iri2', response => {
          updateInfo('iri2', response);
          updateData(iri2Chart, Date.now(), response.transactionsToRequest);
          
          getNodeInfo('nelson1', response => {
              updateInfo('nelson1', response);
              updateData(nelson1Chart, Date.now(), response.transactionsToRequest);

              getNodeInfo('iri4', response => {
                  updateInfo('iri4', response);
                  updateData(iri4Chart, Date.now(), response.transactionsToRequest);
                });

            });
        });
      });
    });
  }

  function updateInfo(node, data) {
    $("#"+node+"-sync").text(data.latestMilestoneIndex + ' / ' + data.latestSolidSubtangleMilestoneIndex);
    $("#"+node+"-version").text(data.appVersion);
    $("#"+node+"-neighbors").text(data.neighbors);
    $("#"+node+"-tx").text(data.transactionsToRequest);
    $("#"+node+"-tips").text(data.tips);
  }

  function getNodeInfo(node, callback) {
    var command = {
      'command': 'getNodeInfo'
    }

    $.ajax({
      url: 'http://'+node+'.iota.fm',
        type: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-IOTA-API-Version': '1'
          },
      timeout: 5000,
      data: JSON.stringify(command)
        }).then(
          function(response) {
            callback(response);
	})
	.fail(
    function(reason) {
      console.log(reason.statusText + " " + node);
      if (reason.statusText == "timeout") {
        var response = {
          latestMilestoneIndex: "busy",
          latestSolidSubtangleMilestoneIndex: "busy",
          appVersion: "busy",
          neighbors: "?",
          transactionsToRequest: "?",
          tips: "?"
        }
        callback(response);
      }
    });
  }

    new Clipboard('.ctc');

    updateSolids();
    setInterval(function() {
      updateSolids();
    }, 15000);
  }
);