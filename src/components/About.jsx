
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing were serious about is food.</p>
            </div>
            <p className="mid">
            We are a restaurant that is passionate about serving delicious and satisfying food.We use fresh, high-quality ingredients to create a variety of dishes that will tantalize your taste buds.Our menu includes breakfast, lunch, and dinner options, so you can come to us for any meal of the day.
            We are committed to providing our customers with a warm and welcoming atmosphere.Our friendly staff is always happy to help you choose the perfect dish or answer any questions you may have.

             We hope to see you soon!
            </p>
            <Link to={"/menu"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
