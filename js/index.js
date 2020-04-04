const defaultLaungage = {
  sProcessing: "処理中...",
  sLengthMenu: "_MENU_ 件表示",
  sZeroRecords: "データはありません。",
  sInfo: " _TOTAL_ 件中 _START_ から _END_ まで表示",
  sInfoEmpty: " 0 件中 0 から 0 まで表示",
  sInfoFiltered: "（全 _MAX_ 件より抽出）",
  sInfoPostFix: "",
  sSearch: "検索:",
  sUrl: "",
  oPaginate: {
    sFirst: "先頭",
    sPrevious: "前",
    sNext: "次",
    sLast: "最終"
  },
  decimal:",",
  thousands: ".",
};

let isoList = null;

function periodRound(value, base) {
  return Math.round(value * base) / base;
}

function withComma() {
  return $.fn.dataTable.render.number(',',',');
}

$(document).ready(function () {
  if (isoList == null) {
    $.getJSON('./js/iso.json',(json)=> {
      isoList = json;
    });
  }

  // datatableの設定を変更
  $('#corona').DataTable({
    render: $.fn.dataTable.render.number( ',', '.', 2, '' ),
    language: defaultLaungage,
    ajax: 'https://corona-stats.online/?format=json',
    columns: [
      // 英語検索用のデータ
      { 'data': 'country', title: '', width: 20},
      { 'data': 'country', title: '国', width: 30, render:(data,type,row) => {
        const iso2 = row["countryInfo"].iso2;
        const iso = isoList.find(x =>x.alpha2 === iso2);

        if (iso == null) return data;
        return iso.companyjp || data;
      } },
      { 'data': 'cases', title: '感染者', width: 40, 'className': 'number',render: withComma()},
      { 'data': 'deaths', title: '死亡', width: 30, 'className': 'number', render: withComma()  },
      { 'data': 'recovered', title: '回復者', width: 32, 'className': 'number', render: withComma()  },
      { 'data': 'active', title: '感染中', width: 32, 'className': 'number', render:withComma()  },
      { 'data': 'critical', title: '重症', width: 15, 'className': 'number',render: withComma()  },
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
      },
    ],
    order: [[2, 'desc']],
    lengthMenu:[[50,10, 100,-1], [50,10, 100, '全']],
    rowCallback: function (row, data) {
      const flag = $('td', row).eq(0)[0];

      // iso2で国旗を割り出す
      const iso2 = data.countryInfo.iso2 != null ? data.countryInfo.iso2.toLowerCase() : '';
      const icon = `<i class="flag-icon flag-icon-${iso2}"></i>`;
      flag.innerHTML = icon;
    }
  });
});