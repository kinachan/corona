$(document).ready(function () {
  $.ajax({
    url: 'https://stopcovid19.metro.tokyo.lg.jp/data/130001_tokyo_covid19_patients.csv',
    type: 'get',
    dataType: 'text/csv',
  }).done(function(data){
    const result = csvToObject(data);
    $('#result').html(JSON.stringify(result));
  });
});