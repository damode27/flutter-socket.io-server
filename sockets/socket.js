const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Breaking Benjamin'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Metallica'));


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado.');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        //console.log(payload.name);
        bands.addBand(new Band(payload.name));
        //bands.addBand(payload);
        io.emit('active-bands', bands.getBands());
    });

    //escuchar: add-band
    //bands.addBands
    //notoficar a todos: io.emit

    /*
    client.on('emitir-mensaje', (payload) => {
        //console.log(payload);
        //client.broadcast.emit('emitir-mensaje', payload);
        //io.emit('nuevo-mensaje', payload); //emite a todos!
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos, menos al que lo emitió
    });
    */

    //delete-band
    //bands.deleteBand()
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    

  });