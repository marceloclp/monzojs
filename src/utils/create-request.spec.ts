import { MONZO_API_BASE_URL } from '../config/constants'
import createRequest, { Fetcher } from './create-request'

type MockedResponse = {
  url: string
  request: {
    method: string
    headers: {
      Authorization: string
      'Content-Type': string
    }
    body?: string | URLSearchParams
  }
}

// @ts-expect-error required in order to override the fetch method
global.fetch = jest.fn((url, request) =>
  Promise.resolve({
    json: () => Promise.resolve({ url, request }),
  })
)

describe('createRequest', () => {
  let request: Fetcher
  beforeEach(() => {
    request = createRequest('accessToken')
    // @ts-expect-error required in order to clear the mocked promise
    fetch.mockClear()
  })

  describe('withFormData()', () => {
    beforeEach(() => {
      request.withFormData({ age: 10 })
    })
    it('should set the headers to form data', () => {
      expect(request['headers']['Content-Type']).toBe(
        'application/x-www-form-urlencoded'
      )
    })
    it('should encode the body to URLSearchParams with the correct data', () => {
      expect((request as any)['body']?.get('age')).toBe('10')
    })
    describe('when making a request', () => {
      let response: MockedResponse
      beforeEach(async () => {
        response = await request.get('accounts')
      })
      it('should have request body as an instance of URLSearchParams', () => {
        expect(response.request.body).toBeInstanceOf(URLSearchParams)
      })
      it('should have the correct form data', () => {
        expect((response.request.body as URLSearchParams).get('age')).toBe('10')
      })
    })
  })

  describe('withJSON()', () => {
    beforeEach(() => {
      request.withJSON({ age: 10 })
    })
    it('should set the headers to json', () => {
      expect(request['headers']['Content-Type']).toBe('application/json')
    })
    it('should stringify the body', () => {
      expect(request['body']).toBe(JSON.stringify({ age: 10 }))
    })
    describe('when making a request', () => {
      let response: MockedResponse
      beforeEach(async () => {
        response = await request.post('accounts')
      })
      it('should have the stringified json as the request body', () => {
        expect(response.request.body).toBe(JSON.stringify({ age: 10 }))
      })
    })
  })

  describe('withQuery()', () => {
    const query = { maxAge: 10 }
    beforeEach(() => {
      request.withQuery(query)
    })
    it('should set the underlying query object', () => {
      expect(request['query']).toBe(query)
    })
    describe('when making a request', () => {
      let response: MockedResponse
      beforeEach(async () => {
        response = await request.get('accounts')
      })
      it('should have the querystring appended to the requested url', () => {
        expect(response.url).toBe(`${MONZO_API_BASE_URL}/accounts?maxAge=10`)
      })
    })
  })

  describe.each([
    ['get', 'GET'],
    ['post', 'POST'],
    ['put', 'PUT'],
    ['patch', 'PATCH'],
    ['delete', 'DELETE'],
  ])('%s()', (methodName, method) => {
    let promise: Promise<MockedResponse>
    beforeEach(() => {
      promise = request[methodName as 'get']('accounts')
    })
    it('should make a request', () => {
      expect(promise).toBeInstanceOf(Promise)
    })
    it('should make a request to the correct url', async () => {
      expect((await promise).url).toBe(`${MONZO_API_BASE_URL}/accounts`)
    })
    it('should make the request with the correct headers', async () => {
      expect((await promise).request.headers).toMatchObject({
        Authorization: `Bearer accessToken`,
        'Content-Type': 'application/json',
      })
    })
    it('should have the correct method type', async () => {
      expect((await promise).request.method).toBe(method)
    })
  })
})
