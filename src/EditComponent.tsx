import './FormComponent.css';
import axios from 'axios';
import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef} from 'react';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";

const { TextArea } = Input;
let walletConnected = false;
let oracle_submitted = false;

function EditComponent() {

const [account, setAccounts] = useState({});
const [error, setError] = useState("null");

    const connectWallet = async () => {
      const extensions = await web3Enable('Oracle Launchpad');
      if (extensions.length === 0) {
          message.error("Please install polkadot wallet extension")
          return;
      }
      const accounts = await web3Accounts();
      setAccounts(accounts[0]['address']);
      walletConnected = true;
      message.info("Connect Success");
    };
  

    const [form] = Form.useForm();
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain',
        //  'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ title: 'React POST Request Example'})
    };


    const onFinish = () => {
        form.validateFields().then((value) => {

            try{
              let requestConfig = JSON.parse(value['content']);
              requestOptions.body = JSON.stringify(requestConfig); 
            }catch{
              message.error('Invalid Oracle Config');
              return;
            }

            console.log(requestOptions.body);
            // let req = new XMLHttpRequest();
            // req.open('POST', 'http://localhost:3000/saas3/dapi/submit', true);
            // req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            // req.send(data);
            axios.post('http://rpc.saas3.io:3000/saas3/dapi/submit?address='+account,requestOptions.body ,{headers:{'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'}})
              .then(function (response) {
                const res = response['data'];
                console.log(res);
                  message.success('Your request have been created successfully, job ID: ' + res['data']['job'], 4);
                  oracle_submitted = true;
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
        style={{textAlign: 'center'}}
        form={form}
        onFinish={onFinish}
        initialValues={{
            'content': ''
        }}
        >
  
        <Form.Item  name='content'>
            <TextArea  className='form_control'  style={{height:'80vh', display:'inline-flex'}} />
        </Form.Item>

           <Button type="primary" className='wallet-button' style={{margin:"10px"}} onClick={connectWallet}>
            Connect Polkadot Wallet
          </Button>
 
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" className='button' disabled={!walletConnected}>
            Submit
          </Button>
        </Form.Item>
          </Form>
    );
  }

export default EditComponent;