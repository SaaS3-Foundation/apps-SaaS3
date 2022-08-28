import { message, Steps, Modal } from 'antd';
import './App.css';
import { useRef, useState, useEffect } from 'react';
import { getStatus } from './api/eventGateway'
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { Step } = Steps;
let finished = 0;

const maps = {
  PENDING: 1,
  GENERATING_DAPI_ADDRESS: 2,
  GENERATING_DAPI_CONFIG: 3,
  GENERATING_DAPI_SECRET: 4,
  GENERATING_DAPI_CONTRACT: 5,
  DEPLOYING_DAPI_CONTRACT: 6,
  SPONSORING_DAPI_CONTRACT: 7,
  DEPLOYING_DAPI: 8,
  DONE: 9,
};

function EventsGateway(props: { submitData: any }) {
  const { submitData } = props;
  const [reverse, setReverse] = useState(0);
  const finish = useRef(null);
  const marketplaceLink = () => {

  };
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const _timer = setTimeout(async () => {
      let code = 0;
      try {
        const ret = await getStatus({ id: submitData?.id || 'KHGniTZF2L' });
        const { status } = ret.data.data;
        code = (maps as any)[status];
      } catch (error) {
        // message.error('');
      }
      setReverse(code);
      if (code === 9) {
        message.destroy()
        message.success('Oracle Has been Submitted!');
        Modal.confirm({
          title: 'Congratulations',
          icon: <ExclamationCircleOutlined />,
          content: 'Your Oracle was Launched, Go to Marketplace to Find',
          okText: 'Yes',
          okType: 'primary',
          cancelText: 'No',
          onOk() {
            window.location.href = 'https://saas3.io/marketplace';
          },
          onCancel() {
            Modal.destroyAll();
          },
        });
        // setTimer(_timer);
      } else {
        setTimer(_timer);
      }
    }, 3000);

    return () => clearTimeout(timer as NodeJS.Timeout);
  }, [timer])

  return (
    <Steps direction="vertical" size='small' current={reverse} onChange={(current) => {

    }}>
      <Step title="PENDING" />
      <Step title="GENERATING_DAPI_ADDRESS" />
      <Step title="GENERATING_DAPI_CONFIG" />
      <Step title="GENERATING_DAPI_SECRET" />
      <Step title="GENERATING_DAPI_CONTRACT" />
      <Step title="DEPLOYING_DAPI_CONTRACT" />
      <Step title="SPONSORING_DAPI_CONTRACT" />
      <Step title="DEPLOYING_DAPI" />
      <Step title="DONE" ref={finish} />
    </Steps>
  )
    ;
}
export default EventsGateway;