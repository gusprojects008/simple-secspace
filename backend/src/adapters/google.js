import axios from 'axios';

export function getAuthUrl() {
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    scope: 'openid profile email',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  };
  const url_params = new URLSearchParams(params).toString();
  return `https://accounts.google.com/o/oauth2/v2/auth?${url_params}`;
};

export async function handleCallback(code) {
  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code'
    }), 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  );
  const accessToken = tokenRes.data.access_token;
  const profileRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {Authorization: `Bearer ${accessToken}`}
  });
  const googleId = profileRes.data.id;
  const email = profileRes.data.email;
  const emailVerified = profileRes.data.email_verified;
  const username = profileRes.data.name;
  return {googleId, email, emailVerified, username};
};

const googleAdapter = {
  getAuthUrl, 
  handleCallback
};

export {googleAdapter};
