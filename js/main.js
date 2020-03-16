var cnt_data = [];
var btc_single_data = [];
var btc_global_data = [];
var chart_labels = [];
var chart_values = [];
var chart_colors = [
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
  'rgba(0, 255, 255, 0.2)'
];
var chart_borders = [
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
  'rgba(0, 255, 255, 1)'
];

jQuery(document).ready(function($){



  cnt_data = getCountryData();
  btc_global_data = getGlobalBitcoinData();
  btc_single_data = getSingleBitcoinData();
  addButtonListeners($);
  chartValueChanger($)
  iconChanger($, 0, "hh-icons");

});
jQuery(function() {
  jQuery.scrollify({
    section : ".content-divs",
    scrollSpeed: 1100,
    offset: -100
  });
});


function addButtonListeners($) {
  $('#btc-val-switch').on('change', function() {
    iconChanger($, $('#btc-val-switch').val(), "wsh-icons");
    mapChanger($('#btc-val-switch').val(), $);
    chartValueChanger($);
    textChanger($, $('#btc-val-switch').val());
  });

  $('.checkboxes').on('click', function () {
    chartValueChanger($)
  });

  $('#switch1').on('click', function() {
    if($('#switch-1-1').hasClass("show")) {
      $('#switch-1-1').removeClass("show");
      $('#switch-1-1').addClass("hide");
      $('#switch-1-2').removeClass('hide');
      $('#switch-1-2').addClass('show');
      $('#switch1').html("Text Anzeigen");
    } else if($('#switch-1-2').hasClass("show")) {
      $('#switch-1-2').removeClass("show");
      $('#switch-1-2').addClass("hide");
      $('#switch-1-1').removeClass('hide');
      $('#switch-1-1').addClass('show');
      $('#switch1').html("Diagramm Anzeigen");
    }
  });

  $('#switch2').on('click', function() {
    if($('#switch-2-1').hasClass("show")) {
      $('#switch-2-1').removeClass("show");
      $('#switch-2-1').addClass("hide");
      $('#switch-2-2').removeClass('hide');
      $('#switch-2-2').addClass('show');
      $('#switch2').html("Text Anzeigen");
    } else if($('#switch-2-2').hasClass("show")) {
      $('#switch-2-2').removeClass("show");
      $('#switch-2-2').addClass("hide");
      $('#switch-2-1').removeClass('hide');
      $('#switch-2-1').addClass('show');
      $('#switch2').html("Diagramm Anzeigen");
    }
  });

  $('#switch3').on('click', function() {
    if($('#switch-3-1').hasClass("show")) {
      $('#switch-3-1').removeClass("show");
      $('#switch-3-1').addClass("hide");
      $('#switch-3-2').removeClass('hide');
      $('#switch-3-2').addClass('show');
      $('#switch3').html("Text Anzeigen");
    } else if($('#switch-3-2').hasClass("show")) {
      $('#switch-3-2').removeClass("show");
      $('#switch-3-2').addClass("hide");
      $('#switch-3-1').removeClass('hide');
      $('#switch-3-1').addClass('show');
      $('#switch3').html("Animation Anzeigen");
    }
  });
}

function textChanger($, _switchVal) {
  $('#twh1').html(btc_global_data[_switchVal][1] + " TWh");
  $('#total-text').html("Energieverbrauch des Bitcoin Netzwerks im " + btc_global_data[_switchVal][2]);
  $('#kwh1').html(btc_single_data[_switchVal][1] + " KWh");
  $('#single1-text').html("Energieverbrauch einer Bitcoin-Transaktion im " + btc_single_data[_switchVal][2]);
  $('#kwh2').html(btc_single_data[_switchVal][1] + " KWh");
  $('#total-text').html("Energieverbrauch des Bitcoin Netzwerks im " + btc_single_data[_switchVal][2]);
  $('#switch-label').html(btc_single_data[_switchVal][2]);
}

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
  let colors = [];
  let borders = [];
  let btc_inside = false;

  for(let i = 0; i < checked_boxes.length; i++) {
    if(btcValComparator(btc_global_data[$('#btc-val-switch').val()][1], cnt_data[checked_boxes[i].id.substring(4)][2]) && btc_inside === false) {
      chart_labels.push("Bitcoin");
      chart_values.push(btc_global_data[$('#btc-val-switch').val()][1]);
      colors.push('rgba(255, 255, 0, 0.6)');
      borders.push('rgba(0, 0, 0, 1)');
      btc_inside = true;
    }
    chart_labels.push(cnt_data[checked_boxes[i].id.substring(4)][1]);
    chart_values.push(cnt_data[checked_boxes[i].id.substring(4)][2]);
    colors.push(chart_colors[checked_boxes[i].id.substring(4)]);
    borders.push(chart_borders[checked_boxes[i].id.substring(4)]);

  }
  if(btc_inside === false) {
    chart_labels.push("Bitcoin");
    chart_values.push(btc_global_data[$('#btc-val-switch').val()][1]);
    colors.push('rgba(255, 255, 0, 0.6)');
    borders.push('rgba(255, 255, 0, 1)');
  }
  chartChanger(chart_labels,chart_values, colors, borders);
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


function iconChanger($, _switchVal, _icon) {
  $('#switch-2-2').empty();
  console.log("SwitchVal: " + _switchVal + " | value: " + Math.round((_switchVal/260)));
  let value = 0;
  let src = null;
  let height = 0;
  let width = 0;
  let id = null;
  switch(_icon) {
    case "hh-icons":
      value = Math.round((btc_single_data[_switchVal][1] / 260));
      src= "./img/Haus-large.png";
      height = 200;
      width = 200;
      id = "hh";
      $('#vergleich-header').html("Der Energieverbrauch einer Bitcoin Transaktion in " + btc_single_data[_switchVal][2] + " entspricht dem monatlichen Energieverbauch von " + value + " zwei Personen Haushalten.");
      break;
    case "lat-icons":
      value = Math.round((btc_single_data[_switchVal][1] / 36.5));
      src= "./img/Laterne-resized.png";
      height = 90;
      width = 90;
      id = "lat";
      $('#vergleich-header').html("Der Energieverbrauch einer Bitcoin Transaktion in " + btc_single_data[_switchVal][2] + " entspricht dem monatlichen Energieverbauch von " + value + " Straßenlaternen.");
      break;
    case "wsh-icons":
      value = Math.round((btc_single_data[_switchVal][1] / 1));
      src= "./img/Waschmaschine.png";
      height = 20;
      width = 20;
      id = "wsh";
      $('#vergleich-header').html("Der Energieverbrauch einer Bitcoin Transaktion in " + btc_single_data[_switchVal][2] + " entspricht dem Energieverbauch von " + value + " Ladungen Wäsche.");
      break;
    default:
      break;
  }
  for(let i = 0; i < value; i++) {
    let icon_elem = document.createElement("img");
    icon_elem.setAttribute("src", src);
    icon_elem.setAttribute("height", height.toString());
    icon_elem.setAttribute("width", width.toString());
    icon_elem.setAttribute("alt", "");
    icon_elem.setAttribute("id", id +"-icon-"+i);
    document.getElementById("switch-2-2").appendChild(icon_elem);
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

    if(i === 0 || i === 3 || i === 7) {
      item_elem.checked = true;
    }

    let label_elem = document.createElement("label");
    label_elem.setAttribute("id", "label-"+i);
    label_elem.setAttribute("for","box-"+i);
    label_elem.setAttribute("class", "checkbox-labels");
    label_elem.innerText = " " + form_data[i][1];

    li_elem.appendChild(item_elem);
    li_elem.appendChild(label_elem);

    switch(i) {
      case 0:
      case 1:
        document.getElementById("chart-boxes-1").appendChild(li_elem);
        break;
      case 2:
      case 3:
        document.getElementById("chart-boxes-2").appendChild(li_elem);
        break;
      case 4:
      case 5:
        document.getElementById("chart-boxes-3").appendChild(li_elem);
        break;
      case 6:
      case 7:
        document.getElementById("chart-boxes-4").appendChild(li_elem);
        break;
      case 8:
      case 9:
        document.getElementById("chart-boxes-5").appendChild(li_elem);
        break;
    }


  }
  return form_data;
}

function mapChanger(_switchVal, $) {
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




function chartChanger(_labels, _values, _colors, _borders) {

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: _labels,
      datasets: [{
        label: 'Verbrauch in tW/H',
        data: _values,
        backgroundColor: _colors,
        borderColor: _borders,
        borderWidth: 1
    }]
},
    options: {
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "black",
            fontSize: 18,
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "black",
            fontSize: 18
          }
        }]
      },
      events:[]
    }
  });
}

