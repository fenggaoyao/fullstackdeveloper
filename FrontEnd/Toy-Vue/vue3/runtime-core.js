function createVNode(rootComponent) {
    return {
        type: 'h2',
        props: {
            class: 'title'
        },
        children: rootComponent.data().foo
    }
}


function apiCreateApp(render) {
    return function createApp(rootComponent) {
        let isMounted = false
        const mount = (rootContainer) => {
            if (!isMounted) {
                const vnode = createVNode(rootComponent)
                render(vnode, rootContainer)
                isMounted = true
            }
        }
        const app = {
            mount
        }
        return app
    }
}

export const createRenderer = (options) => {

    const patch = (n1,
        n2,
        container) => {

        //这里判断多种类型



        //假定n2是组件，调用processComponent方法
        //若n1不存在
        if (n1 == null) {
            mountComponent(
                n2,
                container)
        } else {
            updateComponent(n1, n2)
        }
    }

    const mountComponent = (initialVNode, container) => {
        // const instance = createComponentInstance(initialVNode);
        // setupComponent(instance);
        // setupRenderEffect(instance, initialVNode, container)

        const child = options.createElement(initialVNode.type)
        if (typeof initialVNode.children === 'string') {
            child.textContent = initialVNode.children
        }
        // 3 追加
        options.insert(child, container)
    }


    const render = function (vnode, container) {
        // const container = document.querySelector(root) || document.createElement("container") 
        if (vnode !== null) {
            patch(container._vnode || null, vnode, container)
        }



        container._vnode = vnode

    }

    return {
        render,
        createApp: apiCreateApp(render)
    }
}