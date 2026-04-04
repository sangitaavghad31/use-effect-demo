import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Nav from 'react-bootstrap/Nav';
const Navigation = (props) => {
  const ctx = useContext(AuthContext);
return (
    <>
        <Nav
          className="bg-dark p-3"
          variant="pills"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
         {ctx.isLoggedIn && (<> <Nav.Item>
            <Nav.Link href="/home" className="text-light">
              Users
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="admin" className="text-light">
              Admin
            </Nav.Link>
          </Nav.Item>
          </>
          )}

          <Nav.Item className="ms-auto">
            <button 
              className="btn btn-outline-light"
              onClick={ctx.onLogout}
            >
             {ctx.isLoggedIn ? "Logout" : "Sign In"}
            </button>
          </Nav.Item>
        </Nav>
      
    </>
  );
};

export default Navigation;
