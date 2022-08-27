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
const walletConnected = false;

function EditComponent() {

const [accounts, setAccounts] = useRef({});
const [error, setError] = useRef(null);

    const connectWallet = async () => {
      const extensions = await web3Enable('SaaS3 Oracle Launchpad');
      if (extensions.length === 0) {
          setError("No extension installed!");
          return;
      }
      const accounts = await web3Accounts();
      setAccounts(accounts);
      console.log(accounts);
    };
  

    const [form] = Form.useForm();
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain',
        //  'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };


    const onFinish = () => {
        form.validateFields().then((value) => {
            console.log('onFinish', value);
            requestOptions.body =  value['content'];
            console.log(requestOptions);
            // let req = new XMLHttpRequest();
            // req.open('POST', 'http://localhost:3000/saas3/dapi/submit', true);
            // req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            // req.send(data);
            axios.post('http://localhost:3000/saas3/dapi/submit',requestOptions.body ,{headers:{'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'}})
              .then(function (response) {
                console.log(response);
                console.log(response['data']['job']);
                message.success('Your request have been created successfully, job ID: ' + response['data']['job'], 4);
                return response;
              })
              .catch(function (error) {
                console.log(error);
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