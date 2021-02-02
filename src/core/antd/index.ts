import { app } from '@/app'

import { Components } from './components'
import { Icons } from './icons'

Components.forEach((component: any) => {
	app.use(component)
})

//  MenuFoldOutlined.name 打包后可能取不到 导致icon展示不出来
Object.keys(Icons).forEach((key: string) => {
	app.component(key, (Icons as any)[key])
})
