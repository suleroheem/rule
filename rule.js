function dijkstra(graph, start) {
    // Initialize distances from start to all other vertices as infinity
    // except the distance to the start itself which is 0
    let distances = {};
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Create a priority queue to store vertices that are being preprocessed
    let pq = new PriorityQueue();
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        // Get the vertex with the smallest distance
        let { vertex, priority } = pq.dequeue();

        // Update the distances of adjacent vertices
        for (let neighbor in graph[vertex]) {
            let weight = graph[vertex][neighbor];
            let distance = priority + weight;

            // Only consider this new path if it's better
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return distances;
}

// Priority Queue class implementation
class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(vertex, priority) {
        this.collection.push({ vertex, priority });
        this.collection.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
// Output should be: { A: 0, B: 4, C: 2, D: 5 }
