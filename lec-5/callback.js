let account_balance = 200000000;

let products = [
    {
        name: "samsung",
        amount: 70000,
        quantity: 10
    },
    {
        name: "Iphone 16",
        amount: 10000,
        quantity: 1
    }
];

function buyProduct(product_name) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.name === product_name);

        if (!product) {
            return reject("Product is not available");
        }

        if (product.quantity <= 0) {
            return reject("Product is out of stock");
        }

        resolve(product); 
    });
}
function deductAmount(product) {
    return new Promise((resolve, reject) => {
        if (account_balance >= product.amount) {
            account_balance -= product.amount;
            product.quantity -= 1;

            const message = `Product purchased successfully.\nRemaining balance: ₹${account_balance}\nRemaining stock of ${product.name}: ${product.quantity}`;
            resolve(message);
        } else {
            reject("Insufficient balance to purchase this product");
        }
    });
}

async function purchase(productName) {
    try {
        console.log(`Attempting to purchase: ${productName}`);
        const product = await buyProduct(productName);
        const message = await deductAmount(product);
        console.log(message);
    } catch (error) {
        console.log("Error:", error);
    }
}
purchase("samsung");
purchase("motrolla");

console.log("Purchase requests sent.");
console.log("Program continues without waiting for the operations to finish.");

                        
// let amount =buyProduct("Iphone 16") sync 
// console.log(amount)|
//                   \|/ async
// let amount =await buyProduct("Iphone 16") sync 
// console.log(amount) 
// we will make separate function for async so thread will not block

// async function myfunct(){
//                        let amount =await buyProduct("Iphone 16")
//                        let message = await deductAmount(amount)   sync 
//                           console.log(amount)
//                            }
//                      console.log(myfunc())
//                      console.log("start");
//                      console.log("end");
