
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-idb'
import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter'

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#like-button-container'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant
  })
}
export { createFavoriteButtonPresenterWithRestaurant }
