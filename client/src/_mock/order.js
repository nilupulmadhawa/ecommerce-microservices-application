import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const orders = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),

  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,

  name: 'Nike Air Zoom Pegasus 37 Premium',
  color: 'White/Black-Volt-Pure Platinum',
  imageUrl: '/assets/images/products/product_2.jpg',
  price: 150,
  quantity: faker.datatype.number({ min: 1, max: 5 }),

  address: '1935 Haul Road, San Francisco, California (CA), 94108',
  total: 250,
  createdAt: faker.date.past(),
  status: sample(['processing', 'shipped', 'delivered']),
}));

export default orders;
