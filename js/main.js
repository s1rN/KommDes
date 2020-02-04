jQuery(document).ready(function($){



  $('#map-switch').on('change', function() {
    switch($('#map-switch').val()) {
      case "1":
        $('#map-2').removeClass("show").addClass("hide");
        $('#map-1').removeClass("hide").addClass("show");
        break;
      case "2":
        $('#map-1').removeClass("show").addClass("hide");
        $('#map-2').removeClass("hide").addClass("show");
        break;
    }
  });


  $('#icon-switcher').on('change', function() {
    $('#hh-icons').innerHTML = "";
    console.log("TEST DU HURENSOHN");
    switch($('#icon-switcher').val()) {
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
  });

  chartChanger(null);
});





function chartChanger(_vals) {
  let data = [4,6,10];
  let labels = ["A", "B", "C"];
  /*
  for(let i = 0; i <= _vals.length; i++) {
    data.push(_vals.value);
    labels.push(_vals.label);
  }

   */

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: data,
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

