import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias
        exercitationem placeat maxime ratione, odit reprehenderit aspernatur
        temporibus deserunt tempora vero iusto sunt dolorem suscipit hic
        voluptatem quidem laborum consequuntur accusantium.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
