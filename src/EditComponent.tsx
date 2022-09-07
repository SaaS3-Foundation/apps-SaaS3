import './FormComponent.css';
import React, { useContext, useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import { web3Context } from './provider/web3';
import { submit } from './api/eventGateway';


const { TextArea } = Input;
function EditComponent(props: any) {
  const { onSubmit } = props;
  const [error, setError] = useState("null");
  const [oracleName, setOracleName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [loading, setLoading] = useState(false);

  const { connect, account } = useContext(web3Context);

  const connectWallet = async () => {
    try {
      await connect();
    } catch (error) {

    }
  };


  const [form] = Form.useForm();

  const handleOracleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOracleName(event.target.value);
  };

  const handleCreatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatorName(event.target.value);
  };


  const onFinish = () => {
    form.validateFields().then(async (value) => {
      console.log(value);

      if (!oracleName.length) {
        message.error('Oracle Name cannot be Empty!');
        return;
      }

      if (!creatorName.length) {
        message.error('Creator Name cannot be Empty!');
        return;
      }

      try {
        const requestConfig = JSON.parse(value['content']);
        setLoading(true);
        const ret = await submit({
          address: account,
        }, { ...requestConfig, title: oracleName, creator: creatorName })
        console.log(ret);
        message.loading('Oracle Config Processing, job ID: #' + ret.data.job, 0);
        onSubmit(ret.data);
      } catch (error: any) {
        console.log(error);

        message.error(error.msg || 'Invalid Oracle Config');
        setLoading(false);
        return;
      }
    });
  }

  return (
    <Form
      style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}
      form={form}
      onFinish={onFinish}
      initialValues={{
        'content': ''
      }}
    >

      <Form.Item name='content' style={{ flex: 1 }} className="context-form-item">
        <TextArea className='form_control' style={{ display: 'inline-flex', height: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 15, offset: 3 }}>
        {
          !account ? <Button
            type="primary"
            className='wallet-button'
            style={{ margin: "1vw" }}
            onClick={connectWallet}>
            Connect Wallet
          </Button> : <span style={{ color: 'white' }}>{account}</span>
        }

        <Input type="primary" style={{ width: "200px", margin: "1vw" }} maxLength={20} placeholder="Oralce Name" onChange={handleOracleChange}></Input>
        <Input type="primary" style={{ width: "200px", margin: "1vw" }} maxLength={10} placeholder="Creator Name" onChange={handleCreatorChange}></Input>


        <Button type="primary" htmlType="submit" className='button' disabled={!account || loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditComponent;