import './restaurant-skeleton-item'
class RestaurantSkeletonList extends HTMLElement {
  // eslint-disable-next-line accessor-pairs
  set count (count) {
    this._count = count
    this.render()
  }

  render () {
    for (let i = 1; i <= this._count; i++) {
      const restaurantSkeletonItem = document.createElement('restaurant-skeleton-item')
      this.appendChild(restaurantSkeletonItem)
    }
  }
}
customElements.define('restaurant-skeleton-list', RestaurantSkeletonList)
