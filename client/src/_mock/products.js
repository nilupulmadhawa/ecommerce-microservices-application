import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Organic Lavender Essential Oil',
  'Organic Eucalyptus Essential Oil',
  'Organic Peppermint Essential Oil',
  'Organic Tea Tree Essential Oil',
  'Organic Rosemary Essential Oil',
  'Organic Lemon Essential Oil',
  'Organic Frankincense Essential Oil',
  'Organic Chamomile Essential Oil',
];

const PRODUCT_COLOR = [
  '#D9A04E',
  '#7C7C7C',
  '#FFFFFF',
  '#88B04B',
  '#C6243D',
  '#FFA500',
  '#6B8E23',
  '#FF69B4',
];

// ----------------------------------------------------------------------

const products = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale:
      setIndex % 3
        ? null
        : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
  };
});

export default products;
