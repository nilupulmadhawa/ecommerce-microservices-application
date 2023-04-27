import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const orders = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),
  buyer_id: 'B111',
  seller_id: 'S222',
  items: faker.commerce.productName(),
  total: 50000,
  commission: '5000',
  seller_profit: '10000',
  status: sample([
    'Pending',
    'Accept',
    'Reject',
    'Cancel',
    'Delivered',
    'Completed',
  ]),
}));

export default orders;
