import { useRef, useState, useEffect, RefObject } from 'react';

const useImageDistance = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [distanceToBottom, setDistanceToBottom] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const calculateDistance = () => {
        if (containerRef.current && imageRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const imageRect = imageRef.current.getBoundingClientRect();
            setDistanceToBottom(containerRect.bottom - imageRect.bottom);
        }
    };

    useEffect(() => {
        if (imagesLoaded) {
            calculateDistance();
        }
    }, [imagesLoaded]);

    useEffect(() => {
        const handleResize = () => calculateDistance();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageLoad = () => setImagesLoaded(true);

    return { containerRef, imageRef, distanceToBottom, handleImageLoad };
};

export default useImageDistance;
