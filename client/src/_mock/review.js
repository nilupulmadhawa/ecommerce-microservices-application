import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const reviews = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),
  buyer_id: 'B222',
  item_id: 'I222',
  rating: faker.datatype.number({ min: 1, max: 5 }),
  review: faker.lorem.paragraphs(1),
}));

export default reviews;
