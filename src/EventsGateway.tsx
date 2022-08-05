import { io } from 'socket.io';
import ProgressBar from 'react-bootstrap/ProgressBar';

function EventsGateway() {

    let now = 0;
    const socket = io('http://localhost:3002');
    socket.on('connect', function() {
      console.log('Connected');
    });
    socket.on('status', function(data: any) {
      console.log('status', data);
      now = data.progress;
    });
    socket.on('disconnect', function() {
      console.log('Disconnected');
    });

    return <ProgressBar animated now={now} />;
}