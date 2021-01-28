
import { app } from '@/app'
import { 
	Button,
	Form,
	Input,
	Menu,
	Layout,
	Drawer,
	ConfigProvider,
	Tabs,
	Breadcrumb,
	Avatar
 } from 'ant-design-vue'
 
 app.use(Button)
 app.use(Form)
 app.use(Input)
 app.use(Menu)
 app.use(Layout)
 app.use(Drawer)
 app.use(ConfigProvider)
 app.use(Tabs)
 app.use(Breadcrumb)
 app.use(Avatar)


 import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'

 console.log('app: ', app, 'MenuFoldOutlined: ', MenuFoldOutlined.name)
 app.component(MenuFoldOutlined.name, MenuFoldOutlined)
 app.component(MenuUnfoldOutlined.name, MenuUnfoldOutlined)
 app.component(PieChartOutlined.name, PieChartOutlined)
 app.component(MailOutlined.name, MailOutlined)
 app.component(DesktopOutlined.name, DesktopOutlined)
 app.component(InboxOutlined.name, InboxOutlined)
 app.component(AppstoreOutlined.name, AppstoreOutlined)

