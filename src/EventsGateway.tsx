import { io } from 'socket.io-client';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import { Steps } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import './App.css';
import { useState } from 'react';

const { Step } = Steps;

function EventsGateway() {
    const [reverse, setReverse] = useState(0);

    let now = 0;
    const socket = io('http://localhost:3002');
    socket.on('connect', function() {
      console.log('Connected');
    });
    socket.on('status', function(data: any) {
      console.log('status', data);
      now = data.progress;
      // if (data['status'] === 'PENDING'){
      //   setReverse(1);
      // }
      if (data['status'] === 'GENERATING_AIRNODE_ADDRESS'){
        setReverse(1);
      }
      if (data['status'] === 'GENERATING_REQUESTER_CONTRACT'){
        setReverse(2);
      }
      if (data['status'] === 'DEPLOYING_REQUESTER_CONTRACT'){
        setReverse(3);
      }
      if (data['status'] === 'GENERATING_REQUESTER_CONTRACT'){
        setReverse(4);
      }
      if (data['status'] === 'DEPLOYING_REQUESTER_CONTRACT'){
        setReverse(5);
      }
      if (data['status'] === 'SPONSORING_REQUESTER_CONTRACT'){
        setReverse(6);
      }
    });
    socket.on('disconnect', function() {
      console.log('Disconnected');
    });
    return (
      <Steps direction="vertical" size='small' current={reverse}> 
      <Step title="PENDING" />
      <Step title="GENERATING_AIRNODE_ADDRESS" />
      <Step title="GENERATING_REQUESTER_CONTRACT" />
      <Step title="DEPLOYING_REQUESTER_CONTRACT" />
      <Step title="GENERATING_REQUESTER_CONTRACT" />
      <Step title="DEPLOYING_REQUESTER_CONTRACT"  />
      <Step title="SPONSORING_REQUESTER_CONTRACT" />
      </Steps>
    )
    ;
}
export default EventsGateway;