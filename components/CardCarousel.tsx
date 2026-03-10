"use client";


import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const cardsData = [
    { id: 1, color: 'bg-gradient-to-br from-red-400 to-rose-600', title: 'Card One' },
    { id: 2, color: 'bg-gradient-to-br from-blue-400 to-indigo-600', title: 'Card Two' },
    { id: 3, color: 'bg-gradient-to-br from-green-400 to-emerald-600', title: 'Card Three' },
    { id: 4, color: 'bg-gradient-to-br from-yellow-400 to-orange-500', title: 'Card Four' },
    { id: 5, color: 'bg-gradient-to-br from-purple-400 to-fuchsia-600', title: 'Card Five' },
];

const CardCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Autoplay logic
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
        }, 3000); // Changes every 3 seconds

        // Clearing the interval on unmount or when activeIndex changes
        // This ensures that if a user clicks a card, the 3-second timer resets!
        return () => clearInterval(timer);
    }, [activeIndex]);

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden bg-gray-50 rounded-2xl">
            {cardsData.map((card, index) => {
                // Calculate the relative index of the card compared to the active one
                // This keeps the loop infinite and seamless
                const relativeIndex = (index - activeIndex + cardsData.length) % cardsData.length;

                // Define asymmetric positions for a natural, slightly messy stacked look
                // let animateProps = {};
                let animateProps: { x: number; y: number; rotate: number; scale: number; zIndex: number; opacity: number } = { x: 0, y: 0, rotate: 0, scale: 0.5, zIndex: 0, opacity: 0 };

                if (relativeIndex === 0) {
                    // Front active card
                    animateProps = { x: 0, y: 0, scale: 1, rotate: 0, zIndex: 20, opacity: 1 };
                } else if (relativeIndex === 1) {
                    // Peeking right
                    animateProps = { x: 90, y: -20, scale: 0.9, rotate: 5, zIndex: 15, opacity: 1 };
                } else if (relativeIndex === 2) {
                    // Peeking left
                    animateProps = { x: -80, y: -40, scale: 0.8, rotate: -4, zIndex: 10, opacity: 1 };
                } else if (relativeIndex === 3) {
                    // Peeking top right
                    animateProps = { x: 40, y: -60, scale: 0.7, rotate: 2, zIndex: 5, opacity: 1 };
                } else {
                    // Hidden behind the stack
                    animateProps = { x: 0, y: -80, scale: 0.5, rotate: 0, zIndex: 0, opacity: 0 };
                }

                return (
                    <motion.div
                        key={card.id}
                        className={`absolute w-64 h-80 rounded-2xl shadow-xl cursor-pointer flex items-center justify-center text-white text-2xl font-bold border border-white/20 backdrop-blur-sm ${card.color}`}
                        initial={false}
                        animate={animateProps}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                            mass: 1,
                        }}
                        onClick={() => handleCardClick(index)}
                        whileHover={{ scale: relativeIndex === 0 ? 1.05 : animateProps.scale + 0.05 }}
                    >
                        {card.title}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default CardCarousel;