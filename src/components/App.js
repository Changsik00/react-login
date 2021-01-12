import React, {useState} from 'react'
import '../assets/style/app.less'

import {DatePicker, message} from 'antd'
import {ConfigProvider} from 'antd'
import ko_KR from 'antd/lib/locale/ko_KR'

const App = () => {
	const [date, setDate] = useState(null)
	const handleChange = (value) => {
		message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`)
		setDate(value)
	}
	return (
		<ConfigProvider locale={ko_KR}>
			<div style={{width: 400, margin: '100px auto'}}>
				<DatePicker onChange={handleChange} />
				<div style={{marginTop: 16}}>Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}</div>
			</div>
		</ConfigProvider>
	)
}

export default App
