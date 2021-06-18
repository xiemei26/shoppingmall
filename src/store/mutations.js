export default {
    addCount(state, payload) {
        payload.count++
    },
    addNewCart(state, payload) {
        payload.count = 1
        payload.checked = false
        state.cartList.push(payload)
    }
}