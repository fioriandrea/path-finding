const makeFreshNode = (x, y) => {
  const nodesDivs = document.querySelectorAll(".cell");
  const nodeDiv = nodesDivs[x + y*Math.sqrt(nodesDivs.length)];
  return {
    x,
    y,
    wall: nodeDiv.classList.contains("wall"),
    start: nodeDiv.classList.contains("start"),
    end: nodeDiv.classList.contains("end"),
    open: nodeDiv.classList.contains("open"),
    closed: nodeDiv.classList.contains("closed"),
  }
}

const isNodeValid = node => node.x >= 0 && node.y >= 0;

const createNodes = dim => {
  const nodes = [];
  for(let i = 0; i < dim; i++) {
    for(let j = 0; j < dim; j++) {
      nodes.push(makeFreshNode(j, i));
    }
  }

  for(let i = 0; i < dim; i++) {
    for(let j = 0; j < dim; j++) {
      neighnorth = {x: j, y: i - 1,};
      neighnorthest = {x: j + 1, y: i - 1,};
      neighnorthwest = {x: j - 1, y: i - 1,};
      neighest = {x: j + 1, y: i,};
      neighovest = {x: j - 1, y: i,};
      neighsouth = {x: j, y: i + 1,};
      neighsouthwest = {x: j - 1 , y: i + 1,};
      nodes[j + dim*i].neighbors = [
        neighnorth,
        neighnorthest,
        neighnorthwest,
        neighest,
        neighovest,
        neighsouth,
        neighsouthwest
      ].map(e => isNodeValid(e));
    }
  }

  return nodes;
}

const updateView = nodes => { 
  const nodesDivs = document.querySelectorAll(".cell");
  for(let i = 0; i < nodes.length; i++) {
    let type = "";

    if(nodes[i].open) type = "open";
    if(nodes[i].closed) type = "closed";
    if(nodes[i].wall) type = "wall";
    if(nodes[i].start) type = "start";
    if(nodes[i].end) type = "end";

    nodesDivs[i].className = `cell ${type}`;
  }
}
