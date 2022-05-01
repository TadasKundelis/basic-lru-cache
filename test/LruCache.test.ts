import {LruCache} from '../src/LruCache'

describe('LruCache', () => {
  it('retrieves item from cache', () => {
    const cache = new LruCache<string, number>(1)
    cache.put('1', 1)

    expect(cache.get('1')).toEqual(1)
  })

  it('replaces lru item with more recent one', () => {
    const cache = new LruCache(1)
    cache.put('1', 1)
    cache.put('2', 2)

    expect(cache.get('1')).toEqual(undefined)
    expect(cache.get('2')).toEqual(2)
  })

  it('works for capacity > 1', () => {
    const cache = new LruCache(2)
    cache.put('1', 1)
    cache.put('2', 2)
    cache.put('3', 3)
    cache.put('2', 2)
    cache.put('1', 1)

    expect(cache.get('3')).toEqual(undefined)
    expect(cache.get('1')).toEqual(1)
    expect(cache.get('2')).toEqual(2)
  })  

  it('correctly handles repeated insertions of the same item', () => {
    const cache = new LruCache(2)
    cache.put('1', 1)
    cache.put('1', 1)
    cache.put('1', 1)
    cache.put('2', 2)

    expect(cache.get('1')).toEqual(1)
    expect(cache.get('2')).toEqual(2)
  }) 
})