import API_ENDPOINT from '../globals/api-endpoint'
import CONFIG from '../globals/config'

class RestaurantSource {
  static async allRestaurant () {
    const response = await fetch(API_ENDPOINT.HOME)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async detailRestaurant (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const responseJson = await response.json()
    if (responseJson.error) throw new Error(responseJson.message)
    return responseJson.restaurant
  }

  static async addRestaurantReview (data) {
    const request = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        review: data.review
      })
    })
    return request.json()
  }
}

export default RestaurantSource
