export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(function(item) {
                return item.iid === payload.iid
            })

            if (oldProduct) {
                context.commit('addCount', oldProduct)
                resolve('当前商品数量+1')
            } else {
                context.commit('addNewCart', payload)
                resolve('添加新商品')
            }
        })

    }
}