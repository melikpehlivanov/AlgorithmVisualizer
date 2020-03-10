import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">Home Page</Link>
      </div>
    </div>
    // <!-- This template was made by Colorlib (https://colorlib.com) -->
  );
};
