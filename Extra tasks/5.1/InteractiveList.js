/* eslint-disable no-undef */
function createList(title, list) {
  const ul = document.createElement('ul');
  ul.setAttribute('style', 'font-size:0.9em');
  ul.insertAdjacentHTML('beforeend', `<h2><span>${title}</span></h2>`);

  if (list) {
    for (let i = 0; i < list.length; i += 1) {
      const li = document.createElement('li');
      li.append(createList(list[i].value, list[i].children));
      ul.append(li);
    }
  }
  ul.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
      event.stopPropagation();
      event.target.closest('ul').querySelectorAll('li').forEach((item) => { item.classList.toggle('hidden'); });
    }
  });
  return ul;
}

document.body.append(createList('First', [
  {
    value: 'Пункт 1.',
    children: null,
  },
  {
    value: 'Пункт 2.',
    children: [
      {
        value: 'Подпункт 2.1.',
        children: null,
      },
      {
        value: 'Подпункт 2.2.',
        children: [
          {
            value: 'Подпункт 2.2.1.',
            children: null,
          },
          {
            value: 'Подпункт 2.2.2.',
            children: null,
          },
        ],
      },
      {
        value: 'Подпункт 2.3.',
        children: null,
      },
    ],
  },
  {
    value: 'Пункт 3.',
    children: null,
  },
]));
