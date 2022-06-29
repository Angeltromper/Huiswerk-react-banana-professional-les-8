import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import { useHistory, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const history = useHistory();
    const {auth} = useContext(AuthContext);
    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>

            <div>
                {auth === false ?
                    <button type="button"
                            onClick={() => history.push('/signin')}
                    >
                        Inloggen
                    </button> :
                    <button type="button"
                            onClick={() => history.push ( '/signin' )}
                    >
                        Uitloggen
                    </button>
                }

                <button type="button"
                        onClick={() => history.push ('/signup')}
                >
                    Registreren
                </button>
            </div>
        </nav>
    );
}

export default NavBar;