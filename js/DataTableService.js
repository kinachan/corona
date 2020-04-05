const defaultLaungage = {
  sProcessing: '処理中...',
  sLengthMenu: '_MENU_ 件表示',
  sZeroRecords: 'データはありません。',
  sInfo: ' _TOTAL_ 件中 _START_ から _END_ まで表示',
  sInfoEmpty: ' 0 件中 0 から 0 まで表示',
  sInfoFiltered: '（全 _MAX_ 件より抽出）',
  sInfoPostFix: '',
  sSearch: '検索:',
  sUrl: '',
  oPaginate: {
    sFirst: '先頭',
    sPrevious: '前',
    sNext: '次',
    sLast: '最終',
  },
  decimal:',',
  thousands: '.',
};

function withComma() {
  return $.fn.dataTable.render.number(',',',');
}


function createDataTable(tableSelector, customOption) {
  const option = Object.assign({
    scrollX: true,
    render: $.fn.dataTable.render.number( ',', '.', 2, '' ),
    language: defaultLaungage,
    lengthMenu:[[50,10, 100,-1], [50,10, 100, '全']],
  }, customOption);
  return $(tableSelector).DataTable(option);
}