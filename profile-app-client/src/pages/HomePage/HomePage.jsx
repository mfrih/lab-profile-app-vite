import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="HomePage">
      <h2>Iron Profile</h2>
      <h3>
        Today we will be creating an app with authorization with some cool
        styling
      </h3>
      <div className="buttons-wrapper">
        <Link to={'/signup'}>
          <button>Sign up</button>
        </Link>
        <Link to={'/login'}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
