import React, { useEffect, useState } from 'react';
import './Home.scss';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import data from '../data/motion.json';

const Home = () => {
  const [direction, setDirection] = useState(0);
  const [offsetMotion, setOffsetMotion] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const [page, setPage] = useState(0);
  const [theme, setTheme] = useState('theme-pink');

  const mobileBreakpoint = 640;

  const transition = {
    x: { type: 'spring', stiffness: 200, damping: 50 },
    opacity: { duration: 0.2 },
  };

  const paginate = (newPage, newOffset) => {
    if (newOffset > 80 || newOffset < -120) {
      setOffsetMotion(newOffset);
      setPage(page + newPage);
    }
  };

  const slideMotion = (newOffsetMotion) => {
    let value;

    if (newOffsetMotion > 80) {
      value = window.innerWidth <= mobileBreakpoint ? '100vw' : '55vw';

      if (page >= 4) {
        setTimeout(() => {
          setTheme('theme-pink');
          setOffsetMotion(0);
          setDirection(0);
          setPage(page + 1);
        }, 2500);
      }
    } else if (newOffsetMotion < -120) {
      value = '-100vw';

      if (page >= 4) {
        setTimeout(() => {
          setTheme('theme-pink');
          setOffsetMotion(0);
          setDirection(0);
          setPage(page + 1);
        }, 2500);
      }
    } else {
      value = 0;
    }

    return value;
  };

  const rotateMotion = (newRotateMotion) => {
    let value;

    if (newRotateMotion > 80) {
      value = 5;
    } else if (newRotateMotion < -120) {
      value = -5;
    } else {
      value = 0;
    }

    return value;
  };

  useEffect(() => {
    let autoTimeout1;
    let autoTimeout2;

    if (isChange) {
      setTimeout(() => {
        setIsChange(false);
      }, 300);
    }
    if (page === 5) {
      setTimeout(() => {
        setPage(0);
        setIsAuto(true);
      }, 300);
    }
    if (page < 4) {
      setTheme(data[page].theme);

      if (isAuto) {
        if (page === 0 || page === 1) {
          autoTimeout1 = setTimeout(() => {
            setOffsetMotion(-140);
            setPage(page + 1);
            setIsChange(true);
          }, 8000);
        } else {
          autoTimeout2 = setTimeout(() => {
            setOffsetMotion(100);
            setPage(page + 1);
            setIsChange(true);
          }, 8000);
        }
      }
    }
    return () => {
      clearTimeout(autoTimeout1);
      clearTimeout(autoTimeout2);
    };
  }, [isChange, page, isAuto]);

  return (
    <div className="home">
      <main className={`bg-${theme} transition-all duration-300 ease-in`}>
        <Header theme={theme} />
        <div
          className={`frame flex flex-col lg:flex-row-reverse pt-8 h-screen z-50`}
        >
          <div className="frame__list w-full lg:w-6/12 flex justify-center relative">
            {data.map((item, index) => {
              return (
                <motion.img
                  key={index + 1}
                  className={`motionCard shadow-2xl absolute z-10`}
                  src={item.src}
                  alt={`Design-${index + 1}`}
                  initial={{ x: 0, rotate: Math.round(Math.random() * 10) - 5 }}
                  transition={transition}
                  animate={
                    page === data.length - index
                      ? {
                          x: slideMotion(offsetMotion),
                          rotate: rotateMotion(offsetMotion),
                        }
                      : page === 5 && {
                          x: 1,
                          rotate: Math.round(Math.random() * 10) - 5,
                        }
                  }
                  drag={'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  draggable
                  onDragStart={() => setIsAuto(false)}
                  onDrag={(e, { offset }) => {
                    setDirection(offset.x);
                  }}
                  onDragEnd={(e, { offset }) => {
                    setIsChange(true);
                    paginate(1, offset.x);
                    setIsAuto(false);
                  }}
                  whileDrag={{
                    scale: 1.03,
                    rotate:
                      window.innerWidth <= mobileBreakpoint
                        ? (direction / 2) * 0.05
                        : (direction / 2) * 0.03,
                    transition: {
                      duration: 0.12,
                    },
                  }}
                />
              );
            })}
          </div>

          <div className="frame__description w-full lg:w-6/12 flex justify-start lg:justify-end">
            {page >= 0 && page < 4 && !isChange ? (
              <motion.div
                className="w-full lg:w-9/12 lg:ml-auto lg:mr-8 flex flex-col space-y-2 lg:space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xs lg:text-sm font-semibold hover:underline">
                  {data[page].subtitle.toUpperCase()}
                </h2>
                <p className="text-3xl lg:text-6xl font-bold hover:underline">
                  {data[page].title}
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
