import { RouteRecordRaw } from 'vue-router'

export function convertRoutes (routes: RouteRecordRaw) {
  if (!routes) return null

  const nodes = JSON.parse(JSON.stringify(routes))

  let queue = Array.isArray(nodes) ? nodes.concat() : [nodes]

  while (queue.length) {
    const levelSize = queue.length

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()

      if (!node.children || !node.children.length) continue

      node.children.forEach((child: RouteRecordRaw) => {
        // 转化相对路径
        if (child.path[0] !== '/' && !child.path.startsWith('http')) {
          child.path = node.path.replace(/(\w*)[/]*$/, `$1/${child.path}`)
        }
      })

      queue = queue.concat(node.children)
    }
  }

  return nodes
}
