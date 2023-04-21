import './restaurant-item'
class RestauranList extends HTMLElement {
  // eslint-disable-next-line accessor-pairs
  set restaurants (restaurants) {
    this._restaurants = restaurants
    this.render()
  }

  render () {
    this._restaurants.forEach(restaurant => {
      const restaurantItem = document.createElement('restaurant-item')
      restaurantItem.restaurant = restaurant
      this.appendChild(restaurantItem)
    })
  }
}
customElements.define('restaurant-list', RestauranList)
