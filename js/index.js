$(document).ready(function () {
  // datatableの設定を変更
  $('#corona').DataTable({
    language: {
      url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    },
    'ajax': 'https://corona-stats.online/?format=json',
    'columns': [
      { 'data': 'country', title: '国', width: 40 },
      { 'data': 'cases', title: '感染者', width: 40, 'className': 'number' },
      { 'data': 'todayCases', title: '感染者(本日)', width: 60, 'className': 'number'  },
      { 'data': 'deaths', title: '死亡', width: 30, 'className': 'number'  },
      { 'data': 'todayDeaths', title: '死亡(本日)', width: 50, 'className': 'number'  },
      { 'data': 'recovered', title: '回復者', width: 32, 'className': 'number'  },
      { 'data': 'active', title: '感染中', width: 32, 'className': 'number'  },
      { 'data': 'critical', title: '重症', width: 15, 'className': 'number'  },
    ],
    'order': [[1, 'desc']],
    'lengthMenu':[[50,10, 100,-1], [50,10, 100, 'ALL']],
  });
});