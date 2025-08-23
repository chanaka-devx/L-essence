from collections import deque

def findShortestPath(grid):
    """
    Find the shortest path from 'S' to 'G' in a 2D grid using BFS.
    
    Args:
        grid: 2D list of characters representing the warehouse floor plan
        
    Returns:
        int: Length of shortest path from 'S' to 'G', or -1 if no path exists
    """
    if not grid or not grid[0]:
        return -1
    
    rows, cols = len(grid), len(grid[0])
    
    # Find start and goal positions
    start = None
    goal = None
    
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == 'S':
                start = (i, j)
            elif grid[i][j] == 'G':
                goal = (i, j)
    
    # Edge case: missing start or goal
    if start is None or goal is None:
        return -1
    
    # Edge case: start and goal are the same
    if start == goal:
        return 0
    
    # BFS implementation
    queue = deque([(start[0], start[1], 0)])  # (row, col, distance)
    visited = set()
    visited.add(start)
    
    # Four cardinal directions: up, down, left, right
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    while queue:
        row, col, distance = queue.popleft()
        
        # Explore all four directions
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            
            # Check bounds
            if 0 <= new_row < rows and 0 <= new_col < cols:
                # Check if not visited and not an obstacle
                if (new_row, new_col) not in visited and grid[new_row][new_col] != '#':
                    # Check if we reached the goal
                    if grid[new_row][new_col] == 'G':
                        return distance + 1
                    
                    # Add to queue for further exploration
                    queue.append((new_row, new_col, distance + 1))
                    visited.add((new_row, new_col))
    
    # No path found
    return -1


# Main execution for problem input
if __name__ == "__main__":
    # Read input
    R, C = map(int, input().split())
    grid = []
    for _ in range(R):
        grid.append(list(input().strip()))
    
    # Find and print the shortest path
    result = findShortestPath(grid)
    print(result)