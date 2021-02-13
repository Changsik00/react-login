import {Form, Input, Button, message} from 'antd'
import React, {useRef} from 'react'
import axios from 'axios'
// import {useFunctionWithLoading} from '../store/recoil/loading'
import KaKaoLogin from 'react-kakao-login'
import firebase from 'firebase'
import * as dotenv from 'dotenv'
dotenv.config()

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
}
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
}

const token = process.env.REACT_APP_KAKAO_KEY

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log('#@# onAuthStateChanged', user)
    // let displayName = user.displayName
    // let email = user.email
    // let emailVerified = user.emailVerified
    // let photoURL = user.photoURL
    // let isAnonymous = user.isAnonymous
    // let uid = user.uid
    // let providerData = user.providerData
    if (!user.uid.includes('kakao')) {
      user.getIdToken().then(async function (idToken) {
        console.log('#@# onAuthStateChanged', idToken)
        await axios.post('http://localhost:3000/oauth/sign-in', {idToken})
        localStorage.setItem('fb_access_token', idToken)
      })
    }
  } else {
    console.log('#@# onAuthStateChanged user is null')
  }
})

const checkValidate = (email: string, password: string) => {
  // TODO: REGX
  return email.length > 0 && password.length > 0
}

function Login() {
  // const fetchWithLoading = useFunctionWithLoading((err: {message: string}) => {
  //   message.error(err.message)
  // })

  const emailRef = useRef<any>()
  const passwordRef = useRef<any>()

  const onClickLoginButton = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    const email = emailRef.current.input.value
    const password = passwordRef.current.input.value

    if (!checkValidate(email, password)) {
      message.info('check your Email or Password')
      return
    }

    console.log('#@# email pw', email, password)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log('#@# signInWithEmailAndPassword result', result)
      })
      .catch(error => {
        console.log('#@# signInWithEmailAndPassword error', error)
      })
  }

  const onClickApiReqButton = async () => {
    await axios
      .get('http://localhost:3000/foo', {
        params: {
          accessToken: localStorage.getItem('fb_access_token'),
        },
      })
      .then(res => console.log('#@# api req: ', res))
      .catch(err => console.log('#@# api req: ', err))
  }

  const responseKaKao = async (res: any) => {
    console.log('#@# responseKaKao', res)

    const params = {
      accessToken: res.response.access_token,
      refreshToken: res.response.refresh_token,
      loginType: 'kakao',
    }
    const result = await axios.post(
      'http://localhost:3000/kakao/sign-up',
      params,
    )
    localStorage.setItem('fb_access_token', result.data.access_token)

    console.log('#@# sign-up kakao user: ', result)
    firebase
      .auth()
      .signInWithCustomToken(result.data.access_token)
      .then(async user => {
        console.log('#@# signInWithCustomToken user: ', user)
        await axios.post('http://localhost:3000/oauth/sign-in', {
          data: {idToken: localStorage.getItem('fb_access_token')},
        })
      })
      .catch(err => {
        console.log('#@# signInWithCustomToken err: ', err)
      })
  }

  const responseFail = (err: any) => {
    console.log('#@# responseFail', err)
  }

  return (
    <Form {...layout} name="basic" initialValues={{remember: true}}>
      <Form.Item
        label="Email"
        name={['user', 'email']}
        rules={[{required: true, type: 'email'}]}
      >
        <Input ref={emailRef} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password ref={passwordRef} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={onClickLoginButton}>
          Login
        </Button>
        <KaKaoLogin
          // style={mt20}
          token={token}
          onSuccess={responseKaKao}
          onFail={responseFail}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="default" htmlType="submit" onClick={onClickApiReqButton}>
          API Req
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
