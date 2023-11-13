import axios from 'axios';


// describe('API Tests', () => {

//     it('should return a 200 OK status', async () => {
        
//         const myVariable = process.env.TOKEN;
//         console.log("myVariable");
//         console.log(myVariable);


//         const options = {
//         hostname: 'https://api.github.com/',
//         path: 'gists/5d7e231294d51571a661eb8b823c379b',
//         method: 'GET',
//         headers: {
//             'Accept': 'application/vnd.github+json',
//             'Authorization': `Bearer ${myVariable}`
//         }
//         };

//         const req = http.request(options, res => {
//         console.log(`statusCode: ${res.statusCode}`);

//         res.on('data', d => {
//             process.stdout.write(d);
//         });
//         });

//         req.on('error', error => {
//         console.error(error);
//         });

//         req.end();
//             });
// });


describe('GET API tests', () => {
  it('When gist_id found', async () => {

    const response = await axios.get('https://api.github.com/gists/7376e2686a8e737ecf9e9dca8a9bccae');
    console.log("response.status");
    console.log(response.status);
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
      Authorization: 'Bearer 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',
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
      Authorization: 'Bearer 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',
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
      Authorization: 'Bearer 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',
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
      Authorization: 'Bearer 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',
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
      Authorization: 'Bearer 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',
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
