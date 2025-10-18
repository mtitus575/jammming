function Login({ setLogin }) {
  function handleClick(e) {
    e.preventDefault();
    setLogin(true);
  }
  return (
    <>
      <button onClick={handleClick}>Login</button>
    </>
  );
}

export default Login;
