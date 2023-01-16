import Layout from "../components/Layout";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <Layout title="Login" displayHeader={false}>
      <Auth />
    </Layout>
  );
}
