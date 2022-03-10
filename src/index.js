import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
 } from 'react-router-dom';
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';
import Invoice from './routes/invoice';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* nesting routes concats URL path and nests child's return into the parent's Outlet component (see Output inside App.js) */}
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            {/* second-level nested route */}
            <Route
              // the route with an 'index' prop instead of path shares a URL with the parent route
              index
              element={
                <div>
                  <p>Select an invoice</p>
                </div>
              }
            />
            {/* second-level nested route with path param set to dynamic value :invoiceId, which catches whatever the URL is (triggered by the links in invoices.jsx). Whatever the URL is (/invoices/___), it renders an Invoice element, and you can use the URL to generate details inside that invoice with useParams() just like a prop (see invoice.jsx). */}
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="*" element={<main><p>There's nothing here!</p></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);