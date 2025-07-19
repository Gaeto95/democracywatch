import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, []);

  return (
    <Particles
      id="particles-js"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#1a0070",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 15,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            grab: {
              distance: 255.80432187492372,
              links: {
                opacity: 1
              }
            },
            bubble: {
              distance: 267.9854800594439,
              size: 40,
              duration: 2,
              opacity: 0.6740240862101164,
              speed: 3
            }
          },
        },
        particles: {
          color: {
            value: "#fcfcfc",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 6.413648243462092,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.44093831673801875,
            random: false,
            animation: {
              enable: false,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 1.5 },
            random: true,
            animation: {
              enable: false,
              speed: 40,
              minimumValue: 0.1,
              sync: false
            }
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10
      }}
    />
  );
};

export default ParticlesBackground;