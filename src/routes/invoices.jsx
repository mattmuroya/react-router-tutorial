import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { getInvoices } from "../data";

function QueryNavLink({ to, ...props }) { // returns a NavLink with a URL that has the current search term appended so that the search filtering is persistent when you click a new nav item. It takes props as an argument like any other function component, but destructured so that you can specifically select the 'to' prop, with whatever else gets passed in. Then you append your current location to 'to' when spreading the props back into the returned NavLink:
  const location = useLocation(); // grabs the current URL
  return <NavLink to={to + location.search} {...props} />
}

export default function Invoices() {
  const invoices = getInvoices(); // array
  const [searchParams, setSearchParams] = useSearchParams() // works kind of like useState(state), but gets params from the URL

  function filterInvoices(e) { // update the search params in the URL when the value of the search box changes
    console.log(e.target.value);
    const filter = e.target.value;
    setSearchParams({ filter }); // search params set as a destructured object. this is where the "filter" keyword in the URL comes from.
  }

  return (
    <main>
      <h2>Invoices</h2>
      <input
        value={searchParams.get("filter") || ""} // get the value assigned to 'filter' in the params in the URL. || operator is used so that if the search is null, it puts an empty string into the param instead of a null value.
        onChange={filterInvoices}
      />
      <ul>
        {invoices
        .filter((invoice) => {
          const search = searchParams.get("filter"); // grabs from URL
          if (!search) { // if filter param is empty then nothing is filtered
            return true;
          } else { // otherwise filter invoices array by search term
            const name = invoice.name.toLowerCase();
            return name.includes(search.toLowerCase());
          }
        })
        .map((invoice) => ( // then maps the fitlered array to a list of links
            <li key={invoice.number}>
              <QueryNavLink
                // NavLink component passes isActive into the styling function:
                className={({isActive}) => isActive? "active" : "inactive"}
                to={`/invoices/${invoice.number}`}>
                {invoice.name}
              </QueryNavLink>
            </li>
          )
        )}
      </ul>
      <Outlet />
    </main>
  )
}