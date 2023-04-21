import UrlParser from '../../routes/url-parser'
import RestaurantSource from '../../data/restaurant-source'
import {
  detailReviewTemplate,
  heroDetailTemplate,
  restaurantDetailTemplate,
  preloaderTemplate
} from '../templates/template-creator'
import ReviewInitiator from '../../utils/review-initiator'
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter'
import FavoriteRestaurantIdb from '../../data/favorite-idb'
const Detail = {
  async render () {
    return `
      <div class="hero hero-detail" id="hero-detail">
      </div>
      <div class="detail-content" id="detail-content">
      </div>
      <div class="detail-review" id="detail-review">
      </div>
      <div class="preloader"></div>
      <div id="like-button-container"></div>
      `
  },

  async afterRender () {
    const hero = document.querySelector('#hero-detail')
    const detailContent = document.querySelector('#detail-content')
    const detailReview = document.querySelector('#detail-review')
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    const { id } = UrlParser.parseActiveUrlWithoutCombiner()
    const loader = document.querySelector('.preloader')
    loader.innerHTML = preloaderTemplate()
    try {
      const restaurant = await RestaurantSource.detailRestaurant(id)
      hero.innerHTML = heroDetailTemplate(restaurant)
      detailContent.innerHTML = restaurantDetailTemplate(restaurant)
      detailReview.innerHTML = detailReviewTemplate(restaurant.customerReviews)
      loader.remove()
      nav.classList.remove('error')
      FavoriteButtonPresenter.init({
        favoriteButtonContainer: document.querySelector('#like-button-container'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          city: restaurant.city,
          pictureId: restaurant.pictureId,
          description: restaurant.description,
          rating: restaurant.rating
        }

      })
      ReviewInitiator.init({
        id,
        review: document.querySelector('#input-review'),
        name: document.querySelector('#input-nama'),
        form: document.querySelector('#form-review')
      })
    } catch (error) {
      main.innerHTML = '<error-component></error-component>'
      const errorComponent = document.querySelector('error-component')
      errorComponent.errorMessage = error
      nav.classList.add('error')
    }
  }
}

export default Detail
