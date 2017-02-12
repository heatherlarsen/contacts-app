const initialState = {
  contacts: [
    {name: 'Albert Einstein', planet: 'Earth', isFavorite: true},
    {name: 'Steve Jobs', planet: 'Earth', isFavorite: false},
    {name: 'Bob the Builder', planet: 'Earth', isFavorite: false},
    {name: 'Superman', planet: 'Krypton', isFavorite: true},
    {name: 'Optimus Prime', planet: 'Cybertron', isFavorite: false}
  ],
  filters: {onlyEarth: false, search: ''}
}

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_FILTER':
    return Object.assign({}, state, {
      filters: {
        onlyEarth: action.value,
        search: state.filters.search
      }
    })
  default:
    return state;
  }
}

const store = Redux.createStore(reducer);

class Contact extends React.Component {
  render() { return <div>{this.props.name}</div>;}
}

class ContactList extends React.Component {
  handleChange = (event) => {
    this.props.setEarthFilter(event.target.checked);
  }

  render() {
    const sorted = this.props.contacts.slice().sort((a, b) => a.name > b.name);
    // 7/ filter contacts based on the value of our onlyEarth filter, and the contact's planet
    const filtered = sorted.filter(contact => {
      if (this.props.filters.onlyEarth) {
        return contact.planet === 'Earth' ? true : false;
      } else {
        return true;
      }
    })

    // 6/ map over "filtered" contacts instead of just "sorted"
    return (
      <div>
        <h2>Contacts List</h2>
        <input type="checkbox" checked={this.props.filters.onlyEarth} onChange={this.handleChange}/>
        Only Earth
        {filtered.map(contact => <Contact name={contact.name} key={contact.name}/>)}
      </div>
    );
  }
}

store.subscribe(() => {
  ReactDOM.render(
  <ContactList
    contacts={store.getState().contacts}
    filters={store.getState().filters}
    setEarthFilter={onlyEarth => store.dispatch({type: 'SET_FILTER', value: onlyEarth})}
    />, document.getElementById('root'))
});
store.dispatch({type:'START'});