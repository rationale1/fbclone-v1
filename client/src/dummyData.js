const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export const Users = [
  {
    _id: 1,
    profilePic: PF + "arsenal.jpg",
    username: "Buhari Obasanjo",
  },
  {
    _id: 2,
    profilePic: PF + "Knight.jpg",
    username: "Phil Jones",
  },
  {
    _id: 3,
    profilePic: PF + "vintage3.jpg",
    username: "Mary Joseph",
  },
  {
    _id: 4,
    profilePic: PF + "Fight-Club.jpg",
    username: "Tunde Ednut",
  },

  {
    _id: 5,
    profilePic: PF + "Macho_Libre.jpg",
    username: "Travesty Media",
  },
];

export const posts = [
  {
    _id: 1,
    desc: "Love for all, Hatred for None.",
    photo: PF + "images4.jpg",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
  },

  {
    _id: 3,
    desc: "Computer programmer",
    photo: PF + "images8.jpg",
    date: "10 mins ago",
    userId: 3,
    like: 40,
    comment: 120,
  },

  {
    _id: 2,
    date: "15 mins ago",
    userId: 2,
    like: 2,
    comment: 1,
    photo: PF + "images13.jpg",
  },
];
