let isoList = null;

function periodRound(value, base) {
  return Math.round(value * base) / base;
}

$(document).ready(function () {
  if (isoList == null) {
    $.getJSON('./js/iso.json',(json)=> {
      isoList = json;
    });
  }

  // datatableの設定を変更
  $('#corona').DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    },
    ajax: 'https://corona-stats.online/?format=json',
    columns: [
      { 'data': 'countryInfo', title: '', width: 20},
      { 'data': 'country', title: '国', width: 30 },
      { 'data': 'cases', title: '感染者', width: 40, 'className': 'number' },
      { 'data': 'deaths', title: '死亡', width: 30, 'className': 'number'  },
      { 'data': 'recovered', title: '回復者', width: 32, 'className': 'number'  },
      { 'data': 'active', title: '感染中', width: 32, 'className': 'number'  },
      { 'data': 'critical', title: '重症', width: 15, 'className': 'number'  },
      { 'data': 'deathRate', title: '死亡率', 'className': 'rate', width:40, 
        render:(data, type,row)=> {
          return periodRound(row['deaths'] / row['cases'] * 100, 100); 
        }
      },
      { 'data': 'recoveredRate', title: '回復率', width: 30, 'className': 'rate',
        render: (data, type, row) => {
          if (row['cases'] === row['active']) return '-'; // 感染中と総件数が一緒の場合は計測不可
          return periodRound(row['recovered'] / row['cases'] * 100, 100);
        } 
      }
    ],
    order: [[2, 'desc']],
    lengthMenu:[[50,10, 100,-1], [50,10, 100, '全']],
    rowCallback: function (row, data) {
      const flag = $('td', row).eq(0)[0];

      // iso2で国旗を割り出す
      const iso2 = data.countryInfo.iso2 != null ? data.countryInfo.iso2.toLowerCase() : '';
      const icon = `<i class="flag-icon flag-icon-${iso2}"></i>`;
      flag.innerHTML = icon;

      if (isoList == null) return;
      const iso = isoList.find(x =>x.alpha2 === data.countryInfo.iso2);

      if (iso != null) {
        const country = $('td', row).eq(1)[0];
        country.innerText = iso.companyjp
      }
    }
  });
});