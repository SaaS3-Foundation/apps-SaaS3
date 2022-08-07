import { io } from 'socket.io-client';
import ProgressBar from 'react-bootstrap/ProgressBar';

function EventsGateway() {

    let now = 0;
    const socket = io('http://localhost:3000');
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
export default EventsGateway;