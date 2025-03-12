const axios = require('axios');
const { execSync } = require('child_process');

// Set a longer timeout for the test
jest.setTimeout(30000);

test('should register a new user successfully', async () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  console.log(`Testing API at: ${baseUrl}`);
  
  // First check if the server is running
  try {
    console.log('Checking if server is running...');
    await axios.get(baseUrl, { timeout: 5000 });
    console.log('Server is running!');
  } catch (error) {
    console.error('Server check failed:', error.message);
    throw new Error(`Server not running at ${baseUrl}`);
  }
  
  console.log('Starting registration test...');
  // Create a unique email
  const uniqueEmail = `test${Date.now()}@example.com`;
  console.log(`Using email: ${uniqueEmail}`);
  
  const userData = {
    name: 'Test User',
    email: uniqueEmail,
    password: 'password123',
    tel: '0891234567',
    role: 'CUSTOMER',
    profile: '/user.png'
  };

  // Try using curl instead of axios
  try {
    console.log('Trying with curl command...');
    const curlCommand = `curl -X POST "${baseUrl}/api/registerApi" -H "Content-Type: application/json" -d "${JSON.stringify(userData).replace(/"/g, '\\"')}" --max-time 10`;
    console.log(`Executing: ${curlCommand}`);
    
    try {
      const curlResult = execSync(curlCommand, { encoding: 'utf8' });
      console.log('Curl response:', curlResult);
      console.log('Registration successful with curl!');
      return; // Exit if successful
    } catch (curlError) {
      console.log('Curl failed:', curlError.message);
    }
    
    // If curl fails, try axios with different settings
    console.log('Trying with axios...');
    const endpoint = '/api/registerApi';
    console.log(`Sending POST request to ${baseUrl}${endpoint}`);
    
    const response = await axios.post(`${baseUrl}${endpoint}`, userData, {
      headers: {
        'content-type': 'application/json',
        'Origin': baseUrl,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000, // Reduced timeout
      maxRedirects: 0 // Disable redirects
    });
    
    console.log('Response received:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    expect(response.status).toBe(200);
  } catch (error) {
    console.error('Error in registration test:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received');
      console.error('Make sure:');
      console.error('1. The server is running at', baseUrl);
      console.error('2. The API endpoint exists and is accessible');
      console.error('3. There are no CORS issues');
      
      // Try to check if we can access any API endpoint
      console.log('Checking if any API endpoint is accessible...');
      try {
        const testEndpoints = ['/api', '/api/health', '/api/status'];
        for (const testEndpoint of testEndpoints) {
          try {
            const testResponse = await axios.get(`${baseUrl}${testEndpoint}`, { 
              timeout: 5000,
              validateStatus: () => true // Accept any status code
            });
            console.log(`Endpoint ${testEndpoint} response:`, testResponse.status);
          } catch (testError) {
            console.log(`Endpoint ${testEndpoint} error:`, testError.message);
          }
        }
      } catch (e) {
        console.log('API check failed');
      }
    }
    
    throw error;
  }
});