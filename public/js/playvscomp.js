class Choose {
  constructor(playerChoose) {
    this.playerChoose = playerChoose;
    this.compChoose = this.setComputer();
  };

  getPlayer() {
    return this.playerChoose
  }

  getComputer() {
    return this.compChoose
  }
  setComputer() {
    const computer = ["batu", "kertas", "gunting"];
    return computer[Math.floor(Math.random() * computer.length)];
  };
}

class Result {
  constructor(result) {
    this.result = result;
  }
  static score(playerChoose, compChoose) {
    if (playerChoose === "batu" && compChoose === "batu" || playerChoose === "kertas" && compChoose === "kertas" ||
      playerChoose === "gunting" && compChoose === "gunting") {
      return 'Draw!!'
    } else if (playerChoose === "batu" && compChoose === "kertas" || playerChoose === "kertas" && compChoose === "gunting" || playerChoose === "gunting" && compChoose === "batu") {
      return 'Computer Win'
    } else {
      return 'Player Win'
    }
  }
}

class Game {
  constructor() {
    this.computers = document.querySelectorAll('#computer img');
    this.players = document.querySelectorAll('#player img');
    this.player = this.players.forEach(pick =>
      pick.addEventListener('click', this.gameStart.bind(this)));

    this.result = new Result();
    this.vs = document.querySelector('.vs');

    this.reset = document.querySelector('.reset');
  }

  gameStart(e) {
    if (e.target.classList.contains('done')) {
      e.target.classList.add('active');
      let cmp = new Choose(e.target.dataset.type);
      this.computers.forEach(function (c) {
        let computer = cmp.getComputer()
        if (computer === c.dataset.type) {
          c.classList.add('active');
        };
      });
      let elems = document.querySelectorAll(".done");
      [].forEach.call(elems, function (el) {
        el.classList.remove("done");
      });
      const playerChoose = cmp.getPlayer();
      const compChoose = cmp.getComputer();

      const hasil = this.show.call(this, Result.score(playerChoose, compChoose));

      this.buttonReset.call(this, e);

      console.log("computer memilih " + cmp.getComputer());

      console.log("player memilih " + cmp.getPlayer());

      // Using ajax for sent result to backend
      $.post("/history", {
        dataComputer: cmp.getComputer(),
        dataPlayer: cmp.getPlayer(),
        result: hasil
      })

    } else {
      alert('GAME OVER PLEASE PRESS RESET BUTTON!!');
    }

  }

  show(result) {
    this.vs.innerHTML = result;
    this.vs.classList.add('win');
    console.log(result);
    return result
  }

  buttonReset(e) {
    this.reset.addEventListener('click', function () {
      e.target.classList.remove('active');
      let elems = document.querySelectorAll(".gone");
      [].forEach.call(elems, function (el) {
        el.classList.add('done');
        el.classList.remove('active');
        el.classList.remove('win');
        el.innerHTML = 'vs';
      });
    });
  }
}

const bb = new Game();