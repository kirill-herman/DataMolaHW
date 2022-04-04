/* eslint-disable no-undef */
function createCalendar(elem, year, month) {
  let date = new Date(year, month);
  const firstDayOfMonth = date.getDay();
  const msPerDay = 8.64e+7;

  const table = document.createElement('table');
  table.setAttribute('border', '1');
  const tbody = document.createElement('tbody');
  table.append(tbody);
  tbody.insertAdjacentHTML('beforeend', `
    <tr>
      <th>ПН</th>
      <th>ВТ</th>
      <th>СР</th>
      <th>ЧТ</th>
      <th>ПТ</th>
      <th>СБ</th>
      <th>ВС</th>
    </tr>
  `);
  tbody.insertAdjacentHTML('beforeend', '<tr></tr>');
  for (let i = 1; i < 8; i += 1) {
    if (i < firstDayOfMonth) {
      tbody.lastElementChild.insertAdjacentHTML('beforeend', '<td></td>');
    } else {
      tbody.lastElementChild.insertAdjacentHTML('beforeend', `<td>${date.getDate()}</td>`);
      date = new Date(Date.parse(date) + msPerDay);
    }
  }
  while (date.getMonth() === month) {
    tbody.insertAdjacentHTML('beforeend', '<tr></tr>');
    for (let i = 1; i < 8; i += 1) {
      tbody.lastElementChild.insertAdjacentHTML('beforeend', `<td>${date.getDate()}</td>`);
      date = new Date(Date.parse(date) + msPerDay);
      if (date.getMonth() > month) break;
    }
  }

  document.querySelector(elem).append(table);
}

createCalendar('body', 2022, 1);
