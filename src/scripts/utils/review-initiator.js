import RestaurantSource from '../data/restaurant-source'
import Swal from 'sweetalert2'

const ReviewInitiator = {
  init ({
    form,
    id,
    name,
    review
  }) {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      if (this._validate(name.value, review.value)) {
        this._submit({
          id: id,
          name: name.value.trim(),
          review: review.value.trim()
        })
        return
      }
      Swal.fire({
        title: 'Kesalahan..!',
        text: 'Silahkan Isi kolom nama dan review terlebih dahulu',
        icon: 'error'
      })
    })
  },

  _validate (name, review) {
    return !(name.trim() === '' || review.trim() === '')
  },

  async _submit (data) {
    await RestaurantSource.addRestaurantReview(data)
      .then((response) => {
        if (response.error) {
          return Promise.reject(response.message)
        }
        Swal.fire({
          title: 'Berhasil..!',
          text: 'Review Berhasil Ditambahkan',
          icon: 'success',
          willClose: () => {
            window.location.reload()
          }
        })
      }).catch((error) => {
        Swal.fire({
          title: 'Kesalahan..!',
          text: error,
          icon: 'error'
        })
      })
  }
}
export default ReviewInitiator
