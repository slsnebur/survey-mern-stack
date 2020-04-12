import React, { useEffect , useState} from 'react';
import ReactDOM from 'react-dom';
import { Layout, Breadcrumb, Button, Drawer, Menu} from 'antd';
import { Row, Col } from 'antd';
import './index.css';
import styled from 'styled-components'
import {Github} from '@styled-icons/entypo-social'
import {MenuOutline} from '@styled-icons/evaicons-outline'
import {Link} from "react-router-dom";
import {useCurrentWitdh} from '../../hooks/useCurrentWidth';
import Cookies from 'universal-cookie';
import axios from '../../axios';

const GithubIcon = styled(Github)`
    width: 1.5em;
    margin-right: 2px;
`;

const MenuIcon = styled(MenuOutline)`
    width: 2em;
    color: white;
`;

const HamburgerMenuButton = styled(Button)`
    background: none;
    border-color: none;
    border: none;
    &:activated {
        border: none;
        background: none;
    }
`;

const { Header, Content, Footer } = Layout;

function App(props) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('USER_NAME');
    // whether menu is collapsed or not
    const [isVisible, setIsVisible] = useState(false);
    // width of window.screen
    let width = useCurrentWitdh();
    const cookies = new Cookies();
    // Check whether cookie with jwt is set
    let jwt = "";
    useEffect(() => {
        axios.get('users/me', {
            withCredentials: true,
        })
            .then((res) => {
                // Cookie with valid jwt exists
                setLoggedIn(true);
                setUsername(res.data.user.username);
            })
            .catch((error) => {
                // User not logged in
            });
    });

    const showDrawer = () => {
        setIsVisible(true);
    };

    const onClose = () => {
      setIsVisible(false);
    };

    // handles header login/signup buttons (logged out) or navbars
    const headerNavigation = () => {

        if(isLoggedIn) {
            return(
                <div>
                    <button style={{"color": "black"}}>{username}</button>
                </div>
            )
        }

        if(width < 570) {
            return(
            <div>
                <Col style={{'text-align': 'right'}}>
                    <HamburgerMenuButton onClick={showDrawer}><MenuIcon/></HamburgerMenuButton>
                </Col>

                <Drawer
                    title="Menu"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={isVisible}
                    mask={true}
                >
                    <p><Button block className={"sign-up-button"} href={'./register'} type={"primary"}><Link to={"/register"}>Sign up</Link></Button></p>
                    <p><Button block type={"secondary"}><Link to={"/login"}>Sign in</Link></Button></p>
                </Drawer>
            </div>
            )
        }
            return (
                <Row>
                    <Col span={24} className={"header-buttons"} style={{'text-align': 'right'}}>
                        <Button className={"sign-up-button"} type={"primary"}><Link to={"/register"}>Sign up</Link></Button>
                        <Button type={"secondary"}><Link to={"/login"}>Sign in</Link></Button>
                    </Col>
                </Row>
            )
    };

    return(
        <Layout className="layout">
            <Header>
                <div className="logo" />
                {headerNavigation()}
            </Header>
                <Breadcrumb className={'breadcrumb'}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Login</Breadcrumb.Item>
                </Breadcrumb>
                <Content className="content" style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">{<props.content/>}</div>
                </Content>
            <Footer className="footer">
                <Row>
                    <Col
                        className="footer-left-col"
                        span={16}
                    >
                        <p>Karol Morawski 2050</p>
                        <a href={"https://github.com/slsnebur"}>Live preview</a>
                    </Col>
                    <Col
                        className="footer-right-col"
                        span={8}
                    >
                        <a href={"https://github.com/slsnebur"}><GithubIcon/> Github</a>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    )
}


export default App;
