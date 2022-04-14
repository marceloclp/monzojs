import { MONZO_API_BASE_URL } from '../config/constants'
import Fetcher from './fetcher'

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

// @ts-expect-error
global.fetch = jest.fn((url, request) =>
  Promise.resolve({
    json: () => Promise.resolve({ url, request }),
  })
)

describe('Fetcher', () => {
  let fetcher: Fetcher
  beforeEach(() => {
    fetcher = new Fetcher('accessToken')
    // @ts-ignore
    fetch.mockClear()
  })

  describe('withFormData()', () => {
    beforeEach(() => {
      fetcher.withFormData({ age: 10 })
    })
    it('should set the headers to form data', () => {
      expect(fetcher['headers']['Content-Type']).toBe(
        'application/x-www-form-urlencoded'
      )
    })
    it('should encode the body to URLSearchParams with the correct data', () => {
      expect((fetcher as any)['body']?.get('age')).toBe('10')
    })
    describe('when making a request', () => {
      let response: MockedResponse
      beforeEach(async () => {
        response = await fetcher.get('accounts')
      })
      it('should have request body as an instance of URLSearchParams', () => {
        expect(response.request.body).toBeInstanceOf(URLSearchParams)
      })
      it('should have the correct form data', () => {
        expect((response as any).request.body.get('age')).toBe('10')
      })
    })
  })

  describe('withJSON()', () => {
    beforeEach(() => {
      fetcher.withJSON({ age: 10 })
    })
    it('should set the headers to json', () => {
      expect(fetcher['headers']['Content-Type']).toBe('application/json')
    })
    it('should stringify the body', () => {
      expect(fetcher['body']).toBe(JSON.stringify({ age: 10 }))
    })
    describe('when making a request', () => {
      let response: MockedResponse
      beforeEach(async () => {
        response = await fetcher.post('accounts')
      })
      it('should have the stringified json as the request body', () => {
        expect(response.request.body).toBe(JSON.stringify({ age: 10 }))
      })
    })
  })

  describe('withQuery()', () => {
    const query = { maxAge: 10 }
    beforeEach(() => {
      fetcher.withQuery(query)
    })
    it('should set the underlying query object', () => {
      expect(fetcher['query']).toBe(query)
    })
    describe('when making a request', () => {
      let response: MockedResponse
      beforeEach(async () => {
        response = await fetcher.get('accounts')
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
      promise = fetcher[methodName as 'get']('accounts')
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
