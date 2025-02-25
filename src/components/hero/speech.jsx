import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const Speech = () => {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            1000,
            "How can i help you today?",
            1000,
            "I can do the following",
            1000,
            "Web Development",
            1000,
            "software development",
            1000,
            "Branding",
            1000,
            "and more",
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          // omitDeletionAnimation
          repeat={Infinity}
        />
      </div>
      <img src="gigs2.png" alt="" />
    </motion.div>
  );
};

export default Speech;
