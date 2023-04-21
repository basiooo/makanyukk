import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb'
import * as TestFactories from './helpers/testFactories'

describe('Unliking A restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="like-button-container"></div>'
  }

  beforeEach(async () => {
    addFavoriteButtonContainer()
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
  })

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="Hapus restaurant dari Favorite"]')).toBeTruthy()
  })

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="tambahkan restaurant ke favorit"]')).toBeFalsy()
  })

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    document.querySelector('[aria-label="Hapus restaurant dari Favorite"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    await FavoriteRestaurantIdb.deleteRestaurant(1)

    document.querySelector('[aria-label="Hapus restaurant dari Favorite"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })
})
