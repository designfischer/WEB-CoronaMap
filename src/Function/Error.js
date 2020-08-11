export function generateError() {
    const firstNumber = (Math.floor(Math.random() * 51) * 0.0001) // 0.000 - 0.005
    const secondNumber = ((Math.floor(Math.random() * 51) * 0.0001)*-1) // 0.000 - 0.010
    const error = firstNumber + secondNumber
    return error       
}