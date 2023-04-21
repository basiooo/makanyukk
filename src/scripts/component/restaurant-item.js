import { restaurantItemTemplate } from '../views/templates/template-creator'
class RestauranItem extends HTMLElement {
  // eslint-disable-next-line accessor-pairs
  set restaurant (restaurant) {
    this._restaurant = restaurant
    this.render()
  }

  render () {
    this.innerHTML = restaurantItemTemplate(this._restaurant)
  }
}
customElements.define('restaurant-item', RestauranItem)
