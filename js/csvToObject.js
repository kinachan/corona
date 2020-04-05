const csvToObject = (csv) => {
  const titles = getTitles(csv);

  const array = [];
  for (let rowIndex = 1; rowIndex < csv.length; rowIndex++) {
    const contents = getContent(csv, rowIndex);
    if (contents.length === 1) break; // 空白行だったら処理終了
    const object = {};

    for (let columnIndex = 0; columnIndex < titles.length; columnIndex ++) {
      const column = titles[columnIndex];
      object[column] = contents[columnIndex];
    }
    array.push(object);
  }
  return array;
}

const getTitles = (csv) => {
  if (csv[0] == null) return null;
  const titles = csv[0].split(',');
  return titles.filter(x => x !== '');
}

const getContent = (csv, index) => {
  if (csv[index] == null) return null;
  return csv[index].split(',');
}