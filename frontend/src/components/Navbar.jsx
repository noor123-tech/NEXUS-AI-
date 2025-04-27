import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const randomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A5'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Nexus AI</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/contact" style={styles.link}>Contact Us</Link>
        <Link to="/faq" style={styles.link}>FAQ</Link>

        {user ? (
          <>
               {/* Show Dashboard link for logged-in users */}
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>

            <div style={styles.userInfo}>
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="User" style={styles.profileImage} />
              ) : (
                <div style={{ ...styles.colorBall, backgroundColor: randomColor() }}></div>
              )}
              <span style={styles.userName}>Welcome, {user.name}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" style={styles.button}>Sign In</Link>
            <Link to="/register" style={styles.button}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    color: "white",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "6px 12px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "18px",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "6px 12px",
    borderRadius: "5px",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  userName: {
    color: "white",
    fontSize: "18px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  colorBall: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
};

export default Navbar;
