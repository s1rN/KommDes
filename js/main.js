jQuery(document).ready(function($){

  $('#btc-val-switch').on('change', function() {
    chartChanger($('#btc-val-switch').val());
    iconChanger($('#btc-val-switch').val(), $);
    mapChanger($('#btc-val-switch').val(), $);
  });
});


function mapChanger(_switchVal, $) {
  $('#hh-icons').innerHTML = "";
  console.log("TEST DU HURENSOHN");
  switch(_switchVal) {
    case "1":
      for(var i = 0; i <= 5; i++) {
        var hh_icon_elem = document.createElement("img");
        hh_icon_elem.setAttribute("src", "./img/Haus.png");
        hh_icon_elem.setAttribute("height", "90");
        hh_icon_elem.setAttribute("width", "90");
        hh_icon_elem.setAttribute("alt", "");
        hh_icon_elem.setAttribute("id", "icon-"+i);
        console.log("TEST: " + i);
        document.getElementById('hh-icons').appendChild(hh_icon_elem);
      }
      break;
    case "2":
      break;
  }
}

function iconChanger(_switchVal, $) {
  switch(_switchVal) {
    case "1":
      $('#map-2').removeClass("show").addClass("hide");
      $('#map-1').removeClass("hide").addClass("show");
      break;
    case "2":
      $('#map-1').removeClass("show").addClass("hide");
      $('#map-2').removeClass("hide").addClass("show");
      break;
  }
}

function setChartVals(_switchVal) {
  console.log(_switchVal);
  let data = [];
  switch(_switchVal) {
    case "1":
      data = [];
      data.push({label: "A", value: 30});
      data.push({label: "B", value: 50});
      data.push({label: "C", value: 100});
      break;
    case "2":
      data = [];
      data.push({label: "NewA", value: 50});
      data.push({label: "NewB", value: 70});
      data.push({label: "NewC", value: 150});
      break;
  }

  return data;
}



function chartChanger(_switchVal) {
  let data = setChartVals(_switchVal);

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [data[0].label, data[1].label, data[2].label],
      datasets: [{
        label: 'Verbrauch in kW/H',
        data: [data[0].value, data[1].value, data[2].value],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
        }
        }]
      }
    }
  });
}

