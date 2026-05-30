function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert("Placeholder: formulario enviado.");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Tu nombre" required />
      <input type="email" name="email" placeholder="Tu email" required />
      <input type="text" name="empresa" placeholder="Empresa" />
      <textarea
        name="mensaje"
        rows="6"
        placeholder="Contanos que productos ofreces, zona de trabajo y volumen estimado."
        required
      />
      <button className="btn btn-primary" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default ContactForm;
