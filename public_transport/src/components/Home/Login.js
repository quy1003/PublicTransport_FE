import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DetailTripStyle from '../../styles/TripStyle/DetailTripStyle';
import { Button, Container } from '@mui/material';
import RoutingDetailStyle from '../../styles/RoutingStyle/RoutingDetailStyle';
import { useState } from 'react';
import Apis, { authApi, endpoints } from '../../config/Apis';
import cookie from "react-cookies"
import {useNavigate} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
const Login = () => {
    const [user, dispatch] = React.useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const login = async() => {
        let res
        try{
          setLoading(false)
            res = await Apis.post(endpoints['login'], {username: username, password:password})
            cookie.save("token", res.data.token)
            let {data} = await authApi(res.data.access_token).get(endpoints['current-user'])
            cookie.save("user",data ? data : null)
            dispatch({
              "type": "login",
              "payload": data || null
            }
            )
        }
        catch(ex){
            alert(ex.response.data.message)
        }
        finally{
          setLoading(true)
        }
    }
    if(user && user.type === 'DRIVER'){
      navigate("/buses/bus-position/")
    }
    if(user && user.type !== 'DRIVER'){
      
      navigate("/")
    }
    return (
        <div style={{...DetailTripStyle.container, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '530px', backgroundImage: 'url(https://images.unsplash.com/photo-1565642899687-1c332fb7dc65?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },width: { md: '40%', sm: '100%' } }}
          noValidate
          autoComplete="off"
          style={{padding: '1% 0', paddingBottom: '5%'}}
        >
          <Container style={{...DetailTripStyle.containerRgba, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{...RoutingDetailStyle.divHeading}}>
                <p style={{...RoutingDetailStyle.tableHeading, padding:'0.8rem', width:'100%', textAlign: 'center'}}>Đăng nhập</p>
            </div>
            <TextField
              required
                id="outlined-required"
                label="Tài khoản"
                style={{width: '100%', padding:'0.4rem'}}
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
            />
            <TextField
            required
                id="outlined-password-input"
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                style={{width: '100%', padding:'0 0.4rem'}}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            {loading? <>
              <Button
                  variant="contained"
                  color="primary"
                  style={DetailTripStyle.bookButton}
                  onClick={login}
                //   disabled={isButtonDisabled}
                >
                Đăng nhập
                </Button>
            </>:<><Spinner/></>}
            
          </Container>

        </Box>
        </div>
      )
}

export default Login