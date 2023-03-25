import { describe, expect, it } from 'vitest'
import { schema } from './form'

describe('schema', () => {
  describe('valid', () => {
    it('returns input', () => {
      const name = 'テスト太郎'
      const age = 10
      const input = {
        name,
        age,
      }
      const actual = schema.parse(input)
      expect(actual).toEqual(input)
    })
  })
  describe('inValid', () => {
    describe('name is empty string', () => {
      it('throws error', () => {
        const name = ''
        const age = 8
        const input = {
          name,
          age,
        }
        expect(() => schema.parse(input)).toThrowError('Required')
      })
    })
    describe('age is less than 10', () => {
      it('throw error', () => {
        const name = 'テスト太郎'
        const age = 9
        const input = {
          name,
          age,
        }
        expect(() => schema.parse(input)).toThrowError()
      })
    })
  })
})
