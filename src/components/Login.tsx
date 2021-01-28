import {Form, Input, Button, message} from 'antd'
import React, {useRef} from 'react'
import axios from 'axios'
import {useFunctionWithLoading} from '../store/recoil/loading'
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
}
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
}

const checkValidate = (email: string, password: string) => {
  // TODO REGX
  return email.length > 0 && password.length > 0
}

function Login() {
  const fetchWithLoading = useFunctionWithLoading((err: {message: string}) => {
    message.error(err.message)
  })

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

    // "email": "eve.holt@reqres.in",
    // "password": "cityslicka"
    const res = await fetchWithLoading(
      () => axios.post('https://reqres.in/api/login', {email, password}),
      null,
    )
    if (res) {
      message.info(res.data.token)
      emailRef.current.input.value = ''
      passwordRef.current.input.value = ''
    }
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
      </Form.Item>
    </Form>
  )
}

export default Login