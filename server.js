require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX // e.g., 'us1'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint to handle newsletter subscriptions
app.post('/api/subscribe', async (req, res) => {
  const { email_address, status, merge_fields } = req.body;
  
  if (!email_address) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Add member to list
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address,
      status, // 'subscribed' or 'pending'
      merge_fields
    });

    res.status(200).json({ 
      message: 'Successfully subscribed!', 
      id: response.id 
    });
  } catch (error) {
    // Handle different types of Mailchimp errors
    console.error('Mailchimp error:', error);
    
    // Check if it's already subscribed error
    if (error.response && error.response.body && error.response.body.title === 'Member Exists') {
      return res.status(400).json({ message: 'This email is already subscribed to our newsletter.' });
    }
    
    res.status(500).json({ 
      message: 'Error subscribing to newsletter', 
      error: error.message 
    });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});