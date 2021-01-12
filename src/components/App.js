import '../assets/style/app.less'
import {ConfigProvider} from 'antd'
import ko_KR from 'antd/lib/locale/ko_KR'
import Login from './Login'
const App = () => {
	return (
		<ConfigProvider locale={ko_KR}>
			<div style={{width: 400, margin: '100px auto'}}>
				<Login />
			</div>
		</ConfigProvider>
	)
}

export default App
