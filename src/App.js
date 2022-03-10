import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <nav>
        <ul>
          <li><NavLink className={({ isActive }) => isActive? "active" : "inactive"} to="/invoices">Invoices</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive? "active" : "inactive"} to="/expenses">Expenses</NavLink></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;