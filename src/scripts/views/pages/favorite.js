import FavoriteRestaurantIdb from '../../data/favorite-idb'
import { emptyTemplate } from '../templates/template-creator'

const Favorite = {
  async render () {
    return `
    <div class="hero hero-favorite">
      <div class="hero-content">
      <h1 class="hero-favorite-title">Favorite</h1>
      </div>
    </div>
    <section class="restaurant" id="restaurant">
    <h2 class="restaurant-title">Daftar Restoran</h2>
    <div class="restaurant-content" id="restaurant-content">
        <restaurant-list></restaurant-list>
    </div>
    <restaurant-skeleton-list></restaurant-skeleton-list>
  </section>
      `
  },

  async afterRender () {
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    const restaurantList = document.querySelector('restaurant-list')
    const skeletonList = document.querySelector('restaurant-skeleton-list')
    const restaurantContent = document.querySelector('#restaurant-content')
    skeletonList.count = 8
    try {
      const data = await FavoriteRestaurantIdb.getAllRestaurants()
      if (data.length === 0)restaurantContent.innerHTML = emptyTemplate()
      restaurantList.restaurants = data
      skeletonList.remove()
      nav.classList.remove('error')
    } catch (error) {
      main.innerHTML = 'error-component></error-component>'
      const errorComponent = document.querySelector('error-component')
      errorComponent.errorMessage = error
      nav.classList.add('error')
    }
  }
}

export default Favorite
