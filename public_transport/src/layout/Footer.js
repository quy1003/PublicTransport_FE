import homeStyles from "../styles/HomeStyle/HomeStyle";

const Footer = () => {
  return (
    <footer
      style={homeStyles.footer}
    >
      <p style={{ marginTop: "5px", color: "whitesmoke" }}>
        Public Transport - Bus Management &copy; {new Date().getFullYear()}
      </p>

      <a style={{ padding: "10px" }} href="https://busmap.vn">
        <img
          src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/footer-logo.svg"
          alt=""
        />
      </a>
      <a style={{ padding: "10px" }} href="https://busmap.vn">
        <img
          style={{ width: "9rem", marginBottom: "5px" }}
          src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/DTB.png"
          alt=""
        />
      </a>
      <a style={{ padding: "10px" }} href="https://busmap.vn">
        <img
          style={{ width: "9rem", marginBottom: "5px" }}
          src="https://busmap.vn/wp-content/themes/busmap-theme-dev/images/DDK.png"
          alt=""
        />
      </a>
    </footer>
  );
};

export default Footer;
