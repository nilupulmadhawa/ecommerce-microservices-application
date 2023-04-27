import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const users = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  // password: faker.password.password(),
  address: '1935 Haul Road, San Francisco, California (CA), 94108',
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  status: sample(['active', 'banned']),
  role: sample(['admin', 'buyer', 'seller', 'customer']),
  orders: faker.datatype.number({ min: 0, max: 20 }),
  lastOrder: faker.date.past(1),
}));

export default users;
