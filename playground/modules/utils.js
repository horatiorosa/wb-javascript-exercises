// this variable is scoped only to this currenty module. you can use in function calls here and no where else within the app
const last = 'rosa';
const middle = 'your master'


export function returnHi(name) {
  return `hello ${name} ${last}`
}

const first = 'master'

export default first;
// NAMED exports
export { last, middle }
