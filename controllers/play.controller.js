const io = require('socket.io');

const cookieParser = require('cookie-parser');
const { sessionMiddleware, score } = require('../utils/method/method');

const { Play, MultiPlayerGameHistory } = require('../models');


exports.index = (req, res) => {
  const idUser = req.session.userId
  res.status(200).render('play', {
    layout: 'play',
    title: 'Rock, Papper, Scissor',
    idUser
  });
}
exports.gamecomp = (req, res) => {
  res.status(200).render('playvscomp', {
    layout: 'playvscomp',
    title: 'Rock, Papper, Scissor',
  });
};

exports.createRoom = async (req, res) => {
  try {
    const { roomName, roomNumber } = req.body;
    console.log(roomName, roomNumber)
    const player1 = req.session.userId;
    const room = await Play.create({
      roomName,
      roomNumber,
      userId1: player1,
      userId2: null,
      player1: true,
      player2: false
    });
    res.redirect(`/play/joinroom?roomName=${roomName}&roomNumber=${roomNumber}&userId=${player1}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
exports.joinRoom = async (req, res) => {
  try {
    const { roomName, roomNumber, userId } = req.query;
    const idUser = req.session.userId;
    const room = await Play.findOne({ where: { roomName, roomNumber } });
    if (!room) {
      res.status(404).send('Room not found');
      return;
    };
    if (idUser !== room.userId1) {
      await room.update({ userId2: userId, player2: true });
    };
    res.render('multiplayers', {
      layout: 'multiplayers',
      title: 'Rock, Papper, Scissor Multiplayers',
      room,
      roomName,
      roomNumber,
      userId,
      idUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};



const players = {};

exports.socketio = (socketServer) => {
  const ioObject = io(socketServer);

  ioObject.use((socket, next) => {
    cookieParser()(socket.request, {}, () => {
      sessionMiddleware(socket.request, {}, () => {
        next();
      });
    });
  });

  ioObject.on('connection', async (client) => {
    const req = client.request;
    console.log('a user connected');


    client.on('joinRoom', async (roomName) => {
      const room = await Play.findOne({ where: { roomName } });
      const history = await MultiPlayerGameHistory.findOne({ where: { playId: room.id } });
      let countHistory = 1;

      if (room.userId2 == null) {
        client.join(room.roomNumber);
        console.log('player 1 has joined room')
        players[client.id] = { userId1: room.userId1, roomNumber: room.roomNumber };
        client.to(room.roomNumber).emit('player1hasjoin');
        client.emit('player1hasjoin', room);
      }
      if (room.player2 == true) {
        client.join(room.roomNumber);
        console.log('player 2 has joined room')
        players[client.id] = { userId2: room.userId2, roomNumber: room.roomNumber };
        client.to(room.roomNumber).emit('player2hasjoin');
        client.emit('player2hasjoin', room);
      }
      const userId = req.session.userId;
      const roomObject = ioObject.sockets.adapter.rooms.get(room.roomNumber);
      const clients = roomObject ? Array.from(roomObject) : [];
      console.log(clients);
      client.emit('gamestarted', { room, clients, userId });

      if (!history) {
        const histories = await MultiPlayerGameHistory.create({
          playId: room.id,
          noHistory: countHistory,
          result: null,
          player1: null,
          player2: null
        });
      } else if (history.noHistory == 1 && history.player1 != null && history.player2 != null && history.result != null) {
        const history2 = await MultiPlayerGameHistory.findOne({ where: { playId: room.id, noHistory: 2 } });
        if (!history2) {
          const histories = await MultiPlayerGameHistory.create({
            playId: room.id,
            noHistory: 2,
            result: null,
            player1: null,
            player2: null
          });
        } else if (history2.noHistory == 2 && history2.player1 != null && history2.player2 != null && history2.result != null) {
          const history3 = await MultiPlayerGameHistory.findOne({ where: { playId: room.id, noHistory: 3 } });
          if (!history3) {
            const histories = await MultiPlayerGameHistory.create({
              playId: room.id,
              noHistory: 3,
              result: null,
              player1: null,
              player2: null
            });
          } else if (history3.noHistory == 3 && history3.player1 != null && history3.player2 != null && history3.result != null) {
            console.log('game over');
            client.emit('game-over', { history })
            return
          }
        }
      }

      const history1 = await MultiPlayerGameHistory.findOne({ where: { playId: room.id, noHistory: 1 } });
      if (history1) {
        if (history1.player1 == null && history1.player2 == null && history1.result == null) {
          client.on('player1choose', async (p1) => {
            const history = await MultiPlayerGameHistory.findOne({ where: { playId: p1.data.room.id, noHistory: 1 } });
            if (history.player1 == null) {
              await history.update({ player1: p1.p1 });
              const resultData = { data1: p1.p1, data2: history.player2 };
              if (history.player2 != null) {
                client.emit('result', resultData);
                const result = score(resultData.data1, resultData.data2);
                await history.update({ result: result });
              }
            }
            if (history.result != null) {
              client.to(p1.data.room.roomNumber).emit('score', history.result);
              client.emit('score', history.result);
            }
          });
          client.on('player2choose', async (p2) => {
            const history = await MultiPlayerGameHistory.findOne({ where: { playId: p2.data.room.id, noHistory: 1 } });
            if (history.player2 == null) {
              await history.update({ player2: p2.p2 });
              const resultData = { data1: history.player1, data2: p2.p2 };
              if (history.player1 != null) {
                client.emit('result', resultData);
                const result = score(resultData.data1, resultData.data2);
                await history.update({ result: result });
              }
            }
            if (history.result != null) {
              client.to(p2.data.room.roomNumber).emit('score', history.result);
              client.emit('score', history.result);
            }
          });
        }
      }
      const history2 = await MultiPlayerGameHistory.findOne({ where: { playId: room.id, noHistory: 2 } });
      if (history2) {

        if (history2.player1 == null && history2.player2 == null && history2.result == null) {
          client.on('player1choose', async (p1) => {
            const history = await MultiPlayerGameHistory.findOne({ where: { playId: p1.data.room.id, noHistory: 2 } });
            if (history.player1 == null) {
              await history.update({ player1: p1.p1 });
              const resultData = { data1: p1.p1, data2: history.player2 };
              if (history.player2 != null) {
                client.emit('result', resultData);
                const result = score(resultData.data1, resultData.data2);
                await history.update({ result: result });
              }
            }
            if (history.result != null) {
              client.to(p1.data.room.roomNumber).emit('score', history.result);
              client.emit('score', history.result);
            }
          });
          client.on('player2choose', async (p2) => {
            const history = await MultiPlayerGameHistory.findOne({ where: { playId: p2.data.room.id, noHistory: 2 } });
            if (history.player2 == null) {
              await history.update({ player2: p2.p2 });
              const resultData = { data1: history.player1, data2: p2.p2 };
              if (history.player1 != null) {
                client.emit('result', resultData);
                const result = score(resultData.data1, resultData.data2);
                await history.update({ result: result });
              }
            }
            if (history.result != null) {
              client.to(p2.data.room.roomNumber).emit('score', history.result);
              client.emit('score', history.result);
            }
          });
        }
      }
      const history3 = await MultiPlayerGameHistory.findOne({ where: { playId: room.id, noHistory: 3 } });
      if (history3) {

        if (history3.player1 == null && history3.player2 == null && history3.result == null) {
          client.on('player1choose', async (p1) => {
            const history = await MultiPlayerGameHistory.findOne({ where: { playId: p1.data.room.id, noHistory: 3 } });
            if (history.player1 == null) {
              await history.update({ player1: p1.p1 });
              const resultData = { data1: p1.p1, data2: history.player2 };
              if (history.player2 != null) {
                client.emit('result', resultData);
                const result = score(resultData.data1, resultData.data2);
                await history.update({ result: result });
              }
            }
            if (history.result != null) {
              client.to(p1.data.room.roomNumber).emit('score', history.result);
              client.emit('score', history.result);
            }
          });
          client.on('player2choose', async (p2) => {
            const history = await MultiPlayerGameHistory.findOne({ where: { playId: p2.data.room.id, noHistory: 3 } });
            if (history.player2 == null) {
              await history.update({ player2: p2.p2 });
              const resultData = { data1: history.player1, data2: p2.p2 };
              if (history.player1 != null) {
                client.emit('result', resultData);
                const result = score(resultData.data1, resultData.data2);
                await history.update({ result: result });
              }
            }
            if (history.result != null) {
              client.to(p2.data.room.roomNumber).emit('score', history.result);
              client.emit('score', history.result);
            }
          });
        }
      }
    });

    client.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
