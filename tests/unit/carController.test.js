const { updateCar } = require("../../src/controllers/carController");

const it = require("ava").default;

it('should update an added car', async (t) => {
  const carSample = {
    title: "Fiat 500",
    tags: "small, hybrid",
    price: 100000,
    age: 5,
  };
  const updatedPrice = 150000;
  
  const savedCar = await addCar(carSample);
  const updatedCar = await updateCar({ ...savedCar, price: updatedPrice });

  t.is(updatedCar.price, updatedPrice);
});
