import { io } from 'socket.io-client';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import { Steps } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import './App.css';
import { useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const { Step } = Steps;

function EventsGateway() {
    const [reverse, setReverse] = useState(0);
    const finish = useRef(null);

    let now = 0;
    const socket = io('http://150.109.145.144:3002');
    socket.on('connect', function() {
      console.log('Connected');
    });
    socket.on('status', function(data: any) {
      console.log('status', data);
      now = data.progress;
      if (data['status'] === 'PENDING'){
        setReverse(1);
      }
      if (data['status'] === 'GENERATING_DAPI_ADDRESS'){
        setReverse(2);
      }
      if (data['status'] === 'GENERATING_DAPI_CONFIG'){
        setReverse(3);
      }
      if (data['status'] === 'GENERATING_DAPI_SECRET'){
        setReverse(4);
      }
      if (data['status'] === 'GENERATING_DAPI_CONTRACT'){
        setReverse(5);
      }
      if (data['status'] === 'DEPLOYING_DAPI_CONTRACT'){
        setReverse(6);
      }
      if (data['status'] === 'SPONSORING_DAPI_CONTRACT'){
        setReverse(7);
      }
      if (data['status'] === 'DEPLOYING_DAPI'){
        setReverse(8);
      }
      if (data['status'] === 'DONE'){
        setReverse(9);
      }
    });
    socket.on('disconnect', function() {
      console.log('Disconnected');
    });
    return (
      <Steps direction="vertical" size='small' current={reverse} onChange={(current)=>{
        
        }}> 
        <Step title="PENDING" />
        <Step title="GENERATING_DAPI_ADDRESS" />
        <Step title="GENERATING_DAPI_CONFIG" />
        <Step title="GENERATING_DAPI_SECRET" />
        <Step title="GENERATING_DAPI_CONTRACT" />
        <Step title="DEPLOYING_DAPI_CONTRACT"  />
        <Step title="SPONSORING_DAPI_CONTRACT" />
        <Step title="DEPLOYING_DAPI" />
        <Step title="DONE" ref={finish}/>
      </Steps>
    )
    ;
}
export default EventsGateway;