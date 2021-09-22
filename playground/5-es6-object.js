//object property shorthand

const name = 'Andrew'
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Philadelpia'
}

console.log(user)

//object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock


// const {label:productLabel, stock, rating = 5} = product

const transaction = (type, {label, stock}) => {
    // const { label } = myProduct

    console.log(type, label, stock)
}

transaction('order', product)
