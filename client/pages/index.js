import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
  return currentUser ? <h1>Landing Page {currentUser.email}</h1>: <h1> Please signin</h1>;
};

LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get("/api/users/current-user")
    return data;
};

export default LandingPage;
