export default interface CanvasWrapProps {
  children: React.ReactNode;
  cameraPosition?: { x: number; y: number; z: number };
  sceneScale?: number;
  scenePosition?: { x: number; y: number };
  stars?: React.ReactNode;
  enableControls?: boolean;
  onCreated?: () => void;
  fov?: number;
}