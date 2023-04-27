import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const reviews = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),

  firstName: faker.name.fullName(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  productName: faker.commerce.productName(),
  imageUrl: `/assets/images/products/product_${faker.datatype.number({
    min: 1,
    max: 8,
  })}.jpg`,
  rating: faker.datatype.number({ min: 1, max: 5 }),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(),
  isVerified: faker.datatype.boolean(),
}));

export default reviews;
