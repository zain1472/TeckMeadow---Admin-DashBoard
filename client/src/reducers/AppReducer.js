import { SET_EMPLOYEES } from "../actions/types";
let date = new Date();
const initialState = {
  employees: [
    {
      _id: "1",
      firstname: "John",
      lastname: "Doe",
      country: "Texas",
      username: "john",
      isOnline: false,
      messages: [
        {
          sender: "admin",
          reciever: "john",
          message: "Hi John, how are you doing today?",
          date
        },
        {
          sender: "john",
          reciever: "admon",
          message: "Hi John, how are you doing today?",
          date
        },
        {
          sender: "john",
          reciever: "admin",
          message: "Hi John, how are you doing today?",
          date
        }
      ]
    },
    {
      _id: "2",
      firstname: "Sam",
      lastname: "Smith",
      country: "Chicago",
      username: "sam",
      isOnline: true,
      messages: [
        {
          sender: "sam",
          reciever: "admin",
          message: "Hi Sir, how are you doing today?",
          date
        },
        {
          sender: "sam",
          reciever: "admon",
          message: "Hi sam, how are you doing today?",
          date
        },
        {
          sender: "sam",
          reciever: "admin",
          message: "Hi sam, how are you doing today?",
          date
        }
      ]
    },
    {
      _id: "3",
      firstname: "Sara",
      lastname: "Wilson",
      country: "New Jersey",
      username: "sara",
      isOnline: true,
      messages: []
    }
  ],
  projects: [
    {
      _id: "1",
      title: "Create Logo",
      description: "Wilson needs a logo",
      dated: date,
      price: 1200,
      status: "ongoing"
    },
    {
      _id: "2",
      title: "Create a banner",
      description: "Wilson needs a logo",
      dated: date,
      price: 1400,
      status: "ongoing"
    },
    {
      _id: "3",
      title: "Create a dp",
      description: "Wilson needs a logo",
      dated: date,
      price: 1500,
      status: "ongoing"
    }
  ],
  loading: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: null
      };
    default:
      return state;
  }
};
