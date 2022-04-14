import qs, { StringifiableRecord } from 'query-string'
import { MONZO_API_BASE_URL } from '../config/constants'

export default class Fetcher {
  private headers = {
    Authorization: '',
    'Content-Type': 'application/json',
  }
  private body?: URLSearchParams | string
  private query?: StringifiableRecord

  constructor(accessToken: string) {
    this.headers.Authorization = `Bearer ${accessToken}`
  }

  static buildUrl(path: string, query?: StringifiableRecord) {
    return qs.stringifyUrl({ url: `${MONZO_API_BASE_URL}/${path}`, query })
  }

  withFormData<P extends {} = Object>(data: P) {
    this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    this.body = new URLSearchParams(data as any)
    return this
  }

  withJSON(data: Object) {
    this.headers['Content-Type'] = 'application/json'
    this.body = JSON.stringify(data)
    return this
  }

  withQuery(query: StringifiableRecord) {
    this.query = query
    return this
  }

  private async fetch(method: string, path: string) {
    const url = qs.stringifyUrl({
      url: `${MONZO_API_BASE_URL}/${path}`,
      query: this.query,
    })
    const request = {
      method,
      headers: this.headers,
      body: this.body,
    }
    return fetch(url, request).then((response) => response.json())
  }

  async get<R>(path: string): Promise<R> {
    return this.fetch('GET', path)
  }
  async post<R>(path: string): Promise<R> {
    return this.fetch('POST', path)
  }
  async put<R>(path: string): Promise<R> {
    return this.fetch('PUT', path)
  }
  async patch<R>(path: string): Promise<R> {
    return this.fetch('PATCH', path)
  }
  async delete<R>(path: string): Promise<R> {
    return this.fetch('DELETE', path)
  }
}
