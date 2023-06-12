const generateRoomNumber = document.getElementById('generateRoomNumber');
const error = document.getElementById('error');
const roomNumber = document.querySelector('.roomNumber');

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  error.append(wrapper)
}


generateRoomNumber.addEventListener('click', () => {
  if (roomNumber.value == "") {
    const result = Math.floor(1000 + Math.random() * 9000)
    console.log(result)
    roomNumber.value = result
    alert('Room Id Berhasil di buat, silahkan klik tombol create room', 'success')
    return result
  } else {
    alert('Room Id Sudah Ada!, silahkan klik tombol create room', 'danger')
  }
});