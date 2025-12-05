import {
  GRID_CELL_HEIGHT,
  GRID_CELL_WIDTH,
  GRID_ROWS,
} from '@constants/desktopConstants';

// Position state for each icon
export interface IconPosition {
  gridX: number;
  gridY: number;
}

// Convert grid position to pixel position
export const gridToPixel = (gridX: number, gridY: number) => {
  return {
    x: gridX * GRID_CELL_WIDTH,
    y: gridY * GRID_CELL_HEIGHT,
  };
};

// Convert pixel position to nearest grid position (snap-to-grid)
export const pixelToGrid = (x: number, y: number) => {
  return {
    gridX: Math.round(x / GRID_CELL_WIDTH),
    gridY: Math.round(y / GRID_CELL_HEIGHT),
  };
};

// Check if a grid position is occupied by another icon
export const isPositionOccupied = (
  gridX: number,
  gridY: number,
  excludeAppId: string,
  iconPositions: Record<string, IconPosition>
) => {
  return Object.entries(iconPositions).some(
    ([appId, pos]) =>
      appId !== excludeAppId && pos.gridX === gridX && pos.gridY === gridY
  );
};

// Find the nearest available grid position
export const findNearestAvailablePosition = (
  targetX: number,
  targetY: number,
  excludeAppId: string,
  iconPositions: Record<string, IconPosition>
): IconPosition => {
  // First try the target position
  if (!isPositionOccupied(targetX, targetY, excludeAppId, iconPositions)) {
    return { gridX: targetX, gridY: targetY };
  }

  // Search in expanding squares around the target
  for (let distance = 1; distance < 20; distance++) {
    for (let dx = -distance; dx <= distance; dx++) {
      for (let dy = -distance; dy <= distance; dy++) {
        if (Math.abs(dx) === distance || Math.abs(dy) === distance) {
          const newX = targetX + dx;
          const newY = targetY + dy;
          // Ensure within bounds (y: 0 to GRID_ROWS-1, x: >= 0)
          if (
            newX >= 0 &&
            newY >= 0 &&
            newY < GRID_ROWS &&
            !isPositionOccupied(newX, newY, excludeAppId, iconPositions)
          ) {
            return { gridX: newX, gridY: newY };
          }
        }
      }
    }
  }
  // Fallback to original position
  return iconPositions[excludeAppId];
};

// Initialize icon positions in a column-first grid layout (Windows 11 style)
export const getInitialIconPositions = (
  appIds: string[]
): Record<string, IconPosition> => {
  const positions: Record<string, IconPosition> = {};
  appIds.forEach((appId, index) => {
    // Column-first layout: fill columns top-to-bottom, then move right
    const gridX = Math.floor(index / GRID_ROWS);
    const gridY = index % GRID_ROWS;
    positions[appId] = { gridX, gridY };
  });
  return positions;
};
