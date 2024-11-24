import { Hotel } from './interface'
import { describe, expect, test } from 'vitest'
import { findAllPossibleReservation, reserve, reserveCheapest, reserveSimplest } from './reserve'

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

const HOTEL3: Hotel = {
  Penthouse: {
    sleeps: 5,
    number: 1,
    price: 170
  },
  Family: {
      sleeps: 4,
      number: 1,
      price: 85
  },
  DoublePremium: {
    sleeps: 2,
    number: 3,
    price: 65
  },
  Double: {
      sleeps: 2,
      number: 3,
      price: 50
  },
  Premium: {
    sleeps: 1,
    number: 3,
    price: 45
  },
  Single: {
      sleeps: 1,
      number: 2,
      price: 30
  },
}

// describe('findAllPossibleReservation', () => {
//   test('findAllPossibleReservation HOTEL1', () => {
//     expect(findAllPossibleReservation(1, HOTEL1)).toEqual([['Single']])
//     expect(findAllPossibleReservation(2, HOTEL1)).toEqual([['Double'], ['Single', 'Single']])
//     expect(findAllPossibleReservation(3, HOTEL1)).toEqual([['Double', 'Single']])
//     expect(findAllPossibleReservation(4, HOTEL1)).toEqual([['Family'], ['Double', 'Double'], ['Double', 'Single', 'Single']])
//     expect(findAllPossibleReservation(5, HOTEL1)).toEqual([['Family', 'Single'], ['Double', 'Double', 'Single']])
//     expect(findAllPossibleReservation(6, HOTEL1)).toEqual([['Double', 'Family'], ['Double', 'Double', 'Double'], ['Family', 'Single', 'Single'], ['Double', 'Double', 'Single', 'Single']])
//     expect(findAllPossibleReservation(7, HOTEL1)).toEqual([['Double', 'Family', 'Single'], ['Double', 'Double', 'Double', 'Single']])
//     expect(findAllPossibleReservation(8, HOTEL1)).toEqual([['Double', 'Double', 'Family'], ['Double', 'Family', 'Single', 'Single'], ['Double', 'Double', 'Double', 'Single', 'Single']])
//     expect(findAllPossibleReservation(9, HOTEL1)).toEqual([['Double', 'Double', 'Family', 'Single']])
//     expect(findAllPossibleReservation(10, HOTEL1)).toEqual([['Double', 'Double', 'Double', 'Family'], ['Double', 'Double', 'Family', 'Single', 'Single']])
//     expect(findAllPossibleReservation(11, HOTEL1)).toEqual([['Double', 'Double', 'Double', 'Family', 'Single']])
//     expect(findAllPossibleReservation(12, HOTEL1)).toEqual([['Double', 'Double', 'Double', 'Family', 'Single', 'Single']])
//     expect(findAllPossibleReservation(13, HOTEL1)).toEqual([])
//     expect(findAllPossibleReservation(14, HOTEL1)).toEqual([])
//   })
// })

// describe('reserve HOTEL1', () => {
//   test('reserve 1 HOTEL1', () => {
//     expect(reserve(1, HOTEL1)).toEqual('Single - $30')
//   })
//   test('reserve 2 HOTEL1', () => {
//     expect(reserve(2, HOTEL1)).toEqual('Double - $50')
//   })
//   test('reserve 3 HOTEL1', () => {
//     expect(reserve(3, HOTEL1)).toEqual('Double Single - $80')
//   })
//   test('reserve 4 HOTEL1', () => {
//     expect(reserve(4, HOTEL1)).toEqual('Family - $85')
//   })
//   test('reserve 5 HOTEL1', () => {
//     expect(reserve(5, HOTEL1)).toEqual('Family Single - $115')
//   })
//   test('reserve 6 HOTEL1', () => {
//     expect(reserve(6, HOTEL1)).toEqual('Double Family - $135')
//   })
//   test('reserve 7 HOTEL1', () => {
//     expect(reserve(7, HOTEL1)).toEqual('Double Family Single - $165')
//   })
//   test('reserve 8 HOTEL1', () => {
//     expect(reserve(8, HOTEL1)).toEqual('Double Double Family - $185')
//   })
//   test('reserve 9 HOTEL1', () => {
//     expect(reserve(9, HOTEL1)).toEqual('Double Double Family Single - $215')
//   })
//   test('reserve 10 HOTEL1', () => {
//     expect(reserve(10, HOTEL1)).toEqual('Double Double Double Family - $235')
//   })
//   test('reserve 11 HOTEL1', () => {
//     expect(reserve(11, HOTEL1)).toEqual('Double Double Double Family Single - $265')
//   })
//   test('reserve 12 HOTEL1', () => {
//     expect(reserve(12, HOTEL1)).toEqual('Double Double Double Family Single Single - $295')
//   })
//   test('reserve 13 HOTEL1', () => {
//     expect(reserve(13, HOTEL1)).toEqual('No option')
//   })
//   test('reserve 14 HOTEL1', () => {
//     expect(reserve(14, HOTEL1)).toEqual('No option')
//   })
// })

// describe('reserve HOTEL2', () => {
//   test('reserve 1 HOTEL2', () => {
//     expect(reserve(1, HOTEL2)).toEqual('Single - $10')
//   })
//   test('reserve 2 HOTEL2', () => {
//     expect(reserve(2, HOTEL2)).toEqual('Single Single - $20')
//   })
//   test('reserve 3 HOTEL2', () => {
//     expect(reserve(3, HOTEL2)).toEqual('Double Single - $60')
//   })
//   test('reserve 4 HOTEL2', () => {
//     expect(reserve(4, HOTEL2)).toEqual('Double Single Single - $70')
//   })
//   test('reserve 5 HOTEL2', () => {
//     expect(reserve(5, HOTEL2)).toEqual('Family Single - $95')
//   })
//   test('reserve 6 HOTEL2', () => {
//     expect(reserve(6, HOTEL2)).toEqual('Family Single Single - $105')
//   })
//   test('reserve 7 HOTEL2', () => {
//     expect(reserve(7, HOTEL2)).toEqual('Double Family Single - $145')
//   })
//   test('reserve 8 HOTEL2', () => {
//     expect(reserve(8, HOTEL2)).toEqual('Double Family Single Single - $155')
//   })
//   test('reserve 9 HOTEL2', () => {
//     expect(reserve(9, HOTEL2)).toEqual('Double Double Family Single - $195')
//   })
//   test('reserve 10 HOTEL2', () => {
//     expect(reserve(10, HOTEL2)).toEqual('Double Double Family Single Single - $205')
//   })
//   test('reserve 11 HOTEL2', () => {
//     expect(reserve(11, HOTEL2)).toEqual('Double Double Double Family Single - $245')
//   })
//   test('reserve 12 HOTEL2', () => {
//     expect(reserve(12, HOTEL2)).toEqual('Double Double Double Family Single Single - $255')
//   })
//   test('reserve 13 HOTEL2', () => {
//     expect(reserve(13, HOTEL2)).toEqual('No option')
//   })
//   test('reserve 14 HOTEL2', () => {
//     expect(reserve(14, HOTEL2)).toEqual('No option')
//   })
// })

describe('reserve HOTEL3', () => {
  test('reserve 1 HOTEL3', () => {
    expect(reserve(1, HOTEL3)).toEqual('Single - $30')
  })
  test('reserve 2 HOTEL3', () => {
    expect(reserve(2, HOTEL3)).toEqual('Double - $50')
  })
  test('reserve 3 HOTEL3', () => {
    expect(reserve(3, HOTEL3)).toEqual('Double Single - $80')
  })
  test('reserve 4 HOTEL3', () => {
    expect(reserve(4, HOTEL3)).toEqual('Family - $85')
  })
  test('reserve 5 HOTEL3', () => {
    expect(reserve(5, HOTEL3)).toEqual('Family Single - $115')
  })
  test('reserve 6 HOTEL3', () => {
    expect(reserve(6, HOTEL3)).toEqual('Double Family - $135')
  })
  test('reserve 7 HOTEL3', () => {
    expect(reserve(7, HOTEL3)).toEqual('Double Family Single - $165')
  })
  test('reserve 8 HOTEL3', () => {
    expect(reserve(8, HOTEL3)).toEqual('Double Double Family - $185')
  })
  test('reserve 9 HOTEL3', () => {
    expect(reserve(9, HOTEL3)).toEqual('Double Double Family Single - $215')
  })
  test('reserve 10 HOTEL3', () => {
    expect(reserve(10, HOTEL3)).toEqual('Double Double Double Family - $235')
  })
  test('reserve 11 HOTEL3', () => {
    expect(reserve(11, HOTEL3)).toEqual('Double Double Double Family Single - $265')
  })
  test('reserve 12 HOTEL3', () => {
    expect(reserve(12, HOTEL3)).toEqual('Double Double Double Family Single Single - $295')
  })
  test('reserve 13 HOTEL3', () => {
    expect(reserve(13, HOTEL3)).toEqual('Double Double Double DoublePremium Family Single - $330')
  })
  test('reserve 14 HOTEL3', () => {
    expect(reserve(14, HOTEL3)).toEqual('Double Double Double DoublePremium Family Single Single - $360')
  })
  test('reserve 15 HOTEL3', () => {
    expect(reserve(15, HOTEL3)).toEqual('Double Double Double DoublePremium DoublePremium Family Single - $395')
  })
  test('reserve 16 HOTEL3', () => {
    expect(reserve(16, HOTEL3)).toEqual('Double Double Double DoublePremium DoublePremium Family Single Single - $425')
  })
  test('reserve 17 HOTEL3', () => {
    expect(reserve(17, HOTEL3)).toEqual('Double Double Double Family Penthouse Single Single - $470')
  })
  test('reserve 18 HOTEL3', () => {
    expect(reserve(18, HOTEL3)).toEqual('Double Double Double DoublePremium DoublePremium DoublePremium Family Single Single - $490')
  })
  test('reserve 19 HOTEL3', () => {
    expect(reserve(19, HOTEL3)).toEqual('Double Double Double DoublePremium DoublePremium DoublePremium Family Premium Single Single - $535')
  })
  test('reserve 20 HOTEL3', () => {
    expect(reserve(20, HOTEL3)).toEqual('Double Double Double DoublePremium DoublePremium DoublePremium Family Premium Premium Single Single - $580')
  })
  test('reserve 21 HOTEL3', () => {
    expect(reserve(21, HOTEL3)).toEqual('Double Double Double Family Penthouse Premium Premium Premium Single - $565')
  })
  test('reserve 22 HOTEL3', () => {
    expect(reserve(22, HOTEL3)).toEqual('Double Double Double Family Penthouse Premium Premium Premium Single Single - $595')
  })
  test('reserve 23 HOTEL3', () => {
    expect(reserve(23, HOTEL3)).toEqual('No option')
  })
})
