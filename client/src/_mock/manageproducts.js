import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const manageproducts = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  catagory: 'White/Black-Volt-Pure Platinum',
  price: 150,
  quantity: faker.datatype.number({ min: 1, max: 100 }),
  description: faker.lorem.paragraphs(1),

  imageUrl: `/assets/images/products/product_${faker.datatype.number({
    min: 1,
    max: 8,
  })}.jpg`,
  status: sample(['active', 'innactive']),
}));

export default manageproducts;
