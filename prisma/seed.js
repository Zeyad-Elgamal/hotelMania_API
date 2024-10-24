// import { PrismaClient } from '@prisma/client';

require('dotenv').config();
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const SALT_ROUNDS = 5;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatStep(min, max, step) {
  const randomStepNumber = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  const randomStepFloat = randomStepNumber - 0.01;
  return parseFloat(randomStepFloat.toFixed(2));
}

function createRandomDate(date, days) {
  const returnDate = new Date(date);
  returnDate.setDate(date.getDate() + days);
  return returnDate;
}

const governateArray = [
  {
    name: 'Cairo',
    city: ['Nasr city', 'Heliopolis', 'Shubra', 'Maadi'],
  },
  {
    name: 'Alexandria',
    city: ['Borg Al arab', 'Abu Qir', 'Montazah', 'Sidi Gaber'],
  },
  {
    name: 'Giza',
    city: ['6th of october', 'Sheikh Zayed', 'Al-Haram', 'Imbaba'],
  },
  {
    name: 'Minya',
    city: ['Minya', 'Malawi', 'Beni Muzar', 'Abu Qurqas'],
  },
  {
    name: 'Sharqia',
    city: ['Zagazig', 'Mit-Ghamr', '10th of Ramadan', 'Al Ibrahimiya'],
  },
  {
    name: 'Suez',
    city: ['Al Ghanayen', 'Suez', 'Faisal', 'Al Arbaeen'],
  },
];

const hotelPrefixList = [
  'The Grand', 'Royal', 'Imperial', 'Majestic', 'Heritage', 'Regal', 'Luxury', 'Golden', 'Summit', 'Mount', 'Ocean', 'Riverside', 'Skyline', 'Sunset', 'Starlight', 'Evergreen', 'Hilltop', 'Crystal', 'Sunrise', 'Pacific',
];

const hotelPostfixList = [
  'Inn', 'Resort', 'Suites', 'Lodge', 'Retreat', 'Palace', 'House', 'Villa', 'Manor', 'Gardens', 'Pavilion', 'Estates', 'Heights', 'Oasis', 'Cove', 'Bay', 'Chalet', 'Haven', 'Hills', 'Terrace',
];

const roomPrefixList = [
  'Royal', 'Grand', 'Executive', 'Luxury', 'Presidential', 'Imperial', 'Deluxe', 'Platinum', 'Golden', 'Heritage', 'Summit', 'Serenity', 'Skyline', 'Diamond', 'Ocean', 'Mountain', 'Garden', 'Sunset', 'Panoramic', 'Majestic',
];

const roomNameList = [
  'Horizon', 'Avalon', 'Elysium', 'Zephyr', 'Mirage', 'Crest', 'Oasis', 'Cascade', 'Solstice', 'Phoenix', 'Harbor', 'Aria', 'Aurora', 'Summit', 'Sierra', 'Echo', 'Eclipse', 'Haven', 'Eden', 'Vista', 'Cove', 'Ridge', 'Bliss', 'Monarch', 'Falcon',
];

const roomPostfixList = [
  'Suite', 'Room', 'Chamber', 'Retreat', 'Lounge', 'Villa', 'Haven', 'Residence', 'Parlor', 'Pavilion', 'Oasis', 'Studio', 'Sanctuary', 'Loft', 'Escape', 'Hideaway', 'Cabana', 'Corner', 'Terrace', 'Nook',
];

const cityHotelObject = {};
for (const gov of governateArray) {
  for (const city of gov.city) {
    const hotelArray = [];
    const hotelUrlIndexSet = new Set();
    const hotelPrePostSet = new Map();

    for (let i = 0; i < 6; i += 1) {
      const urlIndex = getRandomInt(1, 51);
      const randomIndexPreFix = getRandomInt(0, hotelPrefixList.length - 1);
      const randomIndexPostFix = getRandomInt(0, hotelPostfixList.length - 1);

      if (hotelUrlIndexSet.has(urlIndex)
        || hotelPrePostSet.has(JSON.stringify([randomIndexPreFix, randomIndexPostFix]))
      ) {
        i -= 1;
      } else {
        hotelUrlIndexSet.add(urlIndex);
        hotelPrePostSet.set(JSON.stringify([randomIndexPreFix, randomIndexPostFix]));
        const hotelObject = {
          name: `${hotelPrefixList[randomIndexPreFix]} ${city} ${hotelPostfixList[randomIndexPostFix]}`,
          imageURL: `https://hotelmania.nyc3.cdn.digitaloceanspaces.com/Hotels/Image_${urlIndex}.jpg`,
        };
        hotelArray.push(hotelObject);
      }
    }
    // console.log(hotelPrePostSet);
    cityHotelObject[city] = hotelArray;
  }
}

const roomArray = [];
for (let i = 0; i < 20; i += 1) {
  const urlIndexSet = new Set();
  const urlIndex = getRandomInt(1, 54);
  const preFixIndex = getRandomInt(0, roomPrefixList.length - 1);
  const nameIndex = getRandomInt(0, roomNameList.length - 1);
  const postFixIndex = getRandomInt(0, roomPostfixList.length - 1);

  if (urlIndexSet.has(urlIndex)) {
    i -= 1;
  } else {
    urlIndexSet.add(urlIndex);
    const imageURL = `https://hotelmania.nyc3.cdn.digitaloceanspaces.com/Rooms_Images/Image_${urlIndex}.jpg`;
    const name = `${roomPrefixList[preFixIndex]} ${roomNameList[nameIndex]} ${roomPostfixList[postFixIndex]}`;
    roomArray.push({
      number: i + 1,
      price: getRandomFloatStep(50, 150, 5),
      imageURL,
      name,
    });
  }
}

const emailDomainArray = [
  'gmail', 'yahoo', 'hotmail', 'icloud', 'outlook', 'msn', 'live',
];

const firstNameArray = [
  'Ahmad', 'Ali', 'Amira', 'Amina', 'Aisha', 'Bashir', 'Bilal', 'Dina', 'Fatima', 'Faris', 'Habib', 'Hadi', 'Hamza', 'Hassan', 'Ibrahim', 'Jamal', 'Jibril', 'Khalid', 'Layla', 'Leena', 'Mahmoud', 'Malek', 'Mariam', 'Mona', 'Mustafa', 'Nada', 'Nasser', 'Noor', 'Omar', 'Rami', 'Rana', 'Rania', 'Rashid', 'Reem', 'Safiya', 'Salim', 'Samira', 'Sarah', 'Tariq', 'Yasmin', 'Youssef', 'Zeina', 'Zainab', 'Zayd', 'Samer', 'Soumaya', 'Saif', 'Hana', 'Hussein', 'Anwar',
];

const lastNameArray = [
  'Ghoneim', 'Sabry', 'Mahdy', 'Shalaby', 'Zaki', 'Hegazy', 'Younis', 'Samy', 'Rady', 'Lotfy', 'Saeed', 'Nasr', 'Hosny', 'Fathy', 'Khalil', 'Kassem', 'Sherif', 'Gamal', 'Selim', 'Tarek', 'Farid', 'Awad', 'Emad', 'Tawfik', 'Abdelkader', 'Azmy', 'Amin', 'Haroun', 'Ezzat', 'Saleh', 'Bahgat', 'Khattab', 'Shoukry', 'Hamdy', 'Fadl', 'Shaarawy', 'Sayed', 'Raouf', 'Hafez', 'Galal', 'Moussa', 'Anwar', 'Reda', 'Mounir', 'Ashraf', 'Khalifa', 'Shaker', 'Soliman', 'Bayoumi', 'Metwally',
];

// const firstNameArray = nameArray.filter((element, index) => index % 2 === 0);
// const lastNameArray = nameArray.filter((element, index) => index % 2 !== 0);
const firstNameArrayLen = firstNameArray.length;
const lastNameArrayLen = lastNameArray.length;

const amenityArray = [
  ['Cable TV', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXR2Ij48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHg9IjIiIHk9IjciIHJ4PSIyIiByeT0iMiIvPjxwb2x5bGluZSBwb2ludHM9IjE3IDIgMTIgNyA3IDIiLz48L3N2Zz4='],
  ['Lockbox', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXZhdWx0Ij48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIi8+PGNpcmNsZSBjeD0iNy41IiBjeT0iNy41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0ibTcuOSA3LjkgMi43IDIuNyIvPjxjaXJjbGUgY3g9IjE2LjUiIGN5PSI3LjUiIHI9Ii41IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48cGF0aCBkPSJtMTMuNCAxMC42IDIuNy0yLjciLz48Y2lyY2xlIGN4PSI3LjUiIGN5PSIxNi41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIi8+PHBhdGggZD0ibTcuOSAxNi4xIDIuNy0yLjciLz48Y2lyY2xlIGN4PSIxNi41IiBjeT0iMTYuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Im0xMy40IDEzLjQgMi43IDIuNyIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiLz48L3N2Zz4='],
  ['Internet', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWV0aGVybmV0LXBvcnQiPjxwYXRoIGQ9Im0xNSAyMCAzLTNoMmEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTItMkg0YTIgMiAwIDAgMC0yIDJ2OWEyIDIgMCAwIDAgMiAyaDJsMyAzeiIvPjxwYXRoIGQ9Ik02IDh2MSIvPjxwYXRoIGQ9Ik0xMCA4djEiLz48cGF0aCBkPSJNMTQgOHYxIi8+PHBhdGggZD0iTTE4IDh2MSIvPjwvc3ZnPg=='],
  ['Other pets', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXR1cnRsZSI+PHBhdGggZD0ibTEyIDEwIDIgNHYzYTEgMSAwIDAgMCAxIDFoMmExIDEgMCAwIDAgMS0xdi0zYTggOCAwIDEgMC0xNiAwdjNhMSAxIDAgMCAwIDEgMWgyYTEgMSAwIDAgMCAxLTF2LTNsMi00aDRaIi8+PHBhdGggZD0iTTQuODIgNy45IDggMTAiLz48cGF0aCBkPSJNMTUuMTggNy45IDEyIDEwIi8+PHBhdGggZD0iTTE2LjkzIDEwSDIwYTIgMiAwIDAgMSAwIDRIMiIvPjwvc3ZnPg=='],
  ['Smartlock', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlLWxvY2siPjxwYXRoIGQ9Ik0xNS42ODYgMTVBMTQuNSAxNC41IDAgMCAxIDEyIDIyYTE0LjUgMTQuNSAwIDAgMSAwLTIwIDEwIDEwIDAgMSAwIDkuNTQyIDEzIi8+PHBhdGggZD0iTTIgMTJoOC41Ii8+PHBhdGggZD0iTTIwIDZWNGEyIDIgMCAxIDAtNCAwdjIiLz48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI1IiB4PSIxNCIgeT0iNiIgcng9IjEiLz48L3N2Zz4='],
  ['Private living room', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJlZCI+PHBhdGggZD0iTTIgNHYxNiIvPjxwYXRoIGQ9Ik0yIDhoMThhMiAyIDAgMCAxIDIgMnYxMCIvPjxwYXRoIGQ9Ik0yIDE3aDIwIi8+PHBhdGggZD0iTTYgOHY5Ii8+PC9zdmc+'],
  ['Pets live on this property', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhdy1wcmludCI+PGNpcmNsZSBjeD0iMTEiIGN5PSI0IiByPSIyIi8+PGNpcmNsZSBjeD0iMTgiIGN5PSI4IiByPSIyIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iMiIvPjxwYXRoIGQ9Ik05IDEwYTUgNSAwIDAgMSA1IDV2My41YTMuNSAzLjUgMCAwIDEtNi44NCAxLjA0NVE2LjUyIDE3LjQ4IDQuNDYgMTYuODRBMy41IDMuNSAwIDAgMSA1LjUgMTBaIi8+PC9zdmc+'],
  ['Self Check-In', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItcm91bmQtY2hlY2siPjxwYXRoIGQ9Ik0yIDIxYTggOCAwIDAgMSAxMy4yOTItNiIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iOCIgcj0iNSIvPjxwYXRoIGQ9Im0xNiAxOSAyIDIgNC00Ii8+PC9zdmc+'],
  ['TV', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vbml0b3IiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgeD0iMiIgeT0iMyIgcng9IjIiLz48bGluZSB4MT0iOCIgeDI9IjE2IiB5MT0iMjEiIHkyPSIyMSIvPjxsaW5lIHgxPSIxMiIgeDI9IjEyIiB5MT0iMTciIHkyPSIyMSIvPjwvc3ZnPg=='],
  ['Cats', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhdCI+PHBhdGggZD0iTTEyIDVjLjY3IDAgMS4zNS4wOSAyIC4yNiAxLjc4LTIgNS4wMy0yLjg0IDYuNDItMi4yNiAxLjQuNTgtLjQyIDctLjQyIDcgLjU3IDEuMDcgMSAyLjI0IDEgMy40NEMyMSAxNy45IDE2Ljk3IDIxIDEyIDIxcy05LTMtOS03LjU2YzAtMS4yNS41LTIuNCAxLTMuNDQgMCAwLTEuODktNi40Mi0uNS03IDEuMzktLjU4IDQuNzIuMjMgNi41IDIuMjNBOS4wNCA5LjA0IDAgMCAxIDEyIDVaIi8+PHBhdGggZD0iTTggMTR2LjUiLz48cGF0aCBkPSJNMTYgMTR2LjUiLz48cGF0aCBkPSJNMTEuMjUgMTYuMjVoMS41TDEyIDE3bC0uNzUtLjc1WiIvPjwvc3ZnPg=='],
  ['Hot tub', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYXRlciI+PHBhdGggZD0iTTExIDhjMi0zLTItMyAwLTYiLz48cGF0aCBkPSJNMTUuNSA4YzItMy0yLTMgMC02Ii8+PHBhdGggZD0iTTYgMTBoLjAxIi8+PHBhdGggZD0iTTYgMTRoLjAxIi8+PHBhdGggZD0iTTEwIDE2di00Ii8+PHBhdGggZD0iTTE0IDE2di00Ii8+PHBhdGggZD0iTTE4IDE2di00Ii8+PHBhdGggZD0iTTIwIDZhMiAyIDAgMCAxIDIgMnYxMGEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY4YTIgMiAwIDAgMSAyLTJoMyIvPjxwYXRoIGQ9Ik01IDIwdjIiLz48cGF0aCBkPSJNMTkgMjB2MiIvPjwvc3ZnPg=='],
  ['Gym', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWR1bWJiZWxsIj48cGF0aCBkPSJNMTQuNCAxNC40IDkuNiA5LjYiLz48cGF0aCBkPSJNMTguNjU3IDIxLjQ4NWEyIDIgMCAxIDEtMi44MjktMi44MjhsLTEuNzY3IDEuNzY4YTIgMiAwIDEgMS0yLjgyOS0yLjgyOWw2LjM2NC02LjM2NGEyIDIgMCAxIDEgMi44MjkgMi44MjlsLTEuNzY4IDEuNzY3YTIgMiAwIDEgMSAyLjgyOCAyLjgyOXoiLz48cGF0aCBkPSJtMjEuNSAyMS41LTEuNC0xLjQiLz48cGF0aCBkPSJNMy45IDMuOSAyLjUgMi41Ii8+PHBhdGggZD0iTTYuNDA0IDEyLjc2OGEyIDIgMCAxIDEtMi44MjktMi44MjlsMS43NjgtMS43NjdhMiAyIDAgMSAxLTIuODI4LTIuODI5bDIuODI4LTIuODI4YTIgMiAwIDEgMSAyLjgyOSAyLjgyOGwxLjc2Ny0xLjc2OGEyIDIgMCAxIDEgMi44MjkgMi44Mjl6Ii8+PC9zdmc+'],
  ['Essentials', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRlbnQtdHJlZSI+PGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjIiLz48cGF0aCBkPSJtMTQgNSAzLTMgMyAzIi8+PHBhdGggZD0ibTE0IDEwIDMtMyAzIDMiLz48cGF0aCBkPSJNMTcgMTRWMiIvPjxwYXRoIGQ9Ik0xNyAxNEg3bC01IDhoMjBaIi8+PHBhdGggZD0iTTggMTR2OCIvPjxwYXRoIGQ9Im05IDE0IDUgOCIvPjwvc3ZnPg=='],
  ['Heating', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZsYW1lLWtpbmRsaW5nIj48cGF0aCBkPSJNMTIgMmMxIDMgMi41IDMuNSAzLjUgNC41QTUgNSAwIDAgMSAxNyAxMGE1IDUgMCAxIDEtMTAgMGMwLS4zIDAtLjYuMS0uOWEyIDIgMCAxIDAgMy4zLTJDOCA0LjUgMTEgMiAxMiAyWiIvPjxwYXRoIGQ9Im01IDIyIDE0LTQiLz48cGF0aCBkPSJtNSAxOCAxNCA0Ii8+PC9zdmc+'],
  ['Family/kid friendly', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhYnkiPjxwYXRoIGQ9Ik05IDEyaC4wMSIvPjxwYXRoIGQ9Ik0xNSAxMmguMDEiLz48cGF0aCBkPSJNMTAgMTZjLjUuMyAxLjIuNSAyIC41czEuNS0uMiAyLS41Ii8+PHBhdGggZD0iTTE5IDYuM2E5IDkgMCAwIDEgMS44IDMuOSAyIDIgMCAwIDEgMCAzLjYgOSA5IDAgMCAxLTE3LjYgMCAyIDIgMCAwIDEgMC0zLjZBOSA5IDAgMCAxIDEyIDNjMiAwIDMuNSAxLjEgMy41IDIuNXMtLjkgMi41LTIgMi41Yy0uOCAwLTEuNS0uNC0xLjUtMSIvPjwvc3ZnPg=='],
  ['Wireless Internet', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdpZmkiPjxwYXRoIGQ9Ik0xMiAyMGguMDEiLz48cGF0aCBkPSJNMiA4LjgyYTE1IDE1IDAgMCAxIDIwIDAiLz48cGF0aCBkPSJNNSAxMi44NTlhMTAgMTAgMCAwIDEgMTQgMCIvPjxwYXRoIGQ9Ik04LjUgMTYuNDI5YTUgNSAwIDAgMSA3IDAiLz48L3N2Zz4='],
  ['Pets allowed', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWlycmVsIj48cGF0aCBkPSJNMTUuMjM2IDIyYTMgMyAwIDAgMC0yLjItNSIvPjxwYXRoIGQ9Ik0xNiAyMGEzIDMgMCAwIDEgMy0zaDFhMiAyIDAgMCAwIDItMnYtMmE0IDQgMCAwIDAtNC00VjQiLz48cGF0aCBkPSJNMTggMTNoLjAxIi8+PHBhdGggZD0iTTE4IDZhNCA0IDAgMCAwLTQgNCA3IDcgMCAwIDAtNyA3YzAtNSA0LTUgNC0xMC41YTQuNSA0LjUgMCAxIDAtOSAwIDIuNSAyLjUgMCAwIDAgNSAwQzcgMTAgMyAxMSAzIDE3YzAgMi44IDIuMiA1IDUgNWgxMCIvPjwvc3ZnPg=='],
  ['Kitchen', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZWYtaGF0Ij48cGF0aCBkPSJNMTcgMjFhMSAxIDAgMCAwIDEtMXYtNS4zNWMwLS40NTcuMzE2LS44NDQuNzI3LTEuMDQxYTQgNCAwIDAgMC0yLjEzNC03LjU4OSA1IDUgMCAwIDAtOS4xODYgMCA0IDQgMCAwIDAtMi4xMzQgNy41ODhjLjQxMS4xOTguNzI3LjU4NS43MjcgMS4wNDFWMjBhMSAxIDAgMCAwIDEgMVoiLz48cGF0aCBkPSJNNiAxN2gxMiIvPjwvc3ZnPg=='],
  ['Doorman Entry', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRvb3Itb3BlbiI+PHBhdGggZD0iTTEzIDRoM2EyIDIgMCAwIDEgMiAydjE0Ii8+PHBhdGggZD0iTTIgMjBoMyIvPjxwYXRoIGQ9Ik0xMyAyMGg5Ii8+PHBhdGggZD0iTTEwIDEydi4wMSIvPjxwYXRoIGQ9Ik0xMyA0LjU2MnYxNi4xNTdhMSAxIDAgMCAxLTEuMjQyLjk3TDUgMjBWNS41NjJhMiAyIDAgMCAxIDEuNTE1LTEuOTRsNC0xQTIgMiAwIDAgMSAxMyA0LjU2MVoiLz48L3N2Zz4='],
  ['Lock on bedroom door', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRvb3ItY2xvc2VkIj48cGF0aCBkPSJNMTggMjBWNmEyIDIgMCAwIDAtMi0ySDhhMiAyIDAgMCAwLTIgMnYxNCIvPjxwYXRoIGQ9Ik0yIDIwaDIwIi8+PHBhdGggZD0iTTE0IDEydi4wMSIvPjwvc3ZnPg=='],
  ['Washer', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhc2hpbmctbWFjaGluZSI+PHBhdGggZD0iTTMgNmgzIi8+PHBhdGggZD0iTTE3IDZoLjAxIi8+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB4PSIzIiB5PSIyIiByeD0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTMiIHI9IjUiLz48cGF0aCBkPSJNMTIgMThhMi41IDIuNSAwIDAgMCAwLTUgMi41IDIuNSAwIDAgMSAwLTUiLz48L3N2Zz4='],
  ['Wheelchair accessible', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFjY2Vzc2liaWxpdHkiPjxjaXJjbGUgY3g9IjE2IiBjeT0iNCIgcj0iMSIvPjxwYXRoIGQ9Im0xOCAxOSAxLTctNiAxIi8+PHBhdGggZD0ibTUgOCAzLTMgNS41IDMtMi4zNiAzLjUiLz48cGF0aCBkPSJNNC4yNCAxNC41YTUgNSAwIDAgMCA2Ljg4IDYiLz48cGF0aCBkPSJNMTMuNzYgMTcuNWE1IDUgMCAwIDAtNi44OC02Ii8+PC9zdmc+'],
  ['Elevator in building', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LXVwLTEtMCI+PHBhdGggZD0ibTMgOCA0LTQgNCA0Ii8+PHBhdGggZD0iTTcgNHYxNiIvPjxwYXRoIGQ9Ik0xNyAxMFY0aC0yIi8+PHBhdGggZD0iTTE1IDEwaDQiLz48cmVjdCB4PSIxNSIgeT0iMTQiIHdpZHRoPSI0IiBoZWlnaHQ9IjYiIHJ5PSIyIi8+PC9zdmc+'],
  ['Fire extinguisher', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpcmUtZXh0aW5ndWlzaGVyIj48cGF0aCBkPSJNMTUgNi41VjNhMSAxIDAgMCAwLTEtMWgtMmExIDEgMCAwIDAtMSAxdjMuNSIvPjxwYXRoIGQ9Ik05IDE4aDgiLz48cGF0aCBkPSJNMTggM2gtMyIvPjxwYXRoIGQ9Ik0xMSAzYTYgNiAwIDAgMC02IDZ2MTEiLz48cGF0aCBkPSJNNSAxM2g0Ii8+PHBhdGggZD0iTTE3IDEwYTQgNCAwIDAgMC04IDB2MTBhMiAyIDAgMCAwIDIgMmg0YTIgMiAwIDAgMCAyLTJaIi8+PC9zdmc+'],
  ['Free parking on premises', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1wYXJraW5nIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIi8+PHBhdGggZD0iTTkgMTdWN2g0YTMgMyAwIDAgMSAwIDZIOSIvPjwvc3ZnPg=='],
  ['Air conditioning', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFpci12ZW50Ij48cGF0aCBkPSJNNiAxMkg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2NWEyIDIgMCAwIDEtMiAyaC0yIi8+PHBhdGggZD0iTTYgOGgxMiIvPjxwYXRoIGQ9Ik0xOC4zIDE3LjdhMi41IDIuNSAwIDAgMS0zLjE2IDMuODMgMi41MyAyLjUzIDAgMCAxLTEuMTQtMlYxMiIvPjxwYXRoIGQ9Ik02LjYgMTUuNkEyIDIgMCAxIDAgMTAgMTd2LTUiLz48L3N2Zz4='],
  ['Laptop friendly workspace', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxhcHRvcCI+PHBhdGggZD0iTTIwIDE2VjdhMiAyIDAgMCAwLTItMkg2YTIgMiAwIDAgMC0yIDJ2OW0xNiAwSDRtMTYgMCAxLjI4IDIuNTVhMSAxIDAgMCAxLS45IDEuNDVIMy42MmExIDEgMCAwIDEtLjktMS40NUw0IDE2Ii8+PC9zdmc+'],
  ['Breakfast', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVnZy1mcmllZCI+PGNpcmNsZSBjeD0iMTEuNSIgY3k9IjEyLjUiIHI9IjMuNSIvPjxwYXRoIGQ9Ik0zIDhjMC0zLjUgMi41LTYgNi41LTYgNSAwIDQuODMgMyA3LjUgNXM1IDIgNSA2YzAgNC41LTIuNSA2LjUtNyA2LjUtMi41IDAtMi41IDIuNS02IDIuNXMtNy0yLTctNS41YzAtMyAxLjUtMyAxLjUtNUMzLjUgMTAgMyA5IDMgOFoiLz48L3N2Zz4='],
  ['Smoke detector', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFsYXJtLXNtb2tlIj48cGF0aCBkPSJNMTEgMjFjMC0yLjUgMi0yLjUgMi01Ii8+PHBhdGggZD0iTTE2IDIxYzAtMi41IDItMi41IDItNSIvPjxwYXRoIGQ9Im0xOSA4LS44IDNhMS4yNSAxLjI1IDAgMCAxLTEuMiAxSDdhMS4yNSAxLjI1IDAgMCAxLTEuMi0xTDUgOCIvPjxwYXRoIGQ9Ik0yMSAzYTEgMSAwIDAgMSAxIDF2MmEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY0YTEgMSAwIDAgMSAxLTF6Ii8+PHBhdGggZD0iTTYgMjFjMC0yLjUgMi0yLjUgMi01Ii8+PC9zdmc+'],
  ['Safety card', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNyZWRpdC1jYXJkIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjUiIHJ4PSIyIi8+PGxpbmUgeDE9IjIiIHgyPSIyMiIgeTE9IjEwIiB5Mj0iMTAiLz48L3N2Zz4='],
  ['Iron', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFudmlsIj48cGF0aCBkPSJNNyAxMEg2YTQgNCAwIDAgMS00LTQgMSAxIDAgMCAxIDEtMWg0Ii8+PHBhdGggZD0iTTcgNWExIDEgMCAwIDEgMS0xaDEzYTEgMSAwIDAgMSAxIDEgNyA3IDAgMCAxLTcgN0g4YTEgMSAwIDAgMS0xLTF6Ii8+PHBhdGggZD0iTTkgMTJ2NSIvPjxwYXRoIGQ9Ik0xNSAxMnY1Ii8+PHBhdGggZD0iTTUgMjBhMyAzIDAgMCAxIDMtM2g4YTMgMyAwIDAgMSAzIDMgMSAxIDAgMCAxLTEgMUg2YTEgMSAwIDAgMS0xLTEiLz48L3N2Zz4='],
  ['Dogs', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRvZyI+PHBhdGggZD0iTTExLjI1IDE2LjI1aDEuNUwxMiAxN3oiLz48cGF0aCBkPSJNMTYgMTR2LjUiLz48cGF0aCBkPSJNNC40MiAxMS4yNDdBMTMuMTUyIDEzLjE1MiAwIDAgMCA0IDE0LjU1NkM0IDE4LjcyOCA3LjU4MiAyMSAxMiAyMXM4LTIuMjcyIDgtNi40NDRhMTEuNzAyIDExLjcwMiAwIDAgMC0uNDkzLTMuMzA5Ii8+PHBhdGggZD0iTTggMTR2LjUiLz48cGF0aCBkPSJNOC41IDguNWMtLjM4NCAxLjA1LTEuMDgzIDIuMDI4LTIuMzQ0IDIuNS0xLjkzMS43MjItMy41NzYtLjI5Ny0zLjY1Ni0xLS4xMTMtLjk5NCAxLjE3Ny02LjUzIDQtNyAxLjkyMy0uMzIxIDMuNjUxLjg0NSAzLjY1MSAyLjIzNUE3LjQ5NyA3LjQ5NyAwIDAgMSAxNCA1LjI3N2MwLTEuMzkgMS44NDQtMi41OTggMy43NjctMi4yNzcgMi44MjMuNDcgNC4xMTMgNi4wMDYgNCA3LS4wOC43MDMtMS43MjUgMS43MjItMy42NTYgMS0xLjI2MS0uNDcyLTEuODU1LTEuNDUtMi4yMzktMi41Ii8+PC9zdmc+'],
  ['Hangers', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNoaXJ0Ij48cGF0aCBkPSJNMjAuMzggMy40NiAxNiAyYTQgNCAwIDAgMS04IDBMMy42MiAzLjQ2YTIgMiAwIDAgMC0xLjM0IDIuMjNsLjU4IDMuNDdhMSAxIDAgMCAwIC45OS44NEg2djEwYzAgMS4xLjkgMiAyIDJoOGEyIDIgMCAwIDAgMi0yVjEwaDIuMTVhMSAxIDAgMCAwIC45OS0uODRsLjU4LTMuNDdhMiAyIDAgMCAwLTEuMzQtMi4yM3oiLz48L3N2Zz4='],
  ['Buzzer/wireless intercom', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJlbGwtZWxlY3RyaWMiPjxwYXRoIGQ9Ik0xOC44IDRBNi4zIDguNyAwIDAgMSAyMCA5Ii8+PHBhdGggZD0iTTkgOWguMDEiLz48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iNyIvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSI2IiB4PSI0IiB5PSIxNiIgcng9IjIiLz48cGF0aCBkPSJNMTQgMTljMyAwIDQuNi0xLjYgNC42LTEuNiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjIiLz48L3N2Zz4='],
  ['Indoor fireplace', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZsYW1lIj48cGF0aCBkPSJNOC41IDE0LjVBMi41IDIuNSAwIDAgMCAxMSAxMmMwLTEuMzgtLjUtMi0xLTMtMS4wNzItMi4xNDMtLjIyNC00LjA1NCAyLTYgLjUgMi41IDIgNC45IDQgNi41IDIgMS42IDMgMy41IDMgNS41YTcgNyAwIDEgMS0xNCAwYzAtMS4xNTMuNDMzLTIuMjk0IDEtM2EyLjUgMi41IDAgMCAwIDIuNSAyLjV6Ii8+PC9zdmc+'],
  ['Private entrance', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdlbSI+PHBhdGggZD0iTTYgM2gxMmw0IDYtMTAgMTNMMiA5WiIvPjxwYXRoIGQ9Ik0xMSAzIDggOWw0IDEzIDQtMTMtMy02Ii8+PHBhdGggZD0iTTIgOWgyMCIvPjwvc3ZnPg=='],
  ['Dryer', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhc2hpbmctbWFjaGluZSI+PHBhdGggZD0iTTMgNmgzIi8+PHBhdGggZD0iTTE3IDZoLjAxIi8+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB4PSIzIiB5PSIyIiByeD0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTMiIHI9IjUiLz48cGF0aCBkPSJNMTIgMThhMi41IDIuNSAwIDAgMCAwLTUgMi41IDIuNSAwIDAgMSAwLTUiLz48L3N2Zz4='],
  ['Doorman', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBlcnNvbi1zdGFuZGluZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSI1IiByPSIxIi8+PHBhdGggZD0ibTkgMjAgMy02IDMgNiIvPjxwYXRoIGQ9Im02IDggNiAyIDYtMiIvPjxwYXRoIGQ9Ik0xMiAxMHY0Ii8+PC9zdmc+'],
  ['Pool', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhdmVzIj48cGF0aCBkPSJNMiA2Yy42LjUgMS4yIDEgMi41IDFDNyA3IDcgNSA5LjUgNWMyLjYgMCAyLjQgMiA1IDIgMi41IDAgMi41LTIgNS0yIDEuMyAwIDEuOS41IDIuNSAxIi8+PHBhdGggZD0iTTIgMTJjLjYuNSAxLjIgMSAyLjUgMSAyLjUgMCAyLjUtMiA1LTIgMi42IDAgMi40IDIgNSAyIDIuNSAwIDIuNS0yIDUtMiAxLjMgMCAxLjkuNSAyLjUgMSIvPjxwYXRoIGQ9Ik0yIDE4Yy42LjUgMS4yIDEgMi41IDEgMi41IDAgMi41LTIgNS0yIDIuNiAwIDIuNCAyIDUgMiAyLjUgMCAyLjUtMiA1LTIgMS4zIDAgMS45LjUgMi41IDEiLz48L3N2Zz4='],
  ['Smoking allowed', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpZ2FyZXR0ZSI+PHBhdGggZD0iTTE3IDEySDNhMSAxIDAgMCAwLTEgMXYyYTEgMSAwIDAgMCAxIDFoMTQiLz48cGF0aCBkPSJNMTggOGMwLTIuNS0yLTIuNS0yLTUiLz48cGF0aCBkPSJNMjEgMTZhMSAxIDAgMCAwIDEtMXYtMmExIDEgMCAwIDAtMS0xIi8+PHBhdGggZD0iTTIyIDhjMC0yLjUtMi0yLjUtMi01Ii8+PHBhdGggZD0iTTcgMTJ2NCIvPjwvc3ZnPg=='],
  ['First aid kit', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1tZWRpY2FsIj48cGF0aCBkPSJNMTIgMTF2NCIvPjxwYXRoIGQ9Ik0xNCAxM2gtNCIvPjxwYXRoIGQ9Ik0xNiA2VjRhMiAyIDAgMCAwLTItMmgtNGEyIDIgMCAwIDAtMiAydjIiLz48cGF0aCBkPSJNMTggNnYxNCIvPjxwYXRoIGQ9Ik02IDZ2MTQiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+'],
  ['Suitable for events', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWNoZWNrLTIiPjxwYXRoIGQ9Ik04IDJ2NCIvPjxwYXRoIGQ9Ik0xNiAydjQiLz48cGF0aCBkPSJNMjEgMTRWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDgiLz48cGF0aCBkPSJNMyAxMGgxOCIvPjxwYXRoIGQ9Im0xNiAyMCAyIDIgNC00Ii8+PC9zdmc+'],
  ['24-hour check-in', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjEyIDYgMTIgMTIgMTYgMTQiLz48L3N2Zz4='],
  ['Keypad', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWtleWJvYXJkIj48cGF0aCBkPSJNMTAgOGguMDEiLz48cGF0aCBkPSJNMTIgMTJoLjAxIi8+PHBhdGggZD0iTTE0IDhoLjAxIi8+PHBhdGggZD0iTTE2IDEyaC4wMSIvPjxwYXRoIGQ9Ik0xOCA4aC4wMSIvPjxwYXRoIGQ9Ik02IDhoLjAxIi8+PHBhdGggZD0iTTcgMTZoMTAiLz48cGF0aCBkPSJNOCAxMmguMDEiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHg9IjIiIHk9IjQiIHJ4PSIyIi8+PC9zdmc+'],
  ['Shampoo', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1pbGsiPjxwYXRoIGQ9Ik04IDJoOCIvPjxwYXRoIGQ9Ik05IDJ2Mi43ODlhNCA0IDAgMCAxLS42NzIgMi4yMTlsLS42NTYuOTg0QTQgNCAwIDAgMCA3IDEwLjIxMlYyMGEyIDIgMCAwIDAgMiAyaDZhMiAyIDAgMCAwIDItMnYtOS43ODlhNCA0IDAgMCAwLS42NzItMi4yMTlsLS42NTYtLjk4NEE0IDQgMCAwIDEgMTUgNC43ODhWMiIvPjxwYXRoIGQ9Ik03IDE1YTYuNDcyIDYuNDcyIDAgMCAxIDUgMCA2LjQ3IDYuNDcgMCAwIDAgNSAwIi8+PC9zdmc+'],
  ['Hair dryer', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRhbSI+PHBhdGggZD0iTTExIDExLjMxYzEuMTcuNTYgMS41NCAxLjY5IDMuNSAxLjY5IDIuNSAwIDIuNS0yIDUtMiAxLjMgMCAxLjkuNSAyLjUgMSIvPjxwYXRoIGQ9Ik0xMS43NSAxOGMuMzUuNSAxLjQ1IDEgMi43NSAxIDIuNSAwIDIuNS0yIDUtMiAxLjMgMCAxLjkuNSAyLjUgMSIvPjxwYXRoIGQ9Ik0yIDEwaDQiLz48cGF0aCBkPSJNMiAxNGg0Ii8+PHBhdGggZD0iTTIgMThoNCIvPjxwYXRoIGQ9Ik0yIDZoNCIvPjxwYXRoIGQ9Ik03IDNhMSAxIDAgMCAwLTEgMXYxNmExIDEgMCAwIDAgMSAxaDRhMSAxIDAgMCAwIDEtMUwxMCA0YTEgMSAwIDAgMC0xLTF6Ii8+PC9zdmc+'],
  ['Carbon monoxide detector', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNoaWVsZC1jaGVjayI+PHBhdGggZD0iTTIwIDEzYzAgNS0zLjUgNy41LTcuNjYgOC45NWExIDEgMCAwIDEtLjY3LS4wMUM3LjUgMjAuNSA0IDE4IDQgMTNWNmExIDEgMCAwIDEgMS0xYzIgMCA0LjUtMS4yIDYuMjQtMi43MmExLjE3IDEuMTcgMCAwIDEgMS41MiAwQzE0LjUxIDMuODEgMTcgNSAxOSA1YTEgMSAwIDAgMSAxIDF6Ii8+PHBhdGggZD0ibTkgMTIgMiAyIDQtNCIvPjwvc3ZnPg=='],
];

const reviewArray = [
  'Amazing stay, highly recommended!', 'The room was clean and cozy.', 'Staff were friendly but service was slow.', 'Had a wonderful time, will come again!', 'Room service could be improved.', 'The location is perfect for sightseeing.', 'Great value for money.', 'The breakfast was delicious and varied.', 'I expected more from the amenities.', 'A quiet and relaxing atmosphere.', 'Fantastic view from the room.', 'Wi-Fi was unreliable at times.', 'The bed was very comfortable.', 'Overpriced for what you get.', 'The spa was incredible!', 'The air conditioning wasn’t working well.', 'Loved the pool area!', 'The bathroom was too small.', 'Check-in was quick and easy.', 'The room smelled a bit musty.', 'Best hotel in the city!', 'The elevator was always slow.', 'Staff went above and beyond!', 'The room decor was outdated.', 'Loved the complimentary snacks.', 'The gym was too small and crowded.', 'Perfect for a weekend getaway.', 'The pillows were too soft for me.', 'Housekeeping was excellent.', 'I wouldn’t stay here again.', 'The restaurant was way too expensive.', 'Parking was convenient and easy.', 'The hotel bar had great cocktails.', 'Noisy neighbors kept me up all night.', 'Everything was spotlessly clean.', 'The location was too far from the city center.', 'Fantastic staff, very accommodating.', 'The shower pressure was too low.', 'The hotel exceeded my expectations!', 'The rooms were a bit dated.', 'Perfect place for business travelers.', 'Not worth the price.', 'The breakfast buffet was outstanding.', 'Had a great time at the rooftop bar.', 'Customer service needs improvement.', 'The view from the room was breathtaking.', 'The walls were paper-thin.', 'The beds were heavenly!', 'Too many hidden fees at checkout.', 'The hotel lobby was beautiful.', 'The pool was closed during my stay.', 'Would definitely come back again.', 'The noise from the street was unbearable.', 'Room size was smaller than expected.', 'The hotel had a great atmosphere.', 'The concierge was incredibly helpful.', 'Loved the modern design of the room.', 'The hotel felt a bit understaffed.', 'The AC was too loud.', 'Overall, a pleasant experience.', 'The food at the restaurant was amazing.', 'No hot water during my stay.', 'The front desk staff were very rude.', 'Enjoyed the quiet and peaceful location.', 'The minibar was overpriced.', 'The hotel provided excellent amenities.', 'I expected more from the luxury suite.', 'The shuttle service was very convenient.', 'Had an amazing anniversary here!', 'Room service was quick and efficient.', 'The decor felt very old-fashioned.', 'The bathroom was spotless.', 'The hotel had a great central location.', 'The bed linens were not clean.', 'Felt like a home away from home.', 'Too expensive for what you get.', 'The rooftop pool was fantastic.', 'The lobby smelled strange.', 'Wouldn’t hesitate to recommend!', 'I had a lovely stay here.', 'Room keycards kept malfunctioning.', 'The hotel gym was well-equipped.', 'The bathtub was a nice touch.', 'Room felt cramped and outdated.', 'Couldn’t ask for better service.', 'Loved the complimentary breakfast.', 'The location made up for the small room.', 'Great hotel for families.', 'Could hear everything from the hallway.', 'The restaurant menu was limited.', 'The view alone is worth the price.', 'The staff were not very helpful.', 'A very comfortable and pleasant stay.', 'The hotel exceeded all my expectations.', 'The bathroom had mold in the corners.', 'The hotel bar was lively and fun.', 'The room temperature was hard to control.', 'The hotel had great event spaces.', 'The coffee machine in the room didn’t work.', 'Excellent location, right in the city center.', 'The TV remote was broken.', 'The breakfast selection was very poor.', 'Amazing experience, can’t wait to return.', 'Felt unsafe in the neighborhood.', 'The curtains didn’t block out the light.', 'The room was very stylish and modern.', 'Parking was too expensive.', 'The hotel had great conference facilities.', 'We had a fantastic honeymoon here.', 'Too much noise from other rooms.', 'Loved the proximity to the beach.', 'The pool area was well-maintained.', 'The staff were always smiling and friendly.', 'Room was too small for a family of four.', 'Felt very luxurious and high-end.', 'The hotel charged for Wi-Fi, unacceptable!', 'Great service, but the room was just okay.', 'The hotel restaurant was top-notch.', 'The hot tub was closed during our stay.', 'Wonderful ambiance throughout the hotel.', 'Rooms need better soundproofing.', 'The reception staff were very accommodating.', 'The towels were old and rough.', 'The hotel had a very chic vibe.', "Wouldn't stay here again.", 'The pool was the highlight of our trip.', 'The breakfast wasn’t as good as expected.', 'Loved the spa services.', 'Had issues with the room key every day.', 'The decor in the room was beautiful.', 'Couldn’t get enough of the ocean view.', 'The elevators took forever!', 'The hotel’s location is unbeatable.', 'Room service was cold when it arrived.', 'The hotel was under construction, noisy.', 'Had a great stay despite the rain.', 'The lobby was very impressive.', 'Staff could have been more attentive.', 'The hotel felt very secure.', 'The coffee at breakfast was terrible.', 'Loved the rooftop restaurant.', 'It was a bit too far from local attractions.', 'The hotel had beautiful architecture.', 'Room was comfortable but a bit plain.', 'Had an issue with the air conditioning.', 'The staff handled my complaints well.', 'The bed was too firm for my liking.', 'The hotel felt very grand and elegant.', 'The hotel gym was fantastic.', 'The pool was freezing cold.', 'The staff were not very welcoming.', 'Enjoyed every minute of our stay.', 'Room wasn’t ready when we arrived.', 'The pillows were flat and uncomfortable.', 'The beach was just steps away.', 'The carpet in the room was stained.', 'The view from our room was spectacular.', 'The hotel breakfast was great!', 'Service at the bar was slow.', 'A bit too noisy at night.', 'The spa treatments were heavenly.', 'Room was clean and modern.', 'The hotel restaurant had amazing food.', 'It took too long to get checked in.', 'The minibar had a great selection.', 'Felt right at home here.', 'I had higher expectations for the price.', 'The service was impeccable.', 'Great hotel, would come back again.', 'The room wasn’t as clean as expected.', 'The poolside service was excellent.', 'The location is unbeatable.', 'The room had a strange odor.', 'Staff made our stay unforgettable.', 'The room had a wonderful balcony.', 'The hotel was underwhelming.', 'Room was comfortable and spacious.', 'The hot water ran out quickly.', 'A very cozy and welcoming place.', 'The hotel was way too noisy.', 'The Wi-Fi speed was impressive.', 'The bathroom was luxurious.', 'The staff really made the stay enjoyable.', 'The bed was so comfortable!', 'The breakfast was just okay.', 'The front desk staff were lovely.', 'Wouldn’t hesitate to stay here again.', 'Everything was perfect, loved it!', 'The room was cozy and the view was breathtaking!', 'Loved the modern decor, but the bathroom was a bit small.', 'Great value for money – clean, comfortable, and quiet.', 'The bed was super comfortable, but the room was too hot.', 'Amazing location, but could use better soundproofing.', 'Service was excellent, and the room was spotless.', 'The view of the city skyline was stunning from the balcony.', 'Spacious and clean, but the Wi-Fi was unreliable.', 'Perfect for a short stay – had everything we needed.', 'The staff was friendly, and the room was well-maintained.', 'The air conditioning worked well, and the bed was huge!', 'Loved the vintage charm of the room, but it smelled musty.', 'The bathroom amenities were top-notch!', 'The lighting in the room was too dim for my liking.', 'A great spot for a weekend getaway – highly recommend!', 'The room had a fantastic view of the beach, loved it!', 'It was clean and quiet, but the mattress was too firm.', 'The room was spacious, but the shower pressure was weak.', 'Fantastic room service and luxurious linens!', 'The hotel was gorgeous, but the room was slightly outdated.', 'Our room had an amazing sunrise view over the mountains.', 'The minibar was well-stocked, and the bed was so comfy!', 'Beautiful room, but a bit noisy from the street below.', 'The housekeeping team did a fantastic job every day.', 'Great location and comfortable stay for a quick business trip.', 'Loved the large windows and the bright, airy feel of the room.', 'The room was clean, but the furniture was a bit worn out.', 'Perfect spot for a romantic staycation!', 'The decor was a bit dated, but overall a pleasant stay.', 'Loved the proximity to attractions, but the room was too small.',
];

async function main() {
  let hotelObject = await prisma.hotel.findMany();
  let cityObject = await prisma.city.findMany();
  let roomObject = await prisma.room.findMany();
  const reservationObject = await prisma.reservation.findMany();
  const govObject = await prisma.governate.findMany();
  const amenityObject = await prisma.amenity.findMany();
  const userObject = await prisma.user.findMany();
  const reviewObject = await prisma.review.findMany();

  if (govObject.length === 0) {
    for (const object of governateArray) {
      const governate = await prisma.governate.create({
        data: {
          name: object.name,
          cities: {
            create: object.city.map((cityName) => ({ name: cityName })),
          },
        },
      });
      govObject.push(governate);
    }
    cityObject = await prisma.city.findMany();
  }

  if (hotelObject.length === 0) {
    const cityArray = await prisma.city.findMany();
    for (const city of cityArray) {
      const newCity = await prisma.city.update({
        where: {
          id: city.id,
        },
        data: {
          hotels: {
            create: cityHotelObject[`${city.name}`].map((hotel) => hotel),
          },
        },
      });
    }
    hotelObject = await prisma.hotel.findMany();
  }

  if (roomObject.length === 0 && hotelObject.length !== 0) {
    for (const hotel of hotelObject) {
      const newHotel = await prisma.hotel.update({
        where: {
          id: hotel.id,
        },
        data: {
          rooms: {
            create: roomArray.map((room) => room),
          },
        },
      });
    }
    roomObject = await prisma.room.findMany();
  }

  if (userObject.length === 0) {
    for (let i = 0; i < 300; i += 1) {
      const newUser = {};
      newUser.firstName = firstNameArray[getRandomInt(0, firstNameArrayLen - 1)];
      newUser.lastName = lastNameArray[getRandomInt(0, lastNameArrayLen - 1)];
      // newUser.username = `${newUser.firstName}_${newUser.lastName}_${i}`;
      newUser.email = `${newUser.firstName}_${newUser.lastName}_${getRandomInt(0, 100)}@${emailDomainArray[getRandomInt(0, emailDomainArray.length - 1)]}.com`;
      const plainPassword = newUser.email;
      newUser.password = await bcrypt.hash(plainPassword, SALT_ROUNDS);
      const userInsert = await prisma.user.create({
        data: newUser,
      });
      userObject.push(userInsert);
    }
  }

  if (amenityObject.length === 0 && roomObject.length !== 0) {
    const amenityObjectTempArray = [];

    for (const amenityStringArray of amenityArray) {
      const newAmenity = await prisma.amenity.create({
        data: {
          name: amenityStringArray[0],
          iconURL: amenityStringArray[1],
        },
      });
      amenityObjectTempArray.push(newAmenity);
    }

    const numAmenities = Math.floor(amenityObjectTempArray.length / 4);
    // const startIndex = getRandomInt(0, amenityObjectTempArray.length - 1)
    for (const room of roomObject) {
      const uniqueAmenityIdConnectArray = [];
      const uniqueAmenityMap = new Map();

      for (let i = 0; i < numAmenities; i += 1) {
        const randomIndex = getRandomInt(0, amenityObjectTempArray.length - 1);
        const idKey = amenityObjectTempArray[randomIndex].id;
        if (uniqueAmenityMap.has(idKey)) {
          i -= 1;
        } else {
          uniqueAmenityMap.set(idKey, 1);
          const newObject = {
            id: idKey,
          };
          uniqueAmenityIdConnectArray.push(newObject);
        }
      }

      const newRoomAmenitiesConnect = await prisma.room.update({
        where: { id: room.id },
        data: {
          amenities: {
            connect: uniqueAmenityIdConnectArray,
          },
        },
      });
    }
  }

  if (
    reservationObject.length === 0
    && (userObject.length > 2 && hotelObject.length !== 0 && roomObject.length !== 0)
  ) {
    for (let i = 0; i < userObject.length; i += 1) {
      const randomIndex = getRandomInt(0, 10);
      const { id: userID, firstName: userFirstName } = userObject[randomIndex];

      for (let reservation = 0; reservation < getRandomInt(5, 10); reservation += 1) {
        const randomRoomIndex = getRandomInt(0, roomObject.length - 1);
        const { id: roomID, price: roomPrice } = roomObject[randomRoomIndex];
        const currDate = dayjs(); // .toDate();
        const randomReservationFromDate = currDate.subtract(getRandomInt(15, 50), 'day');
        const randomReservationToDate = currDate.subtract(getRandomInt(-2, 14), 'day');

        if (randomReservationToDate.diff(randomReservationFromDate, 'day') > 30
            || randomReservationToDate - randomReservationFromDate < 0
        ) {
          reservation -= 1;
        } else {
          const paymentAmount = (
            randomReservationToDate.diff(randomReservationFromDate, 'day')
          ) * roomPrice;
          const { hotelID } = await prisma.room.findUnique({
            where: {
              id: roomID,
            },
            select: {
              hotelID: true,
            },
          });
          const newReservation = await prisma.reservation.create({
            data: {
              paymentAmount,
              dateFrom: randomReservationFromDate.toDate(),
              dateTo: randomReservationToDate.toDate(),
              userID,
              roomID,
              hotelID,
            },
          });
          reservationObject.push(newReservation);
          if (newReservation.dateTo > currDate) {
            const updatedRoom = await prisma.room.update({
              where: {
                id: roomID,
              },
              data: {
                isReserved: true,
              },
            });
          }
        }
      }
    }
  }

  const passedReservations = await prisma.reservation.findMany({
    where: {
      dateTo: {
        lt: new Date(),
      },
    },
  });

  // console.log(passedReservations.map((some) => [some.userID, some.hotelID]));
  const primaryKeyArray = passedReservations.map((some) => [some.userID, some.hotelID]);
  const primaryKeyMap = new Map();

  for (const hotelUserID of primaryKeyArray) {
    const uniqueKey = JSON.stringify(hotelUserID);
    if (primaryKeyMap.has(uniqueKey)) {
      continue;
    } else {
      primaryKeyMap.set(JSON.stringify(hotelUserID), hotelUserID);
    }
  }
  console.log(primaryKeyMap.size);

  if (
    reviewObject.length === 0
    && reservationObject !== 0
  ) {
    const userHotelMap = new Map();
    for (let i = 0; i < primaryKeyMap.size; i += 1) {
      const {
        userID, hotelID, dateTo: reviewDate,
      } = passedReservations[getRandomInt(0, passedReservations.length - 1)];

      const uniqueKey = JSON.stringify([userID, hotelID]);
      if (userHotelMap.has(uniqueKey)) {
        i -= 1;
      } else {
        userHotelMap.set(uniqueKey, [userID, hotelID]);
        const text = reviewArray[getRandomInt(0, reviewArray.length - 1)];
        const reviewSampleObject = {
          userID: userHotelMap.get(uniqueKey)[0],
          hotelID: userHotelMap.get(uniqueKey)[1],
          reviewDate,
          text,
        };
        const reviewResult = await prisma.review.create({
          data: reviewSampleObject,
        });
        reviewObject.push(reviewResult);
      }
    }
    // console.log(userHotelMap);
  }
  const hotelReviews = await prisma.hotel.findMany({
    where: {
      reviews: {
        some: {},
      },
    },
    select: {
      name: true,
      reviews: true,
    },
  });
  console.log(hotelReviews);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
