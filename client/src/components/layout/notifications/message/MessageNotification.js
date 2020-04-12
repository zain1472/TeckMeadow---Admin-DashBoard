import React from "react";

const MessageNotification = () => {
  return (
    <li className="nav-item dropdown">
      <a
        href="#"
        className="nav-link nav-link-notify"
        title="Chats"
        data-toggle="dropdown"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-message-circle"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
      <div className="dropdown-menu dropdown-menu-right dropdown-menu-big">
        <div className="bg-dark p-4 text-center d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Chats</h5>
          <small className="opacity-7">2 unread chats</small>
        </div>
        <div>
          <ul className="list-group list-group-flush">
            <li>
              <a
                href="#"
                className="list-group-item d-flex align-items-center hide-show-toggler"
              >
                <div>
                  <figure className="avatar mr-2">
                    <img
                      src="../../assets/media/image/user/man_avatar1.jpg"
                      className="rounded-circle"
                      alt="user"
                    />
                  </figure>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 line-height-20 d-flex justify-content-between">
                    Herbie Pallatina
                    <i
                      title="Mark as read"
                      data-toggle="tooltip"
                      className="hide-show-toggler-item fa fa-circle-o font-size-11"
                    ></i>
                  </p>
                  <div className="small text-muted">
                    <span className="mr-2">02:30 PM</span>
                    <span>Have you madimage</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="list-group-item d-flex align-items-center hide-show-toggler"
              >
                <div>
                  <figure className="avatar mr-2">
                    <img
                      src="../../assets/media/image/user/women_avatar5.jpg"
                      className="rounded-circle"
                      alt="user"
                    />
                  </figure>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 line-height-20 d-flex justify-content-between">
                    Andrei Miners
                    <i
                      title="Mark as read"
                      data-toggle="tooltip"
                      className="hide-show-toggler-item fa fa-circle-o font-size-11"
                    ></i>
                  </p>
                  <div className="small text-muted">
                    <span className="mr-2">08:36 PM</span>
                    <span>I have a meetinimage</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="text-divider small pb-2 pl-3 pt-3">
              <span>Old chats</span>
            </li>
            <li>
              <a
                href="#"
                className="list-group-item d-flex align-items-center hide-show-toggler"
              >
                <div>
                  <figure className="avatar mr-2">
                    <img
                      src="../../assets/media/image/user/man_avatar3.jpg"
                      className="rounded-circle"
                      alt="user"
                    />
                  </figure>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 line-height-20 d-flex justify-content-between">
                    Kevin added
                    <i
                      title="Mark as unread"
                      data-toggle="tooltip"
                      className="hide-show-toggler-item fa fa-check font-size-11"
                    ></i>
                  </p>
                  <div className="small text-muted">
                    <span className="mr-2">11:09 PM</span>
                    <span>Have you madimage</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="list-group-item d-flex align-items-center hide-show-toggler"
              >
                <div>
                  <figure className="avatar mr-2">
                    <img
                      src="../../assets/media/image/user/man_avatar2.jpg"
                      className="rounded-circle"
                      alt="user"
                    />
                  </figure>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 line-height-20 d-flex justify-content-between">
                    Eugenio Carnelley
                    <i
                      title="Mark as unread"
                      data-toggle="tooltip"
                      className="hide-show-toggler-item fa fa-check font-size-11"
                    ></i>
                  </p>
                  <div className="small text-muted">
                    <span className="mr-2">Yesterday</span>
                    <span>I have a meetinimage</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="list-group-item d-flex align-items-center hide-show-toggler"
              >
                <div>
                  <figure className="avatar mr-2">
                    <img
                      src="../../assets/media/image/user/women_avatar1.jpg"
                      className="rounded-circle"
                      alt="user"
                    />
                  </figure>
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 line-height-20 d-flex justify-content-between">
                    Neely Ferdinand
                    <i
                      title="Mark as unread"
                      data-toggle="tooltip"
                      className="hide-show-toggler-item fa fa-check font-size-11"
                    ></i>
                  </p>
                  <div className="small text-muted">
                    <span className="mr-2">Yesterday</span>
                    <span>I have a meetinimage</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="p-2 text-right border-top">
          <ul className="list-inline small">
            <li className="list-inline-item mb-0">
              <a href="#">Mark All Read</a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default MessageNotification;
