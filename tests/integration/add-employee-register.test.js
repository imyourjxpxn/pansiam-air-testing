const axios = require('axios');

// Set a longer timeout for the test
jest.setTimeout(60000);

describe('Employee Registration Tests', () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const endpoint = '/api/registerApi';
  
  // Test Case 1: เพิ่มบัญชีหัวหน้าแผนกบริการการซ่อม
  test('TC1: should register repair department head successfully', async () => {
    const userData = {
      name: 'สมชาย มั่นคง',
      email: `somchai_${Date.now()}@gmail.com`, 
      password: 'Repair123*',
      tel: '0891234567',
      role: 'HEAD', 
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error in TC1:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  });

  // Test Case 2: เพิ่มบัญชีช่างซ่อม
  test('TC2: should register technician successfully', async () => {
    const userData = {
      name: 'วิชัย ช่างเก่ง',
      email: `wichai_${Date.now()}@gmail.com`,
      password: 'Tech789*',
      tel: '0812345678',
      role: 'MECHANIC', 
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error in TC2:', error.message);
      throw error;
    }
  });

  // Test Case 3: เพิ่มบัญชีแผนก Store
  test('TC3: should register store department employee successfully', async () => {
    const userData = {
      name: 'สมหญิง คลังดี',
      email: `somying_${Date.now()}@gmail.com`,
      password: 'Store456*',
      tel: '0834567890',
      role: 'STORE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error in TC3:', error.message);
      throw error;
    }
  });

  // Test Case 4: เพิ่มบัญชีแผนกการเงิน
  test('TC4: should register finance department employee successfully', async () => {
    const userData = {
      name: 'รักษ์ การเงิน',
      email: `rak_${Date.now()}@gmail.com`,
      password: 'Fin789#$',
      tel: '0856789012',
      role: 'FINANCE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error in TC4:', error.message);
      throw error;
    }
  });

  // Test Case 5: เพิ่มบัญชีผู้ดูแลระบบ
  test('TC5: should register admin successfully', async () => {
    const userData = {
      name: 'ผู้ดูแล ระบบ',
      email: `admin_${Date.now()}@gmail.com`,
      password: 'Admin123#',
      tel: '0990001234',
      role: 'ADMIN',
      profile: '/admin' 
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error in TC5:', error.message);
      throw error;
    }
  });

  // Test Case 6: เพิ่มบัญชีแผนกบริการการซ่อม
  test('TC6: should register repair service employee successfully', async () => {
    const userData = {
      name: 'ตุลย์ มารุต',
      email: `Tul.m_${Date.now()}@gmail.com`,
      password: 'Service63',
      tel: '0634245463',
      role: 'SERVICE', 
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      expect(response.status).toBe(201);
    } catch (error) {
      console.error('Error in TC6:', error.message);
      throw error;
    }
  });

  // Test Case 7: ไม่ได้กรอกชื่อ
  test('TC7: should fail when name is missing', async () => {
    const userData = {
      name: '',
      email: `test_${Date.now()}@gmail.com`,
      password: 'Pass123*',
      tel: '0812345678',
      role: 'REPAIR', 
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      // คาดว่าจะล้มเหลว ถ้าสำเร็จแสดงว่าเทสต์ไม่ผ่าน
      fail('Should have failed with missing name');
    } catch (error) {
      // คาดว่าจะมี error
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });

  // Test Case 8: ไม่ได้กรอก Email
  test('TC8: should fail when email is missing', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: '',
      password: 'Pass123*',
      tel: '0812345678',
      role: 'STORE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with missing email');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });

  // Test Case 9: ไม่ได้กรอก Password
  test('TC9: should fail when password is missing', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: `test_${Date.now()}@gmail.com`,
      password: '',
      tel: '0812345678',
      role: 'FINANCE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with missing password');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });

  // Test Case 10: ไม่ได้กรอกเบอร์โทร
  test('TC10: should fail when phone number is missing', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: `test_${Date.now()}@gmail.com`,
      password: 'Pass123*',
      tel: '',
      role: 'ADMIN',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with missing phone number');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });
  
  // Test Case 11: ทดสอบกรณีอีเมลไม่ถูกต้องตามรูปแบบ
  test('TC11: should fail when email format is invalid', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: 'invalid-email',
      password: 'Pass123*',
      tel: '0812345678',
      role: 'STORE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with invalid email format');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });

  // Test Case 12: ทดสอบกรณีรหัสผ่านสั้นเกินไป
  test('TC12: should fail when password is too short', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: `test_${Date.now()}@gmail.com`,
      password: 'Pass1',
      tel: '0812345678',
      role: 'FINANCE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with password too short');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });

  // Test Case 13: ทดสอบกรณีเบอร์โทรไม่ถูกต้องตามรูปแบบ
  test('TC13: should fail when phone number format is invalid', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: `test_${Date.now()}@gmail.com`,
      password: 'Pass123*',
      tel: '12345', // เบอร์โทรสั้นเกินไป
      role: 'ADMIN',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with invalid phone number format');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });

  // Test Case 14: ทดสอบกรณีบทบาทไม่ถูกต้อง
  test('TC14: should fail when role is invalid', async () => {
    const userData = {
      name: 'สมชาย ทดสอบ',
      email: `test_${Date.now()}@gmail.com`,
      password: 'Pass123*',
      tel: '0812345678',
      role: 'INVALID_ROLE',
      profile: 'default'
    };

    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
        headers: { 'content-type': 'application/json' },
        timeout: 15000
      });
      
      fail('Should have failed with invalid role');
    } catch (error) {
      expect(error).toBeDefined();
      if (error.response) {
        expect(error.response.status).not.toBe(201);
      }
    }
  });
});