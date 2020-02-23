import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line
import { Button, DatePicker, version, Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import axios from 'axios'


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: 'noelo',
        users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/users?page=0')
            .then(res => {
                this.setState({ users: res.data });
                console.log(res.data);
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <ul>
                { this.state.users[0]}
            </ul>
        )
    }
}
// eslint-disable-next-line
const { Header, Content, Footer } = Layout;

/*ReactDOM.render(
    <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

                <UserList/>

            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>,
    document.getElementById("root")
);
 */

ReactDOM.render(
    <UserList/>,
    document.getElementById("root")
);
