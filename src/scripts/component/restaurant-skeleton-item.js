import { skeletonRestaurantItemTemplate } from '../views/templates/template-creator'

class RestaurantSkeletonItem extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = skeletonRestaurantItemTemplate()
  }
}
customElements.define('restaurant-skeleton-item', RestaurantSkeletonItem)
