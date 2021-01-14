import {Form, Input, Button} from 'antd'
import React, {useRef, useEffect} from 'react'
import axios from 'axios'
import {useSetRecoilState} from 'recoil'
import {useLoadingSelect} from '../store/recoil/loading'
const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}
const tailLayout = {
	wrapperCol: {offset: 8, span: 16},
}

const Login = () => {
	const [showLoading, hideLoading] = useLoadingSelect(useSetRecoilState)
	const emailRef = useRef()
	const passwordRef = useRef()

	useEffect(() => {
		emailRef.current.input.focus()
	}, [])

	const onClickLoginButton = (e) => {
		e.preventDefault()
		const email = emailRef.current.input.value
		const password = passwordRef.current.input.value

		console.log('#@# email, pw', email, password)

		// setLoading({ ...loadingData, checkSum: 1 });
		// "email": "eve.holt@reqres.in",
		// "password": "cityslicka"
		showLoading()
		axios
			.post('https://reqres.in/api/login', {
				email,
				password,
			})
			.then((response) => {
				emailRef.current.input.value = ''
				passwordRef.current.input.value = ''
				console.log('#@# success', response.data)
				hideLoading()
			})
			.catch((error) => {
				console.log(error)
				hideLoading()
			})
	}

	return (
		<Form {...layout} name='basic' initialValues={{remember: true}}>
			<Form.Item label='Email' name={['user', 'email']} rules={[{required: true, type: 'email'}]}>
				<Input ref={emailRef} />
			</Form.Item>
			<Form.Item label='Password' name='password' rules={[{required: true, message: 'Please input your password!'}]}>
				<Input.Password ref={passwordRef} />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit' onClick={onClickLoginButton}>
					Login
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Login
