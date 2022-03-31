/* eslint-disable no-undef */
class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display() {
    const filterContainer = document.querySelector(`#${this.containerId}`);
    filterContainer.insertAdjacentHTML('beforeend', `
      <form class="filters" action="">
        <h2>Filters</h2>
        <label for="">Author's name</label>
        <input type="text" class="author-name" placeholder="ignore">  
        <label for="">Date</label>
        <div class="filters-date">
          <input type="text" class="date-from" placeholder="from">  
          <input type="text" class="date-to" placeholder="to">  
        </div>
        <label for="">Twit text</label>
        <textarea class="twit-text" name="" placeholder="ignore"></textarea>
        <label for="">Hashtags</label>
        <input type="text" class="hashtags" name="" id="" placeholder="ignore">
        <button type="submit" class="find-button">Find</button>
      </form>
    `);
  }
}

export default FilterView;
