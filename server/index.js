import express from 'express';
import logger from 'morgan';

import {Server} from 'socket.io';
import {createServer} from 'node:http';


const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

io.on('connection', (socket) => {
    console.log('USER HAS CONNECTED');

    socket.on('disconnect', () => {
        console.log('USER HAS DISCONNECTED');
        
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

//mandar el log a un archivo.
app.use(logger('dev'));

app.get('/', (req, res) => {
    //carpeta donde se inicializo el proceso + ruta al archivo.
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
    console.log(`server corrieno en ${port}`);
})

