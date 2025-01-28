// Trade off between query performance vs consistency

// Using references (normalization) -> CONSISTENCY
let author = {
    name: 'Igor'
}

let course = {
    author: 'id',
}

// Using embedded documents (denormalization) -> PERFORMANCE
let coursee = {
    author: {
        name: 'Igor'
    }
}

// Hybrid
let authorr = {
    name: 'Igor'
    // 50 other properties
}

let courseee = {
    author: {
        id: 'ref',
        name: 'Igor'
    }
}
