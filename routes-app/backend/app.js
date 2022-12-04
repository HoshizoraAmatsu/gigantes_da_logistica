const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Rota = require('./models/rota');

class Node
{
  constructor(val, priority)
  {
    this.val = val
    this.priority = priority
  }
}

class PriorityQueue
{
  constructor()
  {
    this.values = []
  }

  enqueue(val, priority)
  {
    let newNode = new Node(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
  }

  bubbleUp()
  {
    let index = this.values.length - 1
    const element = this.values[index]

    while (index > 0)
    {
      let parentIndex = Math.floor((index - 1) / 2)
      let parent = this.values[parentIndex]

      if (element.priority >= parent.priority) break;

      this.values[parentIndex] = element
      this.values[index] = parent
      index = parentIndex
    }
  }

  dequeue()
  {
    const min = this.values[0]
    const end = this.values.pop()

    if (this.values.length > 0)
    {
      this.values[0] = end
      this.sinkDown()
    }

    return min;
  }

  sinkDown()
  {
    let index = 0
    const length = this.values.length
    const element = this.values[0]

    while(true)
    {
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = 2 * index + 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIndex < length)
      {
        leftChild = this.values[leftChildIndex]

        if (leftChild.priority < element.priority)
        {
          swap = leftChildIndex
        }
      }

      if (rightChildIndex < length)
      {
        rightChild = this.values[rightChildIndex]

        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        )
        {
          swap = rightChildIndex
        }
      }

      if (swap === null) break;

      this.values[index] = this.values[swap]
      this.values[swap] = element
      index = swap
    }
  }
}

class WeightedGraph
{
  constructor()
  {
    this.adjacencyList = {}
  }

  addVertex(node)
  {
    if (!this.adjacencyList[node]) this.adjacencyList[node] = []
  }

  addEdge(src, dest, weight)
  {
    this.adjacencyList[src].push({ node: dest, weight })
    this.adjacencyList[dest].push({ node: src, weight })
  }

  dijkstra(start, end)
  {
    const nodes = new PriorityQueue()
    const distances = {}
    const previous = {}

    let path = []
    let smallest

    for (let vertex in this.adjacencyList)
    {
      if (vertex === start)
      {
        distances[vertex] = 0
        nodes.enqueue(vertex, 0)
      } else {
        distances[vertex] = Infinity
        nodes.enqueue(vertex, Infinity)
      }

      previous[vertex] = null
    }

    while (nodes.values.length)
    {
      smallest = nodes.dequeue().val

      if (smallest === end)
      {
        while (previous[smallest])
        {
          path.push(smallest)
          smallest = previous[smallest]
        }

        break;
      }

      if (smallest || distances[smallest] !== Infinity)
      {
        for (let neighbor in this.adjacencyList[smallest])
        {
          let nextNode = this.adjacencyList[smallest][neighbor]

          let candidate = distances[smallest] + nextNode.weight
          let nextNeighbor = nextNode.node

          if (candidate < distances[nextNeighbor])
          {
            distances[nextNeighbor] = candidate
            previous[nextNeighbor] = smallest
            nodes.enqueue(nextNeighbor, candidate)
          }
        }
      }
    }

    return path.concat(smallest).reverse()
  }
}

var routesGraph = new WeightedGraph()

mongoose.connect('mongodb+srv://HoshizoraAmatsu:PassWord@cluster0.wohre.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connected!")
  }).catch(() => {
    console.log("Connection error!!")
  });

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.post('/api/rotas', (req, res, next) => {
  const rota = new Rota ({
    pontoOrigem: req.body.pontoOrigem,
    pontoDestino: req.body.pontoDestino,
    dist: req.body.dist
  })

  routesGraph.addVertex(req.body.pontoOrigem)
  routesGraph.addVertex(req.body.pontoDestino)
  routesGraph.addEdge(req.body.pontoOrigem, req.body.pontoDestino, req.body.dist)

  rota.save()
    .then(rotaInserida => {
      res.status(201).json({
        message: 'Rota inserida',
        id: rotaInserida._id
      })
    });
});

app.get('/api/rotas', (req, res, next) => {
  Rota.find().then(documents => {
    res.status(200).json({
      message: "OK",
      rotas: documents
    });
  })
});

app.get('/api/caminho', (req, res, next) => {
  routesGraph.dijkstra(req.body.origem, req.body.destino).then(documents => {
    res.status(200).json({
      message: "OK",
      rotas: documents
    });
  })
});

app.get('/api/rotas/:id', (req, res, next) => {
  Rota.findById(req.params.id).then(cli => {
    if(cli) {
      res.status(200).json(cli);
    } else {
      res.status(404).json({message: "Rota não encontrada!"})
    }
  })
})

app.put('/api/rotas/:id', (req, res, next) => {
  console.log(req.params);
  const rota = new Rota({
    _id: req.params.id,
    pontoOrigem: req.body.pontoOrigem,
    pontoDestino: req.body.pontoDestino,
    dist: req.body.dist
  });
  Rota.updateOne({_id: req.params.id}, rota)
    .then((result) => {
      res.status(200).json({message: 'Atualizacao feito com exito'})
    });
});

app.delete('/api/rotas/:id', (req, res, next) => {
  Rota.deleteOne({_id: req.params.id})
    .then((result) => {
      res.status(200).json({message: "Cliente removido!"})
    })
});

module.exports = app;
