import RestaurantSource from '../../data/restaurant-source'

// component
import '../../component/restaurant-list'
import '../../component/restaurant-skeleton-list'
import '../../component/error-component'
const Home = {
  async render () {
    return `
    <div class="hero hero-home">
      <div class="hero-content">
        <h1 class="hero-title">Makan<span>YUKK</span></h1>
        <h2 class="hero-description">Temukan berbagai restoran terbaik di Indonesia</h2>
        <button class="hero-button" onclick="document.getElementById('restaurant').scrollIntoView()">Cari
            Sekarang</button>
        </div>
      </div>
      <section class="restaurant" id="restaurant">
        <h3 class="restaurant-title">Daftar Restoran</h3>
        <div class="restaurant-content" id="restaurant-content">
            <restaurant-list></restaurant-list>
        </div>
        <restaurant-skeleton-list></restaurant-skeleton-list>
      </section>
      `
  },
  async afterRender () {
    const restaurantContent = document.querySelector('#restaurant-content')
    const restaurantList = document.querySelector('restaurant-list')
    const skeletonList = document.querySelector('restaurant-skeleton-list')
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    skeletonList.count = 16
    try {
      const data = await RestaurantSource.allRestaurant()
      restaurantList.restaurants = data
      restaurantContent.appendChild(restaurantList)
      skeletonList.remove()
      nav.classList.remove('error')
    } catch (error) {
      main.innerHTML = '<error-component></error-component>'
      const errorComponent = document.querySelector('error-component')
      errorComponent.errorMessage = error
      nav.classList.add('error')
    }
  }
}

export default Home
