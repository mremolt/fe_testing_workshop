import axios, { AxiosInstance } from 'axios';
import { matchers } from 'jest-json-schema';
import { JSONSchema7 } from 'json-schema';

expect.extend(matchers);

const categoriesSchema: JSONSchema7 = {
  type: 'array',
  items: { type: 'string' },
};

const jokeSchema: JSONSchema7 = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'icon_url', 'url', 'value', 'created_at', 'updated_at', 'categories'],
  properties: {
    id: { type: 'string' },
    icon_url: { type: 'string' },
    url: { type: 'string' },
    value: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
    categories: categoriesSchema,
  },
};

describe('Jokes API', () => {
  let client: AxiosInstance;

  beforeEach(() => {
    client = axios.create({
      baseURL: 'https://api.chucknorris.io/jokes',
      timeout: 1000,
    });
  });

  describe('GET categories', () => {
    it('should return the list of given categories (bad, fragile test)', async () => {
      const response = await client.get('/categories');
      expect(response.data).toMatchSnapshot();
    });

    it('should return a list of category names (better, only breaks if data structure changes)', async () => {
      const response = await client.get('/categories');
      expect(response.status).toBe(200);
      expect(response.data).toMatchSchema(categoriesSchema);
    });
  });

  describe('GET random joke', () => {
    it('should return a random joke', async () => {
      const response = await client.get('/random');
      expect(response.data).toMatchSchema(jokeSchema);
    });
  });

  describe('search for jokes by query', () => {
    it('should return a list of jokes containing the query', () => {});
    it('should return an empty list for a query that is not included', () => {});
  });
});
