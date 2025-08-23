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


def solve_warehouse_navigation():
    """
    Main function to read input and solve the warehouse navigation problem.
    """
    # Read input
    R, C = map(int, input().split())
    grid = []
    for _ in range(R):
        grid.append(list(input().strip()))
    
    # Find and print the shortest path
    result = findShortestPath(grid)
    print(result)


def run_tests():
    """
    Comprehensive test cases to validate the solution.
    """
    print("Running test cases...")
    
    # Test case 1: Sample input
    grid1 = [
        ['S', '.', '#', '.', 'G'],
        ['#', '.', '.', '.', '.'],
        ['.', '#', '.', '.', '#'],
        ['.', '.', '#', '.', '.']
    ]
    result1 = findShortestPath(grid1)
    print(f"Test 1 - Expected: 6, Got: {result1}")
    assert result1 == 6, f"Test 1 failed: expected 6, got {result1}"
    
    # Test case 2: No path (completely blocked)
    grid2 = [
        ['S', '#', 'G']
    ]
    result2 = findShortestPath(grid2)
    print(f"Test 2 - Expected: -1, Got: {result2}")
    assert result2 == -1, f"Test 2 failed: expected -1, got {result2}"
    
    # Test case 3: Direct path
    grid3 = [
        ['S', '.', '.', 'G']
    ]
    result3 = findShortestPath(grid3)
    print(f"Test 3 - Expected: 3, Got: {result3}")
    assert result3 == 3, f"Test 3 failed: expected 3, got {result3}"
    
    # Test case 4: Start and goal are the same
    grid4 = [
        ['S']
    ]
    # Modify to have both S and G at same position for this test
    grid4_modified = [['G']]  # Since we can't have both S and G, this tests single cell
    result4 = findShortestPath([['S']])  # Single S without G
    print(f"Test 4 - Expected: -1, Got: {result4}")
    assert result4 == -1, f"Test 4 failed: expected -1, got {result4}"
    
    # Test case 5: Single cell with both S and G (edge case)
    # This is impossible in the problem constraints, but let's test adjacent
    grid5 = [
        ['S', 'G']
    ]
    result5 = findShortestPath(grid5)
    print(f"Test 5 - Expected: 1, Got: {result5}")
    assert result5 == 1, f"Test 5 failed: expected 1, got {result5}"
    
    # Test case 6: Complex maze
    grid6 = [
        ['S', '.', '#', '.', '.'],
        ['.', '.', '#', '.', '.'],
        ['.', '#', '#', '.', '.'],
        ['.', '.', '.', '.', 'G']
    ]
    result6 = findShortestPath(grid6)
    print(f"Test 6 - Expected: 7, Got: {result6}")
    assert result6 == 7, f"Test 6 failed: expected 7, got {result6}"
    
    # Test case 7: Empty grid
    grid7 = []
    result7 = findShortestPath(grid7)
    print(f"Test 7 - Expected: -1, Got: {result7}")
    assert result7 == -1, f"Test 7 failed: expected -1, got {result7}"
    
    # Test case 8: Large grid with long path
    grid8 = [['.' for _ in range(10)] for _ in range(10)]
    grid8[0][0] = 'S'
    grid8[9][9] = 'G'
    result8 = findShortestPath(grid8)
    print(f"Test 8 - Expected: 18, Got: {result8}")
    assert result8 == 18, f"Test 8 failed: expected 18, got {result8}"
    
    print("All tests passed!")


if __name__ == "__main__":
    # Uncomment the line below to run tests
    run_tests()
    
    # Uncomment the line below to solve the actual problem
    # solve_warehouse_navigation()