/**
 * Returns an union type containing all the possible values of an array.
 * 
 * @example
 *  ArrayValues<['merchant', 'online']> = 'merchant' | 'online'
 */
type ArrayValues<A extends unknown[]> = A extends (infer T)[] ? T : never

/**
 * An expandable field can be expanded via the `expand` parameter.
 * 
 * By default, when the field is not expanded, it will be of type `DefaultType`.
 * Otherwise, it will be of type `ExpandedType` or null - if unavailable.
 * 
 * @hack
 *  TS hack to easily show what the field will be expanded to, if expanded.
 */
export type ExpandableField<DefaultType, ExpandedType> = DefaultType & {
  _whenExpandedWillBe: ExpandedType | null
}

/**
 * Returns the object with all fields unexpanded.
 * 
 * @example
 *  type GetUnexpandedObject<{
 *    merchant: ExpandableField<string, Merchant>
 *  }> = { merchant: string }
 */
export type GetUnexpandedObject<T extends {}> = {
  [K in keyof T]: T[K] extends ExpandableField<infer I, infer _> ? I : T[K]
}

/**
 * Returns the object with the specified fields expanded.
 * 
 * @example
 *  type GetExpandedObject<
 *    { merchant: ExpandableField<string, Merchant> },
 *    [ 'merchant' ]
 *  > = { merchant: Merchant }
 */
export type GetExpandedObject<T extends {}, ExpFields extends (keyof T)[]> = {
  [K in keyof T]: K extends ArrayValues<ExpFields>
    ? T[K] extends ExpandableField<infer _, infer F> ? F | null : never
    : T[K]
}

/**
 * Returns the keys that are expandable from an interface.
 * 
 * @example
 *  type GetExpandableFields<{
 *    id: string
 *    merchant: ExpandableField<string, Merchant>
 *  }> = 'merchant'
 */
export type GetExpandableFields<T extends {}> = {
  [K in keyof T]-?: T[K] extends ExpandableField<infer _, infer __> ? K : never
}[keyof T]