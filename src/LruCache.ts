export class LruCache<K, V> {
  private capacity: number
  private cache: Map<K, ListNode<K, V>>

  private head: ListNode<K, V>
  private tail: ListNode<K, V>

  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
  }

  public put(key: K, value: V): void {
    const newNode = new ListNode(key, value)

    if (this.cache.has(key)) {
      const existingNode = this.cache.get(key)
      const previous = existingNode.previous
      if (previous) {
        previous.next = existingNode.next 
      } 
      if (this.tail.key === key) {
        this.tail = previous
      }
    } else {
      if (this.cache.size === this.capacity) {
        this.evictItem()
      }
      this.cache.set(key, newNode)
    }

    this.updateHead(newNode)
    this.tail = this.tail || this.head
  }

  private updateHead(newHead: ListNode<K, V>): void {
    const previousHead = this.head
    this.head = newHead
    if (previousHead) {
      this.head.next = previousHead
      previousHead.previous = this.head
    }
  }

  private evictItem(): void {
    this.cache.delete(this.tail.key)
    const oneBeforeLast = this.tail.previous
    if (oneBeforeLast) {
      oneBeforeLast.next = null
      this.tail = oneBeforeLast
    }
  }

  public get(key: K): V {
    return this.cache.get(key)?.value
  }
}

class ListNode<K, V> {
  public key: K
  public value: V
  public next: ListNode<K, V>
  public previous: ListNode<K, V>

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
    this.next = null
    this.previous = null 
  }
}