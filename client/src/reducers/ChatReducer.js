import {
  ADD_MESSAGE,
  SET_LOADING,
  SET_SOCKET,
  CLEAR_SOCKET,
  SET_IS_CHAT_ACTIVE,
  CLEAR_IS_CHAT_ACTIVE,
  SET_CURRENT_EMPLOYEE,
  SET_EMPLOYEES,
  SET_FILTER,
  CLEAR_FILTER,
  APP_ERROR,
  UPDATE_USER,
  CLEAR_CURRENT_EMPLOYEE,
  CLEAR_UPLOAD_PROGRESS,
  SET_UPLOAD_PROGRESS,
  CREATE_NEW_PROJECT,
  LOAD_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  CATEGORIZE_PROJECTS,
  CLEAR_PROJECT_CATEGORY,
  SEARCH_PROJECTS,
  CLEAR_PROJECTS_SEARCH,
  SET_CURRENT_PROJECT,
  CLEAR_CURRENT_PROJECT,
  DELETE_FILE,
  DELETE_USER,
  SET_CURRENT_USER,
  AUTH_ERROR,
} from "../actions/types";
let dated = new Date(Date.now());
const initialState = {
  messages: [],
  employees: [
    {
      _id: "1",
      firstname: "John",
      lastname: "Doe",
      country: "Texas",
      username: "john",
      isOnline: false,
      count: 0,
      messages: [
        {
          sender: "admin",
          reciever: "john",
          message: "Hi John, how are you doing today?",
          dated,
        },
        {
          sender: "john",
          reciever: "admon",
          message: "Hi John, how are you doing today?",
          dated,
        },
        {
          sender: "john",
          reciever: "admin",
          message: "Hi John, how are you doing today?",
          dated,
        },
      ],
    },
    {
      _id: "5",
      firstname: "Alex",
      lastname: "Timothy",
      country: "Texas",
      username: "alex",
      isOnline: false,
      count: 0,
      messages: [
        {
          sender: "admin",
          reciever: "john",
          message: "Hi John, how are you doing today?",
          dated,
        },
        {
          sender: "john",
          reciever: "admon",
          message: "Hi John, how are you doing today?",
          dated,
        },
        {
          sender: "john",
          reciever: "admin",
          message: "Hi John, how are you doing today?",
          dated,
        },
      ],
    },
    {
      _id: "6",
      firstname: "Zed",
      lastname: "Broody",
      country: "Chicago",
      username: "zed",
      isOnline: false,
      count: 0,
      messages: [],
    },
    {
      _id: "2",
      firstname: "Sam",
      lastname: "Smith",
      country: "Chicago",
      username: "sam",
      isOnline: true,
      count: 3,
      messages: [
        {
          sender: "sam",
          reciever: "admin",
          message: "Hi Sir, how are you doing today?",
          dated,
        },
        {
          sender: "sam",
          reciever: "admon",
          message: "Hi sam, how are you doing today?",
          dated,
        },
        {
          sender: "sam",
          reciever: "admin",
          message: "Hi sam, how are you doing today?",
          dated,
        },
      ],
    },
    {
      _id: "3",
      firstname: "Sara",
      lastname: "Wilson",
      country: "New Jersey",
      username: "sara",
      isOnline: true,
      messages: [],
    },
  ],
  currentUser: null,
  count: 6,
  currentEmployee: null,
  projects: [],
  categorizedProjects: null,
  filteredProjects: null,
  loading: null,
  error: null,
  connection: null,
  socket: null,
  uploadProgress: null,
  currentProject: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: action.payload === true ? state.loading : null,
      };
    case DELETE_USER:
      return {
        ...state,
        employees: state.employees.filter((e) => e._id !== action.payload._id),
        currentEmployee: null,
      };
    case DELETE_FILE:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          files: state.currentProject.files.filter(
            (file) => file._id !== action.payload._id
          ),
        },
      };
    case SET_CURRENT_PROJECT:
      let currentProject = null;
      state.projects.map((project) => {
        // eslint-disable-next-line
        if (project._id == action.payload) {
          currentProject = project;
        }
        return project;
      });
      return {
        ...state,
        currentProject,
      };
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: null,
      };
    case CATEGORIZE_PROJECTS:
      return {
        ...state,
        categorizedProjects: state.projects.filter(
          (project) => project.status === action.payload
        ),
      };

    case CLEAR_PROJECT_CATEGORY:
      return {
        ...state,
        categorizedProjects: null,
      };
    case SEARCH_PROJECTS:
      const regex = new RegExp(action.payload, "gi");
      if (state.categorizedProjects !== null) {
        return {
          ...state,
          filteredProjects: state.categorizedProjects.filter((project) => {
            return (
              project.title.match(regex) ||
              project.description.match(regex) ||
              project.employee.firstname.match(regex) ||
              project.employee.lastname.match(regex) ||
              project.status.match(regex)
            );
          }),
        };
      }
      return {
        ...state,
        filteredProjects: state.projects.filter((project) => {
          return (
            project.title.match(regex) ||
            project.description.match(regex) ||
            project.employee.firstname.match(regex) ||
            project.employee.lastname.match(regex) ||
            project.status.match(regex)
          );
        }),
      };
    case CLEAR_PROJECTS_SEARCH:
      return {
        ...state,
        filteredProjects: null,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          // eslint-disable-next-line
          project._id == action.payload._id ? action.payload : project
        ),
        currentProject: state.currentProject === null ? null : action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload._id
        ),
        currentEmployee: null,
      };
    case LOAD_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: null,
      };
    case CREATE_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        currentEmployee: {
          ...state.currentEmployee,
          projects: [...state.currentEmployee.projects, action.payload],
        },
      };
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };
    case CLEAR_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: null,
      };
    case APP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null,
      };
    case UPDATE_USER:
      if (state.currentEmployee !== null) {
        return {
          ...state,
          currentEmployee: action.payload,
        };
      }
      return {
        ...state,
        currentUser: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filtered: state.employees.filter((employee) => {
          const regex = new RegExp(action.payload, "gi");
          return (
            employee.firstname.match(regex) ||
            employee.lastname.match(regex) ||
            employee.country.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SET_CURRENT_EMPLOYEE:
      let emp;
      state.employees.map((employee) => {
        if (employee._id === action.payload._id) {
          employee.count = 0;
          emp = employee;
          return employee;
        }
        return employee;
      });
      return {
        ...state,
        messages: action.payload.messages,
        currentEmployee: emp,
      };
    case CLEAR_CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: null,
      };
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case ADD_MESSAGE:
      let currentEmployee;
      const employees = state.employees.map((employee) => {
        if (employee._id === action.payload.id) {
          employee.messages = [...employee.messages, action.payload];
          currentEmployee = employee;
          return employee;
        }
        return employee;
      });
      console.log(action.payload);
      console.log("object");
      return {
        ...state,
        employees: employees,
        currentEmployee: currentEmployee,
        loading: false,
      };
    case SET_SOCKET:
      return {
        ...state,
        connection: true,
        socket: action.payload,
      };
    case CLEAR_SOCKET:
      return {
        ...state,
        connection: null,
        socket: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_IS_CHAT_ACTIVE:
      return {
        ...state,
        isChatActive: true,
      };
    case CLEAR_IS_CHAT_ACTIVE:
      return {
        ...state,
        isChatActive: null,
      };

    default:
      return state;
  }
};
