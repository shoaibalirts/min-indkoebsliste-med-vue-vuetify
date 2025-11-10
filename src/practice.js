/*
const indkoebsliste = [
  {
    id: "Y4PmfmkVQpcHnXU0xM6p",
    Products: ["AkiJTSTEXFqlDbOLYKVy", "IDA1sJ3jn8QjnhjjLnGd", "QFluw5Sp5eGgwKPyn9Iz"],
    CategoryName: "Fødseldagsfest",
  },
  {
    id: "oAJ8fLHDaQkygSy02ClC",
    Products: ["1", "2"],
    CategoryName: "Aftensmad",
  },
  {
    id: "x3NJolQsDDIXFuWxcT9k",
    CategoryName: "Rema 1000",
    Products: ["3", "4"],
  },
];

const newIndkoebsliste1 = indkoebsliste
  .map((item1) => {
    return item1.Products;
  })
  .flat();
console.log(newIndkoebsliste1);

*/

// const newIndkoebsliste2 = newIndkoebsliste1.flat();
// console.log(newIndkoebsliste2);

/*
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce(function (result, item) {
  console.log("Result: ", result);
  console.log("item: ", item);

  return result + item;
}, 0);
console.log(sum); // 10
*/

const productsData = [
  {
    prodName: "Tomater",
    co2_per_kg: 1.4,
    prodId: 7,
  },
  {
    prodId: 3,
    prodName: "Hvedebrød",
    co2_per_kg: 1,
  },
  {
    prodId: 9,
    co2_per_kg: 6,
    prodName: "Kyllingebryst",
  },
];
const newProductsData = productsData.map((item) => item.co2_per_kg);
console.log(newProductsData);
const sum = newProductsData.reduce(function (result, item) {
  return result + item;
}, 0);
console.log(sum);
