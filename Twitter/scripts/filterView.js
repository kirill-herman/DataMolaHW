/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
class FilterView {
  constructor(containerId, controller) {
    this.containerId = containerId;
    this.handler = this._createHandler(controller);
  }

  display() {
    const filterContainer = document.querySelector(`#${this.containerId}`);
    filterContainer.innerHTML = `
      <form id="filter-form" class="filters" action="">
        <h2>Filters</h2>
        <label for="">Author's name</label>
        <input id="filter-author"name="author" type="text" class="author-name" placeholder="ignore">  
        <label for="">Date</label>
        <div class="filters-date">
          <input id="filter-date-from" name="dateFrom" type="text" class="date-from" placeholder="from dd:mm:yyyy">  
          <input id="filter-date-to" name="dateTo" type="text" class="date-to" placeholder="to dd:mm:yyyy">  
        </div>
        <label for="">Twit text</label>
        <textarea id="filter-text" name="text" class="twit-text" placeholder="ignore"></textarea>
        <label for="">Hashtags</label>
        <input id="filter-hashtag" type="text" class="hashtags" name="hashtags" id="" placeholder="ignore">
        <button id="filter-submit" type="submit" class="find-button">Find</button>
      </form>
    `;
  }

  displayEmpty() {
    document.querySelector(`#${this.containerId}`).innerHTML = '';
  }

  _parseDate(date) {
    const dateObj = `${date.split('.').reverse().join('-')}T00:00:00`;
    return new Date(dateObj);
  }

  _createHandler(controller) {
    const handler = (event) => {
      if (event.target.id === 'filter-submit') {
        event.preventDefault();
        const filterConfig = {};
        if (document.querySelector('#filter-author').value.length > 0) filterConfig.author = document.querySelector('#filter-author').value;
        if (document.querySelector('#filter-date-from').value.length > 0) filterConfig.dateFrom = this._parseDate(document.querySelector('#filter-date-from').value);
        if (document.querySelector('#filter-date-to').value.length > 0) filterConfig.dateTo = this._parseDate(document.querySelector('#filter-date-to').value);
        if (document.querySelector('#filter-hashtag').value.length > 0) filterConfig.hashtags = document.querySelector('#filter-hashtag').value.split(' ');
        if (document.querySelector('#filter-text').value.length > 0) filterConfig.text = document.querySelector('#filter-text').value;
        console.log(filterConfig);
        controller.getFeed(0, 10, filterConfig);
      }
    };
    return handler;
  }

  addListeners() {
    const filterContainer = document.querySelector(`#${this.containerId}`);
    filterContainer.addEventListener('click', this.handler);
  }

  removeListeners() {
    const filterContainer = document.querySelector(`#${this.containerId}`);
    filterContainer.removeEventListener('click', this.handler);
  }
}

export default FilterView;
