const socket = io();


let multiplayer = document.getElementById("multiplayer");
let roomName = document.getElementById("roomName").innerText;
socket.emit('joinRoom', roomName);
socket.on('gamestarted', (data) => {
  if (data.userId === data.room.userId1) {
    multiplayer.innerHTML = "<div class='row d-flex justify-content-center text-center mt-5'><div class='col-lg-2 my-auto mx-auto'><h1 class='mb-5 title'>You</h1><div id='player'><img src='/../img/batu.png' data-type='batu' class='batu done gone'><img src='/../img/kertas.png' data-type='kertas' class='kertas done gone'><img src='/../img/gunting.png' data-type='gunting' class='gunting done gone'></div></div><div class='col-lg-2 mx-auto my-auto'><h1 class='vs gone' id='hasil'>VS</h1></div><div class='col-lg-2 my-auto mx-auto'><h1 class='mb-5 title'>Player 2</h1><div id='computer'><img src='/../img/batu.png' data-type='batu' class='done gone'><img src='/../img/kertas.png' data-type='kertas' class='done gone'><img src='/../img/gunting.png' data-type='gunting' class='done gone'></div></div>"

    const player1 = document.querySelectorAll('#player img');
    const player2 = document.querySelectorAll('#computer img');
    const player1Choose = player1.forEach(pick =>
      pick.addEventListener('click', (e) => {
        if (e.target.classList.contains('done')) {
          e.target.classList.add('active');
          let elems = document.querySelectorAll(".done");
          [].forEach.call(elems, function (el) {
            el.classList.remove("done");
          });
          let p1 = e.target.dataset.type;
          socket.emit('player1choose', { p1, data });
          console.log(e.target.dataset.type)
        } else {
          alert('Anda Sudah Memilih, Silahkan Tunggu Hasil Keluar!!');
        }
      }));
    socket.on('score', (result) => {
      let vs = document.querySelector('.vs');
      vs.innerHTML = result;
      vs.classList.add('win');
      console.log(result)
    });
    socket.on('game-over', () => {
      alert('Game Over! silahkan create kembali room');
    });
  }

  if (data.userId === data.room.userId2) {
    multiplayer.innerHTML = "<div class='row d-flex justify-content-center text-center mt-5'><div class='col-lg-2 my-auto mx-auto'><h1 class='mb-5 title'>Player 1</h1><div id='computer'><img src='/../img/batu.png' data-type='batu' class='batu done gone'><img src='/../img/kertas.png' data-type='kertas' class='kertas done gone'><img src='/../img/gunting.png' data-type='gunting' class='gunting done gone'></div></div><div class='col-lg-2 mx-auto my-auto'><h1 class='vs gone' id='hasil'>VS</h1></div><div class='col-lg-2 my-auto mx-auto'><h1 class='mb-5 title'>You</h1><div id='player'><img src='/../img/batu.png' data-type='batu' class='done gone'><img src='/../img/kertas.png' data-type='kertas' class='done gone'><img src='/../img/gunting.png' data-type='gunting' class='done gone'></div></div>"
    const player2 = document.querySelectorAll('#player img');
    const player1 = document.querySelectorAll('#computer img');
    const player2Choose = player2.forEach(pick =>
      pick.addEventListener('click', (e) => {
        if (e.target.classList.contains('done')) {
          e.target.classList.add('active');
          let elems = document.querySelectorAll(".done");
          [].forEach.call(elems, function (el) {
            el.classList.remove("done");
          });
          let p2 = e.target.dataset.type;
          socket.emit('player2choose', { p2, data });
          console.log(e.target.dataset.type);
        } else {
          alert('Anda Sudah Memilih, Silahkan klik Reset!!');
        }
      }));
    socket.on('score', (result) => {
      let vs = document.querySelector('.vs');
      vs.innerHTML = result;
      vs.classList.add('win');
      console.log(result)
    });
    socket.on('game-over', () => {
      alert('Game Over! silahkan create kembali room');
    });
  }
  socket.emit('result', data);
});




