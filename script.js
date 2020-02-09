const items = document.querySelector('.items');
const form = document.querySelector('#add-items');
const listItems = JSON.parse(localStorage.getItem('items')) || [];

function inputChangeHandler(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.item;
  listItems[index].done = !listItems[index].done;
  localStorage.setItem('items', JSON.stringify(listItems));
  populateItems(listItems, items);
}

function submitHandler(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false
  };
  listItems.push(item);
  populateItems(listItems, items);
  localStorage.setItem('items', JSON.stringify(listItems));
  this.reset();
}

function populateItems(plates, plateList) {
  plateList.innerHTML = plates
    .map((plate, i) => {
      return `<li>
            <input type="checkbox" id="item${i}" data-item="${i}" ${
        plate.done ? 'checked' : ''
      }/>
            <label for="item${i}">${plate.text}</label>
        </li>`;
    })
    .join('');
}

// Event Listeners
form.addEventListener('submit', submitHandler);
items.addEventListener('change', inputChangeHandler);
populateItems(listItems, items);
