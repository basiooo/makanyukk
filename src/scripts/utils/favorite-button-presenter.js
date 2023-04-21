import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator'

const FavoriteButtonPresenter = {
  async init ({ favoriteButtonContainer, favoriteRestaurant, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer
    this._restaurant = restaurant
    this._favoriteRestaurant = favoriteRestaurant

    await this._renderButton()
  },
  async _renderButton () {
    const { id } = this._restaurant
    if (await this._isFavorite(id)) {
      this._renderUnFavorite()
    } else {
      this._renderFavorite()
    }
  },
  async _isFavorite (id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id)
    return !!restaurant
  },
  _renderFavorite () {
    this._favoriteButtonContainer.innerHTML = createLikeButtonTemplate()
    const favoriteButton = document.querySelector('#likeButton')
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant)
      this._renderButton()
    })
  },
  _renderUnFavorite () {
    this._favoriteButtonContainer.innerHTML = createLikedButtonTemplate()
    const favoriteButton = document.querySelector('#likeButton')
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id)
      this._renderButton()
    })
  }
}

export default FavoriteButtonPresenter
