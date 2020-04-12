import React from "react";
import { Link } from "react-router-dom";

const verify = () => {
  return (
    <div class="form-wrapper">
      <div id="logo">
        <img class="logo" src="/assets/media/image/logo.png" alt="image" />
        <img
          class="logo-dark"
          src="/assets/media/image/logo-dark.html"
          alt="image"
        />
      </div>

      <h3>Verify your email address</h3>

      <p>
        A confirmation email has been sent to your email address at. Check it
        out
      </p>
      <Link href="/user/logout" class="btn btn-outline-light btn-sm">
        Logout
      </Link>
    </div>
  );
};

export default verify;
