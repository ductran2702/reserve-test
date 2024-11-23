import { Hotel, RecursiveResult, Result } from "./interface";

export const sum = (a: number, b: number) => {
  return a + b
}

export const reserveSimplest = (guestsNumber: number, hotel: Hotel): Result => {
  let guestsRest = guestsNumber;
  let rooms = "";
  let total = 0;
  const orderedRoomTypes = Object.keys(hotel).sort((a, b) => hotel[b].sleeps - hotel[a].sleeps)
  orderedRoomTypes.forEach((type: string) => {
      let numberRest = hotel[type].number;
      while (guestsRest >= hotel[type].sleeps && numberRest > 0) {
          rooms += type + " ";
          guestsRest -= hotel[type].sleeps;
          total += hotel[type].price;
          numberRest--;
      }
  })

  return { rooms, total, guestsRest };
}

export const reserveCheapest = (guestsNumber: number, hotel: Hotel): string[] => {
  let guestsRest = guestsNumber;
  let rooms: string[] = [];
  const orderedRoomTypes = Object.keys(hotel).sort((a, b) => hotel[a].price / hotel[a].sleeps - hotel[b].price / hotel[b].sleeps)
  orderedRoomTypes.forEach((type: string) => {
      while (guestsRest >= hotel[type].sleeps && hotel[type].number > 0) {
          rooms.push(type);
          guestsRest -= hotel[type].sleeps;
          hotel[type].number--;
      }
  })

  return rooms;
}

const calculateSleeps = (rooms: string[], hotel: Hotel): number => {
  let sleeps = 0
  rooms.forEach(room => {
    sleeps += hotel[room].sleeps
  })

  return sleeps
}

const calculateTotalPrice = (rooms: string[], hotel: Hotel): number => {
  let total = 0
  rooms.forEach(room => {
    total += hotel[room].price
  })

  return total
}

const calculateTotalSleepsOfHotel = (hotel: Hotel): number => {
  let sleeps = 0
  Object.keys(hotel).forEach(room => {
    sleeps += hotel[room].sleeps * hotel[room].number
  })

  return sleeps
}

export const reserveCheapestRecursive = (rooms: string[], guestsNumber: number, sortedTypes: string[], hotel: Hotel): string[] => {
  const guestsRest = guestsNumber - calculateSleeps(rooms, hotel)
  if (guestsRest === 0) {
    return rooms
  }
  const newRooms = reserveCheapest(guestsRest, hotel)
  const newGuestsRest = guestsNumber - calculateSleeps(newRooms, hotel)
  if (newGuestsRest === 0) {
    return newRooms
  }


  const newRoomsArray = [...rooms, ...newRooms]
  let lastRoom = newRoomsArray.pop()
  hotel[lastRoom!].number++
  let indexOfLastRoom = lastRoom ? sortedTypes.indexOf(lastRoom) : 0
  while (indexOfLastRoom + 1 >= sortedTypes.length && newRoomsArray.length > 0) {
    lastRoom = newRoomsArray.pop()
    hotel[lastRoom!].number++
    indexOfLastRoom = lastRoom ? sortedTypes.indexOf(lastRoom) : 0
  }

  if (newRoomsArray.length === 0) {
    return []
  }
  let index = 1
  let newLastRoom = sortedTypes[indexOfLastRoom + index]
  while (hotel[sortedTypes[indexOfLastRoom + index]].number === 0) {
    index++;
    newLastRoom = sortedTypes[indexOfLastRoom + index]
  }
  const someRoomsReplaced = [...newRoomsArray, newLastRoom]
  hotel[newLastRoom!].number--


  return reserveCheapestRecursive(someRoomsReplaced, guestsNumber, sortedTypes, hotel)
}

export const reserve = (guestsNumber: number, hotel: Hotel): string => {
  const hotelSleeps = calculateTotalSleepsOfHotel(hotel)
  if (hotelSleeps < guestsNumber) {
    return 'No option'
  }
  const sortedTypes = Object.keys(hotel).sort((a, b) => hotel[a].price / hotel[a].sleeps - hotel[b].price / hotel[b].sleeps)
  const rooms = reserveCheapestRecursive([], guestsNumber, sortedTypes, JSON.parse(JSON.stringify(hotel)));

  const total = calculateTotalPrice(rooms, hotel)

  return rooms.sort().join(' ') + ' - $' + total
}