

const crearFecha=()=>{

    const date = new Date()           
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
}

module.exports = { crearFecha}