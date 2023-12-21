  import "./form.css";
  const FormComponent = ({ className, children, style, onSubmit }) => {
    return (
      <form className={className} onSubmit={onSubmit} style={style}>
        {children}
      </form>
    );
  };

  export default FormComponent;
