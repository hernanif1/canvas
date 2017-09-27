(function () {
  // Get the modal
  var modal = document.querySelector('div[data-js="modal"]')

  // Get the button that opens the modal
  var buttonOpenModal = document.querySelector('a[data-js="openModal"]')

  // Get the <span> element that closes the modal
  var buttonCloseModal = document.querySelector('span[data-js="closeModal"]')

  // When the user clicks on the button, open the modal
  buttonOpenModal.onclick = function () {
    modal.style.display = 'block'
  }

  // When the user clicks on <span> (x), close the modal
  buttonCloseModal.onclick = function () {
    modal.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  }
})()
