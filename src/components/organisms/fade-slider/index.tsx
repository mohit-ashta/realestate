import { Slide } from '@/components/molecules/slide';
import React, { useState, useEffect } from 'react';

const slidesData = [
    {
        id: 1,
        title: "Modern spaces and premium design",
    },
    {
        id: 2,
        title: "Discover a new way of living",
    },
    {
        id: 3,
        title: "Modern spaces and premium design",
    },
];

const FadeSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesData.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dm_slider fade-slider-container">
            {slidesData.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <Slide id={slide.id} title={slide.title} />
                </div>
            ))}
        </div>
    );
};

export default FadeSlider;