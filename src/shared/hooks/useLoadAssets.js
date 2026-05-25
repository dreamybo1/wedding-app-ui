import { useEffect, useState } from "react";

export const useLoadAssets = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const loadAssets = async () => {
      const images = Array.from(document.images);

      if (images.length === 0) {
        setProgress(100);

        setTimeout(() => {
          setIsLoaded(true);
        }, 300);

        return;
      }

      let loaded = 0;

      const updateProgress = () => {
        loaded += 1;

        const percent = Math.round((loaded / images.length) * 100);

        setProgress(percent);
      };

      const promises = images.map((img) => {
        if (img.complete) {
          updateProgress();

          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = () => {
            updateProgress();
            resolve("");
          };

          img.onerror = () => {
            updateProgress();
            resolve("");
          };
        });
      });

      await Promise.all(promises);

      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    };

    loadAssets();
  }, []);

  return { isLoaded, progress };
};
