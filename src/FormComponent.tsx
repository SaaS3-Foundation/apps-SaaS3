import './FormComponent.css';
import React, { forwardRef, useImperativeHandle } from 'react';
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
} from 'antd';
// import { FormComponentProps } from 'antd/es/form';

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
  
    const onFinish = () => {
      
    }
    return (

          <Form
            {...formItemLayout}
            layout='horizontal'
            onFinish={onFinish}
            initialValues={{
              'input-number': 3,
              'checkbox-group': ['A', 'B'],
              rate: 3.5,
            }}
            >
  
        <Form.Item label="Title">
          <Input placeholder="input title" className='form_control' />
        </Form.Item>
  
        <Form.Item label="Version">
          <Input placeholder="input version" className='form_control'/>
        </Form.Item>
  
        <Form.Item label="URL">
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
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input path's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Form.Item label="path_name">
                      <Input placeholder="input path name" className='form_control' />
                    </Form.Item>
  
                    <Form.List
                      name="methods"
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error('At least 1 method'));
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
                              label={index === 0 ? 'Method' : ''}
                              required={true}
                              key={field.key}
                            >
                              <Form.Item
                                name="select"
                                rules={[{ required: true }]}
                              >
                                <Select>
                                  <Option value="get">GET</Option>
                                  <Option value="post">POST</Option>
                                </Select>
  
                              </Form.Item>
  
                              <Form.Item 
                                name="select_in"
                                label='in'
                                rules={[{ required: true }]}
                                style={{width:'60%', marginLeft:'2rem'}}
                              >
                                <Select style={{display:'flex'}}>
                                  <Option value="path">path</Option>
                                  <Option value="query">query</Option>
                                  <Option value="header">header</Option>
                                  <Option value="cookie">cookie</Option>
                                  <Option value="processing">processing</Option>
                                </Select>
                              </Form.Item>
  
                              <Form.Item label="para_name"  style={{width:'60%', marginLeft:'2rem'}}>
                                <Input placeholder="input name" className='form_control'  />
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