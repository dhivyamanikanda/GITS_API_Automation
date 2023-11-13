import axios from 'axios';

describe('GET API tests', () => {
  it('When gist_id found', async () => {
    const response = await axios.get('https://api.github.com/gists/7376e2686a8e737ecf9e9dca8a9bccae');
    expect(response.status).toBe(200);
  });

  it('When gist_id not found', async () => {
  try {
    const response = await axios.get('https://api.github.com/gists/7376e2686a8e737ecf9e9dca8a9bccae1');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe('POST API tests', () => {
  const token = process.env.TOKEN;

  it('Should create a new gist', async () => {
    const newGist = {
      description: 'Example of a gist',
      public: 'true',
      files: {
        "README.md": {
          "content": "aaaaa"
        }
      }
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    };

    const response = await axios.post('https://api.github.com/gists', newGist, {
      headers: headers
    });
    
    expect(response.status).toBe(201);
  });

  it('Unauthorized while create a new gist', async () => {
    const newGist = {
      description: 'Example of a gist',
      public: 'true',
      files: {
        "README.md": {
          "content": "aaaaa"
        }
      }
    };

    try {
    const response = await axios.post('https://api.github.com/gists', newGist);
     } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });


  it('Validation failed while create a new gist', async () => {
    const newGist = {
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    };

    try {
    const response = await axios.post('https://api.github.com/gists', newGist, {
      headers: headers
    });
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });
});

describe('PATCH API tests', () => {
  const token = process.env.TOKEN;
  it('Should update existing gist', async () => {
    const newGist = {
      description: 'Example of a gist',
      public: 'true',
      files: {
        "README.md": {
          "content": "aaaaa"
        }
      }
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    };

    const response = await axios.post('https://api.github.com/gists/ad296675a7a5f0b3a8a664152ebf99a3', newGist, {
      headers: headers
    });
    
    expect(response.status).toBe(200);
    });

    it('Gist not found for update', async () => {
    const newGist = {
      description: 'Example of a gist',
      public: 'true',
      files: {
        "README.md": {
          "content": "aaaaa"
        }
      }
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    };

    try {
    const response = await axios.post('https://api.github.com/gists/ad296675a7a5f0b3a8a664152ebf99a31', newGist, {
      headers: headers
    });
      } catch (error) {
      expect(error.response.status).toBe(404);
      }
    });

    it('Validation failed when update gits', async () => {
    const newGist = {
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    };

    try {
    const response = await axios.post('https://api.github.com/gists/ad296675a7a5f0b3a8a664152ebf99a3', newGist, {
      headers: headers
    });
      } catch (error) {
      expect(error.response.status).toBe(422);
      }
    });
  });
