import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function SignIn() {
    const { signin, signout, auth } = useContext(AuthContext);

    return (
        <>

            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form>
                <p>*invoervelden*</p>
                {auth === false ?
                    <button type="button"
                            onClick={signin}
                    >
                        Login
                    </button> :
                    <button type="button"
                            onClick={signout}
                    >
                        Uitloggen
                    </button>
                }
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;