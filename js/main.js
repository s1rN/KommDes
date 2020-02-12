var cnt_data = [];
var btc_single_data = [];
var btc_global_data = [];
var chart_labels = [];
var chart_values = [];


jQuery(document).ready(function($){

  cnt_data = getCountryData();
  btc_global_data = getGlobalBitcoinData();
  btc_single_data = getSingleBitcoinData();

  $('#btc-val-switch').on('change', function() {
    iconChanger($('#btc-val-switch').val(), $);
    mapChanger($('#btc-val-switch').val(), $);
    chartValueChanger($);
  });

  $('.checkboxes').on('click', function () {
    chartValueChanger($)
  });
});


function chartValueChanger($) {
  let checkboxes = $('.checkboxes');
  let checked_boxes = [];
  for(let i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].checked) {
      checked_boxes.push(checkboxes[i]);
    }
  }
  chart_labels = [];
  chart_values = [];
  let btc_inside = false;

  for(let i = 0; i < checked_boxes.length; i++) {
    if(btcValComparator(btc_global_data[$('#btc-val-switch').val()][1], cnt_data[checked_boxes[i].id.substring(4)][2]) && btc_inside === false) {
      chart_labels.push("Bitcoin");
      chart_values.push(btc_global_data[$('#btc-val-switch').val()][1]);
      btc_inside = true;
    }
    chart_labels.push(cnt_data[checked_boxes[i].id.substring(4)][1]);
    chart_values.push(cnt_data[checked_boxes[i].id.substring(4)][2]);
  }
  if(btc_inside === false) {
    chart_labels.push("Bitcoin");
    chart_values.push(btc_global_data[$('#btc-val-switch').val()][1]);
  }
  chartChanger(chart_labels,chart_values);
}

/**
 * Compares String Values as Floats.
 * @param _val1 -> Bitcoin Value
 * @param _val2 -> Other Value
 * @returns {boolean} -> true if bitcoin value is smaller than the other value
 */
function btcValComparator(_val1, _val2) {
  return parseFloat(_val1) < parseFloat(_val2);
}

function mapChanger(_switchVal, $) {
  $('#hh-icons').innerHTML = "";
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

function readTextFile(file) {
  let allText = "";
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

function dataSplitter(file) {
  let textdata = readTextFile(file);
  return textdata.split(";");
}

function getGlobalBitcoinData() {
  let form_data = [];
  let data = dataSplitter("http://localhost/data/GesamtBitcoinDaten.txt");
  for(let i = 0; i < data.length - 1; i++) {
    form_data[i] = data[i].split(",");
  }

  console.log(form_data);
  return form_data;
}

function getSingleBitcoinData() {
  let form_data = [];
  let data = dataSplitter("http://localhost/data/EinzelBitcoinDaten.txt");
  for(let i = 0; i < data.length - 1; i++) {
    form_data[i] = data[i].split(",");
  }

  return form_data;
}

function getCountryData() {
  let form_data = [];
  let data = dataSplitter("http://localhost/data/LandDaten.txt")
  for(let i = 0; i < data.length - 1; i++) {
    form_data[i] = data[i].split(",");

    let li_elem = document.createElement("li");

    let item_elem = document.createElement("input");
    item_elem.setAttribute("id", "box-"+i);
    item_elem.setAttribute("type", "checkbox");
    item_elem.setAttribute("class", "checkboxes");

    let label_elem = document.createElement("label");
    label_elem.setAttribute("id", "label-"+i);
    label_elem.setAttribute("for","box-"+i);
    label_elem.innerText = " " + form_data[i][1];

    li_elem.appendChild(item_elem);
    li_elem.appendChild(label_elem);

    document.getElementById("chart-boxes").appendChild(li_elem);

  }
  return form_data;
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




function chartChanger(_labels, _values) {

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: _labels,
      datasets: [{
        label: 'Verbrauch in tW/H',
        data: _values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 153, 51, 0.2)',
          'rgba(255, 80, 80, 0.2)',
          'rgba(0, 102, 255, 0.2)',
          'rgba(204, 102, 153, 0.2)',
          'rgba(255, 255, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 153, 51, 1)',
          'rgba(255, 80, 80, 1)',
          'rgba(0, 102, 255, 1)',
          'rgba(204, 102, 153, 1)',
          'rgba(255, 255, 0, 1)'
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

