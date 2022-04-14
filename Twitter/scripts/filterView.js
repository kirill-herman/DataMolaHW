/* eslint-disable no-undef */
class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
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
          <input id="filter-date-from" name="dateFrom" type="text" class="date-from" placeholder="from">  
          <input id="filter-date-to" name="dateTo" type="text" class="date-to" placeholder="to">  
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
}

export default FilterView;
