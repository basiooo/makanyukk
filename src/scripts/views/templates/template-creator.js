import CONFIG from '../../globals/config'
const filterXSS = require('xss')
const restaurantItemTemplate = (restaurant) => {
  return `
    <a href="#/detail/${restaurant.id}" class="restaurant-item" aria-label="${restaurant.name}">
     <div class="restaurant-header">
         <img class="restaurant-header-image lazyload" crossorigin="anonymous" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}" alt="${restaurant.name}">
             <div class="restaurant-city-badge">
                 <p><i class="fas fa-map-marker-alt"></i>${restaurant.city}</p>
             </div>
     </div>
     <div class="restaurant-content">
         <p class="restaurant-name">
            ${restaurant.name}
         </p>
         <div id="restaurant-rating" class="restaurant-rating">
            ${createRatingTemplate(restaurant.rating, 5)}
            <b>${restaurant.rating}</b>
         </div>
         <hr>
        <p class="restaurant-description">${restaurant.description}</p>
     </div>
  </a>`
}

const heroDetailTemplate = (restaurant) => {
  document.querySelector('.hero').style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.3477766106442577) 50%, rgba(18, 18, 19, 1) 100%) , url('${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}' )`
  return `
    <div class="hero-content">
      <h1 class="hero-restaurant-name">${restaurant.name}</h1>
      <div class="hero-restaurant-rating">
        ${createRatingTemplate(restaurant.rating, 5)}
        <b>${restaurant.rating}</b>
      </div>
      <h2 class="hero-restaurant-city">${restaurant.city}</h2>
      <p class="hero-restaurant-address">${restaurant.address}</p>
    </div>`
}
const restaurantDetailTemplate = (restaurant) => {
  return `
    <div class="detail-description">
        <ul class="detail-category">
        ${restaurant.categories.map(category => {
                return `<li>${category.name}</li>`
        }).join('')}
        </ul>
        <p>${restaurant.description}</p>
    </div>
    <div class="detail_menu">
        <div class="card-menu">
            <p class="card-menu-title">Makanan</p>
            <hr>
            <ul>
                ${restaurant.menus.foods.map(food => {
                    return `<li>${food.name}</li>`
                }).join('')}
            </ul>
        </div>
        <div class="card-menu">
            <p class="card-menu-title">Minuman</p>
            <hr>
            <ul>
                ${restaurant.menus.drinks.map(drink => {
                    return `<li>${drink.name}</li>`
                }).join('')}
            </ul>
        </div>
    </div>
    `
}
const detailReviewTemplate = (reviews) => {
  return `
    <h3 class="review-title">Reviews</h3>
    <form class="form-review" id="form-review">
        <div class="form-group">
            <label for="input-nama">Nama</label>
            <input id="input-nama" class="form-input" placeholder="Nama" required>
        </div>
        <div class="form-group">
            <label for="input-review">Review</label>
            <textarea id="input-review" class="form-input" placeholder="Tuliskan Review..." rows="5" required></textarea>
        </div>
        <button type="submit" id="submit-review">Tambah Review</button>
    </form>
    <ul class="list-review">
        ${reviews.reverse().map(review => {
            return `
            <li class="item-review">
                <div>
                    <i class="fas fa-user user-avatar"></i>
                </div>
                <div>
                <p class="user-review-name">
                ${filterXSS(review.name.trim() || '<i><s>Nama tidak valid</s></i>', {
                    whiteList: { i: [], s: [] }
                })}
                </p>
                <p class="user-review-date">${filterXSS(review.date || '&nbsp')}</p>
                <p class="user-review-comment">
                ${filterXSS(review.review.trim() || '<i><s>Komentar tidak valid</s></i>', {
                    whiteList: { i: [], s: [] }
                })}
                </p>
                </div>
            </li>
            `
        }).join('')}
    </ul>
    `
}
const skeletonRestaurantItemTemplate = () => {
  return `
    <div class="restaurant-image-skeleton skeleton-animation">
        <div class="restaurant-city-badge-skeleton ">
        </div>
    </div>
    <div class="restaurant-conten-skeleton">
        <div class="restaurant-name-skeleton skeleton-animation">
        </div>
        <div class="restaurant-rating-skeleton skeleton-animation">
        </div>
        <hr>
        <div class="restaurant-description-skeleton ">
            <div class="restaurant-description-skeleton-item1 skeleton-animation"></div>
            <div class="restaurant-description-skeleton-item2 skeleton-animation"></div>
            <div class="restaurant-description-skeleton-item3 skeleton-animation"></div>
        </div>
    </div>`
}
const preloaderTemplate = () => {
  return `
    <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    </div>
    <h2>Silahkan Tunggu</h2>
    `
}
const emptyTemplate = () => {
  return `
    <div class="restaurant-empty">
        <img class="empty-image" src="images/empty.png">
        <div class="empty-message">
            <p>Tidak ada restaurant favorit</p>
        </div>
    </div>`
}

const createLikeButtonTemplate = () => {
  return `
  <button aria-label="tambahkan restaurant ke favorit" id="likeButton" class="like">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`
}

const createLikedButtonTemplate = () => {
  return `
  <button aria-label="Hapus restaurant dari Favorite" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`
}

const createRatingTemplate = (rating, maxRating) => {
  const ratingEkor = rating.toString().substring(2, 3)
  let result = ''
  for (let i = 1; i <= maxRating; i++) {
    if (i <= parseInt(rating)) {
      result += '<i class="fas fa-star"></i>'
    } else {
      if (ratingEkor !== 0 && i === Math.ceil(rating)) {
        result += '<i class="fas fa-star-half-alt"></i>'
      } else {
        result += '<i class="far fa-star"></i>'
      }
    }
  }
  return result
}
export {
  restaurantItemTemplate,
  skeletonRestaurantItemTemplate,
  heroDetailTemplate,
  restaurantDetailTemplate,
  detailReviewTemplate,
  preloaderTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createRatingTemplate,
  emptyTemplate
}
