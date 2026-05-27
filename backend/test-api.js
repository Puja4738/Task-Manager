const axios = require('axios');

async function test() {
  try {
    console.log('🧪 Testing Backend API...\n');
    
    // 1. Health check
    await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed');
    
    // 2. Register
    const email = `test${Date.now()}@example.com`;
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email,
      password: 'password123'
    });
    const token = res.data.data.token;
    const userId = res.data.data.user._id;
    console.log('✅ Registration passed');
    
    // 3. Get current user
    await axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Get current user passed');
    
    // 4. Create task
    const tomorrow = new Date(Date.now() + 86400000);
    await axios.post('http://localhost:5000/api/tasks', {
      title: 'Test Task',
      description: 'This is a test',
      dueDate: tomorrow.toISOString(),
      priority: 'High',
      assignedToId: userId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Create task passed');
    
    console.log('\n🎉 All tests passed! Backend is working perfectly!\n');
    console.log('✅ You can now proceed with frontend development!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

test();