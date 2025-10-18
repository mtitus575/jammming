function Logout({ setLogin }) {
  function handleClick(e) {
    e.preventDefault();
    setLogin(false);
  }
  return (
    <>
      <button onClick={handleClick}>Logout</button>
    </>
  );
}

export default Logout;
