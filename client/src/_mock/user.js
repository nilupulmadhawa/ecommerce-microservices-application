import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/users/user_${index + 1}.jpg`,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Customer',
    'Seller',
    'Administrator',
    'Logistics Manager',
    'Support Staff',
  ]),
  orders: faker.datatype.number({ min: 0, max: 20 }),
  lastOrder: faker.date.past(1),
}));

export default users;
