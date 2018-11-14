import { withRouter } from "react-router-dom";
const ALLOWED_PATHS = [
  "/",
  "/login",
  "/logout",
  "/register",
  "/forget",
  "/reset/:id?",
  "/verifyUserEmail/:id?",
  "/subscription",
  "/search-result/:id?",
  "/search-listing/:id?/:latitude?/:longitude?",
  "/search-result",
  "/public-profile/:id",
  "/help",
  "/about-us",
  "/contact-us",
  "/privacy-policy",
  "/term-and-condition"
];
const aux = props => {
  if (localStorage.getItem("jwtToken") === null) {
    if (ALLOWED_PATHS.indexOf(props.match.path) === -1) {
      if (props.history) props.history.push("/logout");
    }
  } else {
    if (
      ALLOWED_PATHS.indexOf("/") != -1 ||
      ALLOWED_PATHS.indexOf("/login") != -1
    ) {
      if (props.history) props.history.push("/dashboard");
    }
  }
  return props.children;
};
export default withRouter(aux);
