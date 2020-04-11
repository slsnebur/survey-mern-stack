import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, Alert, Col, Row } from 'antd';
import axios from '../../axios';
import {useCurrentWitdh} from '../../hooks/useCurrentWidth';

// layout
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 6,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 6,
    },
};

function LoginBox(props) {
    const currentWidth = useCurrentWitdh();
    const form = Form.useForm();
    const [errorMessage, setErrorMessage] = useState({
       isPresent: false,
       message: "ERROR_MSG",
    });

    const onFinish = values => {

        axios.post(axios.baseURL ,{}, {
            auth: {
                username: values.email,
                password: values.password
            }
            }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                setErrorMessage({
                    isPresent: true,
                    message: error.response.data
                })
            });

        console.log('Success:', values);
    };

    // TODO
    const onFinishFailed = error => {
        console.log('Failed:', error);
    };

    // Alert box with message from server
    let messageBoxStyle = "";
    if(currentWidth < 575) {
        messageBoxStyle = "end";
    }
    let alertOne = "";
    if(errorMessage.isPresent) {
            alertOne =
                <Form.Item {...tailLayout} justify={messageBoxStyle}>
                        <Alert message={errorMessage.message.message} type="error" />
                </Form.Item>;
    }

    return(
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email address',
                    },
                    {
                        type: "email",
                        message: "Must be correct email address"
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            {alertOne}
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">

                <Checkbox>Remember me</Checkbox>
                <p><a href={"start"} >Sign up</a></p>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}


export default LoginBox;