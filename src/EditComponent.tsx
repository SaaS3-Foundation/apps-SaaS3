import './FormComponent.css';
import axios from 'axios';
import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef, ReactPropTypes } from 'react';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const { TextArea } = Input;
let walletConnected = false;
let oracle_submitted = false;

function EditComponent(props: any) {
  const { onSubmit } = props;
  // test on submit
  // useEffect(() => {
  //   setTimeout(() => {
  //     // message.success('submit')
  //     console.log('on-submit');
  //     onSubmit({ job: 'ArzxfJ-DP8' });
  //   }, 5000);
  // }, [])

  const [account, setAccounts] = useState({});
  const [error, setError] = useState("null");
  const [oracleName, setOracleName] = useState('');
  const [creatorName, setCreatorName] = useState('');

  const connectWallet = async () => {
    const extensions = await web3Enable('Oracle Launchpad');
    if (extensions.length === 0) {
      message.error("Please install polkadot wallet extension")
      return;
    }
    const accounts = await web3Accounts();
    setAccounts(accounts[0]['address']);
    walletConnected = true;
    message.success("Connect Success");
  };


  const [form] = Form.useForm();
  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      //  'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ title: 'React POST Request Example' })
  };

  const handleOracleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOracleName(event.target.value);
  };

  const handleCreatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatorName(event.target.value);
  };


  const onFinish = () => {
    form.validateFields().then((value) => {

      if (!oracleName.length) {
        message.error('Oracle Name cannot be Empty!');
        return;
      }

      if (!creatorName.length) {
        message.error('Creator Name cannot be Empty!');
        return;
      }

      try {
        let requestConfig = JSON.parse(value['content']);
        requestConfig['title'] = oracleName;
        requestConfig['creator'] = creatorName;
        requestOptions.body = JSON.stringify(requestConfig);
      } catch {
        message.error('Invalid Oracle Config');
        return;
      }

      console.log(requestOptions.body);

      // let req = new XMLHttpRequest();
      // req.open('POST', 'http://localhost:3000/saas3/dapi/submit', true);
      // req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      // req.send(data);
      axios.post('https://rpc.saas3.io:3000/saas3/dapi/submit?address=' + account, requestOptions.body, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Methods': 'GET, POST', 'Access-Control-Allow-Origin': '*' } })
        .then(function (response) {
          const res = response['data'];
          console.log(res);
          message.loading('Oracle Config Processing, job ID: #' + res['data']['job'], 0);
          oracle_submitted = true;
          onSubmit(res.data);
          return response;
        }).catch(function (error) {
          const err = error['response']['data'];
          console.log(err);
          oracle_submitted = false;
          message.error(err['msg']);
          return error;
        });
    });
  }

  return (
    <Form
      style={{ textAlign: 'center' }}
      form={form}
      onFinish={onFinish}
      initialValues={{
        'content': ''
      }}
    >

      <Form.Item name='content'>
        <TextArea className='form_control' style={{ height: '80vh', display: 'inline-flex' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 15, offset: 3 }}>

        <Input type="primary" style={{ width: "7vw", margin: "1vw" }} maxLength={20} placeholder="Oralce Name" onChange={handleOracleChange}></Input>
        <Input type="primary" style={{ width: "7vw", margin: "1vw" }} maxLength={10} placeholder="Creator Name" onChange={handleCreatorChange}></Input>
        <Button type="primary" className='wallet-button' style={{ margin: "1vw" }} onClick={connectWallet}>
          Connect Polkadot Wallet
        </Button>

        <Button type="primary" htmlType="submit" className='button' disabled={!walletConnected}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditComponent;