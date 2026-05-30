import ContactForm from "../components/ContactForm";
import Breadcrumb from "../components/Breadcrumb";

function ContactoProveedores() {
  return (
    <section className="surface" style={{ padding: "1rem" }}>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Contacto Proveedores" }
        ]}
      />
      <h1 className="section-title">Contacto para proveedores</h1>
      <p className="muted" style={{ marginBottom: "1rem" }}>
        Si fabricas o distribuis articulos de talabarteria, herrajes o
        cuchilleria de campo, dejanos tus datos y coordinamos una reunion.
      </p>

      <ContactForm />
    </section>
  );
}

export default ContactoProveedores;
