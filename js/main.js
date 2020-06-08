var raw_single_btc_data = "0,95,02.2017;1,97,03.2017;2,100,04.2017;3,111,05.2017;4,139,06.2017;5,171,07.2017;6,174,08.2017;7,191,09.2017;8,203,10.2017;9,256,11.2017;10,259,12.2017;11,397,01.2018;12,705,02.2018;13,829,03.2018;14,893,04.2018;15,930,05.2018;16,1009,06.2018;17,960,07.2018;18,914,08.2018;19,868,09.2018;20,828,10.2018;21,684,11.2018;22,472,12.2018;23,438,01.2019;24,395,02.2019;25,424,03.2019;26,349,04.2019;27,384,05.2019;28,419,06.2019;29,495,07.2019;30,530,08.2019;31,618,09.2019;32,657,10.2019;33,634,11.2019;34,643,12.2019;35,652,01.2020;";
var raw_global_btc_data = "0,9.56,02.2017;1,10.45,03.2017;2,11.08,04.2017;3,13.3,05.2017;4,14.15,06.2017;5,14.57,07.2017;6,16.01,08.2017;7,16.94,09.2017;8,21.03,10.2017;9,27.89,11.2017;10,33.73,12.2017;11,41.79,01.2017;12,49.40,02.2018;13,55.78,03.2018;14,60.97,04.2018;15,66.97,05.2018;16,71.12,06.2018;17,71.12,07.2018;18,73.12,08.2018;19,73.12,09.2018;20,73.12,10.2018;21,73.12,11.2018;22,42.01,12.2018;23,47.53,01.2019;24,48.59,02.2019;25,50.52,03.2019;26,55.42,04.2019;27,60.63,05.2019;28,66.52,06.2019;29,72.78,07.2019;30,73.12,08.2019;31,73.12,09.2019;32,73.12,10.2019;33,73.12,11.2019;34,73.12,12.2019;35,73.12,01.2020;";
var raw_cnt_data = "0,Luxemburg,7.65;1,Dänemark,32.99;2,Schweiz,61.97;3,Österreich,71.11;4,Belgien,87.89;5,Niederlande,115.33;6,Polen,151.01;7,Italien,304.05;8,Frankreich,422.80;9,Deutschland,568.26;";

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


var route_show = false;
var vgl_show = false;

jQuery(document).ready(function($){
  cnt_data = getCountryData();
  btc_global_data = getGlobalBitcoinData();
  btc_single_data = getSingleBitcoinData();
  addButtonListeners($);
  chartValueChanger($)
  iconChanger($, 0, $('input[name=icon-change]:checked').attr("id"));
  $('#vergleich-header').html("Der Energiebedarf des Bitcoin-Netzwerks ist gigantisch. Doch welche Auswirkungen hat das auf den Einzelnen Nutzer?");
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
    iconChanger($, $('#btc-val-switch').val(), $('input[name=icon-change]:checked').attr("id"));
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
      vgl_show = true;
      iconChanger($, $('#btc-val-switch').val(), $('input[name=icon-change]:checked').attr("id"))
      $('#switch2').html("Text Anzeigen");
    } else if($('#switch-2-2').hasClass("show")) {
      $('#switch-2-2').removeClass("show");
      $('#switch-2-2').addClass("hide");
      $('#switch-2-1').removeClass('hide');
      $('#switch-2-1').addClass('show');
      vgl_show = false;
      $('#vergleich-header').html("Der Energiebedarf des Bitcoin-Netzwerks ist gigantisch. Doch welche Auswirkungen hat das auf den Einzelnen Nutzer?");
      $('#switch2').html("Diagramm Anzeigen");
    }
  });

  $('#switch3').on('click', function() {
    if($('#switch-3-1').hasClass("show")) {
      $('#switch-3-1').removeClass("show");
      $('#switch-3-1').addClass("hide");
      $('#switch-3-2').removeClass('hide');
      $('#switch-3-2').addClass('show');
      route_show = true;
      mapChanger($('#btc-val-switch').val(), $);
      $('#switch3').html("Text Anzeigen");
    } else if($('#switch-3-2').hasClass("show")) {
      $('#switch-3-2').removeClass("show");
      $('#switch-3-2').addClass("hide");
      $('#switch-3-1').removeClass('hide');
      $('#switch-3-1').addClass('show');
      route_show = false;
      $('#anim-header').html("Bitcoin vs. Elektromobilität – Überweisen oder um die Welt reisen?");
      $('#switch3').html("Animation Anzeigen");
    }
  });

  $('.radiobuttons').on("click change", function() {
    iconChanger($, $('#btc-val-switch').val(), $('input[name=icon-change]:checked').attr("id"))
  })
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
  $('#vergleiche').empty();
  console.log("SwitchVal: " + _switchVal + " | value: " + Math.round((_switchVal/260)));
  let value = 0;
  let src = null;
  let height = 0;
  let width = 0;
  let id = null;
  switch(_icon) {
    case "hh-icons":
      value = Math.round((btc_single_data[_switchVal][1] / 260));
      src= "./img/Haus-extra-large.png";
      height = 256;
      width = 256;
      id = "hh";
      if(vgl_show === true) {
        $('#vergleich-header').html("Der Energieverbrauch einer Bitcoin Transaktion in " + btc_single_data[_switchVal][2] + " entspricht dem monatlichen Energieverbauch von " + value + " Zwei-Personen-Haushalten.");
      }
      break;
    case "lat-icons":
      value = Math.round((btc_single_data[_switchVal][1] / 36.5));
      src= "./img/Laterne-large.png";
      height = 90;
      width = 90;
      id = "lat";
      if(vgl_show === true) {
        $('#vergleich-header').html("Der Energieverbrauch einer Bitcoin Transaktion in " + btc_single_data[_switchVal][2] + " entspricht dem monatlichen Energieverbauch von " + value + " Straßenlaternen.");
      }
      break;
    case "wsh-icons":
      value = Math.round((btc_single_data[_switchVal][1] / 16));
      src= "./img/Waschmaschine.png";
      height = 75;
      width = 75;
      id = "wsh";
      if(vgl_show === true) {
        $('#vergleich-header').html("Der Energieverbrauch einer Bitcoin Transaktion in " + btc_single_data[_switchVal][2] + " entspricht dem Energieverbauch von " + value + " Ladungen Wäsche.");
      }
      break;
    default:
      break;
  }
  for(let i = 1; i <= value; i++) {
    let icon_elem = document.createElement("img");
    icon_elem.setAttribute("src", src);
    icon_elem.setAttribute("height", height.toString());
    icon_elem.setAttribute("width", width.toString());
    icon_elem.setAttribute("alt", "");
    icon_elem.setAttribute("id", id +"-icon-"+i);
    document.getElementById("vergleiche").appendChild(icon_elem);
    if(_icon === "lat-icons") {
      if(i % 7 === 0) {
        document.getElementById("vergleiche").appendChild(document.createElement("br"));
      }
    }
    if(_icon === "wsh-icons") {
      if (i % 14 === 0) {
        document.getElementById("vergleiche").appendChild(document.createElement("br"));
      }
    }
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

function dataSplitter(data) {
  // let textdata = readTextFile(file);
  let textdata = data;
  return textdata.split(";");
}

function getGlobalBitcoinData() {
  let form_data = [];
  let data = dataSplitter(raw_global_btc_data);
  for(let i = 0; i < data.length - 1; i++) {
    form_data[i] = data[i].split(",");
  }

  console.log(form_data);
  return form_data;
}

function getSingleBitcoinData() {
  let form_data = [];
  let data = dataSplitter(raw_single_btc_data);
  for(let i = 0; i < data.length - 1; i++) {
    form_data[i] = data[i].split(",");
  }

  return form_data;
}

function getCountryData() {
  let form_data = [];
  let data = dataSplitter(raw_cnt_data);
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
    case "0":
    case "1":
    case "2":
      mapCSSChanger($, 1);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 650km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Passau an der Österreichischen Grenze.");
      }
      break;
    case "3":
      mapCSSChanger($, 2);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 755km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Wels in Österreich.");
      }
      break;
    case "4":
      mapCSSChanger($, 3);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 945km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Wien.");
      }
      break;
    case "5":
    case "6":
    case "7":
      mapCSSChanger($, 4);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 1160km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Budapest.");
      }
      break;
    case "8":
      mapCSSChanger($, 5);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 1380km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Szeged an der Grenze zwischen Ungarn und Serbien.");
      }
      break;
    case "9":
    case "10":
      mapCSSChanger($, 6);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 1740km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Nis in Serbien.");
      }
      break;
    case "11":
      mapCSSChanger($, 7);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 2700km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Bolu in der Türkei.");
      }
      break;
    case "12":
      mapCSSChanger($, 8);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 4800km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Sakaka in Saudi Arabien.");
      }
      break;
    case "13":
      mapCSSChanger($, 9);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 5640km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Riyadh in Saudi Arabien.");
      }
      break;
    case "14":
      mapCSSChanger($, 10);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 6075km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Al Batha an der Grenze Zwischen Saudi Arabien und den Vereinigten Arabischen Emiraten.");
      }
      break;
    case "15":
      mapCSSChanger($, 11);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 6325km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Abu Dhabi in den Vereinigten Arabischen Emiraten.");
      }
      break;
    case "16":
    case "17":
      mapCSSChanger($, 12);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 6900km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Dubai in den Vereinigten Arabischen Emiraten.");
      }
      break;
    case "18":
    case "19":
      mapCSSChanger($, 13);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 6325km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Abu Dhabi in den Vereinigten Arabischen Emiraten.");
      }
      break;
    case "20":
      mapCSSChanger($, 14);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 5640km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Riyadh in Saudi Arabien.");
      }
      break;
    case "21":
      mapCSSChanger($, 15);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 4800km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Sakaka in Saudi Arabien.");
      }
      break;
    case "22":
    case "23":
      mapCSSChanger($, 16);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 3200km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Aksaray in der Türkei.");
      }
      break;
    case "24":
      mapCSSChanger($, 17);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 2700km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Bolu in der Türkei.");
      }
      break;
    case "25":
      mapCSSChanger($, 18);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 2900km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Ankara in der Türkei.");
      }
      break;
    case "26":
    case "27":
      mapCSSChanger($, 19);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 2600km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Istanbul in der Türkei.");
      }
      break;
    case "28":
      mapCSSChanger($, 20);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 2700km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Bolu in der Türkei.");
      }
      break;
    case "29":
      mapCSSChanger($, 21);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 3200km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Aksaray in der Türkei.");
      }
      break;
    case "30":
      mapCSSChanger($, 22);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 3600km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Reyhanli an der Grenze zwischen der Türkei und Syrien.");
      }
      break;
    case "31":
    case "32":
    case "33":
    case "34":
    case "35":
      mapCSSChanger($, 23);
      if(route_show === true) {
        $('#anim-header').html("Der Energieverbrauch in " + btc_single_data[_switchVal][2] + " entspricht einer Reise von ungefähr 4800km in einem Tesla Modell 3. Damit kommt man von der HSD bis nach Sakaka in Saudi Arabien.");
      }
      break;
  }
}

function mapCSSChanger($, _mapID) {
  let mapid = "#img-"+_mapID;
  $('.map-images').addClass("hide");
  $('.map-images').removeClass("show");
  $(mapid).removeClass("hide");
  $(mapid).addClass("show");
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

