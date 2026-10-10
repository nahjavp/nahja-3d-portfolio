import React from 'react';
import Room from '../components/Room';
import CameraController from '../components/CameraController';

/**
 * RoomScene Component
 * Canvas sub-tree containing the entire 3D environment and camera controls.
 */
export default function RoomScene({
  sceneState,
  isDoorOpen,
  onDoorClick,
  onTransitionComplete,
  cameraWaypoint,
  onSelectBook,
  onHoverBook,
  onOpenWorkspace,
  onOpenResume,
  onOpenPhone,
  onSelectCertificate,
  onSelectEducation,
  onSelectSkill,
  onSelectSoftSkill
}) {
  return (
    <>
      {/* Dynamic Camera Controller */}
      <CameraController
        sceneState={sceneState}
        waypoint={cameraWaypoint}
        onTransitionComplete={onTransitionComplete}
      />

      {/* Complete 3D Room and Contents */}
      <Room
        isDoorOpen={isDoorOpen}
        onDoorClick={onDoorClick}
        onSelectBook={onSelectBook}
        onHoverBook={onHoverBook}
        onOpenWorkspace={onOpenWorkspace}
        onOpenResume={onOpenResume}
        onOpenPhone={onOpenPhone}
        onSelectCertificate={onSelectCertificate}
        onSelectEducation={onSelectEducation}
        onSelectSkill={onSelectSkill}
        onSelectSoftSkill={onSelectSoftSkill}
      />
    </>
  );
}
