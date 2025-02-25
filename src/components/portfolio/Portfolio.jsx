import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    img: "p1.jpg",
    title: "Full Stack Blog Application",
    desc: "A dynamic and fully functional blog application built using modern full-stack technologies. This platform allows users to create, edit, and manage blog posts while ensuring a smooth and interactive user experience. The application is designed with scalability, security, and responsiveness in mind..",
    link: "/",
  },
  {
    id: 2,
    img: "p2.jpg",
    title: "School Management System",
    desc: "A comprehensive School Management System designed to streamline administrative tasks, enhance communication between students, teachers, and parents, and improve overall school efficiency. The system provides a centralized platform for managing student records, academic performance, attendance, and financial transactions",
    link: "/",
  },
  {
    id: 3,
    img: "p3.jpg",
    title: "Real-time Chat Application",
    desc: "A real-time chat application that enables users to send and receive instant messages seamlessly. The application supports individual and group conversations, providing a smooth and engaging chat experience. Built using WebSockets, the system ensures low-latency, real-time communication between users.",
    link: "/",
  },
  {
    id: 4,
    img: "p4.jpg",
    title: "Social Media Project",
    desc: "A feature-rich social media platform that enables users to connect, share posts, and interact with each other in a dynamic online community. The platform supports user profiles, multimedia sharing, real-time notifications, and engagement features like likes and comments. Designed for scalability and performance, the application provides a smooth and engaging user experience.",
    link: "/",
  },
  {
    id: 5,
    img: "p5.jpg",
    title: "Animated Portfolio Website",
    desc: "A visually appealing and interactive portfolio website designed to showcase my skills, projects, and experience in software development and AI. The site features smooth animations, dynamic transitions, and a responsive layout to provide an engaging user experience. Built with modern web technologies, the portfolio highlights my expertise while ensuring a seamless and intuitive navigation experience.",
    link: "/",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
