import { Hotel, RecursiveResult, Result } from "./interface";

const calculateSleeps = (rooms: string[], hotel: Hotel): number => {
  let sleeps = 0
  rooms.forEach(room => {
    sleeps += hotel[room].sleeps
  })

  return sleeps
}

const calculateNumber = (rooms: string[], type: string): number => {
  let number = 0
  rooms.forEach(room => {
    if (room === type)
      number++
  })

  return number
}

const calculateTotalPrice = (rooms: string[], hotel: Hotel): number => {
  let total = 0
  rooms.forEach(room => {
    total += hotel[room].price
  })

  return total
}

export const findAllPossibleReservation = (totalSleeps: number, hotel: Hotel) => {
  const newPaths: string[][] = []
  Object.keys(hotel).sort().forEach(type => {
    if (hotel[type].number > 0 && hotel[type].sleeps <= totalSleeps) {
      newPaths.push([type])
    }
  })

  return findAllPossibleReservationRecursive(newPaths, totalSleeps, hotel)
}

const removeDuplicatedPaths = (paths: string[][]) => {
  return paths.reduce(function (acc, curr) {
    if (acc.length === 0) {
      acc.push(curr);
    }
    let found = false;
    acc.forEach(arr => {
      if (arr.sort().toString() === curr.sort().toString()) {
        found = true
      }
    })
    if (!found) {
      acc.push(curr);
    }
    
    return acc;
  }, [] as string[][]);
}

const findAllPossibleReservationRecursive = (paths: string[][], totalSleeps: number, hotel: Hotel) => {
  const finalPaths: string[][] = []
  let newPaths: string[][] = []
  paths.forEach((path) => {
    const pathSleeps = calculateSleeps(path, hotel)
    if (totalSleeps - pathSleeps === 0) {
      finalPaths.push(path)
      return;
    }
    Object.keys(hotel).sort().forEach(type => {
      const pathNumber = calculateNumber(path, type)
      if (hotel[type].number > pathNumber && hotel[type].sleeps <= totalSleeps - pathSleeps) {
        newPaths.push([...path, type])
      }
    })
  })

  if (newPaths.length === 0) {
    const result = removeDuplicatedPaths(finalPaths)

    return result
  }
  newPaths = removeDuplicatedPaths(newPaths)  

  return findAllPossibleReservationRecursive([...finalPaths, ...newPaths], totalSleeps, hotel)
}

export const reserve = (totalSleeps: number, hotel: Hotel): string => {
  const allPossibleReservation = findAllPossibleReservation(totalSleeps, hotel)
  
  let min = Infinity
  let rooms: string[] = []
  allPossibleReservation.forEach(reservation => {
    const price = calculateTotalPrice(reservation, hotel)
    if (price < min) {
      min = price
      rooms = reservation
    }
  })
  
  if (rooms.length === 0) {
    return 'No option'
  }

  const total = calculateTotalPrice(rooms, hotel)

  return rooms.sort().join(' ') + ' - $' + total
}