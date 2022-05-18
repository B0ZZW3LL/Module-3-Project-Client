import SignupPage from "./SignupPage";
import Welcome from "../components/Welcome";


function HomePage() {

  return (
    <div id="homepage">
      <Welcome />
      <SignupPage />
    </div>
  )
}

export default HomePage;