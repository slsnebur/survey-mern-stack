import React from "react";
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

function RegisterBox(props) {

    const onFinish = error => {
        console.log('Failed:', error);
    };

    const onFinishFailed = error => {
        console.log('Failed:', error);
    };

    const alertOne = error => {
        console.log('Failed:', error);
    };

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
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email address',
                    },
                ]}
            >
                <Input />
            </Form.Item>

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

            <Form.Item
                label="Confirm password"
                name="confirm_password"
                rules={[
                    {
                        required: true,
                        message: 'Passwords must be matching',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            {alertOne}
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">

                <Checkbox>I accept <a href={"start"} >ToS</a></Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterBox;
