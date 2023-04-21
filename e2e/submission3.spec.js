const assert = require('assert')
Feature('submission3')
Before(({ I }) => {
  I.amOnPage('/#/favorite/')
})
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.restaurant-empty')
  I.see('Tidak ada restaurant favorit', '.empty-message p')
})
Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant favorit', '.empty-message p')
  I.amOnPage('/')
  I.seeElement('restaurant-item')
  const firstRestaurant = locate('restaurant-item a').first()
  const firstRestaurantName = await I.grabTextFrom(locate('a .restaurant-content .restaurant-name'))
  I.click(firstRestaurant)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite/')
  I.seeElement('restaurant-item')
  const likedRestaurantName = await I.grabTextFrom('a .restaurant-content .restaurant-name')
  assert.strictEqual(firstRestaurantName, likedRestaurantName)
})

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant favorit', '.empty-message p')
  I.amOnPage('/')
  I.seeElement('restaurant-item')
  const firstRestaurant = locate('restaurant-item a').first()
  const firstRestaurantName = await I.grabTextFrom(locate('a .restaurant-content .restaurant-name'))
  I.click(firstRestaurant)
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite/')
  I.seeElement('restaurant-item')
  const likedRestaurantName = await I.grabTextFrom('a .restaurant-content .restaurant-name')
  assert.strictEqual(firstRestaurantName, likedRestaurantName)
  I.click(likedRestaurantName)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite/')
  I.seeElement('.restaurant-empty')
  I.see('Tidak ada restaurant favorit', '.empty-message p')
})

Scenario('Add Review in first restaurant', async ({ I }) => {
  const name = 'Submission 3 E2E Test'
  const review = 'Ini Komentar dari E2E Test'

  I.amOnPage('/')
  I.seeElement('restaurant-item')
  I.click(locate('restaurant-item a').first())

  I.seeElement('#form-review')
  I.fillField('#input-nama', name)
  I.fillField('#input-review', review)
  I.forceClick('#submit-review')
  I.seeElement('.swal2-container')
  I.see('Review Berhasil Ditambahkan', '.swal2-html-container')
})
