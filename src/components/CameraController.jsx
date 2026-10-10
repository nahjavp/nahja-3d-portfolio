import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Camera Controller
 * Manages cinematic intro camera push-through when the door opens,
 * smooth waypoint transitions between room viewpoints,
 * and standard orbit controls with room collision bounding.
 */
export default function CameraController({
  sceneState, // 'intro' | 'transitioning' | 'room'
  waypoint = 'room', // 'room' | 'desk' | 'bookshelf' | 'certificates' | 'education' | 'skills' | 'contact'
  onTransitionComplete
}) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Waypoint targets and positions
  const waypoints = {
    room: {
      pos: new THREE.Vector3(0, 2.2, 2.4),
      target: new THREE.Vector3(0, 1.4, -1.5)
    },
    desk: {
      pos: new THREE.Vector3(0.2, 1.75, -0.7),
      target: new THREE.Vector3(0.2, 1.35, -2.4)
    },
    bookshelf: {
      pos: new THREE.Vector3(2.6, 2.0, -0.5),
      target: new THREE.Vector3(4.5, 2.0, -0.5)
    },
    certificates: {
      pos: new THREE.Vector3(2.2, 2.5, -2.0),
      target: new THREE.Vector3(2.9, 2.5, -4.45)
    },
    education: {
      pos: new THREE.Vector3(-2.0, 2.4, -2.0),
      target: new THREE.Vector3(-2.8, 2.5, -4.45)
    },
    skills: {
      pos: new THREE.Vector3(0.1, 2.4, -1.8),
      target: new THREE.Vector3(0.0, 2.65, -4.45)
    },
    contact: {
      pos: new THREE.Vector3(0.55, 1.55, -1.2),
      target: new THREE.Vector3(0.78, 1.1, -2.4)
    }
  };

  // Initial camera setup
  useEffect(() => {
    if (sceneState === 'intro') {
      camera.position.set(0, 1.9, 6.8);
      camera.lookAt(0, 1.9, 4.5);
    }
  }, [camera, sceneState]);

  // Transition from Intro through door into Room
  useEffect(() => {
    if (sceneState === 'transitioning') {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onTransitionComplete) onTransitionComplete();
        }
      });

      // Camera moves smoothly forward through doorway
      tl.to(camera.position, {
        x: 0,
        y: 2.1,
        z: 3.5,
        duration: 1.2,
        ease: 'power2.in',
        onUpdate: () => {
          camera.lookAt(0, 1.6, -1.0);
        }
      });

      // Glide into cozy room overview
      tl.to(camera.position, {
        x: waypoints.room.pos.x,
        y: waypoints.room.pos.y,
        z: waypoints.room.pos.z,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          camera.lookAt(waypoints.room.target);
        }
      });
    }
  }, [sceneState]);

  // Handle Waypoint Navigation in Room mode
  useEffect(() => {
    if (sceneState === 'room' && controlsRef.current && waypoints[waypoint]) {
      const wp = waypoints[waypoint];

      gsap.to(camera.position, {
        x: wp.pos.x,
        y: wp.pos.y,
        z: wp.pos.z,
        duration: 1.4,
        ease: 'power2.inOut'
      });

      gsap.to(controlsRef.current.target, {
        x: wp.target.x,
        y: wp.target.y,
        z: wp.target.z,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          controlsRef.current.update();
        }
      });
    }
  }, [waypoint, sceneState]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={sceneState === 'room'}
      enableDamping={true}
      dampingFactor={0.06}
      minDistance={1.0}
      maxDistance={7.5}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minPolarAngle={0.2}
      target={waypoints.room.target}
    />
  );
}
