exports.handler = async () => {
  const { NETLIFY_API_TOKEN, NETLIFY_SITE_ID } = process.env;

  if (!NETLIFY_API_TOKEN || !NETLIFY_SITE_ID) {
    return { statusCode: 200, body: JSON.stringify({ count: 0 }) };
  }

  try {
    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/forms`,
      { headers: { Authorization: `Bearer ${NETLIFY_API_TOKEN}` } }
    );
    const forms = await res.json();
    const waitlist = forms.find(f => f.name === 'waitlist');
    const count = waitlist?.submission_count ?? 0;
    return {
      statusCode: 200,
      headers: { 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify({ count }),
    };
  } catch (_) {
    return { statusCode: 200, body: JSON.stringify({ count: 0 }) };
  }
};
