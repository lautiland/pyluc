import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
          {index < items.length - 1 ? " > " : ""}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
