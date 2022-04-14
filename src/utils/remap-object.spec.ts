import remapObject from './remap-object'

describe('remapObject', () => {
  it('should return a new object with a new key-value pairs', () => {
    const remappedObject = remapObject(
      { age: 10, name: 'Liam' },
      (k) => `metadata[${k}]`
    )
    expect(remappedObject).toMatchObject({
      'metadata[age]': 10,
      'metadata[name]': 'Liam',
    })
  })
})
