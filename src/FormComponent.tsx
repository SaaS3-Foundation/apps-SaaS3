import './FormComponent.css';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp'
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Input,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
  Space,
} from 'antd';
// import { FormComponentProps } from 'antd/es/form';

interface FieldData {
    "title":string;
    "version":string;
    "url": string;
    "paths": PathData[];
}

interface PathData{
    "path": string;
    "method": MethodData[];
}
interface MethodData{
    "method": string;
    "parameters": ParameterData[];
}
interface ParameterData{
    "in": string;
    "name": string;
}


const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 5 },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

function FormComponent() {
    const [form] = Form.useForm();
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain',
        //  'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    const getData=()=>{
        let url ='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20';
        axios.get(url)
            .then((response)=> {
                //请求成功
                console.log(response);
                // 把请求到的数据，赋值给构造函数的数据
                // this.setState({
                //     list:response.data.result,
                // })
            })
            .catch(function (error) {
                //请求失败
                console.log(error);
            });
    }

    const onFinish = () => {
        form.validateFields().then((value) => {
            console.log('onFinish', value);
            requestOptions.body =  JSON.stringify({
                    "oisFormat":"1.0.0",
                    "title": value['title'],
                    "version": value['version'],
                    "apiSpecifications":{
                       "servers":[
                          {
                             "url": value['url']
                          }
                       ],
                       "paths":{
                          "/simple/price":{
                             "get":{
                                "parameters":[
                                   {
                                      "in":"query",
                                      "name":"ids"
                                   },
                                   {
                                      "in":"query",
                                      "name":"vs_currencies"
                                   }
                                ]
                             }
                          }
                       }
                    }
               })
            console.log(requestOptions);
            // let req = new XMLHttpRequest();
            // req.open('POST', 'http://localhost:3000/saas3/dapi/submit', true);
            // req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            // req.send(data);
            axios.post('http://localhost:3000/saas3/dapi/submit',requestOptions.body ,{headers:{'Content-Type': 'text/plain', 'Access-Control-Allow-Methods' :'GET, POST' , 'Access-Control-Allow-Origin': '*'}})
              .then(function (response) {
                console.log(response);
                return response;
              })
              .catch(function (error) {
                console.log(error);
                return error;
              });

            fetch('http://localhost:3000/saas3/dapi/submit', requestOptions)
               .then(response => {
                console.log(response);
                console.log(response.json());
               });
              
          });
    }
    return (
        <Form
        {...formItemLayout}
        layout="inline" form={form}
        onFinish={onFinish}
        initialValues={{
            'title': "CoinGecko Basic Request",
            "version":"1.0.0",
            "url":"https://api.coingecko.com/api/v3",
            "paths":[{'path_name':'/simple/price', 'methods':[{'method':'GET', 'parameters':[{'para_in':'path', 'para_name':'ids'}]}]}],
            rate: 3.5,
        }}
        >
  
        <Form.Item label="Title" name='title'>
          <Input placeholder="input title" className='form_control' />
        </Form.Item>
  
        <Form.Item label="Version" name='version'>
          <Input placeholder="input version" className='form_control'/>
        </Form.Item>
  
        <Form.Item label="URL" name='url'>
          <Input placeholder="input url" className='form_control' />
        </Form.Item>
  
        <Form.List
          name="paths"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('At least 1 path'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Paths' : ''}
                  required={false}
                  key={field.key}
                  style={{width:'60%', marginLeft:'2rem'}}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    noStyle
                  >

                    <Form.Item label="path_name" 
                    name={[field.name, 'path_name']}>
                      <Input placeholder="input path name" className='form_control' />
                    </Form.Item>
  
                    <Form.List name={[field.name, 'methods']}
                    >
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map(({ key, name, ...restField })  => (
                            <Form.Item
                              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                              label={index === 0 ? 'Method' : ''}
                              required={true}
                              key={key}
                              name={name}
                            >

                    <Form.Item label="select_method" 
                    name={[name, 'method']}>
                      <Input placeholder="GET or POST" className='form_control' />
                    </Form.Item>
                              {/* <Form.Item
                                rules={[{ required: true }]}
                              >
                                <Select dropdownClassName="ant-select-dropdown-menu">
                                  <Option value="get">GET</Option>
                                  <Option value="post">POST</Option>
                                </Select>
                              </Form.Item> */}
                              <Form.List name= {[name, 'parameters']}>
                                {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item 
                                            label='in'
                                            rules={[{ required: true }]}
                                            name={[name, 'para_in']}
                                            // style={{width:'60%', marginLeft:'2rem'}}
                                        >
                                            <Select style={{display:'flex'}}>
                                            <Option value="path">path</Option>
                                            <Option value="query">query</Option>
                                            <Option value="header">header</Option>
                                            <Option value="cookie">cookie</Option>
                                            <Option value="processing">processing</Option>
                                            </Select>
                                        </Form.Item>
            
                                        <Form.Item label="para_name"  style={{width:'60%', marginLeft:'2rem'}}
                                        name={[name, 'para_name']}>
                                            <Input placeholder="input name" className='form_control'  />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    ))}
                                    <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add parameters
                                    </Button>
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                //   className="dynamic-delete-button"
                                  onClick={() => remove(name)}
                                />
                              ) : null}
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{ width: '60%' }}
                              icon={<PlusOutlined />}
                            >
                              Add method
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add path
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
  
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
          </Form>
    );
  }

export default FormComponent;