export const WhyUs = () => {
  return (
    <section className="text-gray-600 body-font bgImg">
      <div className="container px-5 pt-10 pb-24 mx-auto ">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-2xl text-2xl font-medium title-font mb-4 text-emerald-900">
            How are sellers rated with our Client
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl text-emerald-700">
            We pick the best sellers for you who are best in class in various
            aspects.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="xl:w-1/4 lg:w-1/2 text-black hover:bg-slate-50 hover:shadow-lg hover:border-l-emerald-400 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-emerald-900 font-medium title-font mb-2">
              High Response Rate
            </h2>
            <p className="leading-relaxed text-base mb-4">
              We pick sellers for you who give you priority. Over 90% of our top
              sellers respond to enquiries within the first 24 hours!
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 text-black hover:bg-slate-50 hover:shadow-lg hover:border-l-emerald-400 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-emerald-900 font-medium title-font mb-2">
              Deals Closed
            </h2>
            <p className="leading-relaxed text-base mb-4">
              We choose sellers who have previously closed deals with similar
              requirement as you have. They all understand your needs better.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 text-black hover:bg-slate-50 hover:shadow-lg hover:border-l-emerald-400 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-emerald-900 font-medium title-font mb-2">
              Wide Coverage
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Sellers with a wide variety of properties are more likely to
              satisfy your demands. More the options, better is your decision.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 text-black hover:bg-slate-50 hover:shadow-lg hover:border-l-emerald-400 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-emerald-900 font-medium title-font mb-2">
              Rated & Reviewed
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Testimonials from genuine buyers are the best way to judge a
              seller. Better the ratings, better will be your experience.
            </p>
          </div>
        </div>
        <button className="flex mx-auto mt-16 text-white bg-emerald-600 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-300 hover:text-black rounded text-lg">
          Go To Project
        </button>
      </div>
    </section>
  );
};
