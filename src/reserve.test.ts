import { Hotel } from './interface'
import { describe, expect, test } from 'vitest'
import { reserve, reserveCheapest, reserveSimplest } from './reserve'

const HOTEL1: Hotel = {
  Family: {
      sleeps: 4,
      number: 1,
      price: 85
  },
  Double: {
      sleeps: 2,
      number: 3,
      price: 50
  },
  Single: {
      sleeps: 1,
      number: 2,
      price: 30
  },
}

const HOTEL2: Hotel = {
  Family: {
      sleeps: 4,
      number: 1,
      price: 85
  },
  Double: {
      sleeps: 2,
      number: 3,
      price: 50
  },
  Single: {
      sleeps: 1,
      number: 2,
      price: 10
  },
}

describe('reserve', () => {

  test('reserve HOTEL1', () => {
    expect(reserve(1, HOTEL1)).toEqual('Single - $30')
    expect(reserve(2, HOTEL1)).toEqual('Double - $50')
    expect(reserve(3, HOTEL1)).toEqual('Double Single - $80')
    expect(reserve(4, HOTEL1)).toEqual('Family - $85')
    expect(reserve(5, HOTEL1)).toEqual('Family Single - $115')
    expect(reserve(6, HOTEL1)).toEqual('Double Family - $135')
    expect(reserve(7, HOTEL1)).toEqual('Double Family Single - $165')
    expect(reserve(8, HOTEL1)).toEqual('Double Double Family - $185')
    expect(reserve(9, HOTEL1)).toEqual('Double Double Family Single - $215')
    expect(reserve(10, HOTEL1)).toEqual('Double Double Double Family - $235')
    expect(reserve(11, HOTEL1)).toEqual('Double Double Double Family Single - $265')
    expect(reserve(12, HOTEL1)).toEqual('Double Double Double Family Single Single - $295')
    expect(reserve(13, HOTEL1)).toEqual('No option')
    expect(reserve(14, HOTEL1)).toEqual('No option')
  })

  test('reserve HOTEL2', () => {
    expect(reserve(1, HOTEL2)).toEqual('Single - $10')
    expect(reserve(2, HOTEL2)).toEqual('Single Single - $20')
    expect(reserve(3, HOTEL2)).toEqual('Double Single - $60')
    expect(reserve(4, HOTEL2)).toEqual('Double Single Single - $70')
    expect(reserve(5, HOTEL2)).toEqual('Family Single - $95')
    expect(reserve(6, HOTEL2)).toEqual('Family Single Single - $105')
    expect(reserve(7, HOTEL2)).toEqual('Double Family Single - $145')
    expect(reserve(8, HOTEL2)).toEqual('Double Family Single Single - $155')
    expect(reserve(9, HOTEL2)).toEqual('Double Double Family Single - $195')
    expect(reserve(10, HOTEL2)).toEqual('Double Double Family Single Single - $205')
    expect(reserve(11, HOTEL2)).toEqual('Double Double Double Family Single - $245')
    expect(reserve(12, HOTEL2)).toEqual('Double Double Double Family Single Single - $255')
    expect(reserve(13, HOTEL2)).toEqual('No option')
    expect(reserve(14, HOTEL2)).toEqual('No option')
  })
})
