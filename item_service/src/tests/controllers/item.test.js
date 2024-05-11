import request from 'supertest';
import app from '../../../src/app';

var id=0;
var catId=0;

// POST New category
describe('POST /api/category', () => {
  test('should respond with a 201 status and a success message', async () => {
    const newCat = {
      category: "Test category",
      icon: "icon.jpg",
      status: "active",
      seller_id: "65f5a24ff4462dc6af3ac695"
    };
    const response = await request(app)
      .post('/api/category')
      .send(newCat);
    // console.log(response.body);
    expect(response.statusCode).toBe(200);  
    expect(response.body).toHaveProperty('message', 'Category added successfully');

  });
});

// cat get all
describe('Category Controller', () => {
  describe('GET /api/category', () => {
    test('should respond with a 200 status and an array of category', async () => {
      const response = await request(app).get('/api/category');
      // console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toBeGreaterThan(0);
      catId = response.body.data[0]._id;
      // console.log("asd", catId);
    });
  });
});


// POST New Item
describe('POST /api/item', () => {
  test('should respond with a 201 status and a success message', async () => {
    const newItem = {
      name: "Test 2 Item",
      price: 2000,
      description: "test item",
      category: catId,
      image: "item.jpg",
      status: "active",
      seller_id: "65f5a24ff4462dc6af3ac695"
    };
    const response = await request(app)
      .post('/api/item')
      .send(newItem);
    // console.log(response.body);
    expect(response.statusCode).toBe(200);  
    expect(response.body).toHaveProperty('message', 'Item added successfully');
   
  });
});

//GET All Items
describe('Item Controller', () => {
  describe('GET /api/item', () => {
    test('should respond with a 200 status and an array of items', async () => {
      const response = await request(app).get('/api/item');
      // console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toBeGreaterThan(0);
      id = response.body.data[0]._id;
      // console.log("asd", id);
    });
  });
});


// GET Specific Item
describe('GET /api/item/:id', () => {
  test('should respond with a 200 status and the correct item', async () => {
    const itemId = id;  // Assuming this is the correct item ID.
    const response = await request(app).get(`/api/item/${itemId}`);
    // console.log(response.body);
    expect(response.statusCode).toBe(200);
    // Adjusted to correctly reference the first item in the array
    expect(response.body.data[0]).toHaveProperty('_id', itemId);
  });
});

// PATCH Update Item
describe('PATCH /api/item/:id', () => {
  test('should respond with a 200 status and the updated information', async () => {
    const itemId = id; 
    const updatedData = {
      name: "Updated Item",
      price: 2500
    };

    const response = await request(app)
      .patch(`/api/item/${itemId}`) 
      .send(updatedData);

    // console.log(response.body);
    expect(response.statusCode).toBe(200);  

  });
});


// DELETE Item
describe('DELETE /api/item/:id', () => {
  test('should respond with a 200 status and confirm deletion message', async () => {
    const itemId = id;  // This should be an ID that exists and can be deleted
    const response = await request(app).delete(`/api/item/${itemId}`);
    // console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Item deleted successfully');
   
    if (response.body.data) {
      expect(response.body.data).toHaveProperty('_id', itemId);
    }
  });
});


// // get items by seller
// describe('GET /api/item/seller/:id', () => {
//   test('should respond with a 200 status and return items', async () => {
//     const sellerId = '65f5a24ff4462dc6af3ac695';  // This ID should be set to a valid seller ID for testing
//     const response = await request(app).get(`/api/item/seller/${sellerId}`);
//       // console.log(response.body);
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body.data)).toBeTruthy();
//     expect(response.body.data.length).toBeGreaterThan(0);
//     expect(response.body.message).toEqual('Items retrieved successfully');
//     // Check if category details are included
//     response.body.data.forEach(item => {
//       expect(item).toHaveProperty('category_id');
//       expect(item).toHaveProperty('category');
//     });
//   });
// });

// GET Non-existing Item
describe('GET /api/item/:id', () => {
  test('should respond with a 404 status when item does not exist', async () => {
    const nonExistingItemId = '662646dfb5b7abc4aed4a666'; // Use an ID format that's valid but not present in your database
    const response = await request(app).get(`/api/item/${nonExistingItemId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('Item Not Found'); 
  });
});


// POST Item with Invalid Data
describe('POST /api/item', () => {
  test('should respond with a 500 status when data is invalid', async () => {
    const invalidItemData = {
      name: "",
      price: -100, 
      description: "A new item",
      category: "6624ae8dbef25fc69aff4811", 
      image: "item.jpg",
      status: "active",
      seller_id: "65f5a24ff4462dc6af3ac695"
    };
    const response = await request(app)
      .post('/api/item')
      .send(invalidItemData);
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toContain('Item validation failed: name: Path `name` is required.');
  });
});
