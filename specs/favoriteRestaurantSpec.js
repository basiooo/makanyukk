import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb'
import * as TestFactories from './helpers/testFactories'

describe('add  favorite Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="like-button-container"></div>'
  }

  beforeEach(() => {
    addFavoriteButtonContainer()
  })

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })
    expect(document.querySelector('[aria-label="tambahkan restaurant ke favorit"]'))
      .toBeTruthy()
  })

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="Hapus restaurant dari Favorite"]')).toBeFalsy()
  })

  it('should be able to like the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    const movie = await FavoriteRestaurantIdb.getRestaurant(1)

    expect(movie).toEqual({ id: 1 })

    FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 })

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    // tidak ada film yang ganda
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }])

    FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({})

    document.querySelector('#likeButton').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })
})
