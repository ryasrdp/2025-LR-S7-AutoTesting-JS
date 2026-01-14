import { test, expect } from '@playwright/test';

const baseURL = 'https://demoqa.com';

test.describe.serial('API Testing for DemoQA', () => {
  const userName = `User_${Date.now()}`;
  const password = 'Test@12383428';
  let userID = '';
  let token = '';

  test('Should successfully create a new user', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/User`, {
      data: {
        userName,
        password,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('userID');
    userID = responseBody.userID;
  });

  test('Should fail to create user with existing username', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/User`, {
      data: {
        userName,
        password,
      },
    });
    expect(response.status()).toBe(406);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('message', 'User exists!');
  });

  test('Should successfully generate a token for the user', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: {
        userName,
        password,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toHaveProperty('status');
    expect(responseBody).toHaveProperty('expires');
    token = responseBody.token;
  });

  test('Should fail to generate a token with incorrect password', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: {
        userName,
        password: 'Wrongpasw',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.token).toBeNull();
    expect(responseBody.expires).toBeNull();
    expect(responseBody.status).toBe('Failed');
    expect(responseBody.result).toBe('User authorization failed.');
  });

  test('Should return user authorization status', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/Authorized`, {
      data: {
        userName,
        password,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
  });

  test('Should successfully retrieve user information', async ({ request }) => {
    const response = await request.get(`${baseURL}/Account/v1/User/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('userId', userID);
    expect(responseBody).toHaveProperty('username', userName);
    console.log(responseBody);
  });

  // 200 and 204 successfully deletion and non-existing wrong
  //   test('Should successfully delete user', async ({ request }) => {
  //       const response = await request.delete(`${baseURL}/Account/v1/User/${userID}`, {
  //           headers: {
  //               Authorization: `Bearer ${token}`
  //           },
  //       });
  //       expect(response.status()).toBe(204);
  //       const responseBody = await response.json();
  //       console.log(responseBody);
  //   });

  test('Should add book to user', async ({ request }) => {
    const response = await request.post(`${baseURL}/BookStore/v1/Books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: userID,
        collectionOfIsbns: [
          {
            isbn: '9781593275846',
          },
          {
            isbn: '9781593277574',
          },
        ],
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);
  });
});
